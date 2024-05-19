import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginModel } from './models/model_login/login-model.model';
import { TokenModel } from './models/token_model/token-model.model';
import { RegisterModel } from './models/model_register/register-model.model';
import { ViewModel } from './models/model_view/view-model.model';

@Injectable({
  providedIn: 'root'
})
export class UacService {
  private url:string = "http://" + `${environment.apiUrl}api/uac/`;
  private loginUrl : string = this.url + "login";
  private viewUrl : string = this.url + "view";
  private changeUrl : string = this.url + "password";
  token : any

  constructor(private httpClient: HttpClient) { }

  login(data : LoginModel):Observable<TokenModel>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.post<TokenModel>(this.loginUrl, JSON.stringify(data), {'headers' : headers})
  }

  register(data : RegisterModel):Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json')

    return this.httpClient.post(this.url, JSON.stringify(data), {'headers' : headers});
  }

  view():Observable<ViewModel>{
    this.token = localStorage.getItem("SavedToken");
    //console.log(this.token)

    const headers = new HttpHeaders().set('token', this.token).set('Content-Type', 'application/json')

    return this.httpClient.get<ViewModel>(this.viewUrl, {'headers' : headers});
  }

  deleteAccount():Observable<any>{
    this.token = localStorage.getItem("SavedToken");
    //console.log(this.token)

    const headers = new HttpHeaders().set('token', this.token).set('Content-Type', 'application/json')

    localStorage.clear();

    return this.httpClient.delete(this.url, {'headers' : headers});
  }

  changePassword(password : string):Observable<any>{
    this.token = localStorage.getItem("SavedToken");

    const params = new HttpParams().set('password', password)

    const headers = new HttpHeaders().set('token', this.token).set('Content-Type', 'application/json')

    //console.log({headers: headers, params: params})

    localStorage.clear();

    return this.httpClient.put(this.changeUrl, {},  {headers: headers, params: params});
  }
}
