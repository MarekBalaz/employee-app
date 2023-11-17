import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "https://dummy.restapiexample.com"
  constructor(private httpClient: HttpClient){
  }
  getListFromServer() : Observable<any>{
    return this.httpClient.get("https://dummy.restapiexample.com/api/v1/employees", {observe: 'response'})
  }
  getEmployeeDetailFromServer(id: number): Observable<any>{
    return this.httpClient.get(`https://dummy.restapiexample.com/api/v1/employee/${id}`, {observe: 'response'})
  }
  createNewEmployee(employee: Employee): Observable<any>{
    return this.httpClient.post("https://dummy.restapiexample.com/api/v1/create", {name: employee.employee_name, age: employee.employee_age, salary: employee.employee_salary}, {observe: 'response'})
  }
}
