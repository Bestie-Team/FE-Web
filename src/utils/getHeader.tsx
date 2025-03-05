import Header from "@/components/shared/Header/Header";
import HeaderWithBackBtn from "@/components/shared/Header/HeaderWithBtn";

type HeaderWithBtnProps = {
  pageName: string;
  color?: string;
  fontColor?: string;
  icon?: React.ReactNode;
  fixedNot?: boolean;
};

type HeaderProps = {
  pageName: string;
  icon?: React.ReactNode;
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
      component: HeaderWithBackBtn,
      props: { pageName: "초대장", color: "white" },
    },
    "/signup": {
      component: HeaderWithBackBtn,
      props: { pageName: "프로필 생성", color: "white" },
    },
    "/feed/edit": {
      component: HeaderWithBackBtn,
      props: {
        pageName: "피드 수정",
      },
    },
    "/feed": {
      component: Header,
      props: {
        pageName: "추억 피드",
      },
    },
    "/social": {
      component: Header,
      props: {
        pageName: "소셜",
      },
    },
    "/hidden": {
      component: HeaderWithBackBtn,
      props: { pageName: "피드 관리", color: "white" },
    },
    "/record": {
      component: HeaderWithBackBtn,
      props: { pageName: "기록하기", color: "transparent" },
    },
    "/my/edit": {
      component: HeaderWithBackBtn,
      props: { pageName: "프로필 편집" },
    },
    "/my": {
      component: Header,
      props: { pageName: "My" },
    },

    "/gathering/": {
      component: HeaderWithBackBtn,
      props: pathname.endsWith("new")
        ? { pageName: "약속 만들기", color: "transparent", fixedNot: true }
        : pathname.endsWith("edit")
        ? { pageName: "약속 수정", color: "#FFF" }
        : { fontColor: "#FFF", pageName: "약속 상세" },
    },
    "/gathering": {
      component: Header,
      props: { pageName: "나의 약속" },
    },
    "/groups": {
      component: HeaderWithBackBtn,
      props:
        pathname.endsWith("new") || pathname.endsWith("done")
          ? { pageName: "그룹 생성", color: "#FFF" }
          : pathname.endsWith("edit")
          ? { pageName: "그룹 수정", color: "white" }
          : { pageName: "나의 그룹", color: "#f4f4f4" },
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

    // // Special case for "/?ref=signup"
    // if (pathname === "/?ref=signup") {
    //   return <BackgroundReversibleHeader />;
    // }

    return null;
  };

  return getMatchedHeader();
}
