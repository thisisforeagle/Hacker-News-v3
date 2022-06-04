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
  category: string;
  comments: any = [];
  isLoading: boolean = true;

  faChevronLeft = faChevronLeft;
  faUser = faUser;
  faClock = faClock;
  faThumbsUp = faThumbsUp;
  faMessage = faMessage;

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
      this.getComments();
    });
  }
  getComments() {
    try {
      this.post.kids.forEach(comment => {
        this._dataService.getPost(comment).subscribe(comment => {
          this.comments.push(comment);
        });
      });
    } catch (error) {
      this.isLoading = false;
    }
  }
  back() {
    this.router.navigate(['/' + this.category]);
  }
}