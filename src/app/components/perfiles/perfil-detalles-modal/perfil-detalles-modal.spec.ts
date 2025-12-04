import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDetallesModal } from './perfil-detalles-modal';

describe('PerfilDetallesModal', () => {
  let component: PerfilDetallesModal;
  let fixture: ComponentFixture<PerfilDetallesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilDetallesModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDetallesModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
