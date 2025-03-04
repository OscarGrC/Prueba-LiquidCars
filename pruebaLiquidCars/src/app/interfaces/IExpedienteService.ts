import { Observable } from 'rxjs';
import { IExpedienteResponse } from './IExpediente';
import { IFichero } from '../interfaces/IFichero';
import { IEstadoDoc } from '../interfaces/IEstadoDoc';
import { ICuotaInput } from '../interfaces/ICuotaInput';

export interface IExpedienteService {
    getMyData(): Observable<any>;
    getExpediente(id: string): Observable<IExpedienteResponse>;
    getFichero(id: string): Observable<IFichero[]>;
    getEstadoDoc(id: string): Observable<IEstadoDoc>;
    getCuota(id: string): Observable<ICuotaInput[]>;
    uploadFile(documentId: string, file: File): Observable<any>;
}

