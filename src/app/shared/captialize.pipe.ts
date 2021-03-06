import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): any {
    const temp = value.split('');
    let result = temp.shift().toUpperCase();
    result += temp.join('').toLowerCase();
    return result;
  }

}
