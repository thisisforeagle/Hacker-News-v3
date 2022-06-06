import { TestBed } from '@angular/core/testing';
import { UrlRootPipe } from './url-root.pipe';

describe('UrlRootPipe', () => {
  let pipe: UrlRootPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [UrlRootPipe] });
    pipe = TestBed.inject(UrlRootPipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms full URL to root URL', () => {
    const value: any = 'https://www.google.com/';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('www.google.com');
  });
});
