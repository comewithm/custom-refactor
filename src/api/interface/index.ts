export interface ApiResponse<T> {
    code: number;
    data?: T;
    msg: string;
    success: boolean;
}

export namespace Login {
    export interface ReqParams {
        userName: string;
        userPwd: string;
        publicKey: string;
    }

    export interface LoginRes {
        currentLoginUser: {
            [key in string]: any;
        };
        tokenEntity: {
            tokenId?: string;
            authorizationToken: string;
            refreshToken: string;
            refreshExpiresIn?: number;
            expiresIn: number;
        };
    }

    export type Result = ApiResponse<LoginRes>;
}


export interface ReqPage {
    /**
     * 页数
     */
    pageNo?: number;
    /**
     * 页码
     */
    pageSize?: number;
}

export interface ResPage<T> {
    endRow?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    isFirstPage?: boolean;
    isLastPage?: boolean;
    list: T[];
    navigateFirstPage?: number;
    navigateLastPage?: number;
    navigatepageNums?: number[];
    navigatePages?: number;
    nextPage?: number;
    pageNum?: number;
    pages?: number;
    pageSize?: number;
    prePage?: number;
    size?: number;
    startRow?: number;
    total?: number;
    [property: string]: any;
}