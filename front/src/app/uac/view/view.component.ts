import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewModel } from '../models/model_view/view-model.model';
import { UacService } from '../uac.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  private readonly uacService : UacService
  private readonly router: Router;
  private http: HttpClient
  private subscription : Subscription
  viewUserDoesNotExists : boolean = false;
  deleteUserDoesNotExists : boolean = false;
  viewUsername : string

  constructor(router : Router, uacService : UacService, http:HttpClient) {
    this.router = router
    this.uacService = uacService
    this.http = http
  }

  ngOnInit(): void {
    //console.log(this.token)
    this.viewUserDoesNotExists = false;

    this.subscription = this.uacService.view().subscribe({
      next : (response) => {
        this.viewUsername = response.username;
        //console.log(this.viewUsername.username)
        //console.log(response)
      },
      error: (err) => {
        if(err.status == 500 ){
          console.log("Internal server error");
        }
        if(err.status == 404){
          //user does not exist.....(nu are cum)
          this.viewUserDoesNotExists = true;
        }
      },
      complete: () => {
        
      }
      //console.log(response);
      // this.persoanaForm.reset();          
    });
  } 

  changePassword(){
    //console.log("change password")
    //pagina noua cu form pt parola 
    this.router.navigate (['/change']);
  }

  deleteAccount(){

    if (confirm("Are you sure you want to delete this account?")) {
      //daca da
      this.deleteUserDoesNotExists = false;
    this.subscription = this.uacService.deleteAccount().subscribe({
      next : (response) => {
        //console.log(this.viewUsername.username)
        //console.log(response)

      },
      error: (err) => {
        if(err.status == 500 ){
          console.log("Internal server error");
        }
        if(err.status == 404){
          //user does not exist.....(nu are cum)
          this.deleteUserDoesNotExists = true;
        }
      },
      complete: () => {
        this.router.navigate (['/login']);
      }          
      });
    } 

    //console.log("delete account")
  }

  disconnect(){
    //console.log("disconnect")
    if (confirm("Are you sure you want to disconnect from this account?")) {
      this.router.navigate (['/login']);
      localStorage.clear();
    }
  }

}
