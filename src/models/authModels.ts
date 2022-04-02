import {UserToUserRelationship} from './friendModels';

export interface IUser {
  _id: string
  phone?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActivated: boolean;
  activationLink?: string;
  pictureURL?: string;
  statusDescription?: string;
  gender: 'male' | 'female';
}

export interface IUserWithFriendStatus extends IUser {
  friendStatus: UserToUserRelationship;
}

export interface RefreshTokenData {
  refreshToken: string;
  refreshExpiresIn: number;
}

export interface AccessTokenData {
  accessToken: string;
  accessExpiresIn: number;
}

export interface TokenData extends RefreshTokenData, AccessTokenData {
}

export interface AuthResponse extends TokenData {
  user: IUser;
}

export interface RefreshResponse extends AccessTokenData {
  user: IUser;
}
