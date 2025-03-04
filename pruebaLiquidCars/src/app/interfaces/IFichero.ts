export interface IFichero {
    id: string;
    lcVarId: string;
    object_type: string;
    recordId: string;
    status: string;
    tenantId: string;
    type: string;
    userIndication: string;
    valid: boolean;
    documentVersion: number;
    requested: string;
    participantOwnerId: string;

    variableMetadata?: {
        typeName: string;
        simpleName: string;
        packageName: string;
        interfaceNames: string[];
    };

    visibility?: {
        id: string;
        tenantId: string;
        admin: boolean;
        client: boolean;
        lawyer: boolean;
        user: boolean;
    };
}
