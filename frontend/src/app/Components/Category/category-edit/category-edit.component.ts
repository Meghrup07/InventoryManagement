import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../Shared/Services/category.service';
import { CategoryResponse } from '../../../Shared/Models/category';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {

  public route = inject(Router)
  private activatedRoute = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private toastr = inject(ToastrService);
  categoryEditForm!: FormGroup
  categoryDetails: any = [];
  categoryId: any

  ngOnInit(): void {
    this.getEditCategoeryForm();
    this.categoryId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategoryDetails();
  }

  getCategoryDetails() {
    this.categoryService.categoryDetails(this.categoryId).subscribe((res) => {
      this.categoryDetails = res;
      this.getEditCategoeryForm();
    })
  }

  getEditCategoeryForm() {
    this.categoryEditForm = new FormGroup({
      categoryType: new FormControl(this.categoryDetails ? this.categoryDetails["categoryType"] : null, [Validators.required]),
      categoryName: new FormControl(this.categoryDetails ? this.categoryDetails["categoryName"] : null, [Validators.required])
    })
  }

  updateCategory() {
    const formValue = {
      categoryType: this.categoryEditForm.controls['categoryType'].value,
      categoryName: this.categoryEditForm.controls['categoryName'].value
    }
    this.categoryService.updateCategory(formValue, this.categoryId).subscribe({
      next: () => {
        this.toastr.success("category updated");
        this.route.navigateByUrl("/category");
      },
      error: () => {
        this.toastr.error("Something went wrong");
      }
    })
  }

  backToList() {
    this.route.navigateByUrl("/category");
  }

}
