import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExapmleNavPage } from './exapmle-nav.page';

const routes: Routes = [
  {
    path: '',
    component: ExapmleNavPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExapmleNavPageRoutingModule {}
