import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCalendar, faCode } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/error.service';

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
    private router: Router,
    private _errorService: ErrorService
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
  showError(text) {
    this._errorService.error(text + ' is not available yet!');
  }
}
