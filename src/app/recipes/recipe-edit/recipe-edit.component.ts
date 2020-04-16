import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'], 
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // basic form--------------------------------------------------------------------

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

  // basic form methods------------------------------------------------------------------

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

  // reactive form------------------------------------------------------------------

  // signUpForm: FormGroup;
  // genders = ['male', 'female'];
  // forbiddenUsernames = ['Chris', 'Anna'];

  //reactive form methods------------------------------------------------------------------

  // ngOnInit(): void {

  //   this.signUpForm = new FormGroup({
  //     'userData': new FormGroup({
  //       'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
  //       'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
  //     }),
  //     'gender': new FormControl('male'),
  //     'hobbies': new FormArray([])
  //   });

  //   this.signUpForm.valueChanges.subscribe(
  //     (value) => console.log(value)
  //   );
  // }

  // // reactive form methods
  // onSubmit(){
  //   console.log(this.signUpForm);
  // }

  // onAddHobby(){
  //   const control = new FormControl(null, Validators.required);
  //   (<FormArray> this.signUpForm.get('hobbies')).push(control);
  // }

  // forbiddenNames(control: FormControl): {[s: string]: boolean} {
  //   if (this.forbiddenUsernames.indexOf(control.value) !== -1){
  //     return {'nameIsForbidden': true};
  //   }
  //   return null;
  // }

  // forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
  //   // tslint:disable-next-line: no-unused-expression
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.com') {
  //         resolve({'emailIsForbidden': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 1500);
  //   });
  //   return promise;
  // }
}
