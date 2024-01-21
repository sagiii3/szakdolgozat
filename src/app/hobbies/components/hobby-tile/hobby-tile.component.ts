import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hobby } from '../../models/hobby';
import * as e from 'express';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';

@Component({
  selector: 'app-hobby-tile',
  templateUrl: './hobby-tile.component.html',
  styleUrls: ['./hobby-tile.component.scss']
})
export class HobbyTileComponent {
  globalVariables = GlobalVariables;
  @Input() hobby?: Hobby;
  @Output() addToOwnHobbiesEmitter = new EventEmitter<Hobby>();

  addToOwnHobbies() {
    this.addToOwnHobbiesEmitter.emit(this.hobby);
  }
}
