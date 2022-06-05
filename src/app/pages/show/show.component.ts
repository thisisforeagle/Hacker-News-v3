import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/interfaces/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'hn-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
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
export class ShowComponent implements OnInit {
  posts: IPost[] = [];
  postsSubscription: Subscription;
  postsLoadingSubject: Subscription;
  isLoading: boolean = true;

  currentPage: number = 1;


  constructor(
    private _dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    this._dataService.getPosts('show');
    this.postsSubscription = this._dataService.postsSubject
      .subscribe(
        (posts: IPost[]) => {
          if (posts?.length > 0) {
            this.posts = [];
            setTimeout(() => {
              this.posts = posts;
              console.log(posts);
              this.currentPage = this._dataService.currentPage;
            }, 0);
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
