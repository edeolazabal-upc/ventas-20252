import { Injectable } from '@angular/core';
import { VentaResumen } from '../model/venta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

private baseUrl = 'https://ventas-backend-hvj4.onrender.com/api/ventas';

constructor(private http: HttpClient) {}

// Datos resumidos enviados por backend
getVentaResumen(): Observable<VentaResumen[]> {
    return this.http.get<VentaResumen[]>(`${this.baseUrl}/totales`);
  } 
}

