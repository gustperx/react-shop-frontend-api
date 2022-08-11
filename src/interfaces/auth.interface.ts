export interface AuthLoginValues {
  email: string;
  password: string;
}

export interface AuthContextInterface {
  user: AuthUser;
  setUser: Function;
}

export interface AuthUser {
  name?: string;
  email?: string;
  logged: boolean;
}
