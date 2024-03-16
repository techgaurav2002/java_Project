import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{
  quizzes=[
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'Thus, core Java is the part of Java SE where the developers develop desktop-based applications by using the basic concepts of Java where JDK (Java Development ..',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }

    },
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'Thus, core Java is the part of Java SE where the developers develop desktop-based applications by using the basic concepts of Java where JDK (Java Development ..',
      maxMarks:'50',
      numbersOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    },
    {
      qId:23,
      title:'Basic Java Quiz',
      description:'Thus, core Java is the part of Java SE where the developers develop desktop-based applications by using the basic concepts of Java where JDK (Java Development ..',
      maxMarks:'50',
      numberOfQuestions:'20',
      active:'',
      category:{
        title:'Programming'
      }
    }
  ]
  constructor(private _quiz:QuizService){}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);

      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !' ,"Error in Loading Data !",'error')
      }
    );
  }

  //
  deleteQuiz(qId:any)
  {
    
    Swal.fire({
      icon:'info',
      title:"Are you sure ?",
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete 
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{ 
            this.quizzes = this.quizzes.filter((quiz)=>quiz.qId!=qId);
          Swal.fire('Success','Quiz deleted','success');
    
          },
          (error)=>{
            
            Swal.fire('Error','Error !! Quiz is not deleted','error');
            console.log(error);
          }
        );
      }
    })
  }

}
