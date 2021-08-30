import React from "react";
import { ContextStore } from "../library";

export const SimplexContext = React.createContext({ contextStore: new ContextStore() });
