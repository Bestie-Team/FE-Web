import dynamic from "next/dynamic";
const Header = dynamic(() => import("../components/shared/Header/Header"), {
  ssr: false,
});
const HeaderWithBtn = dynamic(
  () => import("../components/shared/Header/HeaderWithBtn"),
  { ssr: false }
);

type HeaderWithBtnProps = {
  fixed?: boolean;
  headerLabel: string;
  fontColor?: string;
  bgColor?: string;
  icon?: React.ReactNode;
};

type HeaderProps = {
  px?: string;
  icon?: React.ReactNode;
  fixed?: boolean;
  headerLabel: string;
};

type HeaderConfig = {
  [key: string]: {
    component:
      | React.ComponentType<HeaderWithBtnProps>
      | React.ComponentType<HeaderProps>
      | React.ComponentType;

    props?: HeaderProps | HeaderWithBtnProps;
  };
};

export default function useHeader(pathname: string) {
  const headerConfig: HeaderConfig = {
    "/invitation": {
      component: HeaderWithBtn,
      props: { headerLabel: "초대장", bgColor: "white" },
    },
    "/signup": {
      component: HeaderWithBtn,
      props: { headerLabel: "프로필 생성", bgColor: "white" },
    },
    "/feed/edit": {
      component: HeaderWithBtn,
      props: {
        headerLabel: "피드 수정",
      },
    },
    "/social": {
      component: Header,
      props: {
        headerLabel: "소셜",
      },
    },
    "/hidden": {
      component: HeaderWithBtn,
      props: { headerLabel: "피드 관리", bgColor: "white" },
    },
    "/record": {
      component: HeaderWithBtn,
      props: { headerLabel: "기록하기" },
    },
    "/my/edit": {
      component: HeaderWithBtn,
      props: { headerLabel: "프로필 편집" },
    },
    "/my": {
      component: Header,
      props: { headerLabel: "My" },
    },

    "/gathering/": {
      component: HeaderWithBtn,
      props: pathname.endsWith("new")
        ? { headerLabel: "약속 만들기", fixed: false }
        : pathname.endsWith("edit")
        ? { headerLabel: "약속 수정", bgColor: "#FFF" }
        : { fontColor: "#FFF", headerLabel: "약속 상세" },
    },
    "/gathering": {
      component: Header,
      props: { headerLabel: "나의 약속" },
    },
    "/groups": {
      component: HeaderWithBtn,
      props:
        pathname.endsWith("new") || pathname.endsWith("done")
          ? { headerLabel: "그룹 생성", bgColor: "#FFF" }
          : pathname.endsWith("edit")
          ? { headerLabel: "그룹 수정", bgColor: "white" }
          : { headerLabel: "나의 그룹", bgColor: "#f4f4f4" },
    },
  };
  const getMatchedHeader = () => {
    const matchedPath = Object.keys(headerConfig).find(
      (path) => pathname.startsWith(path) || (path === "/" && pathname === "/")
    );

    if (matchedPath) {
      const config = headerConfig[matchedPath];
      const HeaderComponent = config.component;
      if (HeaderComponent === Header)
        return <HeaderComponent {...(config.props as HeaderProps)} />;
      else return <HeaderComponent {...(config.props as HeaderWithBtnProps)} />;
    }

    return null;
  };

  return getMatchedHeader();
}
