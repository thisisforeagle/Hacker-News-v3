import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostsComponent } from './new-posts.component';

describe('NewPostsComponent', () => {
  let component: NewPostsComponent;
  let fixture: ComponentFixture<NewPostsComponent>;
  let httpController: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPostsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
