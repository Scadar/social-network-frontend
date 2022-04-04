export interface IFile {
  _id: string;
  name: string;
  type: string;
  accessLink?: string;
  size: number;
  path: string;
  userId: string;
  parentId: string;
  childrenIds: string[];
}
