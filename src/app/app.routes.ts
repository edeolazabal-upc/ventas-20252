import { Routes } from '@angular/router';
import { VentasPieComponent } from './component/ventas-pie/ventas-pie.component';
import { VentasBarComponent } from './component/ventas-bar/ventas-bar.component';
import { VentasLineComponent } from './component/ventas-line/ventas-line.component';
import { VentasRadarComponent } from './component/ventas-radar/ventas-radar.component';

export const routes: Routes = [
    {path: 'barra', component: VentasBarComponent },
    {path: 'linea', component: VentasLineComponent },
    {path: 'pie', component: VentasPieComponent },
    {path: 'radar', component: VentasRadarComponent },
];
