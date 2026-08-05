import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisLaboratorioList } from './analisis-laboratorio-list';

describe('AnalisisLaboratorioList', () => {
  let component: AnalisisLaboratorioList;
  let fixture: ComponentFixture<AnalisisLaboratorioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisisLaboratorioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisLaboratorioList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
