import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostComponent } from './post.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimeStampPipe } from '../../pipes/time-stamp.pipe';
describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [PostComponent, TimeStampPipe],
    });
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('can create', () => {
    expect(component).toBeTruthy();
  });
});
