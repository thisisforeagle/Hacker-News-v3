import { Component, Input, OnInit } from '@angular/core';
import { IComment, IPost } from 'src/app/interfaces/models';
import { faChevronLeft, faUser, faClock, faThumbsUp, faMessage, faBan } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'hn-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: IComment;
  @Input() isReply: boolean = false;
  @Input() threadDepth: number = 0;

  faChevronLeft = faChevronLeft;
  faUser = faUser;
  faClock = faClock;
  faThumbsUp = faThumbsUp;
  faMessage = faMessage;
  faBan = faBan;
  replies: any = [];
  isLoading: boolean;

  commentThreadColours: string[] = [
    '#FF1800', // red
    '#FFAB21', // orange
    '#ECD300', // yellow
    '#00FF04', // green
    '#00FFFB', // teal
    '#0051FF', // blue
    '#8F60FB', // purple
    '#FF2AE8' // pink
  ]

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    console.log(this.comment);
    this.getComments();
  }
  getCommentCountText() {
    let commentCountText = '';
    const commentCount = this.comment?.kids?.length;
    try {
      if (commentCount === 1) {
        commentCountText = commentCount + ' reply';
      } else {
        commentCountText = (commentCount || '0') + ' replies';
      }
    } catch (error) {
      console.log('Comment count error');
    }
    return commentCountText
  }
  getComments() {
    try {
      this.comment.kids.forEach(comment => {
        this._dataService.getPost(comment).subscribe(comment => {
          this.replies.push(comment);
        });
      });
    } catch (error) {
      this.isLoading = false;
    }
  }
  getBorderColour() {
    let color = '#226efd';
    if (this.isReply) {
      color = this.commentThreadColours[this.threadDepth]
    }
    return `3px solid ${ color }`;
  }
}
