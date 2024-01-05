import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GlobalVariables } from '../shared/constants/globalVariables';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: GlobalVariables.HOME_ROUTE, component: HomeComponent },
  { path: GlobalVariables.LOGIN_ROUTE, component: LoginComponent },
  { path: GlobalVariables.SIGNUP_ROUTE, component: SignupComponent },
  { path: GlobalVariables.FORGOT_PASSWORD_ROUTE, component: ForgotPasswordComponent }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
