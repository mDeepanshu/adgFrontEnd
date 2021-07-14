import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitCreditComponent } from './debit-credit.component';

describe('DebitCreditComponent', () => {
  let component: DebitCreditComponent;
  let fixture: ComponentFixture<DebitCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebitCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
