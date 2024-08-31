import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../Shared/Services/category.service';
import { CategoryResponse } from '../../../Shared/Models/category';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  private router = inject(Router)
  private categoryService = inject(CategoryService);
  categoryList: CategoryResponse = [];
  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getCategory().subscribe((res) => {
      this.categoryList = res;
    })
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() => {
      alert(window.confirm("Do you really want to delete this category?"))
      this.getCategory();
    })
  }

  editCategory(id: number) {
    this.router.navigateByUrl(`category/edit/${id}`);
  }

  addCategory() {
    this.router.navigateByUrl("category/add");
  }

}
