import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PostCardComponent, SubscriptionFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  postService = inject(PostService);
  postsData: any;
  lastestPost: any;
  ngOnInit(): void {
    this.postService.getData().subscribe((val) => {
      this.postsData = val;
    });
    this.postService.getLastestPosts().subscribe((val) => {
      this.lastestPost = val;
    });
  }
}
