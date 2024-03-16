import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  public Editor = ClassicEditor;
  qId:any;
  qTitle:any;
  question:any={
    quiz:{

    },
    contant:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private _route:ActivatedRoute,
    private _question:QuestionService){}


  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    console.log(this.qId);
    this.qTitle = this._route.snapshot.params['title']
    console.log(this.qTitle);
    
    this.question.quiz['qId']=this.qId;

    
  }
  formSubmit(){
    if(this.question.contant.trim()==''||this.question.contant==null){
      return;
    }
    if(this.question.option1.trim()==''||this.question.contant==null){
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2==null){
      return;
    }
    if(this.question.answer.trim()==''||this.question.answer==null){
      return;
    }

    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        this.question.contant='',
        this.question.option1='',
        this.question.option2='',
        this.question.option3='',
        this.question.option4='',
        this.question.answer='',
        Swal.fire("Success","Question added",'success')
      },
      (error) => {
        Swal.fire("Error","Question not added",'error')
      }
    );

  }

}
