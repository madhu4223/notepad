import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NoteModel } from '../../utils/services/note-model';
import { NotesSubjectService } from '../../utils/services/notes-subject.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FakeDbService } from '../../utils/fakeDb/fake-db.service';


@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss']
})

export class NotesDetailsComponent implements OnInit {

  @Input()notesData: NoteModel[]
  @ViewChild('content') contentElement: ElementRef
  constructor(
    private notesSubjectService: NotesSubjectService,
    private cdr: ChangeDetectorRef,
    private fakeDbService: FakeDbService
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
      this.fakeDbService.notes = _.cloneDeep(this.notesData)
      this.notesSubjectService.updateNotes.next(this.notesData)
    })
  }

  ngAfterViewInit(){
    this.focusConentDiv()
  }

  focusConentDiv(){
    if(this.contentElement && this.contentElement.nativeElement){
      this.contentElement.nativeElement.focus()
    }
  }

 updateSelectedNote(){
    this.selectedNoteIndex = _.findIndex(this.notesData, note => note.selected)
    if(this.selectedNoteIndex > -1){
      this.selectedNote = _.cloneDeep(this.notesData[this.selectedNoteIndex])
      let cuurentTime = new Date()
      this.selectedNote['updatedTime'] = cuurentTime
      this.focusConentDiv()
      // console.log('--', this.selectedNote)
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
    // console.log('selected ', this.selectedNote)
    this.onkeyUpTrigeered.next()
  }
  deleteNote(){
    this. notesData = _.reject(this.notesData, note => note.id == this.selectedNote.id)
      if(_.size(this.notesData) ){
        this.notesData[0].selected = true
      }else{
        this.selectedNote = { id: '', note: '', selected: false, updatedTime: new Date()}
      }
      this.fakeDbService.notes = _.cloneDeep(this.notesData)
      this.notesSubjectService.updateNotes.next(this.notesData)
    }
  ngOnDestroy(){
    if(this.noteActionSubscription) this.noteActionSubscription.unsubscribe()
  }
}
