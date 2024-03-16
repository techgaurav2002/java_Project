import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private _snackBar: MatSnackBar) {}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  
  }

  ngOnInit(): void {}
  formSubmit(){
    console.log(this.user);
    if(this.user.username.trim()=='' || this.user.username == null){
      this._snackBar.open('Username is required !!','',{duration:2000,
      
      });
      return;
    }
    if(this.user.password.trim()=='' || this.user.password == null){
      this._snackBar.open('Plese Set Your Password !!','',{duration:2000,
      
      });
      return;
    }
    if(this.user.firstName.trim()=='' || this.user.firstName == null){
      this._snackBar.open('First name is required !!','',{duration:2000,
      
      });
      return;
    }
    if(this.user.lastName.trim()=='' || this.user.lastName == null){
      this._snackBar.open('Last name is required !!','',{duration:2000,
      
      });
      return;
    }
    if(this.user.email.trim()=='' || this.user.email == null){
      this._snackBar.open('Email is required !!','',{duration:2000,
      
      });
      return;
    }
    if(this.user.phone=='' || this.user.phone== null){
      this._snackBar.open('Phone No is required !!','',{duration:2000,
      
      });
      return;
    }
    
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        //success
        this.user.username='';
        this.user.password='';
        this.user.firstName='';
        this.user.lastName='';
        this.user.email='';
        this.user.phone='';
        console.log(data)
        // alert("success");
        Swal.fire('Successfully Done !!','User id is '+ data.id,'success')

      },
      (error)=>{
        //error
        console.log(error);
        //alert('something went wrong');
        this._snackBar.open('Username is required !!','',{duration:2000,
      
        });
        
      }
    );
  }

}
