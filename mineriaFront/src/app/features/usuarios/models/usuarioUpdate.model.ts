export interface UsuarioUpdate {
  id: number;
  nombre: string;
  correo: string;
  contrasena?: string | null;
  rol: string;
}
