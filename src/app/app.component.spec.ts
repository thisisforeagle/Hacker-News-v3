// tslint:disable
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let httpController: HttpTestingController;

  const eventSubject = new ReplaySubject<RouterEvent>(1);

  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
    events: eventSubject.asObservable(),
    url: '/post/show/31630610'
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', async () => {
    expect(component).toBeTruthy();
  });

  it('should change isPostPage prop from false to true if URL contains "post"', () => {
    expect(component.isPostPage).toBe(false)
    eventSubject.next(new NavigationEnd(1, '/post/show/31630610', 'redirectUrl'))
    fixture.detectChanges();
    expect(component.isPostPage).toBe(true)
  });

});
