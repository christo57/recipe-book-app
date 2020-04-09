import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test',
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredient('ingredient 1', 10),
                new Ingredient('ingredient 2', 5)
            ]),
        new Recipe('Vegetarian Food',
            'This is the simpliest vegetarian food',
            'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg',
            [
                new Ingredient('ingredient 3', 1),
                new Ingredient('ingredient 4', 25)
            ])
      ];

      constructor(private shoppingListService: ShoppingListService) {}

      getRecipes(){
          return this.recipes.slice();
      }
}
