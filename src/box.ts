import boxen from "boxen";
import { Diagram } from "./diagram";

import { Element } from "./element";
import { Colorable, Sizeable, BoxContent } from "./types";

export interface BoxOptions extends Sizeable, Colorable {}

export class Box extends Element {
    content: BoxContent;

    constructor(
        content: BoxContent,
        options: Partial<BoxOptions>,
        diagram: Diagram
    ) {
        super(options, diagram);
        this.content = content || "";
    }

    /**
     * Returns a string representation of the Box
     */
    toString(): string {
        return this.style(
            boxen(this.content.toString(), {
                padding: this.options.size,
            })
        );
    }

    /**
     * The height of the Box
     */
    get height() {
        const contentHeight =
            typeof this.content === "string"
                ? this.content.split("\n").length
                : this.content.height;

        return contentHeight + 2 * (this.options.size + 1);
    }
}
