import { Observable } from "rxjs";

export interface IAuthService {
    login(email: string, password: string): Observable<any>;
}
