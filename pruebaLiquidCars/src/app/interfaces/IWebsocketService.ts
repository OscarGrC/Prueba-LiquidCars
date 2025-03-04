import { Observable } from 'rxjs';

export interface IWebSocketService {
    connect(locale?: string): void;
    subscribeToMessages(): Observable<any>;
    sendMessage(message: any): void;
    disconnect(): void;
}
