import boxen from "boxen";
import color from "ansi-colors";

import { Element } from "./element";
import { Colorable, Sizeable, VerticalAlignable, BoxContent } from "./types";
import { Diagram } from "./diagram";

export interface ContainerOptions
    extends Sizeable,
        Colorable,
        VerticalAlignable {}

export class Container extends Element {
    content: BoxContent;

    constructor(
        content: BoxContent,
        options: Partial<ContainerOptions>,
        diagram: Diagram
    ) {
        super(options, diagram);
        this.content = content || "";
    }

    /**
     * Returns a string representation of the Container
     */
    toString(): string {
        const container = boxen(this.content.toString())
            .split("\n")
            .slice(1, -1)
            .map((line) => line.slice(1, -1))
            .join("\n");

        return this.style(container);
    }

    /**
     * Apply styling to the string as defined by the container options
     */
    style(string: string): string {
        string = super.style(string);

        const heightDiff = this.neighbourHeight.highest - this.height;
        if (heightDiff <= 0) {
            return string;
        }

        const width = color.unstyle(string.split("\n")[0]).length;
        const blankLine = " ".repeat(width) + "\n";
        switch (this.options.verticalAlign) {
            case "middle":
                return blankLine.repeat(heightDiff / 2) + string;
            case "bottom":
                return blankLine.repeat(heightDiff) + string;
            default:
                return string;
        }
    }

    /**
     * The height of the container
     */
    get height(): number {
        if (typeof this.content === "string") {
            return this.content.split("\n").length;
        }
        return this.content.height;
    }
}
