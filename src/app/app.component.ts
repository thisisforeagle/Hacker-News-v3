import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isPostPage: boolean = false;
  isUserPage: boolean = false;
  sortChoices: string[] = [
    'Sort by time posted',
    'Sort by number likes',
    'Sort by number of replies',
  ]
  title = 'hacker-news-v3';
  activeURL: string = '';

  constructor(
    private router: Router,
    private _dataService: DataService
  ) {
    this.watchRouteChanges();
  }
  watchRouteChanges() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.activeURL = this.router.url;
        this.isPostPage = this.router.url.indexOf('/post/') > -1
        this.isUserPage = this.router.url.indexOf('/user/') > -1
      }
    });
  }
  sortPosts(event) {
    console.log(event);
    this._dataService.sortPosts(event);
  }
}
