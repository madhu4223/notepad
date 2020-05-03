import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesHomeComponent } from './components/notes-home/notes-home.component';
import { RouterModule, Routes } from '@angular/router';
import { NotesDetailsComponent } from './components/notes-details/notes-details.component';
import { NotesSideBarComponent } from './components/notes-side-bar/notes-side-bar.component';
import { FormsModule } from '@angular/forms';
import { NotesSubjectService } from './utils/services/notes-subject.service';
import { ContentEditableFormDirective } from './directives/content-editable-form.directive';

const routes: Routes = [
  { path: '', component: NotesHomeComponent },
]
@NgModule({
  declarations: [NotesHomeComponent, NotesSideBarComponent, NotesDetailsComponent, ContentEditableFormDirective],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers:[NotesSubjectService]
})


export class NotePadModule { }
