import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UjProgramComponent } from './uj-program.component';

describe('UjProgramComponent', () => {
  let component: UjProgramComponent;
  let fixture: ComponentFixture<UjProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UjProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UjProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
