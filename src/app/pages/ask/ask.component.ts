import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'hn-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = true;
  postsSubscription: Subscription;
  postsLoadingSubject: Subscription;
  constructor(
    private _dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    this.postsSubscription = this._dataService.postsSubject
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        }
      );
    this.postsLoadingSubject = this._dataService.postsLoadingSubject
      .subscribe(
        (isLoading: boolean) => {
          this.isLoading = isLoading;
        }
      );
    this._dataService.getPosts('ask');
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.postsLoadingSubject.unsubscribe();
  }
}
