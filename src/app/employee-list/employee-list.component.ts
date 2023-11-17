import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee';
import { CommunicatorService } from '../services/communicator.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailComponent, EmployeeCreateComponent, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
    constructor(private employeeService: EmployeeService,
      private communicator: CommunicatorService, private router: Router){

        this.communicator.employeeCreationObserver$.subscribe(action => {
          //can't implement this method because of server 429 response (too many requests in a given amount of time)
          //this.getEmployees()
        });
        this.communicator.employeeAdditionObserver$.subscribe(employee => {
          this.addEmployee(employee as Employee)
        });
    }
  ngOnInit(): void {
    this.getEmployees()
  }
    employees: Employee[]
    publicAccEmployees: Employee[]
    salaryFilter: number
    getEmployees()
    {
      this.employeeService.getListFromServer().subscribe((response: HttpResponse<any>) => {
        if(response.status == 200 && response.body != null)
        {
          this.employees = response.body.data;
          this.publicAccEmployees = this.employees
        }
        else
        {
          alert(`There was an error loading data from server. Status: ${response.status}`)
        }
      }, (error: HttpErrorResponse) => {
        if(error.status == 429)
        {
          alert("You have to wait for few moments because of server settings. Status: 429")
        }
        else
        {
          alert(`There was an error loading data from server. Error: ${error.message}`)
        }
      });
    }
    orderByAge(ascending: boolean){
      if(ascending == true)
      {
        this.publicAccEmployees = this.employees
        this.publicAccEmployees.sort(function(x, y){return x.employee_age - y.employee_age })
      }
      else
      {
        this.publicAccEmployees = this.employees
        this.publicAccEmployees.sort(function(x, y){return y.employee_age - x.employee_age})
      }
    }
    filterBySalary(isHigher: boolean){
      if(isHigher == true)
      {
        this.publicAccEmployees = this.employees
        this.publicAccEmployees = this.employees.filter(employee => {return employee.employee_salary > this.salaryFilter;})
      }
      else{
        this.publicAccEmployees = this.employees
        this.publicAccEmployees = this.employees.filter(employee => {return employee.employee_salary < this.salaryFilter;})
      }
    }
    getEmployeeDetail(id: number){
      this.communicator.getEmployeeDetail(id)
    }
    addEmployee(employee: Employee)
    {
      this.employees.push(employee)
      this.publicAccEmployees.push(employee)
    }
    
}
