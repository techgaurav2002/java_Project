import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

// get current user
public getCurrentUser()
{
  return this.http.get(`${baseUrl}/current-user`);
}


//generate token

public generateToken(loginData:any)
{
return this.http.post(`${baseUrl}/generate-token`,loginData)
}
//login user:set token in local storage

public loginUser(token:any){
  localStorage.setItem("token",token);
  return true;
}

//check wether user is login or not

public isLoggedIn()
{
  let tokenStr=localStorage.getItem("token")
  if(tokenStr==undefined || tokenStr==''||tokenStr==null){
    return false
  }else{
    return true;
  }
}

//logout : that basically remove token from local storage

public logout(){
  localStorage.removeItem('token')
  localStorage.removeItem("user")
  return true;
}

//get token from local storage
public getToken()
{
  return localStorage.getItem("token");
}

//set user detail
public setUser(user:any){
localStorage.setItem("user",JSON.stringify(user));
}

//get user
public getUser(){
  let UserStr = localStorage.getItem("user");
  if(UserStr!=null){
    return JSON.parse(UserStr);
  }else{
    this.logout();
    return null;
  }

  
  
}

// get user role

public getUserRoll(){
  let user = this.getUser();
  return user.authorities[0].authority;
}

}
