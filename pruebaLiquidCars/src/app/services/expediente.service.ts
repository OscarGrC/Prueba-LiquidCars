import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { IExpediente, IExpedienteResponse } from '../interfaces/IExpediente';
import { IFichero } from '../interfaces/IFichero';
import { IEstadoDoc } from '../interfaces/IEstadoDoc';
import { ICuotaInput } from '../interfaces/ICuotaInput';

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

  getMyData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${environment.BASE_URL}/externalClient/v1/dpm/users/me`, { headers });
  }

  getExpediente(id: string): Observable<IExpedienteResponse> {
    const headers = this.getAuthHeaders();
    const body = {
      textSearch: id,
      engagement: null,
      creation: null,
      lastUpdate: null,
      closure: null,
      statuses: null,
      processTypes: null,
      visibility: null,
      sortBy: "DT_ENGAGEMENT_ASC"
    };

    return this.http.post<IExpedienteResponse>(`${environment.BASE_URL}/externalClient/v1/dpm/records/search`, body, { headers });
  }

  getFichero(id: string): Observable<IFichero[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<IFichero[]>(`${environment.BASE_URL}/externalClient/v1/dpm/records/${id}/documents`, { headers });
  }

  getEstadoDoc(id: string): Observable<IEstadoDoc> {
    const headers = this.getAuthHeaders();
    return this.http.get<IEstadoDoc>(`${environment.BASE_URL}/externalClient/v1/dpm/records/documents/${id}/status`, { headers });
  }

  getCuota(id: string): Observable<ICuotaInput[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<ICuotaInput[]>(`${environment.BASE_URL}/externalClient/v1/tenants/features/usage`, { headers });
  }

  uploadFile(documentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${environment.BASE_URL}/externalClient/v1/dpm/records/documents/${documentId}/file`, formData, { headers });
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }

}
