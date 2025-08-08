export class Color {
    constructor(private _r: number, private _g: number, private _b: number, private _a?: number) {
    }

    repr(): string {
        return `rgb(${this._r}, ${this._g}, ${this._b})`
    }
}