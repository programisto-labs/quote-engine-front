import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauDevisComponent } from './nouveau-devis.component';

describe('NouveauDevisComponent', () => {
  let component: NouveauDevisComponent;
  let fixture: ComponentFixture<NouveauDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NouveauDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NouveauDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
