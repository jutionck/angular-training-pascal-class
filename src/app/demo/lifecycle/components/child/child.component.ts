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

  title: string = 'Child Component'
  @Input() haloText: string = '';

  countDoCheck: number = 0;

  interval: any;

  constructor() {
    printLog(`${this.title} constructor()`)
  } // 

  ngOnInit(): void {
    printLog(`${this.title} ngOnInit()`)
    // this.interval = setInterval(() => {
    //   this.countDoCheck++;
    //   console.log(this.countDoCheck);
    // }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.haloText = `Hello from ${this.title}`
    printLog(`${this.title} ngOnChanges()`)
  }

  ngDoCheck(): void {
    this.countDoCheck;
    printLog(`${this.title} ngDoCheck()`)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    printLog(`${this.title} ngOnDestroy()`)
  }

  ngAfterContentInit(): void {
    printLog(`${this.title} ngAfterContentInit()`)
  }

  ngAfterContentChecked(): void {
    printLog(`${this.title} ngAfterContentChecked()`)
  }

  ngAfterViewInit(): void {
    printLog(`${this.title} ngAfterViewInit()`)
  }

  ngAfterViewChecked(): void {
    printLog(`${this.title} ngAfterViewChecked()`)
  }

}
