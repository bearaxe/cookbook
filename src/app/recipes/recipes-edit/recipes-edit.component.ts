import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  errorsOnForm = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if(this.editMode){
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
          this.loadRecipe();
        } else {
          this.recipe = new Recipe('', '', '', [new Ingredient(null, null)]);
          this.startNewRecipe();
        }
      }
    );
    console.log('this.id:', this.id);
  }

  loadRecipe(){
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.recipe.name, Validators.required),
      'imagePath': new FormControl(this.recipe.imagePath),
      'description': new FormControl(this.recipe.description),
      'ingredients': this.formatIngredients(this.recipe.ingredients)
    });
  }

  formatIngredients(arr: Ingredient[]){
    console.log('parings arr passed:', arr);
    const newList: FormArray = new FormArray([]);
    arr.map((each) => (<FormArray>newList).push(new FormGroup({'name': new FormControl(each.name), 'amount': new FormControl(each.amount)})));
    return newList;
  }

  startNewRecipe(){
    this.recipeForm = new FormGroup({
      'name': new FormControl(null),
      'imagePath': new FormControl(null),
      'description': new FormControl(null),
      'ingredients': new FormArray([
        new FormGroup(
          {'name': new FormControl(null),
            'amount': new FormControl(null)
          }
        )])
    });
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

    this.errorsOnForm = false;
    this.recipe.name = this.setIfExists('name');
    this.recipe.imagePath = this.setIfExists('imagePath');
    this.recipe.description = this.setIfExists('description');
    this.recipe.ingredients = this.setIfExists('ingredients');
    console.log('Recipe Data to push:', this.recipe);
    console.log('Data Raw:', this.recipeForm);
    if(!this.editMode) {
      this.recipeService.addRecipeToList(this.recipe);
    }else{
      this.recipeService.updateRecipeInList(this.id, this.recipe);
    }

  }

  // this is tricky, but it doesn't seem to be adding complexity to understand if named correctly
  setIfExists(someProp){
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
