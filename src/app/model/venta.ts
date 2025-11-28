export interface Venta {
    id: number;
    producto: string;
    importe: number;
}
export interface VentaResumen {
    producto: string;
    total: number;
}