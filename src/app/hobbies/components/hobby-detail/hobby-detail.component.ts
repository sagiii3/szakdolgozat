import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnHobby } from '../../models/ownHobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { ErrorService } from 'src/app/services/errorService/error.service';
import { Subscription } from 'rxjs';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-hobby-detail',
  templateUrl: './hobby-detail.component.html',
  styleUrls: ['./hobby-detail.component.scss']
})
export class HobbyDetailComponent implements OnInit, OnDestroy {
  id?: string;
  hobby?: OwnHobby;

  getHobbySubscription?: Subscription;
  getHobbyActivitiesSubscription?: Subscription;

    constructor(
      private activatedRoute: ActivatedRoute,
      private hobbyService: HobbyService,
      private errorService: ErrorService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this.getHobby();
  }

  getHobby(): void {
    this.getHobbySubscription = this.hobbyService.getHobbyById(this.id).subscribe({
      next: (hobby: OwnHobby) => {
        this.hobby = hobby;
        this.getHobbyActivities();
      }, 
      error: (error: any) => {
        this.errorService.errorLog(error);
      }
   });
  }

  getHobbyActivities(): void {
    this.getHobbyActivitiesSubscription = this.hobbyService.getHobbyActivities(this.id).subscribe({
      next: (activities: Activity[]) => {
        if(this.hobby){
          this.hobby.activities = activities;
        }
      },
      error: (error: any) => {
        this.errorService.errorLog(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.getHobbySubscription?.unsubscribe();
    this.getHobbyActivitiesSubscription?.unsubscribe();
  }
}
