import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { ActivityWrapData } from '../../models/activityWrapData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-wrap',
  templateUrl: './activity-wrap.component.html',
  styleUrls: ['./activity-wrap.component.scss']
})
export class ActivityWrapComponent implements OnInit, OnDestroy{
  data?: ActivityWrapData[];
  view: [number, number ] = [800, 300];//width, height
  showDiagram: boolean = false;

  customColors = [
    {
      name: 'Sütés',
      value: '#ff0000'
    },
    {
      name: 'Szalvétagyűjtés',
      value: '#00ff00'
    },
  ];

  getActivityWrapDataSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService) {}

  ngOnInit(): void {
    this.getActivityWrapData();
  }

  getActivityWrapData() {
    this.getActivityWrapDataSubscription = this.hobbyService.getActivityWrapData()
    .subscribe({
      next: (activityWrapData: ActivityWrapData[]) => {
        this.data = activityWrapData;
        console.log(this.data)
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_activity_wrap_data_error',error);
      }
    });
  }

  ngOnDestroy(): void {
    this.getActivityWrapDataSubscription?.unsubscribe();
  }
}
