import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeStamp'
})
export class TimeStampPipe implements PipeTransform {

  transform(value: number | undefined, ...args: unknown[]): number | Date | undefined {
    return value ? new Date(value * 1000) : value;
  }

}
