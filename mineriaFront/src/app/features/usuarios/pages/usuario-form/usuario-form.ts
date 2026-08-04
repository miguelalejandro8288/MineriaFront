import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';
import { NotificationService } from '../../../../core/services/notification.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  editando = false;
  usuarioId = 0;
  titulo = 'Nuevo usuario';
  loading = false;

  form = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(100)]],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: [''],
    rol: ['', [Validators.required]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editando = true;
      this.usuarioId = Number(id);
      this.titulo = 'Editar usuario';

      this.form.get('contrasena')?.clearValidators();
      this.form.get('contrasena')?.updateValueAndValidity();

      this.cargarUsuario(this.usuarioId);
    } else {
      this.form.get('contrasena')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('contrasena')?.updateValueAndValidity();
    }
  }

  cargarUsuario(id: number): void {
    this.loading = true;

    this.usuarioService.getById(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: usuario => {
          this.form.patchValue({
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
            contrasena: ''
          });
        },
        error: () => {
          this.notificationService.error('No se pudo cargar el usuario.');
          this.router.navigate(['/usuarios']);
        }
      });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.error('Complete correctamente el formulario.');
      return;
    }

    if (this.editando) {
      this.actualizar();
    } else {
      this.crear();
    }
  }

  crear(): void {
    const data = {
      nombre: this.form.value.nombre!,
      correo: this.form.value.correo!,
      contrasena: this.form.value.contrasena!,
      rol: this.form.value.rol!
    };

    this.loading = true;

    this.usuarioService.create(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.notificationService.success('Usuario creado correctamente.');
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          const mensaje = error?.error?.mensaje || 'No se pudo crear el usuario.';
          this.notificationService.error(mensaje);
        }
      });
  }

  actualizar(): void {
    const data = {
      id: this.usuarioId,
      nombre: this.form.value.nombre!,
      correo: this.form.value.correo!,
      contrasena: this.form.value.contrasena || null,
      rol: this.form.value.rol!
    };

    this.loading = true;

    this.usuarioService.update(this.usuarioId, data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.notificationService.success('Usuario actualizado correctamente.');
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          const mensaje = error?.error?.mensaje || 'No se pudo actualizar el usuario.';
          this.notificationService.error(mensaje);
        }
      });
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
