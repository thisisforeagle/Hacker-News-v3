import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPost } from 'src/app/interfaces/models';
import { DataService } from 'src/app/services/data.service';

import { JobsComponent } from './jobs.component';

describe('ShowComponent', () => {
  let service: DataService;
  let component: JobsComponent;
  let fixture: ComponentFixture<JobsComponent>;
  let httpController: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(JobsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  describe('Create', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  })
  describe('Subjects', () => {
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
