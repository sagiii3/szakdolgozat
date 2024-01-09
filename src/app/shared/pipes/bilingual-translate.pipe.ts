import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'bilingualTranslate'
})
export class BilingualTranslatePipe implements PipeTransform, OnDestroy{
  
  private currentLanguage: string = this.translateService.currentLang;
  private languagechangeSubscription?: Subscription;

  constructor(
    private translateService: TranslateService
  ) { 
    this.languagechangeSubscription = this.translateService.onLangChange
    .subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  transform(value: any) {
    return value[this.currentLanguage] || "Unknown";
  }

  ngOnDestroy(): void {
    this.languagechangeSubscription?.unsubscribe();
  }

}
