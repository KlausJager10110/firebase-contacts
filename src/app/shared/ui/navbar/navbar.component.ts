import { Component } from '@angular/core';
import { IconContact } from '../icons/contact';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [IconContact, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

}
