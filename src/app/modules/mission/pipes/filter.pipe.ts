import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../models/message.model';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  constructor() {}

  transform(messages: Message[], filters): Message[] {
    return messages.filter(m => {
      if (filters.indexOf('new') > -1 && m.read === 0) { return m; }
      if (filters.indexOf('story') > -1 && m.type === 1) { return m; }
      if (filters.indexOf('rp') > -1 && m.type === 2) { return m; }
      if (filters.indexOf('hrp') > -1 && m.type === 3) { return m; }
      return;
    });
  }
}
