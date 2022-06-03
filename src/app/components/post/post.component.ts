import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';
import { faThumbsUp, faUser, faClock, faMessage, faAt, faShareNodes, faStar } from '@fortawesome/free-solid-svg-icons';


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

  constructor() { }

  ngOnInit(): void {
  }

}
