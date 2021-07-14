import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IRtransactionsComponent } from './irtransactions.component';

describe('IRtransactionsComponent', () => {
  let component: IRtransactionsComponent;
  let fixture: ComponentFixture<IRtransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IRtransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IRtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
