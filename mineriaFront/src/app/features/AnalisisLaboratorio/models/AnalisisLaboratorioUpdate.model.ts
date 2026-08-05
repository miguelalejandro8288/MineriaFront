export interface AnalisisLaboratorioUpdate {
  id: number;
  leyOro: number;
  leyPlata: number;
  leyCobre: number;
  impurezasPorcentaje: number;
  estadoAnalisis: string;
  certificadoPdfUrl: string;
  idUsuarioLaboratorio: number;
}