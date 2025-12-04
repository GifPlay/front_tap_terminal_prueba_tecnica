import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDetallesModal } from './usuario-detalles-modal';

describe('UsuarioDetallesModal', () => {
  let component: UsuarioDetallesModal;
  let fixture: ComponentFixture<UsuarioDetallesModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDetallesModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDetallesModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
