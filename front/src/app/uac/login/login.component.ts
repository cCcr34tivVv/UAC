import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginModel } from '../models/model_login/login-model.model';
import { UacService } from '../uac.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private readonly uacService : UacService
  public user : LoginModel
  private subscription : Subscription
  loginInputsNotCompleted : boolean = false;
  loginUsernameOrPasswordIncorrect : boolean = false;

  private readonly router: Router;
  constructor(router : Router, uacService : UacService) {
    this.router = router
    this.uacService = uacService;
  }

  ngOnInit() { 
    this.createForm()
    localStorage.clear()
  }

  onSubmit () {
    //console.log(this.loginForm.value)
    this.user = new LoginModel (this.loginForm.value.username, this.loginForm.value.password);

    if(this.user.username != "" &&  this.user.password != "" )
    {
      this.loginInputsNotCompleted = false;
      this.loginUsernameOrPasswordIncorrect = false;

      this.subscription = this.uacService.login(this.user).subscribe({
        next: (response) => {
          //console.log (response.token)
          localStorage.setItem('SavedToken',response.token);
        },
        error: (err) => {
          if (err.status == 500) {
            console.log ("Internal server error");
          }
          if (err.status == 400) {
            //console.log ("nu i");   
            //console.log (err.message)
            this.loginUsernameOrPasswordIncorrect = true;
          }
        },
        complete: () => {
          this.router.navigate (['/view']);
        } 
      })
    }
    else
    {
      this.loginUsernameOrPasswordIncorrect = false;
      this.loginInputsNotCompleted = true;
    }

    //console.log(this.user)
    
    
  }

  private createForm () {
    this.loginForm = new FormGroup({
      username : new FormControl ('', Validators.required),
      password : new FormControl ('', Validators.required)
    });
  }

}
