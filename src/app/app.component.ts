import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isPostPage: boolean = false;

  constructor(
    private router: Router
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isPostPage = this.router.url.indexOf('/post/') > -1
      }
    });
  }
  title = 'hacker-news-v3';
}
