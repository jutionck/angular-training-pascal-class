import { Component, DoCheck, OnInit } from '@angular/core';
import { printLog } from 'src/environments/environment';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements
  OnInit,
  DoCheck {

  title: string = 'Parent Component'
  isChild: boolean = false;
  haloText: string = '';

  constructor() {
    printLog(`${this.title} constructor()`)
  } // 


  ngOnInit(): void {
    printLog(`${this.title} ngOnInit()`)
  }

  ngDoCheck(): void {
    printLog(`${this.title} ngDoCheck()`)
  }

  toggleChild() {
    this.isChild = !this.isChild
  }

}
