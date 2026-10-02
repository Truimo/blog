import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints.js";

export interface Tag {
  name: string;
  color: string;
}

export interface Category {
  name: string;
  color: string;
}

export interface Friend {
  name: string;
  link: string;
  avatar: string;
}

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: Tag[];
  category: Category;
}

export interface PostsResponse {
  posts: PostMeta[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PostQuery {
  pageSize: number;
  cursor?: string;
}

export type Block = (
  | {
      has_children: true;
      children: Block[];
    }
  | {
      has_children: false;
      children: null;
    }
) &
  BlockObjectResponse;

export type { PageObjectResponse };
