export class RegisterUserDto {
    private constructor(
        public name: string,
        public username: string,
        public password: string,
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, usuario, username, password } = object;
        const userValue = (usuario ?? username ?? '').toString();

        if (!name) return ['Missing name'];
        if (!password) return ['Missing password'];
        if (!userValue) return ['Missing username'];

        return [undefined, new RegisterUserDto(name, userValue.toLowerCase(), password)];
    }
}