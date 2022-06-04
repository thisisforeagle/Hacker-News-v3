import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { BASE_URL } from '../app.constants';
import { IPost } from '../interfaces/post';

describe('DataService', () => {
  let service: DataService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpController = TestBed.inject(HttpTestingController);
  });
  describe('Create', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  })
  describe('Posts', () => {
    it('HNGet should fetch post id/s from api', (done) => {
      service.HNGet('ask').subscribe((res) => {
        expect(res).toEqual([123]);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${ BASE_URL }askstories.json`,
      });
      req.flush([123]);
      done();
    });

    it('"getPost" should get post JSON for an id from api', (done) => {
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
      service.getPost(31590724).subscribe((res) => {
        expect(res).toEqual(mockPost);
      });
      const req = httpController.expectOne({
        method: 'GET',
        url: `${ BASE_URL }item/31590724.json`,
      });
      req.flush(mockPost);
      done();
    });
  });
  describe('Pagination', () => {
    it('nextPage should increment page, and call loadPosts', () => {
      spyOn(service, "loadPosts");
      service.currentPage = 1;
      service.nextPage();
      service.postsLoadingSubject.subscribe(subject => {
        expect(subject).toBeTrue;
      })
      expect(service.currentPage).toBe(2);
      expect(service.loadPosts).toHaveBeenCalled();
    })

    it('previousPage should decrement page, and call loadPosts', () => {
      spyOn(service, "loadPosts");
      service.currentPage = 2;
      service.previousPage();
      service.postsLoadingSubject.subscribe(subject => {
        expect(subject).toBeTrue;
      })
      expect(service.currentPage).toBe(1);
      expect(service.loadPosts).toHaveBeenCalled();
    })
  });
  describe('Reset', () => {
    it('resetCounts should reset properties', () => {
      service.resetCounts();
      service.postsSubject.subscribe(subject => {
        expect(subject).toEqual([]);
      })
      expect(service.fetchedPosts).toEqual([]);
      expect(service.postIDs).toEqual([]);
      expect(service.nextPostIndex).toBe(0);
      expect(service.morePostsAvailable).toBe(false);
    })
  });
});
