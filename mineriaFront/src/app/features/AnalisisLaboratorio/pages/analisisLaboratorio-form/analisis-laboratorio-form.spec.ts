import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisLaboratorioForm } from './analisis-laboratorio-form';

describe('AnalisisLaboratorioForm', () => {
  let component: AnalisisLaboratorioForm;
  let fixture: ComponentFixture<AnalisisLaboratorioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisLaboratorioForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisLaboratorioForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
