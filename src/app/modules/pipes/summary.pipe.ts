import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  constructor() {}

  transform(text: string, length: number): string {
    if (text) {
      return text.substring(length ? text.length - length : 0);
    }
    return text;
  }
}
