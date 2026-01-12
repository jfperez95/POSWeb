import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { ListTableComponent } from '@shared/components/reusables/list-table/list-table.component';
import { ListTableMenuModule } from "@shared/components/list-table-menu/list-table-menu.module";
import { FormsModule } from "@shared/import-modules/forms.module";
import { MaterialModule } from "@shared/import-modules/material.module";
import { SearchBoxModule } from "@shared/components/search-box/search-box.module";
import { SearchBoxMultipleComponent } from "@shared/components/reusables/search-box-multiple/search-box-multiple.component";
import { MenuComponent } from "@shared/components/reusables/menu/menu.component";
import { CategoryListComponent } from './category-list/category-list.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    CategoryManageComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ListTableComponent,
    ListTableMenuModule,
    FormsModule,
    MaterialModule,
    SearchBoxModule,
    SearchBoxMultipleComponent,
    MenuComponent
]
})
export class CategoryModule { }
