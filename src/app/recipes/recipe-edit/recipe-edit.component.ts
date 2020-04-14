import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  // basic form
  // @ViewChild('f') signUpForm: FormGroup;
  // defaultQuestion = 'pet';
  // answer = '';
  // genders = ['male', 'female'];
  // user = {
  //   username: '',
  //   email: '',
  //   secretQuestion: '',
  //   answer: '',
  //   gender: '',
  // };
  // submitted = false;

  //reactive form
  signUpForm: FormGroup;
  genders = ['male', 'female'];


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
  }

  //basic form methods

  // suggestUserName() {
  //   const suggestedName = 'Superuser';

  //   this.signUpForm.form.patchValue({
  //     userData: {
  //       username: suggestedName
  //     }
  //   });
  // }

  // // onSubmit(form: NgForm){
  // //   console.log(form);
  // // }

  // onSubmit() {
  //   this.submitted = true;
  //   this.user.username = this.signUpForm.value.userData.username;
  //   this.user.email = this.signUpForm.value.userData.email;
  //   this.user.secretQuestion = this.signUpForm.value.userData.secret;
  //   this.user.answer = this.signUpForm.value.questionAnswer;
  //   this.user.gender = this.signUpForm.value.gender;

  //   this.signUpForm.reset();
  // }

}
