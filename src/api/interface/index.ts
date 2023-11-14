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
