import { Component, inject } from '@angular/core';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
import { CardContactComponent } from '../../ui/card-contact/card-contact.component';
import { Router } from '@angular/router';
import { ContactsService } from '../../data-access/contacts.service';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { of, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contact-dashboard',
  standalone: true,
  imports: [
    SearchBarComponent,
    CardContactComponent,
    AsyncPipe,
  ],
  templateUrl: './contact-dashboard.component.html',
})
export default class ContactDashboardComponent {
  private _contactsService = inject(ContactsService)

  private _router = inject(Router);

  contacts$ = this._contactsService
    .getContacts()
    .pipe(tap((values) => console.log(values)));

  
  // contacts: Contact[] = [
  //   {
  //     id: '1',
  //     description: '',
  //     fullName: 'John Doe',
  //     phoneNumber: '+66 087644555',
  //     email: 'john.doe',
  //   },
  // ] //test data

  async deleteContact(id: string) {
    console.log(id);
    
    try {
      await this._contactsService.deleteContact(id);
    } catch (error) {}
  }

  editContact(contact: Contact) {
    // console.log("contact.id :", contact);
    this._router.navigate(['/dashboard/edit/', contact.id]);
  }


  async changeQuery(query: string) {
    console.log(query);
    
    try {
      const contacts = await this._contactsService.searchByQuery(query);
      this.contacts$ = of(contacts)
    } catch (error) {}
  }


}
