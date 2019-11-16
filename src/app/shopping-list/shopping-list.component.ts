import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private idChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private loggingService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.updateList();
    this.loggingService.printLog('Hello from Shopping List');
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

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
