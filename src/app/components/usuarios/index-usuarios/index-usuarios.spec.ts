import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexUsuarios } from './index-usuarios';

describe('IndexUsuarios', () => {
  let component: IndexUsuarios;
  let fixture: ComponentFixture<IndexUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexUsuarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
