import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hobby } from '../../models/hobby';
import * as e from 'express';
import { GlobalVariables } from 'src/app/shared/constants/globalVariables';
import { OwnHobby } from '../../models/ownHobby';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hobby-tile',
  templateUrl: './hobby-tile.component.html',
  styleUrls: ['./hobby-tile.component.scss']
})
export class HobbyTileComponent {
  globalVariables = GlobalVariables;
  @Input() hobby?: OwnHobby | Hobby;
  @Input() ownHobby = false;
  @Output() addToOwnHobbiesEmitter = new EventEmitter<Hobby>();
  @Output() deleteActivityEmitter = new EventEmitter<OwnHobby>();

  online: boolean = navigator.onLine;

  constructor(
    private router: Router
  ) { }
  
  addToOwnHobbies() {
    this.addToOwnHobbiesEmitter.emit(this.hobby);
  }

  deleteHobby() {
    this.deleteActivityEmitter.emit(this.hobby as OwnHobby);
  }

  redirectToDetail() {
    if (this.ownHobby) {
      this.router.navigate([GlobalVariables.ROUTES.hobbyList, this.hobby?.id]);
    }
  }
}
