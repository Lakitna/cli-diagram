import { Element } from "./element";
import { Sizeable, Colorable } from "./types";
import { Diagram } from "./diagram";

export interface LineOptions extends Colorable, Sizeable {}
export type LineLabel = string | null;

export class Line extends Element {
    count: number;
    labels: LineLabel[];
    labelWidth = 0;

    constructor(
        lines: number | string[],
        options: Partial<LineOptions>,
        diagram: Diagram
    ) {
        super(options, diagram);
        if (Array.isArray(lines)) {
            this.count = lines.length;
            this.labels = this.parseLabels(lines);
        } else {
            this.count = lines;
            this.labels = this.parseLabels([]);
        }
    }

    /**
     * Returns a string representation of the Line
     */
    toString(): string {
        const gap = " ".repeat(this.width);

        let lineCount = 0;
        const result = this.layout
            .map((line) => {
                if (line === true) {
                    const label = this.labels[lineCount++];
                    return this.buildShaft(label);
                }
                return gap;
            })
            .join("\n");
        return this.style(result);
    }

    /**
     * The width of the lines
     */
    get width(): number {
        const width = this.options.size * 3 + 1;

        if (this.labelWidth > 0) {
            return width + 2 + this.labelWidth;
        }
        return width;
    }

    /**
     * The height of the lines element based on it's neighbouring elements and
     * line count
     */
    get height(): number {
        return Math.max(this.neighbourHeight.shortest, this.ownHeight);
    }

    /**
     * The height of the lines if they where not surrounded by other elements
     */
    get ownHeight(): number {
        return this.count;
    }

    /**
     * The spacing of the lines returned as a boolean list
     */
    get layout(): boolean[] {
        const whitespace = this.height - this.count;
        let gapSize = whitespace / this.count;

        let topPadding = 0;
        if (gapSize < 1) {
            gapSize = 0;
            topPadding = whitespace / 2;
        } else {
            topPadding = Math.round(
                (whitespace - gapSize * (this.count - 1)) / 2
            );
        }

        const layout: boolean[] = Array.from<boolean>({
            length: this.height,
        }).fill(false);

        let position = topPadding;
        for (let index = 0; index < this.count; index++) {
            layout[Math.floor(position)] = true;
            position += 1 + gapSize;
        }

        return layout;
    }

    /**
     * Parse and normalize the labels
     */
    parseLabels(labels: LineLabel[]): LineLabel[] {
        this.labelWidth = 0;
        for (const label of labels) {
            if (typeof label === "string") {
                this.labelWidth = Math.max(this.labelWidth, label.length);
            }
        }

        return labels.map((label) => {
            if (typeof label === "string") {
                return label.padEnd(this.labelWidth);
            }
            return label;
        });
    }

    /**
     * Build the string representation of the line with label
     */
    buildShaft(label: LineLabel): string {
        let shaft = "─";

        if (typeof label !== "string") {
            shaft = shaft.repeat(this.width);
        } else {
            const shaftLength = (this.width - this.labelWidth - 1) / 2;
            shaft =
                shaft.repeat(shaftLength) +
                `┤${label}├` +
                shaft.repeat(shaftLength);
        }

        return shaft;
    }
}
