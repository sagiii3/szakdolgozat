import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwnHobby } from '../../models/ownHobby';
import { HobbyService } from 'src/app/services/hobbyService/hobby.service';
import { ErrorService } from 'src/app/services/errorService/error.service';

@Component({
  selector: 'app-hobby-detail',
  templateUrl: './hobby-detail.component.html',
  styleUrls: ['./hobby-detail.component.scss']
})
export class HobbyDetailComponent {
  id?: string;
  hobby?: OwnHobby;
    constructor(
      private activatedRoute: ActivatedRoute,
      private hobbyService: HobbyService,
      private errorService: ErrorService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || undefined;
    this.hobbyService.getHobbyById(this.id).subscribe({
        next: (hobby: OwnHobby) => {
          this.hobby = hobby;
          console.log(this.hobby);
        }, 
        error: (error: any) => {
          this.errorService.errorLog(error);
        }
     });
  }
}
