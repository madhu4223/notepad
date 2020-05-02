import { Injectable } from '@angular/core';
import { FakeDbService } from '../fakeDb/fake-db.service';
import { NoteModel } from './note-model';

@Injectable({
  providedIn: 'root'
})
export class NotePadService {

  constructor(
    private fakeDb: FakeDbService
  ) { }
  getNotes(){
    return this.fakeDb.notes;
  }
  searchNotes(keyword){
    let notes = _.filter(this.fakeDb.notes,note => _.includes(note.note, keyword));
    return notes;
  }
}
