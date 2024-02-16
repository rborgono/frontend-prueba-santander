import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-update-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './create-update-product.component.html',
  styleUrl: './create-update-product.component.css'
})
export class CreateUpdateProductComponent implements OnInit{
  
  id!: string;
  isAddMode!: boolean;
  form!: FormGroup;
  productUpdated: boolean = false;
  productCreated: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: '',
      price: '',
      description: '',
      mail: '',
      fecha: ''
    });

    if(!this.isAddMode){
      this.productService
          .getProductById(this.id)
          .subscribe(resp => {
            this.form.patchValue((resp as any).product)
          });
    }
  }

  onSubmit() {
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  createProduct(){
    this.productService.createProduct(this.form.value)
        .subscribe((resp) => {
          this.productCreated = true;
          setTimeout(() => {
            this.router.navigate(['../list-products'], { relativeTo: this.route });
          }, 2000);
        })
  }

  updateProduct(){
    this.productService.updateProduct(this.id, this.form.value)
        .subscribe((resp) => {
          this.productUpdated = true;
          setTimeout(() => {
            this.router.navigate(['../../list-products'], { relativeTo: this.route });
          }, 2000);
        });
  }

  volver(){
    const path = this.isAddMode ? '../list-products' : '../../list-products';
    this.router.navigate([path], { relativeTo: this.route });
  }

}
