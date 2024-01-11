import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hobby } from '../../models/hobby';
import * as e from 'express';

@Component({
  selector: 'app-hobby-tile',
  templateUrl: './hobby-tile.component.html',
  styleUrls: ['./hobby-tile.component.scss']
})
export class HobbyTileComponent {
  @Input() hobby?: Hobby;

  //uj eventemitter létrehozása
  @Output() addToOwnHobbiesEmitter = new EventEmitter<string>();

  addToOwnHobbies() {
    this.addToOwnHobbiesEmitter.emit(this.hobby?.id || '');
  }
}
