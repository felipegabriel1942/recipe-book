import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.updateList();
  }

  ngOnDestroy() {
    this.idChangeSub.unsubscribe();
  }

  updateList() {
    this.idChangeSub = this.shoppingListService.updateIngredientList
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
    });
  }


}
