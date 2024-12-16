export interface MemberInfo {
  imgUrl: string;
  userId: string;
  name: string;
}

const MEMBERS: MemberInfo[] = [
  {
    imgUrl: "https://d20j4cey9ep9gv.cloudfront.net/yellow.jpg",
    userId: "sky",
    name: "김하늘",
  },
  {
    imgUrl: "https://d20j4cey9ep9gv.cloudfront.net/mich.jpg",
    userId: "summer",
    name: "김여름",
  },
  {
    imgUrl: "https://d20j4cey9ep9gv.cloudfront.net/cute.jpg",
    userId: "choco",
    name: "김초코",
  },
  {
    imgUrl: "https://d20j4cey9ep9gv.cloudfront.net/blanket.jpg",
    userId: "anton",
    name: "이앤톤",
  },
  {
    imgUrl: "https://d20j4cey9ep9gv.cloudfront.net/cat.jpg",
    userId: "stone",
    name: "돌",
  },
];
export default MEMBERS;
