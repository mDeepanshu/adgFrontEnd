import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDialogueComponent } from './return-dialogue.component';

describe('ReturnDialogueComponent', () => {
  let component: ReturnDialogueComponent;
  let fixture: ComponentFixture<ReturnDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDialogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
