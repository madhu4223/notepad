import { Injectable } from '@angular/core';
import { NoteModel } from '../services/note-model';

@Injectable({
  providedIn: 'root'
})
export class FakeDbService {

  constructor() { }

  tempData = [
    {
      id: '1',
      note:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
      selected: false
    },
    {
      id: '2',
      note:'need to call to harish',
      selected: false
    },
    {
      id: '3',
      note:'this is third note',
      selected: false
    },
    {
      id: '4',
      note:'it is very hard to be in quarantine',
      selected: false
    },
    {
      id: '5',
      note:'india extended the lockdown to 17th may again',
      selected: false
    },
  ]

  notes: NoteModel[] = this.tempData

}

