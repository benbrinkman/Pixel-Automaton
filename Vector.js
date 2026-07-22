var vector = {
    type: "vector",
    //create an object with an x and y variable
    init: function (x, y, _id) {
        this.x = x;
        this.y = y;
        this.id = clean(_id, "vec_u");
    },
    //give the vector an id - mostly for debugging purposes
    setID: function (_id) {
        this.id = _id;
    },
    //for adding two functions
    add: function (_vector) {
        if (typeof _vector !== "object") {
            _vector = Vector(_vector, _vector);
        }
        this.x += _vector.x;
        this.y += _vector.y;
        return this;
    },
    //for subtracting two functions -- having issues with this one, using subtract function outside vector instead
    sub: function (_vector) {
        // var subbed = Vector(this.x, this.y);
        // subbed.x -= _vector.x;
        // subbed.y -= _vector.y;
        if (typeof _vector !== "object") {
            _vector = Vector(_vector, _vector);
        }
        this.x -= _vector.x;
        this.y -= _vector.y;
        return this;
    },
    //multiplying by either a scalar or a vector
    mult: function (_vector) {
        if (typeof _vector === "object") {
            this.x *= _vector.x;
            this.y *= _vector.y;
            return this;
        }
        this.x *= _vector;
        this.y *= _vector;
        return this;
    },
    //dividing by either a scalar or a vector
    div: function (_vector) {
        if (typeof _vector === "object") {
            this.x /= _vector.x;
            this.y /= _vector.y;
            return this;
        }
        else {
            this.x /= _vector;
            this.y /= _vector;
            return this;
        }
    },
    //normalize the function -- U = V / M, where U is the normalized vector, v is the original vector, and m is the magnitude of the original vector
    get norm() {
        var u = Vector(0, 0);
        var v = this;
        var m = this.mag;
        if (m !== 0) {
            u = v.div(m);
        }
        return u;
    },
    //get the magnitude (length) of a vector -- sqrt(x^2+y^2)
    get mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    //squared magnitude, used for finding the limit
    get magSq() {
        return (this.x * this.x + this.y * this.y);
    },
    //lmit the vector to a maximum value. If the absolute value of the magnitude is greater than the max value, it gets normalized to the max value
    limit: function (maxVal) {
        if (this.magSq > maxVal * maxVal) {
            this.norm;
            this.mult(maxVal);
        }
        return this;
    },
    //find the angle between (0,0) and this vector's (x,y) in radians
    get heading() {
        var angle = Math.atan2(this.y, this.x);
        return angle;
    },
    //binds the vector between a min and max value
    bind: function (min, max) {

        if (typeof min !== "object") {
            min = Vector(min, min);
        }
        if (typeof max !== "object") {
            max = Vector(max, max);
        }

        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);

    },
    get max() {
        return Math.max(this.x, this.y);
    },
    get min() {
        return Math.min(this.x, this.y);
    },
    //get the rotatation vector (r) given an rotation origin (o) and an angle (a) (in degrees, tbh this should probably be in radians)
    rotate: function (a, o) {
        var p = Vector(this.x, this.y);
        var angle = degToRad(a);
        // console.log(p);
        if(a == NaN){
            console.trace(a);
        }
        // var rotVector = subtract(this, o);
        var cosA = Math.cos(angle);
        var sinA = Math.sin(angle);

        var xMove = p.x - o.x;
        var yMove = p.y - o.y;

        var xRot = (xMove * cosA) - (yMove * sinA);
        var yRot = (xMove * sinA) + (yMove * cosA);

        var px = xRot + o.x;
        var py = yRot + o.y;

        var returnVec = Vector(px, py);

        return returnVec;
    },
    //Round the vector to the nearest numDigits
    round: function (numDigits) {
        numDigits = numDigits ? Math.pow(10, numDigits) : 1;
        this.y = Math.round(this.y * numDigits) / numDigits;
        this.x = Math.round(this.x * numDigits) / numDigits;
        return this;
    },
    //round the vector to the nearest input
    roundTo: function (input) {
        this.y = Math.round(this.y / input) * input;
        this.x = Math.round(this.x / input) * input;
        return this;
    },
    get floor(){
        return Vector(Math.floor(this.x), Math.floor(this.y));
    },
    get ceil(){
        return Vector(Math.ceil(this.x), Math.ceil(this.y));
    },
    //return true if the vectors are the same, false if they are different
    isEqual: function (_vector, roundDigits) {
        var vec1 = Clone(this);
        var vec2 = Clone(_vector);

        if (roundDigits) {
            vec1.round(roundDigits);
            vec2.round(roundDigits);
        }
        if (vec1.x == vec2.x && vec1.y == vec2.y) {
            return true;
        } else {
            return false;
        }
    },
    greater: function (vec) {
        return this.x > vec.x && this.y > vec.y ? true : false;
    },
    less: function (vec) {
        return this.x < vec.x && this.y < vec.y ? true : false;

    },
    //reset vector to 0,0
    clear: function () {
        this.mult(0);
    },
    //Easy check to see if the vector is empty
    get empty() {
        if (this.x == 0 && this.y == 0) { return true; }
        else { return false }
    },
    //This funciton takes the x and y of an input vector without creating a reference to it
    clone: function (_newPos) {
        this.x = _newPos.x;
        this.y = _newPos.y;
    },
    get prt() {
        return this.x + ", " + this.y;
    },
    print: function (string) {
        if (string) {
            return string + ": " + this.x + ", " + this.y;
        } else {
            console.log("%c" + getCaller() + "%c: " + this.x + ", " + this.y, "color:blue; text-decoration:underline", "")
            return this.x + ", " + this.y;
        }

    },
    get flip() {
        var x = this.x;
        var y = this.y;
        this.x = y;
        this.y = x;
        return this;
    },
    get abs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    },
    distTo: function (pos) {
        if (typeof pos == "object") {
            return (Subtract(pos, Vector(this.x, this.y)).mag);
        } else {
            console.log('invalid input: not a vector');
            return null;
        }
    },
    isWithin: function (pos, dist) {
        if (typeof pos == "object") {
            return this.distTo(pos) < dist;

        } else {
            console.log('invalid input: not a vector');
            return false;
        }
    },
    between: function (anchor, distance, start) {
        var sp;
        if (start) {
            sp = Clone(start);
        } else {
            sp = Clone(this);
        }
        var dif = Subtract(sp, anchor);
        dif.mult(Clone(distance));
        dif.add(anchor);
        this.clone(dif);

        return dif;
    },
    get sign() {
        return Vector(Math.sign(this.x), Math.sign(this.y));
    }
};

