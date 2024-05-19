import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterModel } from '../models/model_register/register-model.model';
import { UacService } from '../uac.service';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  private readonly uacService : UacService
  public user : RegisterModel
  private subscription : Subscription
  private fb : FormBuilder
  private readonly router: Router;
  private http: HttpClient
  registerErrorPassNotSame : boolean = false
  registerInputsNotCompleted : boolean = false;
  registerUsernameAlreadyExists : boolean = false;
  registerEmailAlreadyExists : boolean = false;

  constructor(router : Router, uacService : UacService, http:HttpClient) {
    this.router = router
    this.uacService = uacService
    this.http = http
  }

  ngOnInit() {
    this.createForm()
  }

  onSubmit () {
    this.user = new RegisterModel(this.loginForm.value.username, this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.repassword)

    if(this.user.username != "" && this.user.email != "" && this.user.password != "" && this.user.repassword != "")
    {
      this.registerInputsNotCompleted = false;
      this.registerEmailAlreadyExists = false;
      this.registerUsernameAlreadyExists = false;

      if(this.user.password == this.user.repassword)
      {
        this.registerErrorPassNotSame = false
        this.subscription = this.uacService.register(this.user).subscribe({
          next : (response) => {

          },
          error: (err) => {
            if(err.status == 500 ){
              console.log("Internal server error");
            }
            if(err.status == 400){
              //username already exists
              this.registerUsernameAlreadyExists = true;
              this.registerEmailAlreadyExists = false;
            }
            if(err.status == 404){
              //email already exists
              this.registerEmailAlreadyExists = true;
              this.registerUsernameAlreadyExists = false;
            }
          },
          complete: () => {
            this.router.navigate(['/login']);
          }
          //console.log(response);
          // this.persoanaForm.reset();          
        });
      }
    else{
        this.registerErrorPassNotSame = true
      }
    }
    else
    {
      this.registerUsernameAlreadyExists = false;
      this.registerEmailAlreadyExists = false;
      this.registerErrorPassNotSame = false;
      this.registerInputsNotCompleted = true;
    }

    
  }

  private createForm () {
    this.loginForm = new FormGroup({
      username : new FormControl ('', Validators.required),
      email : new FormControl('', Validators.required),
      password : new FormControl ('', Validators.required),
      repassword : new FormControl ('', Validators.required)
    })
  }

}
