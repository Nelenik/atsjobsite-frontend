export type TUser = {
  id: number;
  name: string;
  email: string;
  profile_image?: string;
};

export type TAuthorized = { isAuthorized: boolean; user: TUser };
export type TUnauthorized = { isAuthorized: boolean };

export type TSession = { isAuthorized: boolean; user?: TUser };
