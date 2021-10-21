import { AfterContentInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { printLog } from 'src/environments/environment';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements
  OnInit,
  DoCheck {

  title: string = 'Parent Component';
  bootcampName: string = '';
  isChild: boolean = false;

  constructor() {
    printLog(`${this.title} constructor()`);
  }

  ngOnInit(): void {
    printLog(`${this.title} ngOnInit()`);
  }

  toggleChild(): void {
    this.isChild = !this.isChild;
  }

  ngDoCheck(): void {
    printLog(`${this.title} ngDoCheck()`);
  }

}
