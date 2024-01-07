import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GlobalVariables } from '../shared/constants/globalVariables';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: GlobalVariables.ROUTES.home, component: HomeComponent },
  { path: GlobalVariables.ROUTES.login, component: LoginComponent },
  { path: GlobalVariables.ROUTES.signup, component: SignupComponent },
  { path: GlobalVariables.ROUTES.forgotPassword, component: ForgotPasswordComponent }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
