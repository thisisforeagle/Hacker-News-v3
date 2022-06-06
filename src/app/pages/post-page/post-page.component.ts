import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { faChevronLeft, faUser, faClock, faThumbsUp, faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hn-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  id: number = 0;
  post: any;
  category: string = '';
  comments: any = [];
  isLoading: boolean = true;

  faChevronLeft = faChevronLeft;
  faUser = faUser;
  faClock = faClock;
  faThumbsUp = faThumbsUp;
  faMessage = faMessage;

  sortChoices: string[] = [
    'Sort by time posted',
    'Sort by number of replies',
  ]

  constructor(
    private route: ActivatedRoute,
    private _dataService: DataService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"]
      this.category = params["category"]
    });
  }

  ngOnInit(): void {
    this.getPost();
  }
  getPost() {
    this._dataService.getPost(this.id).subscribe(post => {
      this.post = post;
      setTimeout(() => {
        this.isLoading = false;
        this.getComments();
      }, 15 * this.post?.kids?.length);
    });
    // uncomment to demo global error service
    // throw new Error("Testing error service");
  }
  getComments() {
    try {
      this.post.kids.forEach(comment => {
        this._dataService.getPost(comment).subscribe(comment => {
          this.comments.push(comment);
          if (comment['kids']) {
            // comment contains replies
          } else {
            // comments contains no replies
            // create empty array for comment count text
            comment['kids'] = []
          }
        });
      });
    } catch (error) {
      this.isLoading = false;
    }
  }
  back() {
    this.router.navigate(['/' + this.category]);
  }
  sortPosts(event) {
    let results = [];
    switch (event) {
      case 'Sort by time posted':
        results = this.comments.sort((a, b) => (a.time > b.time) ? 1 : -1).reverse()
        break;
      case 'Sort by number of replies':
        results = this.comments.sort((a, b) => (a.kids > b.kids) ? 1 : -1).reverse()
        break;
      default:
        break;
    }
    this.comments = results;
  }
}
