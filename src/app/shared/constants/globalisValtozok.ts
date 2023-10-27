import { environment } from "src/environments/environment";

export class GlobalisValtozok{
  public static PUBLIKUS = 'Publikus';
  public static PRIVAT = 'Privát';
  public static LATHATOSAGI_TIPUSOK = [this.PUBLIKUS, this.PRIVAT];
  //URL-ek

  //prefixek
  // / jel nélküliek
  public static KEZDOLAP_PREF = 'kezdolap';

  //frontend url-ek
  public static KEZDOLAP_ROUTE = 'kezdolap';
  public static BEJELENTKEZES_ROUTE = 'bejelentkezes';
  public static REGISZTRACIO_ROUTE = 'regisztracio';
  public static PROGRAM_LISTA_ROUTE = 'program-lista';
  public static UJ_PROGRAM_ROUTE = 'program-letrehozas';

  //snackbar
  public static SNACKBAR_ERROR = 'error';
  public static SNACKBAR_SUCCESS = 'success';
  public static SNACKBAR_INFO = 'info';
  public static SNACKBAR_WARNING = 'warning';

  public static SUCCESS_SNACKBAR = 'success-snackbar';
  public static INFO_SNACKBAR = 'info-snackbar';
  public static WARNING_SNACKBAR = 'warning-snackbar';
  public static ERROR_SNACKBAR = 'error-snackbar';

  public static MEGERTETTEM = 'Megértettem!';
  public static SIKERES_MUVELETVEGZES = 'Sikeres műveletvégzés!';

  public static getTeljesUrl(postUrlPart: string){
    return `${environment.localUrl}` + postUrlPart;
}

}
