import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'Angular Intro';

  sum(numberOne: number, numberTwo: number): number {
    const result: number = numberOne + numberTwo;
    if (result > 0) console.log(`${result} is positive`);
    else console.log(`${result} is negative`);
    return result;
  }
}
