import { Component, Inject, inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close';
import * as configs from '../../../../static-data/configs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategotyService } from 'src/app/services/categoty.service';
import { name } from '@azure/msal-angular/packageMetadata';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  icClose = icClose;
  configs = configs

  form: FormGroup

  initForm():void {
    this.form = this._fb.group({
      categoryId: [0, [ Validators.required ]],
      name: ['', [Validators.required]],
      description: [''],
      state: ['', Validators.required]
    })
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb:FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategotyService,
    public _dialogRef: MatDialogRef<CategoryManageComponent>
  ) {
    this.initForm()
   }

  ngOnInit(): void {
    if(this.data != null){
      this.CategoryById(this.data.data.categoryId)
    }
  }

  CategoryById(categoryId:number): void{
    this._categoryService.CategoryById(categoryId).subscribe(res =>{
      this.form.reset({
        categoryId: res.CategoryId,
        name: res.name,
        description: res.description,
        state: res.state
      })
    })
  }

  CategorySave(){
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach((controls) =>{
        controls.markAsTouched();
      })
    }

    const categoryId = this.form.get('categoryId').value

    if(categoryId > 0){
      this.CategoryEdit(categoryId)
    }else{
      this.CategoryRegister()
    }
  }

  CategoryEdit(categoryId:number): void {
    this._categoryService.CategoryEdit(categoryId, this.form.value).subscribe(res =>{
      if(res.isSuccess){
        this._alert.success('Excelente', res.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atención', res.message);
      }
    })
  }

  CategoryRegister(): void{
    this._categoryService.CategoryRegister(this.form.value).subscribe(res =>{
      if(res.isSuccess){
        this._alert.success('Excelente', res.message)
        this._dialogRef.close(true)
      }else{
        this._alert.warn('Atención', res.message);
      }
    })
  }

}
