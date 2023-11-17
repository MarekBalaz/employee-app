import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee';
import { CommunicatorService } from '../../services/communicator.service';
import { EmployeeService } from '../../services/employee.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {

  employee: Employee = {id:0, employee_name:'""', employee_age: 0, employee_salary: 0};

  constructor(private communicator: CommunicatorService,
    private employeeService: EmployeeService){

      this.communicator.employeeDetailSubscriber$.subscribe(id => {
        this.employeeService.getEmployeeDetailFromServer(id as number).subscribe((response: HttpResponse<any>) => {
          if(response.status == 200 && response.body != null)
          {
            this.employee = response.body.data;
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
        })
      });
    }

  
  
}
