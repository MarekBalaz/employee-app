import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-list/employee-detail/employee-detail.component';
import { EmployeeCreateComponent } from './employee-list/employee-create/employee-create.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
    {path:"", component: EmployeeListComponent},
    {path: "details/{id}", component: EmployeeDetailComponent},
    {path: "create", component: EmployeeCreateComponent},
    {path: "aboutus", loadComponent: () => import("./about-us/about-us.component").then(m => m.AboutUsComponent)},
    {path: "contact", component: ContactComponent}
];
