import mongoose, { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export interface FolderInput {
  folderId: string;
  name: string;
  count: number;
}

export interface FolderDocument extends FolderInput, Document {
  createdAt: Date;
  modifiedAt: Date;
}

// Folder model
const folderSchema = new mongoose.Schema({
  folderId: {
    type: String,
    required: true,
    unique: true,
    default: () => `folder_${nanoid()}`,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    required: true,
    default: 1,
  },
});

export const FolderModel = mongoose.model<FolderDocument>(
  'folder',
  folderSchema
);
