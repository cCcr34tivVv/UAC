import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChangeModel } from '../models/model_change/change-model.model';
import { UacService } from '../uac.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  public change : ChangeModel
  private readonly uacService : UacService
  private readonly router: Router;
  private http: HttpClient
  private subscription : Subscription
  loginForm: FormGroup;
  changeErrorPassNotSame : boolean = false;
  changeInputsNotCompleted : boolean = false;
  changeUserDoesNotExists : boolean = false;


  constructor(router : Router, uacService : UacService, http:HttpClient) {
    this.router = router
    this.uacService = uacService
    this.http = http
  }

  ngOnInit(): void {
    this.createForm()
  }

  onSubmit(){
    this.change = new ChangeModel(this.loginForm.value.password, this.loginForm.value.repassword)

    if(this.change.password != "" && this.change.repassword != ""){
      this.changeInputsNotCompleted = false;
      this.changeUserDoesNotExists = false;
      if(this.change.password == this.change.repassword)
      {
        this.changeErrorPassNotSame = false;
        this.subscription = this.uacService.changePassword(this.change.password).subscribe({
          next : (response) => {
            console.log(this.change.password)
          },
          error: (err) => {
            if(err.status == 500 ){
              console.log("Internal server error");
            }
            if(err.status == 404){
              //email already exists
              this.changeUserDoesNotExists = true;
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
        this.changeErrorPassNotSame = true;
        this.changeUserDoesNotExists= false;
      }
    }
    else{
      this.changeInputsNotCompleted = true;
      this.changeUserDoesNotExists= false;
      this.changeErrorPassNotSame = false;
    }
  }

  private createForm () {
    this.loginForm = new FormGroup({
      password : new FormControl ('', Validators.required),
      repassword : new FormControl ('', Validators.required)
    });
  }

}
