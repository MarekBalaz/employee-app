import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './../../services/employee.service';
import { CommunicatorService } from './../../services/communicator.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss'
})
export class EmployeeCreateComponent {
    id: number = 1;
    name: string;
    age: number;
    salary: number;
    constructor(private employeeService: EmployeeService,
      private communicator: CommunicatorService){

    }
    createNewEmployee()
    {
      let employee: Employee = {id: this.id, employee_name: this.name, employee_age: this.age, employee_salary: this.salary}
        this.employeeService.createNewEmployee(employee).subscribe((response: HttpResponse<any>) => {
          if(response.status != 200 || response.body == null)
          {
            alert(`There was an error loading data from server. Status: ${response.status}`)
          }
          else
          {
            alert("Employee was successfully added to employees list")
            this.communicator.addCreatedEmployeeToList(employee)
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
        //can't implement this method because of server responding 429(too many requests in a given amount of time)
        //this.communicator.makeEmployeeCreationReload();
        this.id++;
        this.name = "";
        this.age = 0;
        this.salary = 0;
    }
}
