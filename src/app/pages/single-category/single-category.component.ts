import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../layouts/post-card/post-card.component';
import { SubscriptionFormComponent } from '../../subscription-form/subscription-form.component';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-category',
  standalone: true,
  imports: [PostCardComponent, SubscriptionFormComponent],
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.scss',
})
export class SingleCategoryComponent implements OnInit {
  postService = inject(PostService);
  router = inject(ActivatedRoute);
  categoryPosts: any;
  categoryName: string = '';
  ngOnInit(): void {
    this.router.params.subscribe((val) => {
      this.categoryName = val['category'];
      this.postService.getCategoryPost(` ${val['id']}`).subscribe((val) => {
        this.categoryPosts = val;
      });
    });
  }
}
