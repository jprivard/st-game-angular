import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './containers/page.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CanReadGuard } from './guards/mission.guard';

const routes: Routes = [{
  path: 'mission/:id', canActivate: [], children: [{
    path: '', canActivate: [CanReadGuard], component: PageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionRoutingModule {}
