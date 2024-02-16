import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './list-products.component.html',
  styles: ''
})
export class ListProductsComponent implements OnInit {

  products: any;
  productDeleted: boolean = false;
  productCouldNotBeDeleted: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe(resp => {
        this.products = (resp as any).products;
      });
  }

  deleteProduct(id: string) {

    this.productService
      .deleteProduct(id)
      .subscribe(resp => {

        if ((resp as any).ok) {

          this.productService
            .getProducts()
            .subscribe(resp => {
              this.products = (resp as any).products;
              this.productDeleted = true;
            });
          setTimeout(() => {
            this.productDeleted = false;
          }, 2000);

        } else {
          
          this.productCouldNotBeDeleted = true;
          setTimeout(() => {
            this.productCouldNotBeDeleted = false;
          }, 2000);

        }
      });
  }

}
