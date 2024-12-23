export interface MemberInfo {
  imgUrl: string;
  userId: string;
  name: string;
}

const MEMBERS: MemberInfo[] = [
  {
    imgUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/yellow.jpg",
    userId: "sky",
    name: "김하늘",
  },
  {
    imgUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/mich.jpg",
    userId: "summer",
    name: "김여름",
  },
  {
    imgUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cute.jpg",
    userId: "choco",
    name: "김초코",
  },
  {
    imgUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/blanket.jpg",
    userId: "anton",
    name: "이앤톤",
  },
  {
    imgUrl: "https://d1al3w8x2wydb3.cloudfront.net/images/cat.jpg",
    userId: "stone",
    name: "돌",
  },
];
export default MEMBERS;
