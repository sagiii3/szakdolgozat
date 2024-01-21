import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityWrapComponent } from './activity-wrap.component';

describe('ActivityWrapComponent', () => {
  let component: ActivityWrapComponent;
  let fixture: ComponentFixture<ActivityWrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityWrapComponent]
    });
    fixture = TestBed.createComponent(ActivityWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
