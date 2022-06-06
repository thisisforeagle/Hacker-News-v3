import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/models';
import { faThumbsUp, faUser, faClock, faMessage, faAt, faShareNodes, faStar } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'hn-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: IPost;

  faThumbsUp = faThumbsUp;
  faUser = faUser;
  faClock = faClock;
  faMessage = faMessage;
  faAt = faAt;
  faShareNodes = faShareNodes;
  faStar = faStar;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
  }

  openPost() {
    if (this.post.url) {
      window.open(this.post.url);
    } else {
      this.router.navigate(['/post', this.router.url.split('/')[1], this.post.id]);
    }
  }

  openUser() {
    this.router.navigate(['/user', this.post.by]);
  }

  showError() {
    throw new Error("This feature is not available yet.");
  }
}
