import { Component, EventEmitter, Output } from '@angular/core';
import { IconSettings } from '../../../shared/ui/icons/setting';
import { IconEdit } from '../../../shared/ui/icons/edit';
import { IconDelete } from '../../../shared/ui/icons/delete';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IconSettings,
    IconEdit,
    IconDelete,
    
  ],
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  @Output() onEditContact = new EventEmitter<void>();

  @Output() onDeleteContact = new EventEmitter<void>();

  isOpen = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }

}
