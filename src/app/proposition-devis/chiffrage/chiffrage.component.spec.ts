import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffrageComponent } from './chiffrage.component';

describe('ChiffrageComponent', () => {
  let component: ChiffrageComponent;
  let fixture: ComponentFixture<ChiffrageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiffrageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChiffrageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
