import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnHobbiesComponent } from './own-hobbies.component';

describe('OwnHobbiesComponent', () => {
  let component: OwnHobbiesComponent;
  let fixture: ComponentFixture<OwnHobbiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnHobbiesComponent]
    });
    fixture = TestBed.createComponent(OwnHobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
