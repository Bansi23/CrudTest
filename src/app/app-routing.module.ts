import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';


const routes: Routes = [
  {path : '', redirectTo : '/user-list' , pathMatch : 'full'},
  {path : 'user-list', component : UserListComponent, },
  {path : '**', redirectTo : 'user-list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
