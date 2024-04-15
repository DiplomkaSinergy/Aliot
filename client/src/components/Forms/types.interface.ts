export enum Forms {
    Auth = 'Auth',
    ForgotPassword = 'ForgotPassword',
    ChangePassword = 'ChangePassword',
}


export type PasswordState = {
    first: boolean;
    second: boolean;
};


export type RegestrationFormValues = {
    firstName: string
    lastName: string
    email: string;
    phone: string
    password: string;
};
export type CreateProductFormValues = {
    name: string,
    count: string,
    img: string,
};


export type LoginFormValues = Pick<RegestrationFormValues, "email" | "password">
export type ChangePasswordFormValues = { secondPassword: string } & Pick<RegestrationFormValues, "password">



