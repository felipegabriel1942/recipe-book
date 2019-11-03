import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Massa de pizza',
      'Simples e fácil de fazer',
      'https://img.itdg.com.br/tdg/images/recipes/000/000/324/323149/323149_original.jpg?mode=crop&width=710&height=400',
      [ new Ingredient('Farinha de trigo', 1),
        new Ingredient('Xícaras de água morna', 3),
        new Ingredient('Xícaras de óleo', 1),

      ]),
    new Recipe(
      'Bolo de chocolate',
      'A melhor receita de bolo de chocolate',
      'https://img.itdg.com.br/tdg/images/recipes/000/062/547/318292/318292_original.jpg?mode=crop&width=710&height=400',
      [ new Ingredient('Ovos', 4),
        new Ingredient('Chocolate em pó', 4),
        new Ingredient('Xícara (chá) de leite', 4),
        new Ingredient('Xícara (chá) de açucar', 2)
      ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
