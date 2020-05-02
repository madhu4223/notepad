import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NoteModel } from '../../utils/services/note-model';
import { NotesSubjectService } from '../../utils/services/notes-subject.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss']
})

export class NotesDetailsComponent implements OnInit {

  @Input()notesData: NoteModel[]

  constructor(
    private notesSubjectService: NotesSubjectService,
    private cdr: ChangeDetectorRef
  ) { }
  selectedNote: NoteModel
  noteActionSubscription: Subscription
  newNote: string = 'Please enter the note '
  onkeyUpTrigeered: Subject<boolean> = new Subject()
  selectedNoteIndex:number;

  ngOnInit(): void {
    this.updateSelectedNote()
    this.noteActionSubscription = this.notesSubjectService.updateNotes.subscribe((updatedNotesList: NoteModel[])=>{
      this.notesData = updatedNotesList
      this.updateSelectedNote()
    })
    this.onkeyUpTrigeered.pipe(debounceTime(550)).subscribe(()=>{
      // this.selectedNote.note = this.newNote
      this.notesData[this.selectedNoteIndex] = this.selectedNote;
      this.notesSubjectService.updateNotes.next(this.notesData)
    })
  }

 updateSelectedNote(){
    this.selectedNoteIndex = _.findIndex(this.notesData, note => note.selected)
    if(this.selectedNoteIndex > -1){
      this.selectedNote = _.cloneDeep(this.notesData[this.selectedNoteIndex])
    }
    this.detectChanges()
  }

  detectChanges = (): void => {
    if(!this.cdr['destroyed']){
      this.cdr.detectChanges();
    }
  };
  validateNote(){
    this.selectedNote.note = _.trim(this.selectedNote.note)
   if(_.size(this.selectedNote.note) == 0 ){
      this.deleteNote()
    }
  }
  onTextEnter(){
    console.log('selected ', this.selectedNote)
    this.onkeyUpTrigeered.next()
  }
  deleteNote(){
    this. notesData = _.reject(this.notesData, note => note.id == this.selectedNote.id)
      if(_.size(this.notesData) )this.notesData[0].selected = true
      this.notesSubjectService.updateNotes.next(this.notesData)
    }
  ngOnDestroy(){
    if(this.noteActionSubscription) this.noteActionSubscription.unsubscribe()
  }
}
