import { Component, OnInit } from '@angular/core';
import { NotePadService } from '../../utils/services/note-pad.service';
import { NoteModel } from '../../utils/services/note-model';
import { NotesSubjectService } from '../../utils/services/notes-subject.service';

@Component({
  selector: 'app-notes-home',
  templateUrl: './notes-home.component.html',
  styleUrls: ['./notes-home.component.scss']
})
export class NotesHomeComponent implements OnInit {

  constructor(
    private notePadService: NotePadService,
    private notesSubjectService: NotesSubjectService
  ) { }
  noteDetails : NoteModel[];
  sideBarClosed: boolean;

  ngOnInit(): void {
    let note: NoteModel = {
      id: '34',
      note:'sample note',
      selected: false
    }
    this.notePadService.addNote(note)
    this.noteDetails = this.notePadService.getNotes()
    if(_.size(this.noteDetails)){
      this.noteDetails[0].selected = true
    }
    // console.log('notes ',this.noteDetails)
    this.notesSubjectService.sideBar.subscribe((sideBarClosed) => {
        this.sideBarClosed = sideBarClosed;
    })
  }

 

}
