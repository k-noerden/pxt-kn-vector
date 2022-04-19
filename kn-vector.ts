/**
 * Vector library
 */
//% weight=100 color="#03AA74" weight=100 icon="\uf11b" block="KN Vector"
//% groups='["KNVector"]'
namespace knvector {
    export class Vector {
        private _x: number;
        private _y: number;

        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }

        /**
         * Copy a vector
         */
        //% blockId="kn_vector_copy"
        //% block="copy %vector"
        public copy(): Vector {
            return new Vector(this._x, this._y);
        }

        //% blockSetVariable="vector"
        //% blockCombine block="x"
        get x(): number {
            return this._x;
        }

        //% blockSetVariable="vector"
        //% blockCombine block="y"
        get y(): number {
            return this._y;
        }

        //% blockSetVariable="vector"
        //% blockCombine block="x"
        set x(v: number) {
            this._x = v;
        }

        //% blockSetVariable="vector"
        //% blockCombine block="y"
        set y(v: number) {
            this._y = v;
        }

        /**
         * Get length of vector
         */
        //% blockSetVariable="vector"
        //% blockCombine block="length"
        get length(): number {
            return Math.sqrt(this._x * this._x + this._y * this._y);
        }

        /**
         * Normalize the vector, to have length 1 but same direction
         */
        //% blockId=kn_vector_normalize
        //% block="Normalize %vector"
        public normalize() {
            let length = this.length;
            this._x /= length;
            this._y /= length;
        }

        /**
         * Scale vector, ie. ultiply the length of the vector
         * @param n the scale, eg: 2
         */
        //% blockId=kn_vector_scale
        //% block="Scale %vector %n"
        public scale(n: number) {
            this._x *= n;
            this._y *= n;
        }

        /**
         * Add another vector to this
         * @param v The other vector
         */
        //% blockId=kn_vector_add
        //% block="To %vector add %v"
        public add(v: Vector) {
            this._x += v._x;
            this._y += v._y;
        }

        /**
         * Subtract another vector to this
         * @param v The other vector
         */
        //% blockId=kn_vector_subtract
        //% block="To %vector subtract %v"
        public subtract(v: Vector) {
            this._x -= v._x;
            this._y -= v._y;
        }

        /**
         * Calculate the dot product between two vectors
         * @param v The other vector
         */
        //% blockId=kn_vector_dotProduct
        //% block="Dot product %vector %v"
        public dotProduct(v: Vector): number {
            return this._x * v._x + this._y * v._y;
        }

        /**
         * Rotate the vector clockwise
         * Works in revolutions, 1 revolution is a complete circle, 0.25 revolution == 90 degree == 0.5 PI radions
         * @param v the number of revolutions, eg: 0.25
         */
        //% blockId=kn_vector_rotate
        //% block="Rotate %vector %revolutions"
        public rotate(revolutions: number) {
            let angle = revolutions * 2 * Math.PI;
            let cos_angle = Math.cos(angle);
            let sin_angle = Math.sin(angle);
            let x2 = cos_angle * this._x - sin_angle * this._y
            let y2 = sin_angle * this._x + cos_angle * this._y
            this._x = x2;
            this._y = y2;
        }

        /**
         * Print the vector to console
         */
        //% blockId=kn_vector_print
        //% block="print %vector"
        public print() {
            console.log(`Vector(${this._x}, ${this._y})`);
        }
    }

    /**
     * Create a new vector
     * @param x Vector horizontal coordinate, eg: 1
     * @param y Vector vertical coordinate, eg: 1
     */
    //% blockid=kn_vector_createVector
    //% block="Create vector|x: %x|y: %y"
    //% weight=100
    export function createVector(x: number, y: number): Vector {
        return new Vector(x, y);
    }

    /**
     * Calculate the relative vector from source to destination
     */
    //% blockid=kn_vector_placeSprite
    //% block="Vector from $source=variables_get(mySprite) to %destination"
    export function vectorBetween(source: Sprite | tiles.Location, destination: Sprite | tiles.Location): Vector {
        let vector = new Vector(destination.x, destination.y);
        let sourceVector = new Vector(source.x, source.y);
        vector.subtract(sourceVector)
        return vector
    }

    /**
     * Place a sprite at a vector
     */
    //% blockid=kn_vector_placeSprite
    //% block="Place $sprite=variables_get(mySprite) at $vector=variables_get(vector)"
    export function placeSprite(sprite: Sprite, vector: Vector) {
        sprite.setPosition(vector.x, vector.y);
    }

    /**
     * Get a vector from origo to sprite or tile location
     */
    //% blockid=kn_vector_vectorToSprite
    //% block="Vector to $position=variables_get(mySprite)"
    export function vectorToSprite(position: Sprite | tiles.Location): Vector {
        return new Vector(position.x, position.y);
    }
}
