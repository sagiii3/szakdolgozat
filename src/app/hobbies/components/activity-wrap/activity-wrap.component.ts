import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { ActivityWrapData } from '../../models/activityWrapData';
import { Subscription } from 'rxjs';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-activity-wrap',
  templateUrl: './activity-wrap.component.html',
  styleUrls: ['./activity-wrap.component.scss']
})
export class ActivityWrapComponent implements OnInit, OnDestroy{
  data?: ActivityWrapData[];
  view: [number, number ] = [800, 300];//width, height
  monthlyDatas?: ActivityWrapData[][];
  monthlyData?: ActivityWrapData[];
  monthNumber: number = 0;
  buttons: { [key: string]: boolean } = {
    allPie: true,
    allVertical: false,
    monthlyVertical: false,
    monthlyPie: false,
  };

  globalVariables = GlobalVariables;

  buttonChange(button: string) {
    for (const key in this.buttons) {
      if (key === button) {
        this.buttons[key] = true;
      } else {
        this.buttons[key] = false;
      }
    }
  }

  getActivityWrapDataSubscription?: Subscription;

  constructor(
    private hobbyService: HobbyService,
    private errorService: ErrorService) {}

  ngOnInit(): void {
    this.getActivityWrapData();
    this.getMonthlyData();
  }

  getActivityWrapData() {
    this.getActivityWrapDataSubscription = this.hobbyService.getActivityWrapData()
    .subscribe({
      next: (activityWrapData: ActivityWrapData[] | ActivityWrapData[][] ) => {
        //check if is an 1D array
        if(activityWrapData[0] instanceof ActivityWrapData) {
          this.data = activityWrapData as ActivityWrapData[];
        } else {
          this.monthlyDatas = activityWrapData as ActivityWrapData[][];
        }
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_activity_wrap_data_error',error);
      }
    });
  }

  getMonthlyData() {
    this.getActivityWrapDataSubscription = this.hobbyService.getActivityWrapData(true)
    .subscribe({
      next: (activityWrapData: ActivityWrapData[] | ActivityWrapData[][] ) => {
        //check if is an 1D array
        if(activityWrapData[0] instanceof ActivityWrapData) {
          this.data = activityWrapData as ActivityWrapData[];
        } else {
          this.monthlyDatas = activityWrapData as ActivityWrapData[][];
        }
      },
      error: (error: Error) => {
        this.errorService.errorLog('get_activity_wrap_data_error',error);
      }
    });
  }

  showMonthlyData() {
    this.monthlyData = this.monthlyDatas![this.monthNumber];
  }



  ngOnDestroy(): void {
    this.getActivityWrapDataSubscription?.unsubscribe();
  }
}
