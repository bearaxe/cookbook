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
  // imagePreview: string = '/assets/user-avatar.png';
  errorsOnForm = false;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    // console.log(this.recipeForm.get('ingredients'));

    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if(this.editMode){
          this.id = +params['id'];
          this.showRecipe(this.recipeService.getRecipe(this.id));
        } else {
          this.showRecipe(new Recipe('', '', '', [new Ingredient(null, null)]));
          // this.startNewRecipe();
        }
      }
    );
    console.log('this.id:', this.id);
  }

  // Maybe this is a little too clever to be trusted, but it sure is cool (and easy to fix, but that comes later)
  showRecipe(bit: Recipe){
    this.recipe = bit;
    this.recipeForm = new FormGroup({
      'name': new FormControl((this.editMode ? this.recipe.name : null), Validators.required),
      'imagePath': new FormControl((this.editMode ? this.recipe.imagePath : null)),
      'description': new FormControl((this.editMode ? this.recipe.description : null)),
      'ingredients': (this.editMode ? this.formatIngredients(this.recipe.ingredients)
                                    : new FormArray([
                                        new FormGroup(
                                          {'name': new FormControl(null),
                                           'amount': new FormControl(null)
                                          }
                                        )]))
    });
  }

  formatIngredients(arr: Ingredient[]){
    console.log('parings arr passed:', arr);
    const newList: FormArray = new FormArray([]);
    arr.map((each) => (<FormArray>newList).push(new FormGroup({'name': new FormControl(each.name), 'amount': new FormControl(each.amount)})));
    return newList;
  }

  startNewRecipe(){
    this.recipe = new Recipe('', '', '', []);
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
      // this.recipe.id = this.recipeService.newRecipeId();
      this.recipeService.addRecipeToList(this.recipe);
    }else{
      this.recipeService.updateRecipeInList(this.id, this.recipe);
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
