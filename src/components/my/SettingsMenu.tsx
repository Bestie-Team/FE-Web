import Flex from "../shared/Flex";
import Spacing from "../shared/Spacing";
import SettingsMenuItem from "./SettingsMenuItem";

export interface SettingsItem {
  title: string;
  info: null | string[];
  link: { href: string; target?: string };
}

export default function SettingsMenu() {
  return (
    <Flex direction="column" className="pt-[32px] gap-[36px]">
      {settings.map((setting) => {
        return (
          <li key={setting.category} className="flex flex-col">
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
      { title: "프로필 편집", info: null, link: { href: "/my/edit" } },
      { title: "피드 관리", info: null, link: { href: "/hidden" } },
    ],
  },
  {
    category: "고객센터",
    list: [
      {
        title: "문의하기",
        info: null,
        link: { href: "https://forms.gle/jNXBCFiiK2ZCo3eZA", target: "_blank" },
      },
      {
        title: "건의하기",
        info: null,
        link: { href: "https://forms.gle/YCbp9AYf3YamubP77", target: "_blank" },
      },
    ],
  },
  {
    category: "기타",
    list: [
      {
        title: "계정 정보",
        info: ["SNS 로그인(카카오)", "eun2763@naver.com"],
        link: { href: "" },
      },
      { title: "앱버전", info: ["V.2.3(최신버전)"], link: { href: "" } },
      {
        title: "탈퇴하기",
        info: null,
        link: { href: "" },
      },
      {
        title: "로그아웃",
        info: null,
        link: { href: "/" },
      },
    ],
  },
];
