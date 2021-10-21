import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { validateMessage } from 'src/environments/environment';

@Component({
  selector: 'app-validation-message, [validation-message]',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss']
})
export class ValidationMessageComponent {

  @Input() control: AbstractControl;
  @Input() label: string;

  messages: { [key: string]: string } = validateMessage;

  isFieldValid(): boolean {
    return this.control.invalid && this.control.touched;
  }

  displayErrors(): string {
    let message: string = '';
    const errors = this.control.errors;

    for (let key in errors) {
      const error: any[] = errors[key] ? Object.values(errors[key]) : [];
      const param: any[] = [this.label].concat(error);
      const valMessage: string = this.messages[key];

      message += `<p class="m-0">${this.formatString(valMessage, param)}</p>`

    }

    return message;
  }

  private formatString(text: string, params: any[]): string {
    let i = 0;
    return (text ? text.replace(/%s/g, () => params.slice(i, ++i) as any) : '')
  }

}
