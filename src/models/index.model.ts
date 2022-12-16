export interface IContact {
  id: string | number;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
export interface ISkill {
  id: string | number;
  name: string;
  description: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
}
export interface ICategory {
  id: string | number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface ISubCategory {
  id: string | number;
  categoryId: string | number;
  category: ICategory;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface IMedia {
  id: string | number;
  subCategoryId: string | number;
  subCategory: ISubCategory;
  src: string | any;
  enabled: boolean;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface IOrganization {
  id: string | number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
export interface IProject {
  id: string | number;
  name: string;
  link: string;
  description: string;
  technical: string;
  date: string | any;
  members: string;
  organizationId: string | number;
  organization: IOrganization;
  images: string;
  subCategoryId: string | number;
  subCategory: ISubCategory;
  createdAt: string;
  updatedAt: string;
}
export interface IBlog {
  id: string | number;
  title: string;
  subTitle: string;
  subCategoryId: string | number;
  subCategory: ISubCategory;
  thumnail: string | number;
  media: IMedia;
  description: string;
  content: string;
  updatedAt: string;
  createdAt: string;
}
export interface IAuth {
  id: string | number;
  email: string;
  password: string;
  avatar: string | number;
  status: number | string;
  resetPasswordStatus: number | string;
  statusObj: ISubCategory;
  avatarObj: IMedia;
  resetPasswordStatusObj: ISubCategory;
  updatedAt: string;
  createdAt: string;
}