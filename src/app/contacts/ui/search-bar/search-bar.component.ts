import { Component, EventEmitter, Output, computed, effect } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IconPlus } from '../../../shared/ui/icons/plus';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    IconPlus, 
    ReactiveFormsModule, 
    RouterLink
  ],
  templateUrl: './search-bar.component.html',
})
export class SearchBarComponent {
  @Output() changeQuery = new EventEmitter<string>();

  control = new FormControl('')

  query = toSignal(
    this.control.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
  )

  newQuery = computed(() => this.query())

  constructor() {
    effect(() => {
      this.changeQuery.emit(this.newQuery()!)
    })
  }


}
