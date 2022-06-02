import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { faThumbsUp, faUser, faClock, faMessage, faAt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'hn-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  faThumbsUp = faThumbsUp;
  faUser = faUser;
  faClock = faClock;
  faMessage = faMessage;
  faAt = faAt;

  constructor() { }

  ngOnInit(): void {
  }

}
