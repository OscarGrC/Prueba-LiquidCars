import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IExpediente } from '../interfaces/IExpediente';
import { IFichero } from '../interfaces/IFichero';
import { IEstadoDoc } from '../interfaces/IEstadoDoc';
import { ICuota } from '../interfaces/ICuota';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  constructor(private http: HttpClient) { }


  private getAuthHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('accessToken');
    const userToken = localStorage.getItem('userToken') || "invalid";
    const jsessionId = this.getCookie('JSESSIONID');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'X-LC-TOKEN': userToken,
    });
    if (jsessionId) {
      headers.append('Cookie', `JSESSIONID=${jsessionId}`);
    }
    return headers;
  }
  // Obtener mis datos
  getMyData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${environment.BASE_URL}/externalClient/v1/dpm/users/me`, { headers });
  }

  // Buscar expediente
  getExpediente(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<IExpediente>(`${environment.BASE_URL}/externalClient/v1/dpm/records/search`, { headers });

  }

  // Obtener fichero
  getFichero(id: string): Observable<IFichero> {
    const headers = this.getAuthHeaders();
    return this.http.get<IFichero>(`${environment.BASE_URL}/externalClient/v1/dpm/records/${id}/documents`, { headers });
  }

  // Obtener estado del documento
  getEstadoDoc(id: string): Observable<IEstadoDoc> {
    const headers = this.getAuthHeaders();
    return this.http.get<IEstadoDoc>(`${environment.BASE_URL}/externalClient/v1/dpm/records/${id}/status`, { headers });
  }

  // Obtener cuota
  getCuota(id: string): Observable<ICuota> {
    const headers = this.getAuthHeaders();
    return this.http.get<ICuota>(`${environment.BASE_URL}/externalClient/v1/tenants/features/usage`, { headers });
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

}
