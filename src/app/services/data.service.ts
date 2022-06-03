import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../app.constants';
import { IPost } from '../interfaces/post';
import { BehaviorSubject, firstValueFrom, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(
    private _http: HttpClient
  ) { }

  public HNGet(type: string) {
    this.currentPage = 1;
    return this._http
      .get(`${ BASE_URL }${ type }stories.json`);
  }

  public async getPosts(type: string): Promise<void> {
    this.postsLoadingSubject.next(true);

    this.resetCounts();

    const get = this.HNGet(type)
    this.postIDs = await firstValueFrom(get);
    this.loadPosts();

    setTimeout(() => {
      this.postsLoadingSubject.next(false);
    }, 750);
  }
  private getPost(id: any): Observable<Object> {
    return this._http
      .get(`${ BASE_URL }item/${ id }.json`);
  }

  public loadPosts() {
    console.log('Loading posts from IDs');

    const postsList: number[] = [];
    this.morePostsAvailable = this.nextPostIndex + 10 <= this.postIDs.length;
    if (this.morePostsAvailable || this.fetchedPosts.length === 0) {
      for (let i = this.nextPostIndex; i < this.nextPostIndex + 10; i++) {
        const nextPost: any = this.getPost(this.postIDs[i]);
        postsList.push(nextPost);
        console.log(this.postIDs[i]);
      }
      this.loading = true;
      forkJoin(postsList).subscribe(
        (morePosts: any) => {
          morePosts.forEach(post => {
            if (post) {
              post.image = `https://picsum.photos/200?random&t=${ Math.random() }`
            }
          })
          this.fetchedPosts = [...this.fetchedPosts, ...morePosts];
          this.loading = false;
          this.nextPostIndex = this.nextPostIndex + 10;
          this.postsSubject.next(this.fetchedPosts.slice((this.currentPage - 1) * 10, this.currentPage * 10));
        },
        () => {
          this.loading = false;
        }
      );
    }
    this.postsLoadingSubject.next(false);
  }

  public nextPage() {
    this.postsLoadingSubject.next(true);
    this.currentPage++;
    this.loadPosts();
  }
  public previousPage() {
    this.postsLoadingSubject.next(true);
    this.currentPage--;
    this.loadPosts();
  }

  public resetCounts() {
    this.postsSubject.next([]);
    this.fetchedPosts = [];
    this.postIDs = [];
    this.nextPostIndex = 0;
    this.morePostsAvailable = false;
  }
}
