import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    const currentPage = 5;

    TestBed.configureTestingModule({
      imports: [],
      declarations: [component],
      providers: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(PaginationComponent);
      component = fixture.componentInstance;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrement current page when previous page button clicked', fakeAsync(() => {
    spyOn(component, 'previousPage');
    let button = fixture.debugElement.nativeElement.querySelector('previous-page');
    button.click();
    tick();
    expect(component.previousPage).toHaveBeenCalled();
    expect(component.currentPage).toBe(4);
  }));


  it('should increment current page when next page button clicked', fakeAsync(() => {
    spyOn(component, 'nextPage');
    let button = fixture.debugElement.nativeElement.querySelector('next-page');
    button.click();
    tick();
    expect(component.nextPage).toHaveBeenCalled();
    expect(component.currentPage).toBe(6);
  }));
});
