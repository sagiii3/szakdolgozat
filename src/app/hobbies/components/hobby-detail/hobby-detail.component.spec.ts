import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyDetailComponent } from './hobby-detail.component';

describe('HobbyDetailComponent', () => {
  let component: HobbyDetailComponent;
  let fixture: ComponentFixture<HobbyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbyDetailComponent]
    });
    fixture = TestBed.createComponent(HobbyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
