export class LoginUserDto {
    private constructor(
        public username: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
        const { usuario, username, password } = object;
        const userValue = (usuario ?? username ?? '').toString();

        if (!userValue) return ['Missing username'];
        if (!password) return ['Missing password'];

        return [undefined, new LoginUserDto(userValue.toLowerCase(), password)];
    }
}