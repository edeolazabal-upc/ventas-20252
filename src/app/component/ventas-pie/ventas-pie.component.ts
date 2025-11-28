import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { VentaService } from '../../service/venta.service';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

Chart.register(...registerables); 

@Component({
  selector: 'app-ventas-pie',
  imports: [BaseChartDirective],
  //providers: [VentaService],
  templateUrl: './ventas-pie.component.html',
  styleUrl: './ventas-pie.component.css'
})
export class VentasPieComponent implements OnInit {

  // 👇 Necesario para poder forzar el update del gráfico
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  pieData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(85, 12, 175, 0.4)',
        ],
        borderWidth: 1
      }
    ]
  };

  pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.ventaService.getVentaResumen().subscribe(summary => {

      this.pieData.labels = summary.map(s => s.producto);
      this.pieData.datasets[0].data = summary.map(s => s.total);

      // 👇 NECESARIO: forzar renderización tras cambiar los datos
      setTimeout(() => {
        this.chart?.update();
      });
    });
  }
}
