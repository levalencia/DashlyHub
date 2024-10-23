// app/types/index.ts
export interface Tweet {
    id: string;
    author: string;
    username: string;
    content: string;
    timestamp: string;
    likes: number;
    retweets: number;
    replies: number;
    avatar: string;
  }
  
  export interface ColumnData {
    id: string;
    title: string;
    tweets: Tweet[];
  }