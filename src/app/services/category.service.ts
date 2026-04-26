import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private categories = ['all', 'electronics', 'clothing', 'accessories', 'home'];

    getCategories() {
        return this.categories;
    }
}