
export class Usuario {
    constructor (
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,                  // el signo ? es xq esa propiedad es opcional
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}
}