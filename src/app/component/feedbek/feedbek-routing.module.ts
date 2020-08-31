import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbekPage } from './feedbek.page';

const routes: Routes = [
  {
    path: '',
    component: FeedbekPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedbekPageRoutingModule {}
