import { signal } from "@preact/signals-react";
import environments from "../components/constants/Environments.ts";

export const currentEnvironment = signal(environments[3])
export const currentSats = signal("")
export const currentConsolelog = signal("")
export const currentDebugLog = signal("")