import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { VentaService } from '../../service/venta.service';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables); 

@Component({
  selector: 'app-ventas-line',
  imports: [BaseChartDirective],
 // providers: [VentaService],
  templateUrl: './ventas-line.component.html',
  styleUrl: './ventas-line.component.css'
})
export class VentasLineComponent implements OnInit {

  // 👇 Necesario para poder forzar el update del gráfico
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  lineData: ChartData<'line'> = {
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
        borderWidth: 5
      }
    ]
  };

  lineOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.getVentaResumen().subscribe(summary => {

      this.lineData.labels = summary.map(s => s.producto);
      this.lineData.datasets[0].data = summary.map(s => s.total);

      // 👇 NECESARIO: forzar renderización tras cambiar los datos
      setTimeout(() => {
        this.chart?.update();
      });
    });
  }
}
