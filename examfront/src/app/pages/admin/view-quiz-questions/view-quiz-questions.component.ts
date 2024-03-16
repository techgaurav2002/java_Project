import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId:any;
  qTitle:any;
  questions = [
    {
      contant:'abc',
      option1:'5',
      option2:'5',
      option3:'5',
      option4:'5',
      answer:'',
      quesId:'',
    }
  ];

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack:MatSnackBar

  ){}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // console.log(this.qId);
    // console.log(this.qTitle);
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;

        
      },
      (error)=>{
        console.log(error);
        
      }
    );

    
    
  }
  // ..delete question
  deleteQuestion(qid:any){
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure,want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //confirm
        this._question.deleteQuestion(qid).subscribe(
          (data:any)=>{
            this._snack.open('Question Deleted','',{
              duration:2000
            });
            this.questions = this.questions.filter((q)=>q.quesId!=qid)
          },
          (error)=>{
            this._snack.open('Error in delete question','',{
              duration:2000
            });
            console.log(error);
            
          }
        );
      }
    });
  }

}
