import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mailto'
})
export class MailtoPipe implements PipeTransform {

  transform(value: string): string {
    return `mailto:${value}`;
  }

}
