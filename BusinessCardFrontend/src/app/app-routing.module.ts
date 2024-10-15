import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { BusinessCardAddComponent } from './business-card-add/business-card-add.component';

const routes: Routes = [
  { path: '', redirectTo: '/business-card', pathMatch: 'full' },
  { path: 'business-card-list', component: BusinessCardListComponent },
  { path: 'business-card-add', component: BusinessCardAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
