import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'hn-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobs: Post[] = [];
  postsSubscription: Subscription;
  postsLoadingSubject: Subscription;
  isLoading: boolean;
  constructor(
    private _dataService: DataService
  ) { }

  async ngOnInit(): Promise<void> {
    this.postsSubscription = this._dataService.postsSubject
      .subscribe(
        (jobs: Post[]) => {
          console.log('Updated list: ', jobs);
          this.jobs = jobs;
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

}
