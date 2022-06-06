import { TestBed } from '@angular/core/testing';
import { TimeStampPipe } from './time-stamp.pipe';

describe('TimeStampPipe', () => {
  let pipe: TimeStampPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TimeStampPipe] });
    pipe = TestBed.inject(TimeStampPipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms unix timestamp to date', () => {
    const value: number = 1654524024;
    const date: Date = new Date(1654524024 * 1000)
    expect(pipe.transform(value)).toEqual(date);
  });
});
