import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
  categories=[
    {
      cid:23,
      title:'Programming'
    },
    {
      cid:23,
      title:'Programming'
    },
    {
      cid:23,
      title:'Programming'
    }
  ];
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numbersOfQuestions:'',
    active:true,
    category:{
      cid:null
    },

  };
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService){}
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        //categories load
        this.categories=data;
        console.log(this.categories);

      },
      (error)=>{
        console.log(error);
        Swal.fire('error !!','Error in loading data from server','error');

      }
    );
  }
  //
  addQuiz(){
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this._snack.open("Title Required !!",'',{
        duration:2000,
      });
      return;
    }


    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        Swal.fire('Success','quiz is added','success')
        this.quizData={
          title:'',
          description:'',
          maxMarks:'',
          numbersOfQuestions:'',
          active:true,
          category:{
            cid:null
          }
      }
    },
    (error)=>{
      Swal.fire('Error!!','Error while adding quiz')
      console.log(error);
    }
    );
  }

}
