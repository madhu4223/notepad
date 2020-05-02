import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotesSubjectService {

  public updateNotes = new Subject<Object>();
  public sideBar = new Subject<boolean>();
  
}
