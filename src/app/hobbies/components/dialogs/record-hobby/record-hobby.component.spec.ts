import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordHobbyComponent } from './record-hobby.component';

describe('RecordHobbyComponent', () => {
  let component: RecordHobbyComponent;
  let fixture: ComponentFixture<RecordHobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordHobbyComponent]
    });
    fixture = TestBed.createComponent(RecordHobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