//new vector constructor object at an input x and y
function Vector(x, y, id) {
    var object = Object.create(vector);
    // var object = new vector();

    if (typeof x != "number") {
        x = 0;
    }
    if (typeof y != "number") {
        y = 0;
    }
    object.init(x, y, id);
    return object;
}

//Vector constructor based on angle (radians) and length
function VectorA(a, l, id) {
    var object = Object.create(vector);
    // var object = new vector();

    var x = l * Math.cos(a);
    var y = l * Math.sin(a);
    object.init(x, y, id);
    return object;
}

//temp subtract function for vectors -- vector one is not working properly
var Subtract = function (v1, v2, v3, v4, v5) {
    var subbed = Vector(v1.x - v2.x, v1.y - v2.y);
    if (v3 != "undefined" && v3 != null) {
        subbed.sub(v3);
    }

    if (v4 != "undefined" && v4 != null) {
        subbed.sub(v4);
    }

    if (v5 != "undefined" && v5 != null) {
        subbed.sub(v5);
    }
    return subbed;
};

var Add = function (v1, v2, v3, v4, v5) {
    var added = Vector(v1.x, v1.y);
    added.add(v2);
    if (v3 != "undefined" && v3 != null) {
        added.add(v3);
    }

    if (v4 != "undefined" && v4 != null) {
        added.add(v4);
    }

    if (v5 != "undefined" && v5 != null) {
        added.add(v5);
    }
    return added;
};

var Divide = function (v1, v2) {
    var dividend = Clone(v1);
    var divisor;
    if (typeof v2 == "object") {
        divisor = Clone(v2);
    } else {
        divisor = Vector(v2, v2);
    }
    return Vector(dividend.x / divisor.x, dividend.y / divisor.y)
}

var Rotate = function(v1, o, a){
    return Clone(v1).rotate(a, o);
}

var Multiply = function (v1, v2, v3, v4, v5) {
    var base = Clone(v1);

    var multipliers = [v2, v3, v4, v5];
    for (var m of multipliers) {
        if (clean(m)) {
            base.mult(m);
        } else {
            break;
        }
    }
    return base;
}


var MidPoint = function(v1, v2){
    return Add(Divide(Subtract(v1, v2),2), v2);
}
// var Multiply = function (v1, v2, v3, v4, v5) {
//     var base = Clone(v1);
//     var multiplier;

//     // var multipliers = [v2, v3, v4, v5];
//     // for (var m of multipliers) {
//     //     if (clean(m)) {
//     //         if (typeof m == "object") {
//     //             base.mult(m)
//     //             multiplier = Clone(v2);
//     //         } else {
//     //             multiplier = Vector(v2, v2);
//     //         }
//     //     } else {
//     //         break;
//     //     }
//     // }

//     if (typeof v2 == "object") {
//         multiplier = Clone(v2);
//     } else {
//         multiplier = Vector(v2, v2);
//     }



//     return Vector(base.x * multiplier.x, base.y * multiplier.y)
// }

function Clone(object) {
    var returnObj = Vector();
    returnObj.clone(object);
    return returnObj;
}


function getCaller() {
    var err = new Error().stack;
    var lineNum = err.split('\n')[3].split(":");
    var lineSrc = err.split('\n')[3].split("at ")[1].split(" ")[0];
    return printLine = lineSrc + ":" + lineNum[lineNum.length - 2];
}

function clean(input, alt) {
    var inputReal = input != "undefined" && input != null;
    var altReal = alt != "undefined" && alt != null;
    if (altReal) {
        var cleaned = inputReal ? input : alt;
        return cleaned.type == "vector" ? Clone(cleaned) : cleaned;
    }
    else {
        return inputReal ? true : false;
    }
}