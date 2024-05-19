import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UacRoutingModule } from './uac-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { ChangeComponent } from './change/change.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ViewComponent,
    ChangeComponent
  ],
  imports: [
    CommonModule,
    UacRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UacModule { }
