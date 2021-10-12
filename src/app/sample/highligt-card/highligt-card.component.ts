import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-highligt-card',
  templateUrl: './highligt-card.component.html',
  styleUrls: ['./highligt-card.component.scss']
})
export class HighligtCardComponent implements OnInit {

  title = environment.title;
  constructor() { }

  ngOnInit(): void {
  }

}
