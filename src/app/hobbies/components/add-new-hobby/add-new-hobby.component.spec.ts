import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewHobbyComponent } from './add-new-hobby.component';

describe('AddNewHobbyComponent', () => {
  let component: AddNewHobbyComponent;
  let fixture: ComponentFixture<AddNewHobbyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewHobbyComponent]
    });
    fixture = TestBed.createComponent(AddNewHobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
