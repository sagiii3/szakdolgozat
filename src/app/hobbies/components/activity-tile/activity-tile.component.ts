import { Component, Input } from '@angular/core';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activity-tile',
  templateUrl: './activity-tile.component.html',
  styleUrls: ['./activity-tile.component.scss']
})
export class ActivityTileComponent {
  @Input() activity?: Activity;
    constructor() { }

}
