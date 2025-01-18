import { Gathering } from "./gathering";
import * as lighty from "lighty-type";

export interface Feed {
  id: string;
  content: string;
  images: string[];
  commentCount: number;
  writer: lighty.User;
  createdAt: string;
  gathering: Gathering | null;
}

export interface FeedResponse {
  feeds: Feed[];
  nextCursor: { createdAt: string; id: string };
}
