import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { printLog } from 'src/environments/environment';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements
  OnInit,
  OnChanges,
  DoCheck,
  OnDestroy,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked {

  @Input() bootcampName: string = '';
  title: string = 'Child Component';

  counter: number = 0;
  interval: any;

  constructor() {
    printLog(`${this.title} constructor()`);
  }


  ngOnInit(): void {
    printLog(`${this.title} ngOnInit()`);

    //  Demo onDestroy
    // this.interval = setInterval(() => {
    //   this.counter = this.counter + 1
    //   console.log(this.counter);
    // }, 3000);

  }

  ngOnChanges(changes: SimpleChanges): void {
    printLog(`${this.title} ngOnChanges()`);
    console.log(changes);
  }

  ngDoCheck(): void {
    printLog(`${this.title} ngDoCheck()`);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    printLog(`${this.title} ngOnDestroy()`);
  }

  ngAfterContentInit(): void {
    printLog(`${this.title} ngAfterContentInit()`);
  }

  ngAfterContentChecked(): void {
    printLog(`${this.title} ngAfterContentChecked()`);
  }

  ngAfterViewInit(): void {
    printLog(`${this.title} ngAfterViewInit()`);
  }

  ngAfterViewChecked(): void {
    printLog(`${this.title} ngAfterViewChecked()`);
  }
}
