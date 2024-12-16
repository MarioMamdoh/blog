import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { CommentFormComponent } from '../../comments/comment-form/comment-form.component';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [
    PostCardComponent,
    CommentFormComponent,
    CommentListComponent,
    SubscriptionFormComponent,
    DatePipe,
  ],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss',
})
export class SinglePostComponent implements OnInit {
  postService = inject(PostService);
  router = inject(ActivatedRoute);
  postData: any;
  postSimilar: any;
  ngOnInit(): void {
    this.router.params.subscribe((val) => {
      this.postService.countViews(val['id']);
      this.postService.getOnePost(`${val['id']}`).subscribe((val) => {
        this.postData = val;
        this.loadSimilarPost(this.postData.category.id);
      });
    });
  }
  loadSimilarPost(catId: string) {
    this.postService.getSimilar(catId).subscribe((val) => {
      this.postSimilar = val;
    });
  }
}
