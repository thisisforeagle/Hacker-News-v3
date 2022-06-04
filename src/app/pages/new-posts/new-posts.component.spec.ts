import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPost } from 'src/app/interfaces/post';
import { DataService } from 'src/app/services/data.service';

import { NewPostsComponent } from './new-posts.component';

describe('NewPostsComponent', () => {
  let service: DataService;
  let component: NewPostsComponent;
  let fixture: ComponentFixture<NewPostsComponent>;
  let httpController: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPostsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(NewPostsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Subjects', () => {
    const isLoading = false;
    const mockPostArray: IPost[] = [
      {
        "image": "http://img.com",
        "by": "user1",
        "descendants": 123,
        "id": 123456,
        "kids": [
          654321,
        ],
        "score": 123,
        "text": "This is sample post text",
        "time": 1654138555,
        "title": "Sample title post 1",
        "type": "story"
      },
      {
        "image": "http://img.com",
        "by": "user2",
        "descendants": 345,
        "id": 789101112,
        "kids": [
          1098765,
        ],
        "score": 321,
        "text": "This is sample post text",
        "time": 1654138201,
        "title": "Sample title post 2",
        "type": "story"
      }
    ]

    it('should change isLoading in component', (done) => {
      expect(component.isLoading).toBe(true);
      service.postsLoadingSubject.next(false)
      service.postsLoadingSubject.subscribe((isLoading) => {
        expect(isLoading).toBe(false);
        done();
      })
    });
    it('should change posts array in component', (done) => {
      expect(component.posts).toEqual([]);
      service.postsSubject.next(mockPostArray)
      service.postsSubject.subscribe((posts) => {
        expect(posts).toEqual(mockPostArray);
        done();
      })
    });
  });
});
