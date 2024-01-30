import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(value?: Timestamp) {
    return this.datePipe.transform(value?.toDate(),  'yyyy. MM. dd.');
  }

}
