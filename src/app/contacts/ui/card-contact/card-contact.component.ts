import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Contact } from '../../shared/interfaces/contacts.interface';

@Component({
  selector: 'app-card-contact',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './card-contact.component.html',
})
export class CardContactComponent {
  @Input({ required: true }) contact!: Contact;

  @Output() editContact = new EventEmitter<Contact>();

  @Output() deleteContact = new EventEmitter<string>();

  onEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  onDeleteContact(contact: Contact) {
    this.deleteContact.emit(contact.id);
  }



}
