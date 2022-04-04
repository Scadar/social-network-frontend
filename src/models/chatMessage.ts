import { IUser } from './authModels';
import {ITimestamp} from './base';

export interface IChatMessageWithSenderDto extends ITimestamp {
  _id: string;
  senderDto: IUser;
  chatRoomId: string;
  message: string;
}

export interface IChatMessage extends ITimestamp {
  _id: string;
  senderId: string;
  chatRoomId: string;
  message: string;
}

