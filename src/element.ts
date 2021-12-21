import color from "ansi-colors";
import { Colorable, Sizeable, VerticalAlignable } from "./types";
import { Diagram } from "./diagram";
import { Stringable } from "./types";

export interface ElementOptions
    extends Sizeable,
        Colorable,
        VerticalAlignable {}

export class Element implements Stringable {
    options: ElementOptions;
    diagram: Diagram;

    constructor(options: Partial<ElementOptions>, diagram: Diagram) {
        this.options = Object.assign(
            {
                size: 1,
                color: null,
                verticalAlign: "top",
            },
            options
        );
        this.diagram = diagram;
    }

    toString(): string {
        return "<Element>";
    }

    /**
     * The height of the element
     */
    get height(): number {
        return this.options.size;
    }

    /**
     * The height of the element when existing without other elements
     */
    get ownHeight(): number {
        return this.height;
    }

    /**
     * Return the height of the highest direct neighbour
     */
    get neighbourHeight(): { highest: number; shortest: number } {
        const neighbour: { right: number; left: number } = {
            left: -1,
            right: -1,
        };

        const position = this.position;
        if (position > 0) {
            neighbour.left = this.diagram[position - 1].ownHeight;
        }
        if (position < this.diagram.length - 1) {
            neighbour.right = this.diagram[position + 1].ownHeight;
        }

        const shortest = Math.min(neighbour.left, neighbour.right);
        const highest = Math.max(neighbour.left, neighbour.right);

        return {
            shortest: shortest > 0 ? shortest : 0,
            highest: highest > 0 ? highest : 0,
        };
    }

    /**
     * The position of this element in the Diagram
     */
    get position(): number {
        return this.diagram.findIndex((element) => {
            return element == this;
        });
    }

    /**
     * Apply styling to the string as defined by the elements options
     */
    style(string: string): string {
        if (this.options.color === null) {
            return string;
        }

        const styleFunction = color[this.options.color];
        if (styleFunction === undefined) {
            return string;
        }

        return styleFunction(string);
    }
}
