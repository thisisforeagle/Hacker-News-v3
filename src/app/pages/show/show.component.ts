import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'hn-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  posts: Post[] = [];
  postsSubscription: Subscription;
  postsLoadingSubject: Subscription;
  isLoading: boolean;
  constructor(
    private _dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    this.postsSubscription = this._dataService.postsSubject
      .subscribe(
        (posts: Post[]) => {
          console.log('Updated list: ', posts);
          this.posts = posts;
        }
      );
    this.postsLoadingSubject = this._dataService.postsLoadingSubject
      .subscribe(
        (isLoading: boolean) => {
          this.isLoading = isLoading;
        }
      );
    this._dataService.getPosts('show');
  }

}
