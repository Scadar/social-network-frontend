import {ITimestamp} from './base';

export interface IFile extends ITimestamp{
  _id: string;
  name: string;
  type: string;
  accessLink?: string;
  size: number;
  fullPath: string;
  parentPath: string;
  userId: string;
  parentId: string;
  childrenIds: string[];
}
