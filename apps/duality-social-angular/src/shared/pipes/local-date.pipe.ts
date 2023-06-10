import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: Date, args: string): string {
    if (!value || !args) {
      return '';
    }
    return this.datePipe.transform(value, args) ?? '';
  }
}