import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { QueryFilter } from '../../../core/models/query-filter.model';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../../../core/models/api-response.model';
import { UsuarioCreate } from '../models/usuarioCreate.model';
import { UsuarioUpdate } from '../models/usuarioUpdate.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
    private http = inject(HttpClient  );
  private apiUrl = `${environment.apiUrl}/Usuario`;

 getAll(filter: QueryFilter): Observable<ApiResponse<Usuario[]>> {
  const params = new HttpParams()
    .set('PageNumber', filter.pageNumber)
    .set('PageSize', filter.pageSize)
    .set('Buscar', filter.buscar ?? "");

 return this.http.get<ApiResponse<Usuario[]>>(
  `${this.apiUrl}/filtrar`,
  { params }
);
}

  getById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  create(data: UsuarioCreate): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, data);
  }

  update(id: number, data: UsuarioUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
