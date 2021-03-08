import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { CreateBookComponent } from './pages/create-book/create-book.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'create', component: CreateBookComponent},
  {path: 'edit/:id', component: EditBookComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
