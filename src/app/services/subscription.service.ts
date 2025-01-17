import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  apiUrl = `${environment.apiUrl}/Subscription`;

  constructor(private http: HttpClient) {

  }

  planoSelecionado: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  setPlano(plano: any) {
    this.planoSelecionado.next(plano);
  }

  getPlano(): any {
    return this.planoSelecionado.getValue();
  }

  getById(id:string): any{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  getAll(header: HttpHeaders): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl, { headers: header });
  }

  getDetalhesPlano(id: number, header: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url, { headers: header });
  }

  getSubscriptionStatus(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${id}`);
  }
}
