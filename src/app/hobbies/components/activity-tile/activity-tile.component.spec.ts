import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTileComponent } from './activity-tile.component';

describe('ActivityTileComponent', () => {
  let component: ActivityTileComponent;
  let fixture: ComponentFixture<ActivityTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityTileComponent]
    });
    fixture = TestBed.createComponent(ActivityTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
