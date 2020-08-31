import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { GlobalErrorHandlerPage } from './global-error-handler.page';

const routes: Routes = [
  {
    path: '',
    // component: GlobalErrorHandlerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalErrorHandlerPageRoutingModule {}
