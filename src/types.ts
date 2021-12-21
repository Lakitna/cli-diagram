import { StylesType } from "ansi-colors";

export interface Sizeable {
    size: number;
}

export interface Colorable {
    color: keyof StylesType<string> | null;
}

export interface VerticalAlignable {
    verticalAlign: "top" | "middle" | "bottom";
}

export interface Stringable {
    toString: () => string;
    height: number;
}

export type BoxContent = string | Stringable;
