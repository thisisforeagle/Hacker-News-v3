import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hn-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Input() sortChoices: string[];
  @Input() sortType: string;
  @Output() chosenSort = new EventEmitter<string>();

  selectedSort: string = '';

  constructor() { }

  ngOnInit(): void {

  }

  sortPosts() {
    console.log('Sorting');
    this.chosenSort.emit(this.selectedSort);
  }

}
