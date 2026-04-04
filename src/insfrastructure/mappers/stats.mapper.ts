import { CustomError, RankingJugador, StatsSummary } from '../../domain';

interface RankingWithoutPosition {
    nombre: string;
    usuario: string;
    ganadas: number;
    perdidas: number;
    empatadas: number;
    total: number;
    efectividad: number;
}

export class StatsMapper {
    static statsSummaryFromObject(object: { [key: string]: any }): StatsSummary {
        const ganadas = this.toNonNegativeNumber(object.ganadas);
        const perdidas = this.toNonNegativeNumber(object.perdidas);
        const empatadas = this.toNonNegativeNumber(object.empatadas);

        return {
            ganadas,
            perdidas,
            empatadas,
            totalPartidas: ganadas + perdidas + empatadas,
        };
    }

    static rankingFromObject(object: { [key: string]: any }, posicion: number): RankingJugador {
        const nombre = typeof object.nombre === 'string' ? object.nombre : '';
        const usuario = typeof object.usuario === 'string' ? object.usuario : '';

        if (!nombre) throw CustomError.badRequest('Missing nombre in ranking item');
        if (!usuario) throw CustomError.badRequest('Missing usuario in ranking item');

        return {
            posicion,
            nombre,
            usuario,
            ganadas: this.toNonNegativeNumber(object.ganadas),
            perdidas: this.toNonNegativeNumber(object.perdidas),
            empatadas: this.toNonNegativeNumber(object.empatadas),
            total: this.toNonNegativeNumber(object.total),
            efectividad: this.toNonNegativeNumber(object.efectividad),
        };
    }

    static rankingWithoutPositionFromObject(object: { [key: string]: any }): RankingWithoutPosition {
        const nombre = typeof object.nombre === 'string' ? object.nombre : '';
        const usuario = typeof object.usuario === 'string' ? object.usuario : '';

        if (!nombre) throw CustomError.badRequest('Missing nombre in ranking item');
        if (!usuario) throw CustomError.badRequest('Missing usuario in ranking item');

        const ganadas = this.toNonNegativeNumber(object.ganadas);
        const perdidas = this.toNonNegativeNumber(object.perdidas);
        const empatadas = this.toNonNegativeNumber(object.empatadas);
        const total = this.toNonNegativeNumber(object.total);
        const efectividad = this.toNonNegativeNumber(object.efectividad);

        return {
            nombre,
            usuario,
            ganadas,
            perdidas,
            empatadas,
            total,
            efectividad,
        };
    }

    private static toNonNegativeNumber(value: unknown): number {
        if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
            return 0;
        }

        return value;
    }
}
