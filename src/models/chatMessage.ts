import { IUser } from './authModels';
import {ITimestamp} from './base';

export interface IChatMessage extends ITimestamp {
  _id: string;
  senderDto: IUser;
  chatRoomId: string;
  message: string;
}
