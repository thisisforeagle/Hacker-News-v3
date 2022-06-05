import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from 'src/app/interfaces/post';
import { DataService } from 'src/app/services/data.service';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hn-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  postsSubscription: Subscription;
  postsLoadingSubject: Subscription;
  posts: IPost[] = [];
  activePostCount: number = 0;
  totalPostCount: number = 0;
  isLoading: boolean = true;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  currentPage: number = 1;

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this.postsSubscription = this._dataService.postsSubject
      .subscribe(
        (posts: IPost[]) => {
          if (posts?.length > 0) {
            this.posts = [];
            setTimeout(() => {
              this.posts = posts;
              console.log(posts);
              this.currentPage = this._dataService.currentPage;
              this.activePostCount = this._dataService.nextPostIndex;
              this.totalPostCount = this._dataService.postIDs.length;
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

  nextPage() {
    this._dataService.nextPage();
  }
  previousPage() {
    this._dataService.previousPage();
  }
  hasPosts() {
    return this.posts?.length > 0
  }
  getPageMaxCount() {
    let count = 0;
    if ((this.currentPage * 10) > this.totalPostCount) {
      count = this.totalPostCount
    } else {
      count = this.currentPage * 10;
    }
    return count;
  }

}
