import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataService } from 'src/app/services/data.service';
import { PaginationComponent } from './pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IPost } from 'src/app/interfaces/models';

describe('PaginationComponent', () => {
  let service: DataService;
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  const mockPost: IPost = {
    "image": "http://img.com",
    "by": "pabs3",
    "descendants": 182,
    "id": 31590724,
    "kids": [
      31593424,
    ],
    "score": 167,
    "text": "While there are fewer of them, there are quite a few fully open source, open content games out there, like Thrive, 0ad, Warzone2100, Endless Sky etc.<p>What is your favorite fully open source, open content game?<p>Edit: please vote on the comments people post too. Up if you like, down if you dislike, don&#x27;t vote if you haven&#x27;t played it or are neutral on it.",
    "time": 1654138201,
    "title": "Ask HN: Favourite open source game?",
    "type": "story"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [HttpClientTestingModule, FontAwesomeModule],
    }).compileComponents();
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    component.posts = [mockPost, mockPost];
    fixture.detectChanges();
  });

  describe('Create', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  })

  describe('Previous', () => {
    it('should call service when previous button clicked', () => {
      spyOn(component, 'previousPage').and.callThrough();
      spyOn(service, 'previousPage').and.callThrough();
      component.currentPage = 2;
      service.currentPage = 2;
      fixture.detectChanges();

      let button = fixture.debugElement.nativeElement.querySelector('[data-testid="prev-page"]')
      button.click();
      fixture.detectChanges();

      expect(service.currentPage).toBe(1);
      expect(component.previousPage).toHaveBeenCalled();
      expect(service.previousPage).toHaveBeenCalled();
      service.postsLoadingSubject.subscribe(subject => {
        expect(subject).toBeTrue;
      })
    });

    it('should call service when previous method clicked', () => {
      spyOn(component, 'previousPage').and.callThrough();
      spyOn(service, 'previousPage').and.callThrough();
      component.currentPage = 2;
      service.currentPage = 2;

      component.previousPage();

      expect(component.previousPage).toHaveBeenCalled();
      expect(service.previousPage).toHaveBeenCalled();
      expect(service.currentPage).toBe(1);
      service.postsLoadingSubject.subscribe(subject => {
        expect(subject).toBeTrue;
      })
    });
  })


  describe('Next', () => {
    it('should call service when previous page button clicked', () => {
      spyOn(component, 'nextPage').and.callThrough();
      spyOn(service, 'nextPage').and.callThrough();

      let button = fixture.debugElement.nativeElement.querySelector('[data-testid="next-page"]')
      button.click();
      fixture.detectChanges();
      expect(component.nextPage).toHaveBeenCalled();
      expect(service.nextPage).toHaveBeenCalled();
      expect(service.currentPage).toBe(2);
    });

    it('should call service when previous page method called', () => {
      spyOn(component, 'nextPage').and.callThrough();
      spyOn(service, 'nextPage').and.callThrough();

      component.nextPage();
      fixture.detectChanges();

      expect(component.nextPage).toHaveBeenCalled();
      expect(service.nextPage).toHaveBeenCalled();
      expect(service.currentPage).toBe(2);
      service.postsLoadingSubject.subscribe(subject => {
        expect(subject).toBeTrue;
      })
    });
  });
});
