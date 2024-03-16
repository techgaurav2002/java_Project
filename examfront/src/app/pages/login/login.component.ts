import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginData={
    username:'',
    password:'',
  }

  constructor(private snak:MatSnackBar,private login:LoginService,private router:Router){ }

  ngOnInit(): void {}

  formSubmit(){
    console.log("login form submited")
    if(this.loginData.username.trim() == '' || this.loginData.username==null){
      this.snak.open("Username is required !!",'',{
        duration: 2000,
      });
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password==null){
      this.snak.open("Password is required !!",'',{
        duration: 2000,
      });
      return;
    }

    //Request to server for token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success")
        console.log(data);

        //login
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            //redirect ...Admin admin-dashboard
            if(this.login.getUserRoll()=="ADMIN"){
              //window.location.href='/admin'
              this.router.navigate(['admin'])
            }else if(this.login.getUserRoll()=="NORMAL"){
              //normal user dashboard
              //window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0'])
            }else{
              this.login.logout();
              // location.reload();
            }
            

            //redirect  ...Noraml : noraml-dashboard
          }
        );


      },
      (error)=>{
        console.log("Error");
        console.log(error);
        this.snak.open('invalid Details !! Try again','',{
          duration:2000
        });
      }
    );

  }
}
