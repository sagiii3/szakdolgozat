import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'szakdolgozat-alkalmazas';
  constructor(private translate: TranslateService) {
    translate.addLangs(['hu'])
    translate.setDefaultLang('hu');
    translate.use('hu');
  }
}
