import { Component, OnInit, Input } from '@angular/core';
import { NoteModel } from '../../utils/services/note-model';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NotePadService } from '../../utils/services/note-pad.service';
import { NotesSubjectService } from '../../utils/services/notes-subject.service';

@Component({
  selector: 'app-notes-side-bar',
  templateUrl: './notes-side-bar.component.html',
  styleUrls: ['./notes-side-bar.component.scss']
})
export class NotesSideBarComponent implements OnInit {
  @Input()notesData: NoteModel[]

  constructor(
    private notePadService: NotePadService,
    private notesSubjectService: NotesSubjectService,
  ) { }
  sidebarClosed: boolean;
  keyword: string
  onkeyUpTrigeered: Subject<boolean> = new Subject()
  noteActionSubscription: Subscription

  ngOnInit(): void {
    console.log('sideber ', this.notesData)
    this.onkeyUpTrigeered.pipe(debounceTime(550)).subscribe(()=>{
      // search notes
      this.searchNotes()
    })

    this.noteActionSubscription = this.notesSubjectService.updateNotes.subscribe((notesData: NoteModel[])=>{
      // Handle all the actions by action type
      console.log('text edited ', notesData)
      this.notesData = notesData
    })
  }
  toggleSidebar(actionType){
      this.sidebarClosed =  (actionType == 'CLOSE' && !this.sidebarClosed) ? true : false
      this.notesSubjectService.sideBar.next(this.sidebarClosed);
  }
  onKeyupTriggered(){
    console.log('keyword = ', this.keyword)
    this.onkeyUpTrigeered.next()
  }
  searchNotes(){
   this.notesData =  _.cloneDeep(this.notePadService.searchNotes(this.keyword))
   if(_.size(this.notesData)){
    this.notesData[0].selected = true;
    this.notesSubjectService.updateNotes.next(this.notesData)
   }
  }
  selectNote(noteObject){
    if(!noteObject.selected){ // No need to any action by clicking on already selected note
      this.notesData = _.map(this.notesData,(note)=>{
        if(note.selected) note.selected = false // un selecting already selected note
        if(noteObject.id == note.id) note.selected = true // selecting the note
        return note;
      })
      this.notesSubjectService.updateNotes.next(this.notesData)
    }
  }
  addNote(){
    let emptyNote = {
      note: '',
      id: this.generateRandom(4),
      selected: false,
      header: ''
    }
    console.log('new note ', emptyNote)
    this.notesData.push(emptyNote)
    this.selectNote(emptyNote)
  }
 generateRandom(lengthOfCode: number) {
    let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }
  ngOnDestroy(){
    if(this.noteActionSubscription) this.noteActionSubscription.unsubscribe()
  }
}
