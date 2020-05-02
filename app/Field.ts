import FieldSegment from './FieldSegment';
import Snake from './Snake';
import Food from './Food';
import Point from './Point';

export default class Field {
    public readonly width: number;
    public readonly height: number;
    public readonly loop: boolean;
    
    private container: HTMLElement;
    private field: HTMLElement;

    private matrix: FieldSegment[][];
    private used: Point[];
    
    constructor(
        loop: boolean = true,
        container: HTMLElement = document.body,
        width: number = 15,
        height: number = 13,
        tdClass: string = 'td'
    ) {
        this.loop = loop;
        this.container = container;
        this.width = width;
        this.height = height;

        let field: HTMLElement = document.createElement('table');
        let tbody: HTMLElement = document.createElement('tbody');
        let matrix: Array<Array<FieldSegment>> = new Array<Array<FieldSegment>>(height);

        for (let i: number = 0; i < height; i++) {
            matrix[i] = new Array<FieldSegment>(width);
            let tr: HTMLElement = document.createElement('tr');
            
            for (let j: number = 0; j < width; j++) {
                let td: HTMLElement = document.createElement('td');
                td.classList.add(tdClass);
                tr.appendChild(td);

                matrix[i][j] = new FieldSegment(td);
            }

            tbody.appendChild(tr);
        }
        field.appendChild(tbody);

        this.field = field;
        this.matrix = matrix;
        this.used = [];
    }
    
    public draw() {
        this.container.appendChild(this.field);
    }

    public update(snake: Snake, food: Food) {
        this.clear();
        this.used = snake.segments.map((point: Point) => {
            this.matrix[point.y][point.x].snake = true;
            return {
                x: point.x,
                y: point.y,
            };
        });
        this.matrix[food.y][food.x].food = true;
        this.used.push(food);
    }

    public clear() {
        this.used = this.used.filter((point: Point): boolean => {
            this.matrix[point.y][point.x].snake = false;
            this.matrix[point.y][point.x].food = false;
            return false;
        });
    }

    public destroy() {
        this.field.remove();
    }

    public keypress(keypressCallback: (ev: KeyboardEvent) => any) {
        this.container.onkeypress = function(this: GlobalEventHandlers, ev: KeyboardEvent) {
            keypressCallback(ev);
        }
    }
}