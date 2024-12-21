import { signOut } from "next-auth/react";
import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import SettingsMenuItem from "./SettingsMenuItem";

export interface SettingsItem {
  title: string;
  info: null | string[];
  link?: string;
  onClick?: () => Promise<undefined>;
}

export default function SettingsMenu() {
  return (
    <Flex
      direction="column"
      style={{
        paddingTop: "32px",
        gap: "36px",
      }}
    >
      {settings.map((setting) => {
        return (
          <li
            key={setting.category}
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span className="px-[20px] text-C1 text-grayscale-400">
              {setting.category}
            </span>
            {setting.list.map((list: SettingsItem, idx) => {
              return (
                <ul key={idx}>
                  <Spacing size={8} />
                  <SettingsMenuItem list={list} link={list.link} />
                </ul>
              );
            })}
          </li>
        );
      })}
    </Flex>
  );
}
const settings = [
  {
    category: "계정관리",
    list: [
      { title: "프로필 편집", info: null, link: "/my/edit" },
      { title: "피드 관리", info: null, link: "" },
    ],
  },
  {
    category: "고객센터",
    list: [
      { title: "문의하기", info: null, link: "" },
      { title: "건의하기", info: null, link: "" },
    ],
  },
  {
    category: "기타",
    list: [
      {
        title: "계정 정보",
        info: ["SNS 로그인(카카오)", "eun2763@naver.com"],
      },
      { title: "앱버전", info: ["V.2.3(최신버전)"] },
      { title: "탈퇴하기", info: null, link: "" },
      {
        title: "로그아웃",
        info: null,
        link: "/",
        onClick: async () => await signOut({ callbackUrl: "/" }),
      },
    ],
  },
];
