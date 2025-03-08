import getHeader from "@/utils/getHeader";

const SocialHeader = () => {
  const header = getHeader("/social");
  return (
    <div className={"max-w-[430px] fixed w-full z-10 bg-base-white"}>
      {header}
    </div>
  );
};

export default SocialHeader;
