import React from "react";
import { ContextStore } from "../library";
import { SimplexContext } from "./SimplexContext";

type IProps = {
  children: any;
}

export const SimplexStateProvider: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <SimplexContext.Provider value={{ contextStore: new ContextStore() }}>
      {children}
    </SimplexContext.Provider>
  )
}
