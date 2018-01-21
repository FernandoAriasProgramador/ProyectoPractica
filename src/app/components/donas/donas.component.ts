import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-donas',
  templateUrl: './donas.component.html',
  styles: []
})
export class DonasComponent implements OnInit {

  @Input() ChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() ChartData: number[] = [350, 450, 100];
  @Input() ChartType: string = 'doughnut';
  @Input() ChartTitulo: string = 'doughnut';


  constructor() { }

  ngOnInit() {
  }

}
