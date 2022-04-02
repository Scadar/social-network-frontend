import { IUser } from './authModels';
import {ITimestamp} from './base';

export enum ChatRoomType {
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
}

export interface IChatRoom extends ITimestamp {
  _id: string;
  userIds: string[];
  name?: string;
  initiator: string;
  pictureURL?: string;
  type: ChatRoomType;
  user: IUser;
}
