export interface BlogPost {
  read: number;
  _id: string;
  title: string;
  tags: string;
  image: string;
  description: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  visit: number;
}

export interface BlogsResponse {
  message: string;
  data: BlogPost[];
}

export interface BlogResponse {
  message: string;
  data: BlogPost | null;
}
