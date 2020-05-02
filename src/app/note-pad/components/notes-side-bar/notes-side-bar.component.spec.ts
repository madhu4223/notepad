import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSideBarComponent } from './notes-side-bar.component';

describe('NotesSideBarComponent', () => {
  let component: NotesSideBarComponent;
  let fixture: ComponentFixture<NotesSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
