import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './containers/login-page.component';
import { CreatePageComponent } from './containers/create-page.component.ts';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  { path: 'create', component: CreatePageComponent, data: { title: 'Create' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
