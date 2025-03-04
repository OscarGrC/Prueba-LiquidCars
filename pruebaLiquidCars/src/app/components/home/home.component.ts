import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpedienteService } from '../../services/expediente.service';
import { IExpediente } from '../../interfaces/IExpediente';
import { IFichero } from '../../interfaces/IFichero';
import { IEstadoDoc } from '../../interfaces/IEstadoDoc';
import { ICuota } from '../../interfaces/ICuota';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  expediente: IExpediente = {
    id: '', lcVarId: '', clazz: '', serializedVarValue: '', object_type: '', recordId: '',
    status: '', processType: '', engagement: '', creation: '', lastUpdate: '', tenantId: '', workflowExternalId: '',
    adminId: '', annotationsCount: 0, clientAdminId: '', participantPayerId: '', personUserId: '', lawyerId: '',
    admin: { countryId: '', },
    client: { id: '', name: '', type: '', tenantId: '', countryId: '', },
    lawyer: { id: '', name: '', type: '', tenantId: '', defaultLanguage: '', },
    user: {
      id: '', name: '', type: '', tenantId: '', countryId: '', email: '', enabled: false,
      familyName: '', fullName: '', hasLogin: false,
    },
    variableMetadata: { typeName: '', simpleName: '', packageName: '', },
    ids: {},
    downpayment: { amount: 0, currency: '', },
    secondPayment: { amount: 0, currency: '', },
    simulationScenario: '',
  };

  fichero: IFichero = {
    id: '', lcVarId: '', object_type: '', recordId: '', status: '', tenantId: '', type: '', userIndication: '',
    valid: false, documentVersion: 0, requested: '', participantOwnerId: '',
    variableMetadata: {
      typeName: '',
      simpleName: '',
      packageName: '',
      interfaceNames: [],
    },
    visibility: {
      id: '',
      tenantId: '',
      admin: false,
      client: false,
      lawyer: false,
      user: false,
    },
  };
  cuota: ICuota = {
    tenantId: '',

    customStorage: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customStorage'
    },

    recordCommunications: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordCommunications'
    },

    recordCreate: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordCreate'
    },

    adminCreateClient: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'adminCreateClient'
    },

    adminCreateLawyer: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'adminCreateLawyer'
    },

    adminCreateAdmin: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'adminCreateAdmin'
    },

    customProcesses: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customProcesses'
    },

    customTemplates: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customTemplates'
    },

    customDocTypes: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customDocTypes'
    },

    adminCreateUser: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'adminCreateUser'
    },

    recordDocs: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordDocs'
    },

    recordView: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordView'
    },

    customEmail: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customEmail'
    },

    customEmailGooglEmail: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customEmailGooglEmail'
    },

    customStorageGoogleDrive: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'customStorageGoogleDrive'
    },

    recordActivities: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordActivities'
    },

    recordLDPS: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordLDPS'
    },

    recordLog: {
      tenantId: '',
      enabled: false,
      maxCount: 0,
      currentCount: 0,
      feature: 'recordLog'
    }
  };

  estadoDoc: IEstadoDoc = { data: '' };
  selectedFile: File | null = null;
  fileError: boolean = false;
  private wsSubscription!: Subscription;

  constructor(private expedienteService: ExpedienteService, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connect()
    this.wsSubscription = this.webSocketService.subscribeToMessages().subscribe(
      (message) => {
        console.log(message);
      },
      (error) => {
        console.error('Error en WebSocket', error);
      }
    );

    this.getMyData();
    this.getExpedienteData();
    this.getFicheroData();
    this.getEstadoDocData();
    this.getCuotaData();
  }
  ngOnDestroy(): void {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
    this.webSocketService.disconnect();
  }
  getMyData(): void {
    this.expedienteService.getMyData().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log('Error al obtener myData:', err);
      }
    })
  }
  getExpedienteData(): void {
    this.expedienteService.getExpediente('RECORD01').subscribe({
      next: (data) => {
        this.expediente = data.data[0];
      },
      error: (err) => {
        console.log('Error al obtener expediente:', err);
      }
    });
  }

  getFicheroData(): void {
    this.expedienteService.getFichero('RECORD01').subscribe({
      next: (data) => {
        this.fichero = data[0];
      },
      error: (err) => {
        console.log('Error al obtener fichero:', err);
      }
    });
  }

  getEstadoDocData(): void {
    this.expedienteService.getEstadoDoc('f2c4f4c6-1116-4ab3-b1c4-151841ec532a').subscribe({
      next: (data) => {
      },
      error: (err) => {
        console.log('Error al obtener estado documento:', err);
      }
    });
  }

  getCuotaData(): void {
    this.expedienteService.getCuota('RECORD01').subscribe({
      next: (data) => {
        const newCuota: ICuota = {
          tenantId: data[0].tenantId,
          customStorage: data[0],
          recordCommunications: data[1],
          recordCreate: data[2],
          adminCreateClient: data[3],
          adminCreateLawyer: data[4],
          adminCreateAdmin: data[5],
          customProcesses: data[6],
          customTemplates: data[7],
          customDocTypes: data[8],
          adminCreateUser: data[9],
          recordDocs: data[10],
          recordView: data[11],
          customEmail: data[12],
          customEmailGooglEmail: data[13],
          customStorageGoogleDrive: data[14],
          recordActivities: data[15],
          recordLDPS: data[16],
          recordLog: data[17]
        };
        this.cuota = newCuota;

      },
      error: (err) => {
        console.log('Error al obtener cuota:', err);
      }
    });
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type === 'text/plain')) {
      this.selectedFile = file;
      this.fileError = false;
    } else {
      this.selectedFile = null;
      this.fileError = true;
    }
  }

  uploadSelectedFile(): void {
    if (this.selectedFile) {
      const documentId = 'f2c4f4c6-1116-4ab3-b1c4-151841ec532a';  // ID del documento
      this.expedienteService.uploadFile(documentId, this.selectedFile).subscribe({
        next: (response: any) => {
          console.log('Archivo subido con éxito', response);
        },
        error: (err: any) => {
          console.error('Error al subir el archivo:', err);
        }
      });
    } else {
      console.error('No se ha seleccionado un archivo válido');
    }
  }


}
