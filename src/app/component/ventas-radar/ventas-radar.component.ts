import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { VentaService } from '../../service/venta.service';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables); 

@Component({
  selector: 'app-ventas-radar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ventas-radar.component.html',
  styleUrl: './ventas-radar.component.css'
})
export class VentasRadarComponent implements OnInit {
  
  // 👇 Necesario para poder forzar el update del gráfico
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  radarData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Ventas por Marca',
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(85, 12, 175, 0.4)',
        ],
        borderWidth: 3
      }
    ]
  };

  radarOptions: ChartOptions<'radar'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.getVentaResumen().subscribe(summary => {

      this.radarData.labels = summary.map(s => s.producto);
      this.radarData.datasets[0].data = summary.map(s => s.total);

      // 👇 NECESARIO: forzar  renderización tras cambiar los datos
      setTimeout(() => {
        this.chart?.update();
      });
    });
  }
}
