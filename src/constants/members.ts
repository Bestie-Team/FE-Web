export interface MemberInfo {
  imageUrl: string;
  userId: string;
  name: string;
}

const MEMBERS: MemberInfo[] = [
  {
    imageUrl: "https://cdn.lighty.today/yellow.jpg",
    userId: "sky",
    name: "김하늘",
  },
  {
    imageUrl: "https://cdn.lighty.today/mich.jpg",
    userId: "summer",
    name: "김여름",
  },
  {
    imageUrl: "https://cdn.lighty.today/cute.jpg",
    userId: "choco",
    name: "김초코",
  },
  {
    imageUrl: "https://cdn.lighty.today/blanket.jpg",
    userId: "anton",
    name: "이앤톤",
  },
  {
    imageUrl: "https://cdn.lighty.today/cat.jpg",
    userId: "stone",
    name: "돌",
  },
];
export default MEMBERS;
