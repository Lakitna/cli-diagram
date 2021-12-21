import { Diagram } from "./diagram";
import { Element } from "./element";

export class Spacer extends Element {
    size: number;

    constructor(size: number | null, diagram: Diagram) {
        super({}, diagram);
        this.size = typeof size === "number" ? size : this.options.size;
    }

    /**
     * The width of the Spacer
     */
    get width(): number {
        return this.size * 3;
    }

    /**
     * Returns a string representation of the Spacer
     */
    toString(): string {
        return Array.from({ length: this.diagram.height })
            .fill(" ".repeat(this.width))
            .join("\n");
    }
}
