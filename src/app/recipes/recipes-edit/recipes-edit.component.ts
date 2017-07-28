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
    this.recipeForm = this.createFormFields([
      this.recipe.name,
      this.recipe.imagePath,
      this.recipe.description,
      this.recipe.ingredients
    ]);
  }

  startNewRecipe(){
    this.recipeForm = this.createFormFields([
      null,
      null,
      null,
      [new Ingredient(null, null)]
    ]);
  }

  // using this to consolidate Validators etc (mostly because i WILL forget if it's not all in one place)
  // This returns the formGroup to preserve the code plot (may change later)
  // I'm using a tuple so TS will yell at anyone trying to put weird stuff in this function
  createFormFields(fields: [string, string, string, Ingredient[]]){
    return new FormGroup({
      'name': new FormControl(fields[0], Validators.required),
      'imagePath': new FormControl(fields[1], Validators.required),
      'description': new FormControl(fields[2], Validators.required),
      'ingredients': this.formatIngredients(fields[3])
    });
  }

  formatIngredients(arr: Ingredient[]){
    console.log('parings arr passed:', arr);
    const newList: FormArray = new FormArray([]);
    arr.map(
      (each) =>
        (<FormArray>newList).push(
          this.createIngredientGroup([each.name, each.amount]))
    );
    return newList;
  }

  createIngredientGroup(data: [string, number]){
    return new FormGroup({
      'name': new FormControl(data[0], Validators.required),
      'amount': new FormControl(data[1], [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  // Form should not clear when in editMode, but should repopulate with the initial values
  cancel(){
    this.recipeForm.reset(); // This is behavior is wrong.
    this.errorsOnForm = false;
    console.log('Recipe reset run');
  }

  // this can almost certainly be split up into a save and update function. Then you can avoid that tricky nonsense.
  save(){
    if(this.recipeForm.invalid){
      console.log('Found an error, updating view');
      this.errorsOnForm = true;
      return;
    }

    this.errorsOnForm = false;
    // this is a magic block. I have no idea how or why this works.
    this.recipe.name = this.setIfExists('name');
    this.recipe.imagePath = this.setIfExists('imagePath');
    this.recipe.description = this.setIfExists('description');
    this.recipe.ingredients = this.setIfExists('ingredients');
    // This should do the same thing, but it doesn't work at all
    // this.recipe = this.recipeForm.value;
    console.log('Recipe Data to push:', this.recipe);
    console.log('Data Raw:', this.recipeForm);
    if(!this.editMode) {
      console.log('heck it, i think it might work just fine lol')
      this.recipeService.addRecipeToList(this.recipe);
    }else{
      console.log('pretest for refactor!!!!\nthis.recipe:', this.recipe, '\nthis.recipeForm:', (<Recipe>this.recipeForm.value));
      console.log('Changes are in effect');
      this.recipeService.updateRecipeInList(this.id, this.recipe);
    }

  }

  // this is tricky, but it doesn't seem to be adding complexity to understand if named correctly
  setIfExists(someProp){
    return (this.recipeForm.value[someProp] ? this.recipeForm.value[someProp] : this.recipe[someProp]);
  }

  // newGrouping started getting complex so I threw it up with the other validator consolidator
  onAddIngredient(){
    console.log('Caught Ing Add Req');
    const newGroup = this.createIngredientGroup([null, null]);
    (<FormArray>this.recipeForm.get('ingredients')).push(newGroup);
    console.log('your ingredients are now:', this.recipeForm.get('ingredients'));
  }

  onDeleteIngredient(index: number){
    console.log('Deleting entry at index: ', index);
    const ingArray = (<FormArray>this.recipeForm.get('ingredients'));
    ingArray.removeAt(index);
  }

}
