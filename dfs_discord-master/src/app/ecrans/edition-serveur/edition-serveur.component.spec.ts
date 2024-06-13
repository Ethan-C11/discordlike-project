import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionServeurComponent } from './edition-serveur.component';

describe('EditionServeurComponent', () => {
  let component: EditionServeurComponent;
  let fixture: ComponentFixture<EditionServeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditionServeurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionServeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
