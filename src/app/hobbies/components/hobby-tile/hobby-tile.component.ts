import { Component, Input } from '@angular/core';
import { Hobby } from '../../models/hobby';

@Component({
  selector: 'app-hobby-tile',
  templateUrl: './hobby-tile.component.html',
  styleUrls: ['./hobby-tile.component.scss']
})
export class HobbyTileComponent {
  @Input() hobby?: Hobby;
}
