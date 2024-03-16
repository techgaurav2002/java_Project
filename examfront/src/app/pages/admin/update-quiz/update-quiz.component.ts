import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{
  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _cat:CategoryService,private _snack:MatSnackBar,
    private _router:Router){}
  qId=0;
  quiz:any;
  categories:any;
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    //alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz = data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );

    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data
      },
      (error)=>{
        alert("error in loading categories")
      }
    )

  }
  
  //update form submit

  public updateData(){
    
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Success !!",'Quiz updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes'])
        })
      },(error)=>{
        Swal.fire("Error !!",'Error in Updating','error')
        console.log(error);
      }
    )
  }

}
