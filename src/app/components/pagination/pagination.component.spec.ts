import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { compileDeclareComponentFromMetadata } from '@angular/compiler';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data.service';
import { PaginationComponent } from './pagination.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

describe('PaginationComponent', () => {
  let service: DataService;
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let httpController: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [HttpClientTestingModule, FontAwesomeModule],
    }).compileComponents();
    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService);
    component.posts.length = 2;
    component.currentPage = 2;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should decrement current page when previous page button clicked', fakeAsync(() => {
    spyOn(component, 'previousPage');
    let icon = fixture.debugElement.query(By.css('#previous-page')).nativeElement
    icon.click();
    tick();
    fixture.detectChanges();
    expect(component.previousPage).toHaveBeenCalled();
  }));


  it('should increment current page when next page button clicked', fakeAsync(() => {
    spyOn(component, 'nextPage');
    let icon = fixture.debugElement.query(By.css('#next-page')).nativeElement
    icon.click();
    tick();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  }));
});
