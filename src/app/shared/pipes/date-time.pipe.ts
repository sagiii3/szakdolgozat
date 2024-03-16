import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@firebase/firestore-types';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) { }

  transform(value?: Timestamp) {
    let time = navigator.onLine ? value?.toDate() : value!.seconds * 1000;
    return this.datePipe.transform(time, 'yyyy. MM. dd.');
  }

}
