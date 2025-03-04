export interface IAuthResponse {
  token: {
    access_token: string;
    token_type: string;
    expires_in: number;
    ok: boolean;
  };
  userToken: {
    token: string;
    expiration: number;
  };
}
