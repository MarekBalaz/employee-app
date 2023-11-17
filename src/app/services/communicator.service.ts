import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class CommunicatorService {

  employeeDetailObserver = new Subject();
  public employeeDetailSubscriber$ = this.employeeDetailObserver.asObservable();

  employeeCreationObserver = new Subject();
  public employeeCreationObserver$ = this.employeeDetailObserver.asObservable();

  employeeAdditionObserver = new Subject();
  public employeeAdditionObserver$ = this.employeeDetailObserver.asObservable();

  getEmployeeDetail(id: number) {
    this.employeeDetailObserver.next(id);
  }
  makeEmployeeCreationReload(){
    this.employeeCreationObserver.next("reload");
  }
  addCreatedEmployeeToList(employee: Employee){
    this.employeeAdditionObserver.next(employee)
  }
}
