import { ApiResponse } from "./index"

export namespace Login {
    export interface ReqParams {
        userName:string
        userPwd:string
        publicKey:string
    }

    interface LoginRes {
        currentLoginUser: {
            [key in string]: any
        },
        tokenEntity: {
            tokenId: string
            authorizationToken: string
            refreshToken: string
            refreshExpiresIn: number
            expiresIn: number
        }
    }

    export type Result = ApiResponse<LoginRes>
}