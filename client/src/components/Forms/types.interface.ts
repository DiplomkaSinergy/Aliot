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
    secondName: string
    email: string;
    firstPassword: string;
};

export type LoginFormValues = Pick<RegestrationFormValues, "email" | "firstPassword">
export type ChangePasswordFormValues = { secondPassword: string } & Pick<RegestrationFormValues, "firstPassword">



