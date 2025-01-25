import Flex from "./Flex";
import Text from "./Text";
import Spacing from "./Spacing";
import DotSpinner from "./Spinner/DotSpinner";

function FullPageLoader({ message }: { message?: string }) {
  return (
    <div
      id="fullPageLoader"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.4,
        backgroundColor: "#f8f8f8",
      }}
    >
      <Flex direction="column" align="center">
        <DotSpinner width={40} height={40} />
        {message != null ? (
          <>
            <Spacing size={120} />
            <Text>{message}</Text>
          </>
        ) : null}
      </Flex>
    </div>
  );
}

export default FullPageLoader;
