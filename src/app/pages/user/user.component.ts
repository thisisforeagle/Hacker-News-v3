import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faChevronLeft, faUser, faClock, faThumbsUp, faMessage } from '@fortawesome/free-solid-svg-icons';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'hn-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  id: number;
  user: any;

  faChevronLeft = faChevronLeft;
  faUser = faUser;
  faClock = faClock;
  faThumbsUp = faThumbsUp;
  faMessage = faMessage;
  posts: any = [];
  comments: any = [];

  constructor(
    private route: ActivatedRoute,
    private _dataService: DataService,
  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"]
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._dataService.getUser(this.id).subscribe(user => {
      this.user = user;
      this.getSubmissions();
    })
  }
  getSubmissions() {
    this.user.submitted.forEach(submission => {
      this._dataService.getPost(submission).subscribe(item => {
        if (item['type'] === 'story') {
          item['image'] = `https://picsum.photos/200?random&t=${ Math.random() }`
          this.posts.push(item);
        }
        if (item['type'] === 'comments') {
          this.posts.push(item);
        }
      });
    })
  }
  showError() {
    throw new Error('Pagination not enabled on user page yet');
  }
  loadMoreCommentsButton() {
    return this.comments.length > 0 && this.comments.length > 10;
  }
  loadMorePostsButton() {
    return this.posts.length > 0 && this.posts.length > 10;
  }
}
