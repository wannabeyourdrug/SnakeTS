import Field from './Field';
import Snake from './Snake';
import Food from './Food';
import Point from './Point';

enum Status {
    Menu = 0,
    Game,
    Paused,
    Gameover
}

enum Direction {
    Up = 0,
    Down,
    Left,
    Right
}

export default class Game {
    private field: Field;
    private snake: Snake;
    private food: Food;

    private status: Status = Status.Game;
    private direction: Direction = Direction.Right;

    private highscore: number = 0;

    // service
    private tickIntervalId: number;
    private tickInterval: number;
    private speed: number;
    
    constructor(
        loopField: boolean = true,
        tickInterval: number = 1000
    ) {
        this.tickInterval = tickInterval;
        this.speed = tickInterval;

        this.field = new Field(loopField);
        this.field.keypress(this.keypress.bind(this));
        this.field.draw();
        this.init();
    }

    private init() {
        this.tickIntervalId = 0;
        this.speed = this.tickInterval;
        this.snake = new Snake(this.field);
        this.food = new Food(this.field, this.snake);
    }

    public start() {
        this.status = Status.Game;
        this.tickIntervalId = this.loop();
    }

    private loop(): number {
        if (this.status == Status.Game) {
            this.tick();
            return setTimeout(this.loop.bind(this), this.speed);
        }
        if (this.status == Status.Gameover) {
            return setTimeout(() => {
                this.clear();
                this.init();
                this.start();
            }, 3000);
        }
        return this.tickIntervalId;
    }

    // проверка столкновений так себе, надо переделать
    private tick() {
        let tail = this.snake.tail;
        if (!this.snake.move(this.direction)) {
            let score = this.snake.length - 1;
            this.highscore = Math.max(score, this.highscore);
            alert('Score: ' + score + '\nHighscore: ' + this.highscore);

            this.status = Status.Gameover;
        } else {
            if (this.snake.head.x == this.food.x && this.snake.head.y == this.food.y) {
                this.snake.add(tail);
                this.food = new Food(this.field, this.snake);
    
                this.speed = Math.max(200, this.speed - 40);
            }
            this.field.update(this.snake, this.food);
        }
    }

    public pause() {
        this.status = Status.Paused;
    }

    public clear() {
        clearInterval(this.tickIntervalId);
        this.field.clear();
    }


    public keypress(ev: KeyboardEvent): any {
        let direction = this.direction;
        switch (ev.keyCode) {
            case 119:
                direction = Direction.Up;
                break;
            case 100:
                direction = Direction.Right;
                break;
            case 115:
                direction = Direction.Down;
                break;
            case 97:
                direction = Direction.Left;
                break;
        }

        this.direction = direction;
    }
}