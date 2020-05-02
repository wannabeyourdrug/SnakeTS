import Field from "./Field";
import Snake from "./Snake";
import Point from "./Point";

export default class Food implements Point {
    public readonly x: number;
    public readonly y: number;

    constructor(field: Field, snake: Snake) {
        do {
            this.x = this.rnd(field.width);
            this.y = this.rnd(field.height);
        } while(snake.segments.filter(point => this.x == point.x && this.y == point.y).length);
    }

    private rnd(n: number): number {
        return Math.floor(Math.random() * n);
    }
}