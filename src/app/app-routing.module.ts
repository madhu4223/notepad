import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotePadModule } from './note-pad/note-pad.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', loadChildren: () => import('./note-pad/note-pad.module').then(m => m.NotePadModule) },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
