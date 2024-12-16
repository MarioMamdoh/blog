import { Component, inject, OnInit } from '@angular/core';
import { CategroyService } from '../../services/categroy.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category-navbar.component.html',
  styleUrl: './category-navbar.component.scss',
})
export class CategoryNavbarComponent implements OnInit {
  categoryService = inject(CategroyService);
  categorys: any;
  ngOnInit(): void {
    this.categoryService.getData().subscribe((val) => {
      this.categorys = val;
    });
  }
}
