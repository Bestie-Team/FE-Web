import { FeedGathering, Gathering } from "./gathering";
import * as lighty from "lighty-type";

export interface Feed {
  id: string;
  content: string;
  images: string[];
  commentCount: number;
  writer: lighty.User;
  createdAt: string;
  gathering: FeedGathering | null;
}

export interface FeedResponse {
  feeds: Feed[];
  nextCursor: { createdAt: string; id: string };
}

export interface FeedCommentResponse {
  id: string;
  writer: lighty.User;
  content: string;
  createdAt: string;
}
