import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment';
import { IAuthResponse } from '../interfaces/IauthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.BASE_URL}/api/v1//security/login-direct/${environment.OAUTH_CLIENT_ID}`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<IAuthResponse> {
    // Crear la cookie 
    const jsessionId = "94e07058-2239-4626-ba5d-0b88b975f280";
    // Crear la cookie JSESSIONID antes de enviar la solicitud
    document.cookie = `JSESSIONID=${jsessionId}; path=/; Secure; SameSite=None;`;

    // headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Cookie': `JSESSIONID=${this.getCookie('JSESSIONID')}`
    });

    return this.http.post<IAuthResponse>(this.url, { email, pwd: password }, { headers }).pipe(
      tap((response) => {
        localStorage.setItem('accessToken', response.token.access_token);
        localStorage.setItem('userToken', response.userToken.token);
      })
    );
  }

  // Función para obtener el valor de una cookie
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
