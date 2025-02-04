// Province Type
export interface Province {
  id: number;
  name: string;
  code: string;
  password: string;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
  drugInfos?: Drug[]; // Relation to DrugInfo
}

// DrugInfo Type
export interface Province {
  id: number;
  name: string;
  code: string;
  password: string;
}

export interface Drug {
  id: number;
  startAge: number;
  endAge: number;
  gender: string;
  race: string;
  startDate: string;
  endDate: string;
  drugName: string;
  price: number;
  location: string;
  usersCount: number;
  ProvinceCode: string;
  Province: Province;
  [key: string]: any; // Add this line to allow any other properties
}
export interface Row {
  id: number;
  startAge: number;
  endAge: number;
  gender: string;
  race: string;
  startDate: string;
  endDate: string;
  drugName: string;
  price: number;
  location: string;
  usersCount: number;
  code: string;
  provinceName: string;
}

// SuperUser Type
export interface SuperUser {
  id: number;
  username: string;
  password: string;
}

// ResearchWithUs Type
export interface ResearchWithUs {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  collaborators: string[];
  documentUrl: string;
  postDate: Date;
}

// Research Type
export interface Research {
  id: number;
  publicationDate: string;
  title: string;
  author: string;
  abstract: string;
  imageUrl: string;
  documentUrl: string;
}

// News Type
export interface News {
  id: number;
  date: Date;
  title: string;
  body: string;
  imageUrl: string;
}

// Gender Enum Type
export enum Gender {
  male = 'male',
  female = 'female',
}

// Picture Type
export interface Image {
  id: number;
  imageUrl: string;
  PeerOutreachId?: number | null;
  PeerOutreach?: PeerOutreach | null;
  date: Date;
  ImageCollectionTitle?: string | null;
  collection?: ImageCollection | null;
}

// ImageCollection Type
export interface ImageCollection {
  id: number;
  title: string;
  date: Date;
  pictures: Image[];
}

// PeerOutreach Type
export interface PeerOutreach {
  id: number;
  theme: string;
  location: string;
  images: Image[];
  From: Date;
  To: Date;
  description: string;
  body: string;
}

// WorkingPaper Type
export interface WorkingPaper {
  id: number;
  title: string;
  abstract: string;
  date: Date;
  documentUrl: string;
}
