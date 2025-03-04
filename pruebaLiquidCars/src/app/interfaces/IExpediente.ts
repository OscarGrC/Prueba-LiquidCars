export interface IExpedienteResponse {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    data: IExpediente[];
}

export interface IExpediente {
    id: string;
    lcVarId: string;
    clazz: string;
    serializedVarValue: string;
    object_type: string;
    recordId: string;
    status: string;
    processType: string;
    engagement: string;
    creation: string;
    lastUpdate: string;
    tenantId: string;
    workflowExternalId: string;

    adminId: string;
    annotationsCount: number;
    clientAdminId: string;
    participantPayerId: string;
    personUserId: string;
    lawyerId: string;

    admin?: {
        countryId: string;
    };

    client?: {
        id: string;
        name: string;
        type: string;
        tenantId: string;
        countryId: string;
    };

    lawyer?: {
        id: string;
        name: string;
        type: string;
        tenantId: string;
        defaultLanguage: string;
    };

    user?: {
        id: string;
        name: string;
        type: string;
        tenantId: string;
        countryId: string;
        email: string;
        enabled: boolean;
        familyName: string;
        fullName: string;
        hasLogin: boolean;
    };

    variableMetadata?: {
        typeName: string;
        simpleName: string;
        packageName: string;
    };

    ids?: Record<string, any>;

    downpayment?: {
        amount: number;
        currency: string;
    };

    secondPayment?: {
        amount: number;
        currency: string;
    };

    simulationScenario?: string;
}
