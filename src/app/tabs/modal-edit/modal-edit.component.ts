import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../../product.service'; // Ajusta la ruta si es necesario
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() item: any;
  product: any = {};
  formGroup!: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private productService: ProductService // Inyectar el servicio
  ) { }

  ngOnInit(): void {
    if (this.item) {
      this.product = { ...this.item }; // Clonar el objeto para evitar mutaciones no deseadas
      this.isFormValid();
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.product, 'confirm');
  }

  isFormValid() {
    return this.product.id && this.product.name && this.product.description && this.product.price > 0 &&
           this.product.amount >= 1 && this.product.status !== undefined &&
           this.product.category && this.product.code;
  }

  async save() {
      try {
        // Construir el objeto de solicitud en el formato correcto
        const request = {
          id: this.product._id, // Asegúrate de que el campo id esté presente
          name: this.product.name,
          code: this.product.code,
          description: this.product.description,
          category: this.product.category,
          price: this.product.price, // Asegúrate de que el precio esté en el formato adecuado
          amount: this.product.amount,
          status: this.product.status
        };

        console.log('Enviando solicitud con datos:', request);

        // Llamar al servicio para actualizar el producto
        await this.productService.editProducts(request).toPromise();
        
        // Confirmar y cerrar el modal
        this.confirm();
      } catch (error) {
        console.error('Error al guardar el producto:', error);
      }
    }
  }

