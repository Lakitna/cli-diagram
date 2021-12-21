import color from "ansi-colors";

import { Box, BoxOptions } from "./box";
import { Container, ContainerOptions } from "./container";
import { Line, LineOptions } from "./line";
import { Arrow, ArrowDefinition, ArrowOptions } from "./arrow";
import { Spacer } from "./spacer";
import {
    Colorable,
    Sizeable,
    BoxContent,
    VerticalAlignable,
    Stringable,
} from "./types";
import { Element } from "./element";

interface DiagramOptions extends Sizeable, Colorable, VerticalAlignable {}

export class Diagram extends Array<Element> implements Stringable {
    options: Partial<DiagramOptions>;

    constructor(options: Partial<DiagramOptions> = {}) {
        super();
        this.options = options;
    }

    /**
     * Returns a string representation of the Diagram
     */
    toString(): string {
        return this.draw();
    }

    /**
     * Render a string representation of the Diagram
     */
    draw(): string {
        const elements = this.map((element) => {
            return element.toString().split("\n");
        });

        const lines = Array.from({ length: this.height })
            .fill(null)
            .map((_, index) => {
                return (
                    elements
                        // eslint-disable-next-line unicorn/no-array-reduce
                        .reduce((accumulator, element) => {
                            if (element[index] === null) {
                                return (
                                    accumulator +
                                    " ".repeat(color.unstyle(element[0]).length)
                                );
                            }
                            return accumulator + element[index];
                        }, "")
                        .trimEnd()
                );
            });

        return lines.join("\n").trimEnd();
    }

    /**
     * Get the height of the highest element in the diagram
     */
    get height(): number {
        return Math.max(...this.map((element) => element.height));
    }

    /**
     * Draw an outlined box with some string contents. Content can be multiline.
     * Boxes are flexible enough to contain other diagrams allowing you to
     * create complex nested structures.
     */
    box(contents: BoxContent, options: Partial<BoxOptions> = {}): Diagram {
        options = Object.assign({}, this.options, options);

        this.push(new Box(contents, options, this));
        return this;
    }

    /**
     * A borderless box with some string contents and no padding. Content can
     * be multiline. Containers are flexible enough to contain other diagrams
     * allowing you to create complex nested structures.
     */
    container(
        contents: BoxContent,
        options: Partial<ContainerOptions> = {}
    ): Diagram {
        options = Object.assign({}, this.options, options);

        this.push(new Container(contents, options, this));
        return this;
    }

    /**
     * Draw one or more lines to link elements. Lines spread out to take
     * advantage of the available height.
     */
    line(
        lines: number | string[] = 1,
        options: Partial<LineOptions> = {}
    ): Diagram {
        options = Object.assign({}, this.options, options);

        this.push(new Line(lines, options, this));
        return this;
    }

    /**
     * Draw one or more arrows to link elements. Arrows spread out to take
     * advantage of the available height.
     */
    arrow(
        arrows: (string | ArrowDefinition)[],
        options: Partial<ArrowOptions> = {}
    ): Diagram {
        options = Object.assign({}, this.options, options);

        this.push(new Arrow([...arrows], options, this));
        return this;
    }

    /**
     * Add some space between elements.
     */
    space(size: number | null = null): Diagram {
        this.push(new Spacer(size, this));
        return this;
    }
}
