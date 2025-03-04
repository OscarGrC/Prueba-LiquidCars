import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$!: WebSocketSubject<any>;
  private socketUrl: string = 'lc-ws';

  constructor() { }

  connect(locale: string = 'es'): void {
    if (this.socket$) {
      this.socket$.complete();
    }

    this.socket$ = new WebSocketSubject({
      url: this.socketUrl,
      deserializer: (msg) => msg.data,
    });
    const connectMessage = {
      userId: this.getCookie("JSESSIONID"),
      messageType: "Connect",
      properties: { locale: locale }
    };
    this.socket$.next(connectMessage);
    console.log("WebSocket Connect")
  }

  subscribeToMessages(): Observable<any> {
    console.log(this.socket$)
    return this.socket$;
  }

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  disconnect(): void {
    this.socket$.complete();
  }
  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
  }
}
