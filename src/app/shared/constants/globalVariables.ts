import { environment } from "src/environments/environment";

export class GlobalVariables {
  public static PUBLIC = 'Public';
  public static PRIVATE = 'Private';
  public static VISIBILITY_TYPES = [this.PUBLIC, this.PRIVATE];

  //Firebase collections
  public static COLLECTIONS = {
    users: 'users',
    hobbies: 'hobbies',
    ownHobbies: 'ownHobbies',
    activities: 'activities',
  };

  // URLs

  // Prefixes
  // Without the / character
  public static HOME_PREFIX = 'home';

  // Frontend URLs
  public static ROUTES = {
    home: 'home',
    login: 'login',
    signup: 'signup',
    hobbyList: 'hobby-list',
    forgotPassword: 'forgot-password',
    ownHobbies: 'own-hobbies',
    profile: 'profile',
    activityWrap: 'activity-wrap',
    addNewHobby: 'add-new-hobby',
  };

  // Snackbar
  public static SNACKBAR_ERROR = 'error';
  public static SNACKBAR_SUCCESS = 'success';
  public static SNACKBAR_INFO = 'info';
  public static SNACKBAR_WARNING = 'warning';

  public static SUCCESS_SNACKBAR = 'success-snackbar';
  public static INFO_SNACKBAR = 'info-snackbar';
  public static WARNING_SNACKBAR = 'warning-snackbar';
  public static ERROR_SNACKBAR = 'error-snackbar';


  public static getFullUrl(postUrlPart: string) {
    return `${environment.localUrl}` + postUrlPart;
  }
}
