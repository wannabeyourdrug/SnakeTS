export default class FiledSegment {
    private element: HTMLElement;
    private _snake: boolean = false;
    private _food: boolean = false;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    get snake(): boolean {
        return this._snake;
    }
    set snake(value: boolean) {
        let old = this._snake;
        this._snake = value;
        if (old !== this._snake) {
            this._snake ? this.element.classList.add('snake') : this.element.classList.remove('snake');
        }
    }

    get food(): boolean {
        return this._food;
    }
    set food(value: boolean) {
        let old = this._food;
        this._food = value;
        if (old !== this._food) {
            this._food ? this.element.classList.add('food') : this.element.classList.remove('food');
        }
    }
}