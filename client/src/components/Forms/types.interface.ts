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
    // first_name: string
    // last_name: string
    email: string;
    phone: string
    password: string;
};
export type CreateProductFormValues = {
    name: string
    price: string
    picture: string
    brandId: number
    breakingCapacityId: number
    degreeProectionId: number
    displayId: number
    numberPolesId: number
    ratedCurrentId: number
    ratedVoltageId: number
    shutdownCruveId: number
    typeOfMechanismId: number
};


export type LoginFormValues = Pick<RegestrationFormValues, "email" | "password">
export type ChangePasswordFormValues = { secondPassword: string } & Pick<RegestrationFormValues, "password">



