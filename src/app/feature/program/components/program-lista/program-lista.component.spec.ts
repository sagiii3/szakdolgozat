import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramListaComponent } from './program-lista.component';

describe('ProgramListaComponent', () => {
  let component: ProgramListaComponent;
  let fixture: ComponentFixture<ProgramListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
