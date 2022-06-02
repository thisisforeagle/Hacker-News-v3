import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCalendar, faCode } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'hn-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faCalendar = faCalendar;
  faCode = faCode;
  activeURL: string = '/';

  constructor(
    private router: Router
  ) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.activeURL = event['urlAfterRedirects']
      });
  }

  ngOnInit(): void {
  }

  isActive(page) {
    return this.activeURL === page;
  }

}
