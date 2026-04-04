export type ResultadoPartida = 'ganada' | 'perdida' | 'empatada';

export interface StatsSummary {
    ganadas: number;
    perdidas: number;
    empatadas: number;
    totalPartidas: number;
}

export interface RankingJugador {
    posicion: number;
    nombre: string;
    usuario: string;
    ganadas: number;
    perdidas: number;
    empatadas: number;
    total: number;
    efectividad: number;
}
