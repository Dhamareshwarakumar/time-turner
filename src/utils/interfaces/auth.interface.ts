export interface IRegisterUserReqBody {
    name: string;
    email: string;
    password: string;
}
export interface ILoginUserReqBody {
    email: string;
    password: string;
}
