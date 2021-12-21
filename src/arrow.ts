import { Line, LineLabel } from "./line";
import { Sizeable, Colorable } from "./types";
import { Diagram } from "./diagram";

export interface ArrowOptions extends Sizeable, Colorable {}
export interface ArrowDefinition {
    direction: ArrowDirection;
    label: string;
}
type ArrowDirection =
    | "left"
    | "<--"
    | "right"
    | "-->"
    | "both"
    | "<->"
    | "broken-left"
    | "x--"
    | "broken-right"
    | "--x"
    | "broken-both"
    | "x-x"
    | "round-left"
    | "o--"
    | "round-right"
    | "--o"
    | "round-both"
    | "o-o"
    | "line"
    | "---";

export class Arrow extends Line {
    directions: ArrowDirection[];

    constructor(
        definitions: (string | ArrowDefinition)[] = [],
        options: Partial<ArrowOptions>,
        diagram: Diagram
    ) {
        super(definitions.length, options, diagram);

        const parsedDefinitions = this.parse(definitions);
        this.directions = parsedDefinitions.map((d) => d.direction);
        this.labels = this.parseLabels(parsedDefinitions.map((d) => d.label));
    }

    /**
     * Returns a string representation of the Arrow
     */
    toString(): string {
        const gap = " ".repeat(this.width);
        const directions = [...this.directions];
        const labels = [...this.labels];

        const result = this.layout
            .map((line) => {
                if (line === true) {
                    const direction = directions.shift() || "line";
                    return this.buildArrow(direction, labels.shift());
                }
                return gap;
            })
            .join("\n");
        return this.style(result);
    }

    /**
     * Parse & normalize the arrow definitions
     */
    private parse(
        definitions: (string | ArrowDefinition)[]
    ): ArrowDefinition[] {
        return definitions.map((definition) => {
            if (typeof definition === "string") {
                const [direction, label] = definition.split(":");
                return {
                    direction: direction.toLowerCase() as ArrowDirection,
                    label,
                };
            }
            return definition;
        });
    }

    /**
     * Build the string representation of the arrow
     */
    buildArrow(direction: ArrowDirection, label?: LineLabel) {
        if (label === undefined) {
            label = null;
        }
        const shaft = this.buildShaft(label);

        switch (direction) {
            case "left":
            case "<--":
                return "◀" + shaft.slice(1);
            case "right":
            case "-->":
                return shaft.slice(0, -1) + "▶";
            case "both":
            case "<->":
                return "◀" + shaft.slice(1, -1) + "▶";

            case "broken-left":
            case "x--":
                return "X" + shaft.slice(1);
            case "broken-right":
            case "--x":
                return shaft.slice(0, -1) + "X";
            case "broken-both":
            case "x-x":
                return "X" + shaft.slice(1, -1) + "X";

            case "round-left":
            case "o--":
                return "O" + shaft.slice(1);
            case "round-right":
            case "--o":
                return shaft.slice(0, -1) + "O";
            case "round-both":
            case "o-o":
                return "O" + shaft.slice(1, -1) + "O";

            default:
                return shaft;
        }
    }
}
