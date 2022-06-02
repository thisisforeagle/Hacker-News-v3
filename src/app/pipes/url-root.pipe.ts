import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlRoot'
})
export class UrlRootPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const removedProtocol = value.indexOf('//') > -1 ? value.split('//')[1] : value;
    const root = removedProtocol.indexOf('/') > -1 ? removedProtocol.split('/')[0] : removedProtocol;
    return root;
  }

}
