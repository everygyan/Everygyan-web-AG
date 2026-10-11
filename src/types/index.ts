export interface MenuItem {
  id: string;
  title: string;
  href: string;
  type?: "category" | "destination" | "tag" | "page" | "custom_url";
  children?: MenuItem[];
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  videoUrl?: string;
  category: {
    name: string;
    slug: string;
  };
  destination?: {
    name: string;
    slug: string;
    country: string;
  };
  tags: string[];
  author: Author;
  publishedAt: string;
  readingTime: string;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  country: string;
  image: string;
  articleCount: number;
  description: string;
}
