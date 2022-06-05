import { TestBed } from '@angular/core/testing';
import { Injector } from '@angular/core';
import { ErrorService } from './error.service';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

describe('ErrorService', () => {
  let errorService: ErrorService;
  let toastrService: jasmine.SpyObj<ToastrService>
  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    await TestBed.configureTestingModule({
      imports: [CommonModule, ToastrModule.forRoot()],
      declarations: [],
      providers: [
        ErrorService,
        { provide: ToastrService, useValue: toastrService }],
    }).compileComponents();
    errorService = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(ErrorService).toBeTruthy();
  });

  it('should call ToastService method when handleError method is called', () => {
    errorService.handleError('Error text');
    expect(toastrService.error).toHaveBeenCalledWith('Error text');
  });
});
