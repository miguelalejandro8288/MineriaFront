export interface AnalisisLaboratorio {
  id: number;
  idLote: number;
  idProducto: number;
  leyOro: number;
  leyPlata: number;
  leyCobre: number;
  impurezasPorcentaje: number;
  estadoAnalisis: string;
  certificadoPdfUrl: string;
}