import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';
import { MenuItems } from '@shared/models/menu-items.interface';
import { MatRippleModule } from "@angular/material/core";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, IconModule, MatRippleModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() currentMenu: number | undefined;
  @Input() items: MenuItems[] | undefined;
  @Input() buttonShow = false;
  @Input() buttonLabel = "Button";
  
  @Output() filterChange = new EventEmitter<unknown>()
  @Output() buttonClick = new EventEmitter<unknown>()

  activeItem: MenuItems["id"] = "all"

  constructor() { }

  ngOnInit(): void {
    this.setCurrentFilter(this.currentMenu);
  }

  setCurrentFilter(itemNumber: number | undefined){
    if (this.items && itemNumber !== null && itemNumber !== undefined) {
      const currentItem = this.items.find(item => item.value === itemNumber);
      if (currentItem && currentItem.id) {
        this.activeItem = currentItem.id;
      }
    }
  }

  setFilter(item: MenuItems){
    if (item.id) {
      this.activeItem = item.id;
    }
    return this.filterChange.emit(item.value);
  }

  isActive(item: MenuItems["id"]){
    return this.activeItem === item;
  }

  emitClick(){
    if(this.buttonShow){
      return this.buttonClick.emit();
    }
  }

}
