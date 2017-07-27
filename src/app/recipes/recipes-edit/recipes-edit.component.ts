import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  recipe: Recipe;
  id: number = 0;
  editMode = false;
  recipeForm: FormGroup;
  // imagePreview: string = '/assets/user-avatar.png';
  errorsOnForm = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null),
      'description': new FormControl(null),
      'ingredients': new FormArray([
        new FormGroup({
          'name': new FormControl(null),
          'amount': new FormControl(null)
        })
      ])
    });
    console.log(this.recipeForm.get('ingredients'));

    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if(this.editMode){
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        } else {
          this.startNewRecipe();
        }
      }
    );
  }

  startNewRecipe(){
    this.id = this.recipeService.newRecipeId();
    this.recipe = new Recipe(this.id, '', '', '', []);
  }

  cancel(){
    this.recipeForm.reset();
    this.errorsOnForm = false;
    console.log('Recipe reset run');
  }

  save(){
    if(this.recipeForm.invalid){
      console.log('Found an error, updating view');
      this.errorsOnForm = true;
      return;
    }
    //TODO: make a seperate way to just update for changes and stuff like that
    this.errorsOnForm = false;
    this.recipe.name = this.checkForChange('name');
    this.recipe.imagePath = this.checkForChange('imagePath');
    this.recipe.description = this.checkForChange('description');
    this.recipe.ingredients = this.checkForChange('ingredients');
    console.log('Recipe Data to push:', this.recipe);
    console.log('Data Raw:', this.recipeForm);
    if(!this.editMode) {
      // master overwrite for id. This prevents shallow copy entries for new entries
      this.recipe.id = this.recipeService.newRecipeId();
      this.recipeService.addRecipeToList(this.recipe);
    }else{
      this.recipeService.updateRecipeInList(this.recipe);
    }

  }

  checkForChange(someProp){
    return (this.recipeForm.value[someProp] ? this.recipeForm.value[someProp] : this.recipe[someProp]);
  }

  onAddIngredient(){
    console.log('Caught Ing Add Req');
    const newGroup = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, Validators.required)
    });
    (<FormArray>this.recipeForm.get('ingredients')).push(newGroup);
    console.log('your ingredients are now:', this.recipeForm.get('ingredients'));
  }

  onDeleteIngredient(index: number){
    console.log('Deleting entry at index: ', index);
    const ingArray = (<FormArray>this.recipeForm.get('ingredients'));
    ingArray.removeAt(index);
  }

}
