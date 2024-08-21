import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionDevisComponent } from './proposition-devis.component';

describe('PropositionDevisComponent', () => {
  let component: PropositionDevisComponent;
  let fixture: ComponentFixture<PropositionDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropositionDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropositionDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
