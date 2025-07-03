import React, { PropsWithChildren } from "react";

const BlankLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default BlankLayout;
