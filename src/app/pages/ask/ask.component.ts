import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/interfaces/models';
import { DataService } from 'src/app/services/data.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'hn-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        query('.hn-post-item', style({ opacity: 0, transform: 'translateY(-100%)' })),
        query('.hn-post-item',
          stagger('100ms', [
            animate('100ms', style({ opacity: 1, transform: 'translateY(0)' }))
          ]))
      ])
    ])
  ]
})
export class AskComponent implements OnInit {
  posts: IPost[] = [];
  postsSubscription: Subscription;
  postsLoadingSubject: Subscription;
  isLoading: boolean = true;

  constructor(
    private _dataService: DataService,
    private _errorService: ErrorService
  ) { }

  async ngOnInit(): Promise<void> {
    this._dataService.getPosts('ask');

    this.postsSubscription = this._dataService.postsSubject
      .subscribe(
        (posts: IPost[]) => {
          if (posts?.length > 0) {
            this.posts = posts;
            console.log(posts);
          }
        }
      );
    this.postsLoadingSubject = this._dataService.postsLoadingSubject
      .subscribe(
        (isLoading: boolean) => {
          this.isLoading = isLoading;
        }
      );
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.postsLoadingSubject.unsubscribe();
  }

}
