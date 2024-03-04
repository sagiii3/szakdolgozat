import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activity-tile',
  templateUrl: './activity-tile.component.html',
  styleUrls: ['./activity-tile.component.scss']
})
export class ActivityTileComponent {
  @Input() activity?: Activity;
  @Output() deleteEventEmitter = new EventEmitter<string>();
    constructor() { }


    deleteActivity(): void{
      this.deleteEventEmitter?.emit(this.activity?.id);
    }
}
