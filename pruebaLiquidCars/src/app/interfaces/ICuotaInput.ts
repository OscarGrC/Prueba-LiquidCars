export interface ICuotaInput {
    tenantId: string;
    enabled: boolean,
    maxCount: number,
    currentCount: number
    feature: string
}
