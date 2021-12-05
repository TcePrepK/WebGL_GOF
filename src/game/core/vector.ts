export class Vector {
    public x: number;
    public y: number;

    public constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    public add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    public sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    public mul(v: Vector): Vector {
        return new Vector(this.x * v.x, this.y * v.y);
    }

    public div(v: Vector): Vector {
        return new Vector(this.x / v.x, this.y / v.y);
    }

    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }

    public length(): number {
        return Math.sqrt(this.dot(this));
    }

    public distance(v: Vector): number {
        return this.sub(v).length();
    }

    public normalize(): Vector {
        const length = this.length();
        return new Vector(this.x / length, this.y / length);
    }

    public rotate(angle: number): Vector {
        const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        return new Vector(x, y);
    }

    public toString(): string {
        return `Vector(${this.x}, ${this.y})`;
    }
}
