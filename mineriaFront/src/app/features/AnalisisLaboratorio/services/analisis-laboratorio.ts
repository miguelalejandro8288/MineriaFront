import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryFilter } from '../../../core/models/query-filter.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { AnalisisLaboratorio } from '../models/AnalisisLaboratorio.model';
import { AnalisisLaboratorioCreate } from '../models/AnalisisLaboratorioCreate.model';
import { AnalisisLaboratorioUpdate } from '../models/AnalisisLaboratorioUpdate.model';


@Injectable({
  providedIn: 'root',
})
export class AnalisisLaboratorioService {
    private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/analisis-laboratorio`;

  getAll(filter: QueryFilter): Observable<ApiResponse<AnalisisLaboratorio []>> {
    const params = new HttpParams()
      .set('PageNumber', filter.pageNumber)
      .set('PageSize', filter.pageSize)
      .set('Buscar', filter.buscar || '');

    return this.http.get<ApiResponse<AnalisisLaboratorio[]>>(this.apiUrl, { params });
  }

  getById(id: number): Observable<AnalisisLaboratorio> {
    return this.http.get<AnalisisLaboratorio>(`${this.apiUrl}/${id}`);
  }

  create(data: AnalisisLaboratorioCreate): Observable<AnalisisLaboratorio> {
    return this.http.post<AnalisisLaboratorio>(this.apiUrl, data);
  }

  update(id: number, data: AnalisisLaboratorioUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


