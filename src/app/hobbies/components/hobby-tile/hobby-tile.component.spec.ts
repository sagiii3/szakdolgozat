import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbyTileComponent } from './hobby-tile.component';

describe('HobbyTileComponent', () => {
  let component: HobbyTileComponent;
  let fixture: ComponentFixture<HobbyTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HobbyTileComponent]
    });
    fixture = TestBed.createComponent(HobbyTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
