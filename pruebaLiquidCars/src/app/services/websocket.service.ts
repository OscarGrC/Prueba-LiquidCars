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
    /*
    17	asimovguy@gmail.com	Candidate_asimovguy@gmail.com_1		
    18	asimovguy@gmail.com	Candidate_asimovguy@gmail.com_2		
    19	asimovguy@gmail.com	Candidate_asimovguy@gmail.com_3		
    20	asimovguy@gmail.com	Candidate_asimovguy@gmail.com_4		
    21	asimovguy@gmail.com	Candidate_asimovguy@gmail.com_5*/
    const connectMessage = {
      userId: 17, //esto va con otro id 
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

}
