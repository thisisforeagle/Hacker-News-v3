import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.constants';
import { Post } from '../interfaces/post';
import { BehaviorSubject, firstValueFrom, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  postsSubject = new BehaviorSubject<Post[]>([]);
  postsLoadingSubject = new BehaviorSubject<boolean>(false);

  postIDs: any = [];
  loading: boolean = false;
  fetchedPosts: Post[] = [];
  nextPostIndex = 0;
  morePostsAvailable: boolean = false;

  constructor(
    private _http: HttpClient
  ) { }

  public HNGet(type: string) {
    return this._http
      .get(`${ BASE_URL }${ type }stories.json`);
  }

  public async getPosts(type: string): Promise<void> {
    this.postsLoadingSubject.next(true);

    this.fetchedPosts = [];
    this.postIDs = [];
    const get = this.HNGet(type)
    this.postIDs = await firstValueFrom(get);
    this.loadPosts();

    setTimeout(() => {
      this.postsLoadingSubject.next(false);
    }, 750);
  }
  getPost(id: any): Observable<Object> {
    return this._http
      .get(`${ BASE_URL }item/${ id }.json`);
  }

  loadPosts() {
    console.log('Loading posts from IDs');

    const postsList: number[] = [];
    this.morePostsAvailable = this.nextPostIndex + 10 < this.postIDs.length;
    if (this.morePostsAvailable || this.fetchedPosts.length === 0) {
      for (let i = this.nextPostIndex; i < this.nextPostIndex + 10; i++) {
        const nextPost: any = this.getPost(this.postIDs[i]);
        postsList.push(nextPost);
        console.log(this.postIDs[i]);
      }
      this.loading = true;
      forkJoin(postsList).subscribe(
        (morePosts: any) => {
          this.fetchedPosts = [...this.fetchedPosts, ...morePosts];
          this.loading = false;
          this.nextPostIndex = this.nextPostIndex + 10;
          this.postsSubject.next(this.fetchedPosts);
        },
        () => {
          this.loading = false;
        }
      );
    }
    this.postsLoadingSubject.next(false);
  }
}
