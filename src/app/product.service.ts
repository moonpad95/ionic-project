import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url='http://localhost:5000/api/product' //ruta que se usara para el backend

  constructor(private http:HttpClient) { }

  getProducts():Observable<any[]>{
    return this.http.get<any[]>(this.url)
  }
  editProducts(product: any): Observable<any> { 
    return this.http.patch<any>(this.url, product);
  }
  addProduct(product: any):Observable<any>{
    return this.http.post<any>(this.url,product)
  }
  deleteProduct(id:string):Observable<any>{
    return this.http.delete<any>(this.url+'/'+id)
  }

}
