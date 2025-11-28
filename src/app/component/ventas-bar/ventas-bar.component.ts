import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { VentaService } from '../../service/venta.service';

Chart.register(...registerables); // Registro requerido para Charts

@Component({
  selector: 'app-ventas-bar',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './ventas-bar.component.html',
  styleUrls: ['./ventas-bar.component.css']
})
export class VentasBarComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Ventas por Producto',
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(85, 12, 175, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(75, 192, 192, 0.4)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(85, 12, 175, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  };

  constructor(private service: VentaService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.service.getVentaResumen().subscribe(summary => {

      const labels = summary.map(s => s.producto);
      const data = summary.map(s => s.total);

      // 🔥 Reemplazar el objeto completo para que Angular detecte cambios
      this.barChartData = {
        labels,
        datasets: [
          {
            ...this.barChartData.datasets[0],
            data
          }
        ]
      };

      // 🔥 Forzar actualización del canvas
      setTimeout(() => this.chart?.update());
    });
  }
}
