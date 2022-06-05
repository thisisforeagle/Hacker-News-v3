import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/post';
import { faChevronLeft, faUser, faClock, faThumbsUp, faMessage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'hn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: IComment;

  faChevronLeft = faChevronLeft;
  faUser = faUser;
  faClock = faClock;
  faThumbsUp = faThumbsUp;
  faMessage = faMessage;

  constructor() { }

  ngOnInit(): void {

  }
  getCommentCountText() {
    try {
      const commentCount = this.comment?.kids?.length;
      let commentCountText = '';
      if (commentCount === 1) {
        commentCountText = commentCount + ' reply';
      } else {
        commentCountText = (commentCount || '0') + ' replies';
      }
    } catch (error) {
      console.log('Comment count error');

    }
  }
}
