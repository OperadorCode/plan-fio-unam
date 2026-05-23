export interface CreditBlock {
  sigla: string;
  nombre: string;
  coeficiente_k: number;
  horas_totales_bloque: number;
  creditos_totales_bloque: number;
}

export interface CreditSubject {
  cuatrimestre?: string;
  codigo: string;
  nombre: string;
  HPS?: number | null;
  HPT: number;
  HAT: number;
  CHT: number;
  CRE: number;
  bloque: string;
  isTULOC?: boolean;
  isBUI?: boolean;
  isTUEM?: boolean;
  isTUEA?: boolean;
  isTUGPP?: boolean;
  [key: string]: unknown;
}

export interface CreditYear {
  anio: number | string;
  asignaturas: CreditSubject[];
}

export interface CreditSystemTotals {
  HPT_total: number;
  HAT_total: number;
  CHT_total: number;
  CRE_total: number;
}

export interface CreditSystemData {
  carrera: string;
  referencias_siglas: Record<string, string>;
  bloques_conocimiento: CreditBlock[];
  plan_de_estudios: CreditYear[];
  totales_plan_estudios: CreditSystemTotals;
}
