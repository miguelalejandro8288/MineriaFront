import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { AnalisisLaboratorioService } from '../../services/analisis-laboratorio';
import { NotificationService } from '../../../../core/services/notification';
import { Router } from 'express';
import { AnalisisLaboratorio } from '../../models/AnalisisLaboratorio.model';
import { QueryFilter } from '../../../../core/models/query-filter.model';
import { MetaData } from '../../../../core/models/metadata.model';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';

@Component({
  selector: 'app-analisis-laboratorio-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
],
  templateUrl: './analisis-laboratorio-list.html',
  styleUrl: './analisis-laboratorio-list.css',
})
export class AnalisisLaboratorioList implements OnInit {

  private analisisService = inject(AnalisisLaboratorioService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  analisis: AnalisisLaboratorio[] = [];
  displayedColumns: string[] = ['id', 'leyOro', 'leyPlata', 'leyCobre', 'impurezas', 'estadoAnalisis', 'certificadoPdfUrl','idUsuarioLaboratio', 'acciones'];
  loading = false;

  buscarControl = new FormControl('', { nonNullable: true });

  filter: QueryFilter = {
    pageNumber: 1,
    pageSize: 10,
    buscar: ''
  };

  meta: MetaData = {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false
  };

  ngOnInit(): void {
    this.cargarUsuarios();

    this.buscarControl.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(valor => {
        this.filter.buscar = valor;
        this.filter.pageNumber = 1;
        this.cargarUsuarios();
      });
  }

  cargarUsuarios(): void {
    this.loading = true;

    this.analisisService.getAll(this.filter)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.analisis = response.data;
          this.meta = response.meta;
        },
        error: () => {
          this.notificationService.error('No se pudo cargar la lista de analisis.');
        }
      });
  }

  cambiarPagina(event: PageEvent): void {
    this.filter.pageNumber = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.cargarUsuarios();
  }

  nuevo(): void {
    this.router.navigate(['/analisis/nuevo']);
  }

  editar(id: number): void {
    this.router.navigate(['/analisis/editar', id]);
  }

  eliminar(id: number): void {
    const confirmado = confirm('¿Está seguro de eliminar este analisis?');

    if (!confirmado) {
      return;
    }

    this.loading = true;

    this.analisisService.delete(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.notificationService.success('Análisis eliminado correctamente.');

          if (this.analisis.length === 1 && this.filter.pageNumber > 1) {
            this.filter.pageNumber--;
          }

          this.cargarUsuarios();
        },
        error: () => {
          this.notificationService.error('No se pudo eliminar el analisis.');
        }
      });
  }
}


