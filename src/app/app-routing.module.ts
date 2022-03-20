import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './pages/home/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeResolver } from './resolvers/home.resolver';


const routes: Routes = [
  {
    path: 'homepage',
    component: HomeComponent,
    resolve: {'itemsList': HomeResolver}
  },
  {
    path: 'edit',
    component: EditComponent,
    resolve: {'itemsList': HomeResolver}
  },
 {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
