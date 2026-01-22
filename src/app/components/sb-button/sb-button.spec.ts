import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SbButton } from './sb-button';

describe('SbButton', () => {
  let component: SbButton;
  let fixture: ComponentFixture<SbButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SbButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SbButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
