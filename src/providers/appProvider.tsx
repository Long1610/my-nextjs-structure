import React from "react";
import { UserProvider } from "./userContext";
import { combineComponents } from "utils/combineContexts";

const providers = [UserProvider];
export const AppProvider = combineComponents(...providers);
