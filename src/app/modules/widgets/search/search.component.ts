import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounce, timer } from 'rxjs';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input('label') label?: string;
  @Input('placeholder') placeholder: string = '';

  @Output('searchChange') searchTextChanged = new EventEmitter();

  searchInput: FormControl = new FormControl('', []);

  constructor() {}

  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounce(() => timer(500)))
      .subscribe((text: string) => {
        this.searchTextChanged.emit(text);
      });
  }

  resetSearch() {
    this.searchInput.reset();
  }
}
