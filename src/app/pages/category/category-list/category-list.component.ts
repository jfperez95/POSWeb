import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { CategotyService } from 'src/app/services/categoty.service';
import { componentSettings } from './category-list-config';
import { CategoryApi } from 'src/app/response/Category/category.response';
import { DateFilter } from '@shared/functions/actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FiltersBox, SearchOptions } from '@shared/models/search-options.interface';
import { CategoryManageComponent } from '../category-manage/category-manage.component';

@Component({
  selector: 'vex-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class CategoryListComponent implements OnInit {

  component:any

  constructor(
    customTitle: CustomTitleService,
    public _categoryService: CategotyService,
    public _dialog: MatDialog
  ) {
    customTitle.set('categories')
   }

  ngOnInit(): void {
    this.component = componentSettings
  }

  

  setData(category: any){
    this.component.filters.stateFilter = category?.value ?? null
    this.formatGetInputs()
  }

  formatGetInputs(){
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null,
      startDate: null,
      endDate: null
    }

    if(this.component.filters.numFilter != ""){
      inputs.numFilter = this.component.filters.numFilter
      inputs.textFilter = this.component.filters.textFilter
    }

    if(this.component.filters.stateFilter != null){
      inputs.stateFilter = this.component.filters.stateFilter
    }

    if(this.component.filters.startDate != "" && this.component.filters.endDate != ""){
      inputs.startDate = this.component.filters.startDate
      inputs.endDate = this.component.filters.endDate
    }

    // Crear un nuevo objeto para que Angular detecte el cambio
    this.component.getInputs = { ...inputs }
  }

  search(data: FiltersBox){
    this.component.filters.numFilter = data.searchValue
    this.component.filters.textFilter = data.searchData
    this.formatGetInputs()
  }

  datesFilterOpen(){
    DateFilter(this)
  }

  openDialogRegister(){
    this._dialog.open(CategoryManageComponent, {
      disableClose: true,
      width: '400px'
    }).afterClosed().subscribe(res =>{
      if(res){
        this.formatGetInputs()
      }
    })
  }

  rowClick(e: any){
    let action = e.action
    let category = e.row

    switch(action){
      case "edit":
        this.CategoryEdit(category)
        break
      case "remove":
        this.CategoryRemove(category)
        break
    }

    return false
  }

  CategoryEdit(row: CategoryApi){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = row;

    let dialogRef = this._dialog.open(CategoryManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '400px'
    })
    dialogRef.afterClosed().subscribe(res =>{
      if(res){
        this.formatGetInputs()
      }
    })
  }

  CategoryRemove(category: any){
    Swal.fire({
      title: '¿Realmente desea eliminar esta categoría?',
      text: "Se borrará de forma permanente",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: 'rgb(210, 155, 253',
      cancelButtonColor: 'rgb(79. 109, 253',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      width: '430px'
    }).then(result =>{
      if(result.isConfirmed){
        this._categoryService.categoryRemove(category.CategoryId).subscribe(() => this.formatGetInputs())
      }
    })
  }

}
