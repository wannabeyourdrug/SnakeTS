import SnakeSegment from './SnakeSegment';
import Field from './Field';
import Point from './Point';

enum Direction {
    Up = 0,
    Down,
    Left,
    Right
}

export default class Snake {
    public segments: SnakeSegment[];
    
    private field: Field;

    constructor(field: Field) {
        this.field = field;
        this.segments = [];
        this.segments.push(new SnakeSegment(Math.round(this.field.width / 2) - 1, Math.round(this.field.height / 2) - 1));
    }

    public get length(): number {
        return this.segments.length;
    }

    public get head(): Point {
        return {
            x: this.segments[this.segments.length - 1].x,
            y: this.segments[this.segments.length - 1].y,
        };
    }
    public get tail(): Point {
        return {
            x: this.segments[0].x,
            y: this.segments[0].y,
        };
    }

    public move(direction: Direction): boolean {
        let x = this.head.x;
        let y = this.head.y;

        switch (direction) {
            case Direction.Up:
                y -= 1;
                break;
            case Direction.Right:
                x += 1;
                break;
            case Direction.Down:
                y += 1;
                break;
            case Direction.Left:
                x -= 1;
                break;
        }

        // проверка на выход за поле если надо
        if (
            !this.field.loop && (
                x < 0 || x >= this.field.width ||
                y < 0 || y >= this.field.height
            )
        ) return false;

        x = (this.field.width + x) % this.field.width;
        y = (this.field.height + y) % this.field.height;

        // проверка на едение самого себя
        if (this.segments.filter((p: Point) => p.x == x && p.y == y).length) return false;

        this.segments.push(new SnakeSegment(x, y));
        this.segments.splice(0, 1);
        return true;
    }

    public add(point: Point) {
        this.segments.unshift(new SnakeSegment(point.x, point.y));
    }
}