import { Directive, HostBinding, Input } from '@angular/core';


enum btnColor {
  primary = 'btn-primary',
  secondary = 'btn-secondary',
  danger = 'btn-danger',
  warning = 'btn-warning',
  info = 'btn-info'
}

enum btnSize {
  lg = 'btn-lg',
  md = '',
  sm = 'btn-sm'
}

@Directive({
  selector: '[appBsbutton]'
})
export class BsbuttonDirective {

  @Input() color: 'primary' | 'secondary' | 'danger' | 'warning' | 'info' = 'primary'
  @Input() size: 'lg' | 'md' | 'sm' = 'md'

  @HostBinding('class')
  get appStyles(): string {
    const buttonColor = btnColor[this.color];
    const buttonSize = btnSize[this.size];

    return `btn ${buttonColor} ${buttonSize}`;
  }

}
