import { ICuotaInput } from "./ICuotaInput";

export interface ICuota {
    tenantId: string;
    customStorage: ICuotaInput,
    recordCommunications: ICuotaInput,
    recordCreate: ICuotaInput,
    adminCreateClient: ICuotaInput,
    adminCreateLawyer: ICuotaInput,
    adminCreateAdmin: ICuotaInput,
    customProcesses: ICuotaInput,
    customTemplates: ICuotaInput,
    customDocTypes: ICuotaInput,
    adminCreateUser: ICuotaInput
    recordDocs: ICuotaInput,
    recordView: ICuotaInput,
    customEmail: ICuotaInput,
    customEmailGooglEmail: ICuotaInput,
    customStorageGoogleDrive: ICuotaInput
    recordActivities: ICuotaInput,
    recordLDPS: ICuotaInput,
    recordLog: ICuotaInput
}


