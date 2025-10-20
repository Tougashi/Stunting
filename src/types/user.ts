export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  no_hp: string;
  password: string;
  profile_image?: string;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  no_hp: string;
  profile_image?: string;
}
