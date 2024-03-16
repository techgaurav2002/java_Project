import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) {}

  //add user
  
  public addUser(user: any){
    return this.http.post(`${baseUrl}/user/`,user)
  }
}
