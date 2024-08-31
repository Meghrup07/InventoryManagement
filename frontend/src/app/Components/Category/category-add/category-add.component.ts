import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../Shared/Services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-add.component.html',
  styleUrl: './category-add.component.css'
})
export class CategoryAddComponent implements OnInit {
  public route = inject(Router)
  public categoryService = inject(CategoryService);
  categoryForm!: FormGroup;

  ngOnInit(): void {
    this.categoryAddForm();
  }

  categoryAddForm() {
    this.categoryForm = new FormGroup({
      categoryType: new FormControl(null, [Validators.required]),
      categoryName: new FormControl(null, [Validators.required])
    })
  }

  addCategory() {
    this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
      this.route.navigateByUrl("/category");
      this.categoryForm.reset();
    })
  }

  backToList() {
    this.route.navigateByUrl("/category");
  }

}
