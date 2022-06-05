import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.constants';
import { IPost } from '../interfaces/post';
import { BehaviorSubject, firstValueFrom, forkJoin, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  postsSubject = new BehaviorSubject<IPost[]>([]);
  postsLoadingSubject = new BehaviorSubject<boolean>(false);

  postIDs: any = [];
  loading: boolean = false;
  fetchedPosts: IPost[] = [];
  nextPostIndex = 0;
  morePostsAvailable: boolean = false;
  currentPage: number = 1;
  postsList: number[];

  constructor(
    private _http: HttpClient,
    private _errorService: ErrorService
  ) { }

  public HNGet(type: string): Observable<Object> {
    this.currentPage = 1;
    return this._http
      .get(`${ BASE_URL }${ type }stories.json`);
  }

  public async getPosts(type: string): Promise<void> {
    this.postsLoadingSubject.next(true);

    this.resetCounts();

    this.HNGet(type)
      .subscribe(ids => {
        this.postIDs = ids;
        this.loadPosts();
      });

    setTimeout(() => {
      this.postsLoadingSubject.next(false);
    }, 750);

  }
  public getPost(id: number): Observable<Object> {
    return this._http
      .get(`${ BASE_URL }item/${ id }.json`);
  }

  public loadPosts(direction?: string) {

    if (direction === 'next') {
      this.nextPostIndex += 10
    } else if (direction === 'previous') {
      this.nextPostIndex -= 10
    }

    this.postsList = [];
    this.fetchedPosts = [];

    this.morePostsAvailable = this.nextPostIndex <= this.postIDs.length;

    if (this.morePostsAvailable || this.fetchedPosts.length === 0) {
      this.getTenPosts()
      this.loading = true;
      forkJoin(this.postsList)
        .subscribe(
          (posts: any) => {
            posts.forEach(post => {
              if (post) {
                post.image = `https://picsum.photos/200?random&t=${ Math.random() }`
              }
            })
            this.fetchedPosts = [...posts];
            this.loading = false;
            this.postsSubject.next(this.fetchedPosts);
          }
        );
    }
    this.postsLoadingSubject.next(false);

  }

  getTenPosts() {
    for (let i = this.nextPostIndex; i < this.nextPostIndex + 10; i++) {
      if (this.postIDs[i]) {
        const nextPost: any = this.getPost(this.postIDs[i]);
        this.postsList.push(nextPost);
      }
    }
  }

  public nextPage() {
    this.postsLoadingSubject.next(true);
    this.currentPage++;
    this.loadPosts('next');
  }
  public previousPage() {
    this.postsLoadingSubject.next(true);
    this.currentPage--;
    this.loadPosts('previous');
  }

  public resetCounts() {
    this.postsSubject.next([]);
    this.fetchedPosts = [];
    this.postIDs = [];
    this.nextPostIndex = 0;
    this.morePostsAvailable = false;
  }
}
