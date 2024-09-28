import Steps from "@/components/Steps";

const { default: MaxWidthWrapper } = require("@/components/MaxWidthWrapper");

const Layout = ({ children }) => {
  return (
    <MaxWidthWrapper className=" flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
