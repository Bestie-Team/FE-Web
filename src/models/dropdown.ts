export const MENU_TYPES = {
  COMMENT: "comment",
  FEED_MINE: "feed_mine",
  FRIEND: "friend",
  GROUP: "group",
  FEED: "feed",
  HIDDEN: "hidden",
  GATHERING: "gathering",
  GATHERING_ENDED: "gathering_ended",
} as const;

export type MenuType = (typeof MENU_TYPES)[keyof typeof MENU_TYPES];
