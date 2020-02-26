declare module 'cli-diagram' {
  class Diagram extends Array {
    constructor(options?: object);

    draw(): string;
    height: number;
    box(contents: string, options?: object): Diagram;
    container(contents: string, options?: object): Diagram;
    lines(lines: number | string[], options?: object): Diagram;
    arrow(arrows: string[] | { direction: string, label: string }[], options?: object): Diagram;
    space(size?: number): Diagram;
  }

  export = Diagram;
}