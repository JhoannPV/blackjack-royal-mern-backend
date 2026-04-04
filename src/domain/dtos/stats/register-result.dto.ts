import { ResultadoPartida } from '../../reusable/interfaces/stats.interface';

export class RegisterResultDto {
    private constructor(
        public resultado: ResultadoPartida,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterResultDto?] {
        const { resultado } = object;

        if (!resultado) return ['Missing resultado'];

        if (!['ganada', 'perdida', 'empatada'].includes(resultado)) {
            return ['Invalid resultado'];
        }

        return [undefined, new RegisterResultDto(resultado as ResultadoPartida)];
    }
}
