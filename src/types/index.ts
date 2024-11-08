export type Platform = 'douyin' | 'tiktok' | 'xiaohongshu' | 'instagram' | 'twitter' | 'x' | 'google';

export type ContentType = 'text' | 'audio' | 'video';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  connectedPlatforms: Platform[];
}

export interface Content {
  id: string;
  platform: Platform;
  type: ContentType;
  title: string;
  url: string;
  thumbnail?: string;
  dateAdded: string;
  platformData: Record<string, unknown>;
}