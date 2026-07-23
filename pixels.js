//This code was written without the use of generative AI
//written by Bee Brinkman in 2026

///////////////////////////////////////////////////////////////////////////////////
//GLOBAL VARIABLES//
///////////////////////////////////////////////////////////////////////////////////


var cv;
var ctx;
var w;
var h;
const scale = 5;
var counter = 0;
var idcounter = 0;
const numColors = 2;
var colors;
var numRules = 5;
var rules = Array(numRules);

var pixels = [];
var ruleelems = [];
var imd;
var paused = false;
var speed = 0;
var minspeed = 500;
var pixeldensity = 0.5;

var mousepos = Vector();
var mousedown = false;
var brushelem = null;
var brushsizeelem = null;
var brushsize = 0;
var pixelwidth = null;
var mousedown = false;

var shift = false;



// const colorRef = [
//     { id: "red", hex: "#FF0000", rgb: "rgb(255,0,0)", r:255, g:0, b:0 },
//     { id: "black", hex: "#000000", rgb: "rgb(0,0,0)",  r:0, g:0, b:0},
//     { id: "white", hex: "#FFFFFF", rgb: "rgb(255,255,255)", r:255, g:255, b:255 },
//     { id: "orange", hex: "#ffa500", rgb: "rgb(255,165,0)", r:255, g:165, b:0 },
//     { id: "yellow", hex: "#FFFF00", rgb: "rgb(255,255,0)", r:255, g:255, b:0 },
//     { id: "green", hex: "#00FF00", rgb: "rgb(0,255,0)", r:0, g:255, b:0 },
//     { id: "blue", hex: "#0000FF", rgb: "rgb(0,0,255)", r:0, g:0, b:255 },
//     { id: "indigo", hex: "#4B0082", rgb: "rgb(75,0,130)", r:75, g:0, b:130 },
//     { id: "violet", hex: "#7F00FF", rgb: "rgb(127,0,255)", r:127, g:0, b:255 },
//     { id: "cyan", hex: "#00FFFF", rgb: "rgb(0,255,255)", r:0, g:255, b:255 },
//     { id: "magenta", hex: "#FF00FF", rgb: "rgb(255,0,255)", r:255, g:0, b:255 },
//     { id: "gray", hex: "#808080", rgb: "rgb(128,128,128)", r:128, g:128, b:128 }
// ];
const red = { type: "color", id: 0, name: "red", hex: "#FF0000", rgb: "rgb(255,0,0)", r: 255, g: 0, b: 0, col32: (255 << 24) | (0 << 16) | (0 << 8) | 255 };
const black = { type: "color", id: 1, name: "black", hex: "#000000", rgb: "rgb(0,0,0)", r: 0, g: 0, b: 0, col32: (255 << 24) | (0 << 16) | (0 << 8) | 0 };
const white = { type: "color", id: 2, name: "white", hex: "#FFFFFF", rgb: "rgb(255,255,255)", r: 255, g: 255, b: 255, col32: (255 << 24) | (255 << 16) | (255 << 8) | 255 };
const orange = { type: "color", id: 3, name: "orange", hex: "#ffa500", rgb: "rgb(255,165,0)", r: 255, g: 165, b: 0, col32: (255 << 24) | (0 << 16) | (165 << 8) | 255 };
const yellow = { type: "color", id: 4, name: "yellow", hex: "#FFFF00", rgb: "rgb(255,255,0)", r: 255, g: 255, b: 0, col32: (255 << 24) | (0 << 16) | (255 << 8) | 255 };
const green = { type: "color", id: 5, name: "green", hex: "#00FF00", rgb: "rgb(0,255,0)", r: 0, g: 255, b: 0, col32: (255 << 24) | (0 << 16) | (255 << 8) | 0 };
const blue = { type: "color", id: 6, name: "blue", hex: "#0000FF", rgb: "rgb(0,0,255)", r: 0, g: 0, b: 255, col32: (255 << 24) | (255 << 16) | (0 << 8) | 0 };
const indigo = { type: "color", id: 7, name: "indigo", hex: "#4B0082", rgb: "rgb(75,0,130)", r: 75, g: 0, b: 130, col32: (255 << 24) | (130 << 16) | (0 << 8) | 75 };
const violet = { type: "color", id: 8, name: "violet", hex: "#7F00FF", rgb: "rgb(127,0,255)", r: 127, g: 0, b: 255, col32: (255 << 24) | (255 << 16) | (0 << 8) | 127 };
const cyan = { type: "color", id: 9, name: "cyan", hex: "#00FFFF", rgb: "rgb(0,255,255)", r: 0, g: 255, b: 255, col32: (255 << 24) | (255 << 16) | (255 << 8) | 0 };
const magenta = { type: "color", id: 10, name: "magenta", hex: "#FF00FF", rgb: "rgb(255,0,255)", r: 255, g: 0, b: 255, col32: (255 << 24) | (255 << 16) | (0 << 8) | 255 };
const gray = { type: "color", id: 11, name: "gray", hex: "#808080", rgb: "rgb(128,128,128)", r: 128, g: 128, b: 128, col32: (255 << 24) | (128 << 16) | (128 << 8) | 128 };

var colors = [red, orange, yellow, green, blue, magenta, indigo, black, white, violet, cyan, gray];
var rulesbycolor = Array(colors.length);
var menucolors = [white];
var ruleorder = [];




// const red = "rgb(255,0,0)";
// const orange = "rgb(255,165,0)";
// const yellow = "rgb(255,255,0)";
// const green = "rgb(0,255,0)";
// const blue = "rgb(0,0,255)";
// const indigo = "rgb(75,0,130)";
// const violet = "rgb(127,0,255)";
// const cyan = "rgb(0,255,255)";
// const magenta = "rgb(255,0,255)";
// const white = "rgb(255,255,255)";
// const black = "rgb(0,0,0)";

const usergb = true;

function color(col) {

    return usergb ? colorRef.find((cf) => cf.id == col).rgb : colorRef.find((cf) => cf.id == col).hex;
}



function c(col) { //return a color name as a string
    if (col == "gray") return "gray";
    return colorRef.find((cf) => cf.rgb == col).id;
}




const ruletypes = ["xcolors", "groupcountis", "groupcountgreater", "groupcountless", "groupcountbetween",];
//xcolors - has X colors in neighbors (x[0-7])
//lessthancolors - has <= X colors in neighbors (x[1-8])
//morethancolors - has >= X colors in neighbors (x[0-7])
//specificcolors- has color at neighbors(x[1-7], target[unique neighbors 0-8])

///////////////////////////////////////////////////////////////////////////////////
//FUNCTIONS//
///////////////////////////////////////////////////////////////////////////////////

function withinElem(vec, elem) {
    var bounds = elem.getBoundingClientRect();
    if (vec.x > bounds.left && vec.x < bounds.right && vec.y > bounds.top && vec.y < bounds.bottom) {
        return true;
    } else {
        return false;
    }
}





function getCanvasMousePos() {
    var rect = cv.getBoundingClientRect();
    var scale = Vector(cv.width / rect.width, cv.height / rect.height);
    return Subtract(mousepos, Vector(rect.left, rect.top)).mult(scale).floor;
}

function click() {
    if (withinElem(mousepos, cv)) {
        var cmpos = getCanvasMousePos();
        var pi = ptoi(cmpos);
        pixels[pi].cc = red;
        pixels[pi].pc = red;
        draw();
    }
}

function vecwithcanvas(vec) {
    if (vec.x >= w || vec.x < 0) {
        return false;
    } else if (vec.y >= h || vec.y < 0) {
        // console.log('BAD BAD BAD FALSE');
        return false;
    } else {
        return true;
    }
}

function drawpixels(event) {
    // var cmpos = getCanvasMousePos();
    var mpos = getCanvasMousePos();
    var pi = ptoi(mpos);
    // console.log(brushsizeelem.value);


    var rad = Math.floor(brushsizeelem.value / 2);
    // console.log(rad);
    var startpixel = Subtract(mpos, Vector(rad, rad));
    // console.log(startpixel);
    // var endpixel = Add(mpos, Vector(rad, rad));

    for (var i = 0; i < brushsizeelem.value; i++) {
        for (var j = 0; j < brushsizeelem.value; j++) {

            var x = startpixel.x + i;
            var y = startpixel.y + j;

            var ppos = Vector(x, y);
            if (vecwithcanvas(ppos)) {
                // console.log('were in');
                if (Subtract(mpos, ppos).mag <= rad) {
                    pcol = menucolors[randint(menucolors.length)]

                    var pixi = ptoi(ppos);
                    if (pixi < 0 || pixi >= pixels.length) {
                        console.log(ppos);
                        console.log(pixi);
                    } else {
                        pixels[pixi].cc = pcol;
                        pixels[pixi].pc = pcol;

                    }
                }
            }
        }
    }



    draw();
}

function newid() {//use to create a unique id for any elements
    counter++;
    return counter;
}

function newrid() {
    idcounter++;
    return idcounter;
}

function randcolor() { //returns random color from colors
    return colors[randint(colors.length)];
}


function ptoi(pos) { //get pixel index in pixels array from its position
    return (w * (pos.y)) + pos.x;
}

function itop(i) { //get pixel position from its index in pixels array
    const x = (i % w);
    const y = Math.floor(i / w);
    return Vector(x, y);
}

function randint(max, min) { //(inclusive min, not exclusive max)
    if (min == undefined || min == null) { min = 0; }
    return Math.floor(Math.random() * (max - min) + min);
}

function randints(amount, max, min) {  //returns amount of random unique ints between min and max (inclusive min, exclusive max)
    if (min == undefined || min == null) { min = 0; }
    if (max == undefined || max == null) { max = parseInt(min) + parseInt(amount) }

    max = parseInt(max);
    min = parseInt(min);
    amount = parseInt(amount);

    var options = Array(max);
    var results = Array(amount)
    for (var i = min; i < (max + min); i++) { options[i - min] = i; }
    for (var i = 0; i < amount; i++) {
        var index = randint(options.length)
        results[i] = options[index];
        options.splice(index, 1);
    }
    return results;
}

function randfromarray(arr, amount) { //returns amount of unique values from arr
    if (amount == undefined || amount == null || amount > arr.length) { amount = arr.length; }
    var results = Array(amount);
    var options = Array(arr.length);
    for (var i = 0; i < arr.length; i++) { options[i] = arr[i]; }

    for (var i = 0; i < amount; i++) {
        var index = randint(options.length)
        results[i] = options[index];
        options.splice(index, 1);
    }
    return results;
}

function wrap(p) { //wrap position around w/h


    var newpos = Vector(p.x, p.y);
    if (p.x < 0) {
        newpos.x = w - 1;
    }
    if (p.y < 0) {
        newpos.y = h - 1;
    }

    if (p.x >= w) {
        newpos.x = 0;
    }
    if (p.y >= h) {
        newpos.y = 0;
    }
    return newpos;
}



function processrules(i) { //apply all the rules to all the pixels
    var p = pixels[i];
    var rulestocheck = rulesbycolor.find((r) => r.id == p.pc.id);
    if (i == 1) {

    }
    for (var i = 0; i < rulestocheck.c.length; i++) {
        if (rulestocheck.c[i].active) {
            var result = rulestocheck.c[i].processAllRules(p);
            if (result) {
                p.cc = result;
                return;
            }
        }
    }
}



//for every color, create an array of rules
//find the rule set that matches the pixel color, then iterate through that


function addelem(type, classes, id, parent, name, value, text, innerhtml) {
    var elem = document.createElement(type);
    if (id) { elem.id = id; }
    if (classes) {
        if (typeof (classes) !== "object") {
            classes = [classes];
        }
        for (var i = 0; i < classes.length; i++) {

            elem.classList.add(classes[i]);
        }
    }
    if (parent !== undefined) {
        if (typeof (parent) == "string") {
            document.getElementById(parent).appendChild(elem);
        } else {
            parent.appendChild(elem);
        }
    }
    if (name) { elem.name = name; }
    if (value) { elem.value = value; }
    if (text) { elem.text = text; }
    if (innerhtml) { elem.innerHTML = innerhtml; }
    return elem;
}


///////////////////////////////////////////////////////////////////////////////////
//OBJECTS//
///////////////////////////////////////////////////////////////////////////////////

pixelObj = {
    init: function (i, p, col) {
        this.cc = col;
        this.pc = col;
        this.p = p;
        this.i = i;
        this.initneighbors;
        this.groupsize = null;
        this.groupid = null;
    },
    get initneighbors() {
        this.n = Array(8);
        // console.log(ptoi(wrap(Vector(this.p.x - 1, this.p.y - 1))));
        this.n[0] = ptoi(wrap(Vector(this.p.x - 1, this.p.y - 1)));
        this.n[1] = ptoi(wrap(Vector(this.p.x, this.p.y - 1)));
        this.n[2] = ptoi(wrap(Vector(this.p.x + 1, this.p.y - 1)));
        this.n[3] = ptoi(wrap(Vector(this.p.x - 1, this.p.y)));
        this.n[4] = ptoi(wrap(Vector(this.p.x + 1, this.p.y)));
        this.n[5] = ptoi(wrap(Vector(this.p.x - 1, this.p.y + 1)));
        this.n[6] = ptoi(wrap(Vector(this.p.x, this.p.y + 1)));
        this.n[7] = ptoi(wrap(Vector(this.p.x + 1, this.p.y + 1)));
        // console.log(this.n);
        return this.n;
    },
    ncolors: function (orthagonal) {
        var ncols = Array(colors.length);
        var ncolsnames = Array(colors.length);

        for (var i = 0; i < colors.length; i++) {
            ncols[i] = 0;
            ncolsnames[i] = { n: colors[i].name, c: 0 };
        }
        for (var i = 0; i < this.n.length; i++) {
            if (orthagonal && (i === 0 || i === 2 || i === 5 || i === 7)) {
                continue;
            }
            ncolsnames[pixels[this.n[i]].pc.id].c++;
            ncols[pixels[this.n[i]].pc.id]++;
        }
        // console.log(ncolsnames);
        return ncols;
        // return this.n.map((m)=>pixels[m].pc.id);
    },
    neighborswithcolor: function (color, orthagonal) {
        var n = [];
        for (var i = 0; i < this.n.length; i++) {
            if ((i === 0 || i === 2 || i === 5 || i === 7) && orthagonal) {
                continue;
            }
            if (color.id == pixels[this.n[i]].pc.id) {
                n.push(this.n[i]);
            }
        }
        return n;
    },
    numcolorsnear: function (col) {
        var count = 0;
        for (var i = 0; i < this.n.length; i++) {
            var currentn = pixels[this.n[i]];
            for (var j = 0; j < col.length; j++) {
                if (currentn.pc.id == col[j].id) {
                    count++;
                }
            }
        }
        return count;
    },

    hascolornear: function (col, nitocheck, all) {
        for (var i = 0; i < (nitocheck ? nitocheck : this.n).length; i++) {
            var index = (nitocheck ? nitocheck[i] : i);
            if (all) {
                var valid = false;
                for (var j = 0; j < col.length; j++) { if (pixels[this.n[index]].pc.id == col[j].id) { valid = true; } }
                if (!valid) { return false }
            } else {
                for (var j = 0; j < col.length; j++) { if (pixels[this.n[index]].pc.id == col[j].id) { return true; } }
            }
        }
        return all;
    },
    reset: function () {
        this.pc = this.cc;
        this.groupsize = null;
        this.groupid = null;
    },

}




function newPixel(i, p, col) {
    var object = Object.create(pixelObj);
    object.init(i, p, col);
    return object;
}

var ruleelemupdate = {
    init: function (elemid, startCount, stateCounts, states) {
        this.elem = document.getElementById(elemid);

        //stateCounts = array of lengths for each state
        //states = array of the different states for each statecount
        var total = stateCounts.reduce((partialSum, a) => partialSum + a, 0);
        var currentState = 0;
        // console.log(stateCounts);
        this.states = Array(total);
        var currentStateMax = stateCounts[0];
        for (var i = 0; i < total; i++) {
            if (i < currentStateMax) {
                this.states[i] = states[currentState];
            } else {
                currentState++;
                if (currentState >= states.length) {
                    currentState = 0;
                }
                currentStateMax += stateCounts[currentState];
                this.states[i] = states[currentState];
            }
        }

        this.count = startCount;
        if (this.count >= total) { this.count = 0; }
    },
    update: function () {
        this.count++;
        if (this.count >= this.states.length) { this.count = 0 }
        this.applyState();
    },
    applyState: function () {
        this.elem.className = "rulepixel";


        // console.log(this.states);
        // console.log(this.count);
        // console.log(this.states[this.count]);
        // debugger;
        this.elem.classList.add(this.states[this.count].id);
        // this.elem.classList.add(c(this.states[this.count]));


        if (this.states[this.count].id !== "gray") {
            this.elem.classList.add("target");
        } else {
            this.elem.classList.remove("target");

        }
    }
};


function newRuleElem(elemid, startCount, stateCounts, states) {
    // console.log(states);
    var object = Object.create(ruleelemupdate);
    object.init(elemid, startCount, stateCounts, states);
    return object;
}


function toggleRuleColor(ruleid, color) {

}

function removerulecolor(rule, color) {
    // console.log(rule.id);
    // console.log(color.id);
    // console.log(rulesbycolor);
    var rls = rulesbycolor.find((rc) => rc.id == color.id).c;
    rls.splice(rls.findIndex((co) => co.id == rule.id), 1);
    // console.log(rls);

}

function addrulecolor(rule, color, reset) {
    if (reset) {
        for (var i = 0; i < rule.cbefore.length; i++) {
            removerulecolor(rule, rule.cbefore[i]);
        }
    }
    var rls = rulesbycolor.find((rc) => rc.id == color.id).c;
    // console.log(rls);
    if (!rls.some((r) => r.id == rule.id)) {
        if (rls.length == 0) {
            rls.push(rule);
        } else {
            for (var i = 0; i < rls.length; i++) {
                // console.log('checking rule: ' + rls[i].id + " oi: " + rls[i].orderindex);
                if (rls[i].orderindex > rule.orderindex) {
                    rls.splice(i, 0, rule);
                    // console.log(rls);

                    return;
                }
            }
            rls.push(rule);

        }
    }
    // console.log(rls);


}

////////////////////////////////////////////////////////////////////////
//PRESETS
////////////////////////////////////////////////////////////////////////

function storepreset(presetid, usermade, initcolors) {

    var storage = localStorage.getItem("presets");
    storage = storage ? JSON.parse(storage) : [];

    //all rules, sort by their orderindex
    var preset = [];
    for (var i = 0; i < ruleorder.length; i++) {
        var r = ruleorder.find((ro) => ro.orderindex == i);
        preset.push(storerule(r));
    }
    // console.log(preset);
    if (storage.some((p) => p.id == presetid) || !presetid) {
        console.warn("preset already exists!");
        return;
    } else {
        storage.push({ id: presetid, pre: preset, usermade: usermade, initcolors: initcolors });
    }
    localStorage.setItem("presets", JSON.stringify(storage));
    refreshpresets();
}

function restorepreset(presetid) {
    // console.log(presetid);
    var storage = localStorage.getItem("presets");
    storage = JSON.parse(storage);
    var preset = storage.find((p) => p.id == presetid);
    if(preset){

        deleteallrules();
        console.log(preset);
        for (var i = 0; i < preset.pre.length; i++) {
            var r = preset.pre[i];
            var newrule = newRule(r.inputcolor, r.outputcolor, r.conditions);
        }
        if(preset.initcolors){
            addrandompixels(preset.initcolors, 1);
        }
    }else{
        console.log('preset not found: '+presetid);
    }

}

function refreshpresets() {
    var storage = localStorage.getItem("presets");
    if (storage) {
        var elemstring = "";
        var styleelem = "";
        storage = JSON.parse(storage);
        for (var i = 0; i < storage.length; i++) {
            // var deletebutton="";
            // if(storage[i].usermade == true){

            // }
            var elemid = storage[i].id.split("_").join("").split(" ").join("").toLowerCase();
            elemstring += `<div id="preset_${elemid}" class="presetoption  transition" data-value="${storage[i].id}">${storage[i].id}</div>`;
            var labelcolor = (findlabelcolor(storage[i]));
            styleelem += `<style>#preset_${elemid}:before{background-color:${labelcolor};}</style>`
        }
        document.getElementById("presetoptions").innerHTML = elemstring;
        document.getElementById("stylecontainer").innerHTML = styleelem;
        var presetelems = Array.from(document.getElementById("presetoptions").children);
        for (var i = 0; i < presetelems.length; i++){

            presetelems[i].addEventListener("click", function(){
                console.log(this.dataset.value);
                restorepreset(this.dataset.value);
            });
        }
        // presettitle
    } else {
        console.log("No presets found");
    }
}

function findlabelcolor(rule) {
    var col = rule.pre.find((p) => p.inputcolor.find((ic) => ic.name !== "white"));
    if (col) { return col.inputcolor.find((ic) => ic.name !== "white").hex; }

    col = rule.pre.find((p) => p.outputcolor.name !== "white");
    if (col) { return col.outputcolor.hex; }

    for (var i = 0; i < rule.pre.length; i++) {
        for (var j = 0; j < rule.pre[i].conditions.length; j++) {
            for (var k = 0; k < rule.pre[i].conditions[j].colors.length; k++) {
                if (rule.pre[i].conditions[j].colors[k].name !== "white") { return rule.pre[i].conditions[j].colors[k].hex };
            }
        }
    }
}

function storerule(rule) {
    var cons = [];
    for (var i = 0; i < rule.conditions.length; i++) {
        cons.push(storecondition(rule.conditions[i]));
    }
    return storeobj = { orderindex: rule.orderindex, inputcolor: rule.cbefore, outputcolor: rule.cafter, active: rule.active, conditions: cons };
    //conditions, orderindex, inputcolors, outputcolor, active
}
function storecondition(con) {
    return { type: con.type, colors: con.colors, x: con.x, active: con.active, targets: con.targets };
    //{type, colors, x, active, targets}
}

var ruleObj = {
    // ruletypes = ["xcolors", "lessthancolors", "morethancolors", "specificcolors"];
    //xcolors - has X colors in neighbors (x[0-7])
    //lessthancolors - has <= X colors in neighbors (x[1-8])
    //morethancolors - has >= X colors in neighbors (x[0-7])
    //specificcolors- has color at neighbors(x[1-7], target[unique neighbors 0-8])
    // init: function (type, cbefore, cafter, ccheck, x, all, targets) {
    init: function (orderindex, cbefore, cafter, condition) {
        //CONDITION OBJECT: {type, colors, x, targets, active}

        this.orderindex = orderindex;
        this.id = "rule_" + newrid();
        this.processed = [];

        this.cbefore = [];
        this.setcolorbefore(cbefore, false, true);

        this.cafter = [];
        this.setcolorafter(cafter, false, true);

        this.createelement();

        this.conditions = [];
        if (condition !== undefined) {

            if (condition.length == undefined) {
                condition = [condition];
            }
            for (var i = 0; i < condition.length; i++) {
                this.initcondition(condition[i]);
            }
        }
        // if(this.id == "rule_1"){
        //     this.initcondition("xcolors", [blue, green], [5], undefined, true);
        // }
        this.initiated = true;
        this.active = true;


        //for each rule:
        //type
        //check
        //x
        //targets


    },
    initcondition: function (condition) {

        if (condition.active == undefined) { condition.active = true };
        // var inputcolors = this.checkcolor;
        var id = this.id + "_con_" + newid();
        var newcondition = {
            type: condition.type,
            x: null,
            targets: [],
            active: condition.active,
            id: id,
        };

        // console.log(condition.colors);
        this.conditions.push(newcondition);
        if (condition.type == ruletypes[4]) {
            if (typeof (condition.x) == "number") {
                newcondition.x = [0, condition.x];
            } else {
                this.setx(condition.x, this.conditions.length - 1);
            }
        } else {
            this.setx(condition.x, this.conditions.length - 1);
        }

        this.setcolorcheck(condition.colors, this.conditions.length - 1, false, false);
        this.setTarget(condition.targets, this.conditions.length - 1);
        this.createconditionelement(this.conditions.length - 1);
        // console.log(this.conditions);
        // console.log(this.conditions[this.conditions.length-1].colors);


    },
    removecondition: function (index) {
        var id = this.conditions[index].id;
        this.conditions.splice(index, 1);
        document.getElementById(this.id + "_condition_" + id).remove();
        // console.log(this.conditions);
    },
    deleteself: function () {
        // console.log('delete');
        // console.log(rulesbycolor);
        var numcolors = this.cbefore.length;
        for (var i = 0; i < this.cbefore.length; i++) {
            removerulecolor(this, this.cbefore[i]);
        }
        rules.splice(rules.findIndex((r) => r.id == this.id), 1);
        // console.log(rules);
        document.getElementById("rulewrapper_" + this.id).remove();

    },
    conidtoindex: function (id) {
        return this.conditions.findIndex((c) => c.id == id);

    },
    checkcolor: function (col) {
        if (typeof (col) == "string") { return [colors.find((c) => c.name == col)]; }
        else if (typeof (col) == "number") { return [colors.find((c) => c.id == col)]; }
        else if (col.constructor == Array) { return col; }
        else if (typeof (col) == "object") {
            if (col.type == "color") { return [col]; }
            else { return col; }
        } else { console.trace("No proper color provided for pixel construction"); }
    },
    setcolor: function (type, col, remove, append) { //depricated
        if (type == "before") { return this.setcolorbefore(col, remove, append) }
        if (type == "check") { return this.setcolorcheck(col, remove, append) }
        if (type == "after") { return this.setcolorafter(col) }
    },
    setcolorbefore: function (col, remove, append) {
        if (remove) {
            if (this.cbefore.length == 1) { return false; }
            var cols = this.checkcolor(col);

            for (var i = 0; i < cols.length; i++) { //for every color being removed
                //find its index in the input colors
                var index = this.cbefore.findIndex((c) => c.id === cols[i].id);
                if (index !== -1) { //if found in input colors, remove it:
                    this.cbefore.splice(index, 1);
                    this.processed.splice(index, 1);
                    removerulecolor(this, cols[i]);
                    document.getElementById("inputcolor_" + this.id + "_" + cols[i].name).remove();
                }
            }
        } else {
            if (append) {
                var addcols = this.checkcolor(col);
                for (var i = 0; i < addcols.length; i++) {
                    if (!this.cbefore.some((c) => c.id == addcols[i].id)) {
                        this.cbefore.push(addcols[i]);
                        this.processed.push(false);

                        addrulecolor(this, addcols[i]);
                        this.createruletitlecolorelem(addcols[i]);
                    }
                }
            } else {
                this.cbefore = this.checkcolor(col);
                this.processed = [];
                for (var i = 0; i < this.cbefore.length; i++) {
                    this.processed[i] = false;
                    this.createruletitlecolorelem(this.cbefore[i]);
                }
                addrulecolor(this, this.cbefore, true);
            }
        }
        this.updateelement();
        return true;

    },
    setcolorcheck: function (col, conditionindex, remove, append) {
        // console.log('removing: '+remove+" color: "+col.name +" from condition: "+conditionindex+ " for rule: "+this.id);
        if (remove) {
            if (this.conditions[conditionindex].colors.length == 1) { console.trace("can't remove single color"); return false; }
            var cols = this.checkcolor(col);
            for (var i = 0; i < cols.length; i++) {
                var index = this.conditions[conditionindex].colors.findIndex((c) => c.id === cols[i].id);
                if (index !== -1) { this.conditions[conditionindex].colors.splice(index, 1) }
            }
        } else {
            if (append) {
                // console.log(this);
                var addcols = this.checkcolor(col);
                for (var i = 0; i < addcols.length; i++) {
                    if (!this.conditions[conditionindex].colors.some((c) => c.id == addcols[i].id)) { this.conditions[conditionindex].colors.push(addcols[i]); }
                }
            } else {
                // console.log(this.conditions);
                this.conditions[conditionindex].colors = this.checkcolor(col);
            }
        }

        this.updateelement();
        // console.log(conditionindex);
        // console.log("num colors after setting color: " + this.conditions[conditionindex].colors.length);
        return true;
    },
    setcolorafter: function (col) {
        if (this.initiated) {
            document.getElementById("titleoutputcolor_" + this.id).classList.remove(this.cafter.name);
            document.getElementById("titleoutputcolor_" + this.id).classList.add(col.name);
        }
        this.cafter = this.checkcolor(col)[0];

        this.updateelement();
    },
    toggleColor: function (col, type, state) { //depricated
        console.log('Type: ' + type + " color: " + col.name + " state: " + state + " rule: " + this.id);
        //if changing the before state, ensure the rules are appropriately placed
        if (type == "before") {
            if (state) {
                // console.log(this.cbefore);
                this.cbefore.push(col);
                rulesbycolor.find((rc) => rc.id == col.id).c.push(this);

                // console.log(this.cbefore);
            } else {
                if (this.cbefore.length > 1) {
                    this.cbefore.splice(this.cbefore.findIndex((c) => c.id == col.id), 1);
                    rulesbycolor.find((rc) => rc.id == col.id).c.splice(rulesbycolor.find((rc) => rc.id == col.id).c.findIndex((co) => co.id == this.id), 1);

                } else {
                    return false;
                }
            }
        } else if (type == "check") {
            if (state) {
                // console.log(this.cbefore);
                this.ccheck.push(col);

                // console.log(this.cbefore);
            } else {
                if (this.ccheck.length > 1) {
                    this.ccheck.splice(this.ccheck.findIndex((c) => c.id == col.id), 1);
                } else {
                    return false;
                }
            }
        } else if (type == "after") {

            console.log(rulesbycolor.find((rc) => rc.id == this.cafter.id));

            this.cafter = col;

        }
        return true;
    },

    setRuleType(type, conditionindex) {
        this.conditions[conditionindex].type = type;
        this.updateelement();
    },
    setx: function (x, conditionindex, append) {
        // console.log('SETTING X: ' + x);
        // console.log(conditionindex);
        var mytype = this.conditions[conditionindex].type;
        if (x !== undefined) {
            if (mytype == ruletypes[0]) {
                if (append) {
                    //if input is a number and isn't already in the array, add it
                    if (typeof (x) == "number") { if (this.conditions[conditionindex].x.includes(x)) { return; } else { this.conditions[conditionindex].x.push(x); } }
                    //if input is not a number (is an array), add items if they are not already included
                    else { for (var i = 0; i < x.length; i++) { if (this.conditions[conditionindex].x.includes(x[i])) { return; } else { this.conditions[conditionindex].x.push(x[i]) } } }
                } else {
                    if (typeof (x) == "number") { this.conditions[conditionindex].x = [x]; }
                    else { this.conditions[conditionindex].x = x; }
                }
            } else if (mytype == ruletypes[1] || mytype == ruletypes[2] || mytype == ruletypes[3]) {
                if (typeof (x) == "number") { this.conditions[conditionindex].x = x; }
                else { this.conditions[conditionindex].x = x[0]; }
            } else if (mytype == ruletypes[4]) {
                var i = append ? 1 : 0;
                // console.log(i);
                // console.log(typeof (x));

                if (typeof (x) == "number") {
                    // console.log('here here');
                    this.conditions[conditionindex].x[i] = x;
                }
                else {
                    this.conditions[conditionindex].x[0] = x[0];
                    this.conditions[conditionindex].x[1] = x[1];
                }
            }
        } else {
            console.warn("No value provided");
            return;

            //if no x is input, assign a random value
            if (mytype == ruletypes[0]) {
                this.conditions[conditionindex].x = [randint(8)];
            }
        }
        // console.log('SET X: ' + x + " for con index " + conditionindex + " appended: " + append);
        // console.log(this.conditions[conditionindex].x);

        this.updateelement();
    },

    removex: function (x, conditionindex) {
        // console.log('removing ' + x);
        // console.log(typeof (x));
        if (typeof (x) == "number") {
            for (var i = 0; i < this.conditions[conditionindex].x.length; i++) {
                // console.log("checking match for: " + this.conditions[conditionindex].x[i]);
                if (this.conditions[conditionindex].x[i] == x) {
                    // console.log(this.conditions[conditionindex].x);
                    // console.log('removing: ' + this.conditions[conditionindex].x[i]);
                    this.conditions[conditionindex].x.splice(i, 1);
                    // console.log(this.conditions[conditionindex].x);
                    break;
                }
            }
            // this.conditions[conditionindex].x = [x];
        } else {
            for (var i = 0; i < x.length; i++) {
                var index = this.conditions[conditionindex].x.findIndex((xi) => xi == x[i]);
                if (index !== -1) {
                    this.conditions[conditionindex].x.splice(index, 1);
                }
            }
        }
        this.updateelement();

    },
    setTarget: function (target, conditionindex, append) {
        if (target !== undefined) {
            if (append) {
                //if input is a number and isn't already in the array, add it
                if (typeof (target) == "number") { if (this.conditions[conditionindex].targets.includes(target)) { return; } else { this.conditions[conditionindex].targets.push(target); } }

                //if input is not a number (is an array), add items if they are not already included
                else { for (var i = 0; i < target.length; i++) { if (this.conditions[conditionindex].targets.includes(target[i])) { return } else { this.conditions[conditionindex].targets.push(target[i]) } } }
            } else {
                if (typeof (this.conditions[conditionindex].targets) == "number") { this.conditions[conditionindex].targets = [target]; }
                else { this.conditions[conditionindex].targets = target; }
            }
        } else {
            this.conditions[conditionindex].targets = [randint(8)];
        }

        this.updateelement();
    },


    countnearbycolors: function (pixel, colors, print) {
        var colorcounter = 0;
        for (var i = 0; i < colors.length; i++) {
            ncol = pixel.ncolors()[colors[i].id]; //the exact number of neighbors with this color
            // if (print) { console.log("Found: " + ncol + " surrounding " + colors[i].name) }
            colorcounter += ncol;
        }
        return colorcounter;
    },

    processAllRules: function (pixel) {
        const ncolors = pixel.ncolors();
        var hasrun = false;
        // console.log(this.conditions.length);
        for (var k = 0; k < this.conditions.length; k++) {
            // console.log("BEFORE "+this.conditions[k].type);
            if (this.conditions[k].active !== false) {
                hasrun = true;
                // console.log(this.conditions[k].type + " PIXEL " + pixel.i);

                switch (this.conditions[k].type) {
                    case ruletypes[0]: //xcolors
                        var foundmatch = false;
                        for (var j = 0; j < this.conditions[k].x.length; j++) {
                            if (this.countnearbycolors(pixel, this.conditions[k].colors, pixel.i == 0) == this.conditions[k].x[j]) {
                                foundmatch = true;
                                break;
                            }
                        }
                        if (!foundmatch) { return false }
                        break;
                    case ruletypes[1]: //groupcountis
                        var foundmatch = false;

                        for (var j = 0; j < this.conditions[k].colors.length; j++) {
                            var numneighbors = countpixelgroup(pixel, this.conditions[k].colors[j], false);
                            if (typeof (numneighbors) == "number") { numneighbors = [numneighbors] };
                            for (var i = 0; i < numneighbors.length; i++) {
                                if (numneighbors[i] == this.conditions[k].x) {
                                    foundmatch = true;
                                }
                            }
                            if (foundmatch) { break; }
                        }
                        if (!foundmatch) { return false }
                        break;
                    case ruletypes[2]: //groupcountgreater
                        var foundmatch = false;
                        for (var j = 0; j < this.conditions[k].colors.length; j++) {
                            var numneighbors = countpixelgroup(pixel, this.conditions[k].colors[j], false);
                            if (typeof (numneighbors) == "number") { numneighbors = [numneighbors] };
                            for (var i = 0; i < numneighbors.length; i++) {
                                if (numneighbors[i] > this.conditions[k].x) {
                                    foundmatch = true;
                                }
                            }
                            if (foundmatch) { break; }
                        }
                        if (!foundmatch) { return false }
                        break;
                    case ruletypes[3]: //groupcountless
                        var foundmatch = false;
                        for (var j = 0; j < this.conditions[k].colors.length; j++) {
                            var numneighbors = countpixelgroup(pixel, this.conditions[k].colors[j], false);
                            if (typeof (numneighbors) == "number") { numneighbors = [numneighbors] };
                            for (var i = 0; i < numneighbors.length; i++) {
                                if (numneighbors[i] < this.conditions[k].x) {
                                    foundmatch = true;
                                    // break;
                                }
                            }
                        }
                        if (!foundmatch) { return false }
                        break;
                    case ruletypes[4]: //groupcountbetween
                        var foundmatch = false;
                        for (var j = 0; j < this.conditions[k].colors.length; j++) {
                            var numneighbors = countpixelgroup(pixel, this.conditions[k].colors[j], false);
                            if (typeof (numneighbors) == "number") { numneighbors = [numneighbors] };

                            for (var i = 0; i < numneighbors.length; i++) {
                                if (numneighbors[i] >= this.conditions[k].x[0] && numneighbors[i] <= this.conditions[k].x[1]) {
                                    foundmatch = true;
                                }
                            }
                            if (foundmatch) { break; }
                        }
                        if (!foundmatch) { return false }
                        break;
                    default:
                        break;
                }

            }
        }
        if (!hasrun) {
            return false;
        }



        // var colorcounter = 0;
        // for (var i = 0; i < this.conditions[k].colors.length; i++) {

        //     ncol = ncolors[this.conditions[k].colors[i].id]; //the exact number of neighbors with this color
        //     colorcounter += ncol;
        //     if (colorcounter > this.conditions[k].x[j]) { break; }//if the counter has gone over already, return false


        //     // if (ncol > this.conditions[k].x[j]) { break; } //if number of colors is greater than colorcounter, too many colors
        //     // else if (ncol == this.conditions[k].x[j]) { console.log('this one'); return this.cafter } //if checking individual colors and not all colors collectively

        // }

        // if (colorcounter == this.conditions[k].x[j]) {
        //     conditionmet = true;
        //     break;
        // }
        // case ruletypes[1]: //lessthancolors
        //     // if (pixel.numcolorsnear(this.ccheck) <= this.conditions[k].x) { return this.cafter }
        //     if (this.all !== 1) {
        //         return (pixel.numcolorsnear(this.conditions[k].colors) <= this.conditions[k].x) ? this.cafter : false;
        //     } else {
        //         for (var i = 0; i < this.conditions[k].colors.length; i++) {
        //             if (pixel.numcolorsnear([this.conditions[k].colors[i]]) <= this.conditions[k].x) { return this.cafter }
        //         }
        //         return false;
        //     }
        //     break;
        // case ruletypes[2]: //morethancolors
        //     if (this.all !== 1) {
        //         return (pixel.numcolorsnear(this.conditions[k].colors) >= this.conditions[k].x) ? this.cafter : false;
        //     } else {
        //         for (var i = 0; i < this.conditions[k].colors.length; i++) { if (pixel.numcolorsnear([this.conditions[k].colors[i]]) >= this.conditions[k].x) { return this.cafter } }
        //         return false;
        //     }
        //     break;
        // case ruletypes[3]: //specificcolors
        //     if (pixel.hascolornear(this.conditions[k].colors, this.conditions[k].targets, this.all == 0)) { return this.cafter }
        //     return false;
        //     break;

        return this.cafter;


    },
    createruletitlecolorelem: function (col) {
        if (this.initiated) {

            var inelem = `<div id="inputcolor_${this.id}_${col.name}" class = "titlecolor titlecolorinput ${col.name}"></div>`;

            document.getElementById("titleinputcolorholder_" + this.id).insertAdjacentHTML("beforeend", inelem);
        }

    },
    addcolorboxeventlistener: function (colorbox, type, selectedcolors, id) {
        colorbox.ref = this;
        colorbox.selectedcolors = selectedcolors;

        if (id !== undefined) { colorbox.id = id }
        colorbox.addEventListener("click", function (e) {
            if (type !== "output" && this.selectedcolors.length == 1 && this.selectedcolors[0].name == colors.find((cf) => cf.name == this.dataset.value).name) { console.log('Need at least one color selected'); return; }
            var r = this.ref;
            var col = colors.find((cf) => cf.name == this.dataset.value);
            this.classList.toggle("target");

            this.parentNode.children[0].children[0].classList.toggle("hidden");
            this.parentNode.children[2].children[0].classList.toggle("hidden");

            if (type == "input") {
                if (this.classList.contains("target")) { r.setcolorbefore(col, false, true); }
                else { r.setcolorbefore(col, true); }
            } else if (type == "check") {
                if (this.classList.contains("target")) { r.setcolorcheck(col, r.conidtoindex(this.id), false, true); }
                else { r.setcolorcheck(col, r.conidtoindex(this.id), true); }
            }
            r.updateelement();
        });
    },
    createcolorboxelements: function (inputcolors) {
        var cstring = "";
        // var con = this.conditions[index];
        for (var i = 0; i < colors.length; i++) {
            var isselected = inputcolors.some((c) => c.id == colors[i].id);
            var hidden = isselected ? "" : "hidden";
            var target = isselected ? "target" : "";
            var celem = `
                                            <div class="colorboxwrapper">
                                            <div class="colorselector"><p class="center ${hidden}">&lt;</p></div>
                                            <div class="button colorbox cb_input_${this.id} ${colors[i].name} ${target}" data-value="${colors[i].name}"></div>
                                            <div class="colorselector"><p class="center ${hidden}">&lt;</p></div>
                                            </div>
                                            `
            cstring += celem;
        }
        return cstring;
    },
    createconditionelement: function (index) {


        //create color boxes
        conditioncolorelems = this.createcolorboxelements(this.conditions[index].colors);

        //create the display elements
        var displayelems = "";

        const isactive = this.conditions[index].active ? "" : "overlay";
        const id = this.conditions[index].id;
        // console.log(index);
        // console.log(id);
        // console.log(this.conidtoindex(id));

        var mytitle = "";
        switch (this.conditions[index].type) {
            case ruletypes[0]: //xcolors
                mytitle = "If surrounded by colors:"
                for (var i = 0; i < 8; i++) {
                    var selected = this.conditions[index].x.includes(i + 1) ? "selected" : "";
                    displayelems += `<div class="displaypixel_${this.id}_${id} rulepixel ${selected}">${i + 1}</div>`
                }
                break;
            case ruletypes[1]: //groupcountis
                mytitle = "Group size equal to:"

                displayelems += `<input id="groupcount_${this.id}_${id}" type="number" class="conditionnumber" value="${this.conditions[index].x}">`;
                break;
            case ruletypes[2]: //groupcountgreater
                mytitle = "Group size greater than:"

                displayelems += `<input id="groupcount_${this.id}_${id}" type="number" class="conditionnumber" value="${this.conditions[index].x}">`;

                break;
            case ruletypes[3]: //groupcountless
                mytitle = "Group size less than:";

                displayelems += `<input id="groupcount_${this.id}_${id}" type="number" class="conditionnumber" value="${this.conditions[index].x}">`;

                break;
            case ruletypes[4]: //groupcountbetween
                mytitle = "Group size between:"

                displayelems += `<input id="groupcountmin_${this.id}_${id}" type="number" class="conditionnumber" value="${this.conditions[index].x[0]}">`;
                displayelems += `<input id="groupcountmax_${this.id}_${id}" type="number" class="conditionnumber" value="${this.conditions[index].x[1]}">`;

                break;

        }
        // if (this.conditions[index].type == ruletypes[0]) {

        // }

        //add main html for the condition box
        var elemstr =
            `<div id="${this.id}_condition_${id}" class="ruleoptionwrapper column ${isactive}">
                <div class="row padtitle">    
                    <input type="checkbox" class="endcap" id="activate_${this.id}_${id}">
                    <div class="ctitle">${mytitle}</div>
                    <div id="delete_${this.id}_${id}" class="endcap">X</div>
                </div>
                <div class="column ruleoptions">
                    <div id="ruleoptions_${this.id}_condition_${id}" class="ruleboxwrapper">${displayelems}</div>
                    <div id="checkcolor_${this.id}_condition_${id}" class="colorholder-colors">${conditioncolorelems}</div>
                </div>
            </div>`;

        document.getElementById("ruleconditions_" + this.id).insertAdjacentHTML("beforeend", elemstr);

        //delete element X
        const deletebox = document.getElementById("delete_" + this.id + "_" + id);
        deletebox.rule = this;
        deletebox.id = id;
        deletebox.addEventListener("click", function () {
            this.rule.removecondition(this.rule.conidtoindex(this.id));
        });


        //active checkbox
        const mycheckbox = document.getElementById("activate_" + this.id + "_" + id);
        mycheckbox.checked = this.conditions[index].active;
        mycheckbox.rule = this;
        mycheckbox.id = id;
        mycheckbox.addEventListener("change", function () {
            this.rule.togglecondition(this.id);
            
            // document.getElementById(this.rule.id + "_condition_" + this.id).classList.toggle("overlay");
            // this.rule.conditions[this.rule.conidtoindex(this.id)].active = !this.rule.conditions[this.rule.conidtoindex(this.id)].active;
        });


        //add functionality for the numbers
        if (this.conditions[index].type == ruletypes[0]) { //If xcolors
            const boxes = document.getElementsByClassName("displaypixel_" + this.id + "_" + id);
            for (var i = 0; i < boxes.length; i++) {
                boxes[i].target = i + 1;
                boxes[i].ref = this;
                boxes[i].id = id;
                boxes[i].addEventListener("click", function (e) {
                    this.classList.toggle("selected");
                    if (this.classList.contains("selected")) { this.ref.setx(this.target, this.ref.conidtoindex(this.id), true); }
                    else { this.ref.removex(this.target, this.ref.conidtoindex(this.id)); }
                });
            }
        } else if (this.conditions[index].type == ruletypes[1] || this.conditions[index].type == ruletypes[2] || this.conditions[index].type == ruletypes[3]) {
            // console.log("groupcount_" + this.id + "_" + id);
            var numbox = document.getElementById("groupcount_" + this.id + "_" + id);
            numbox.id = id;
            numbox.rule = this;
            numbox.addEventListener("input", function () {
                if (this.value < 0) {
                    this.value = 0;
                    if (this.rule.conditions[this.rule.conidtoindex(this.id)].x == 0) { return }
                }
                this.rule.setx(parseInt(this.value), this.rule.conidtoindex(this.id));
            });
        } else if (this.conditions[index].type == ruletypes[4]) {
            // console.log('adding type 4');
            var numboxmin = document.getElementById("groupcountmin_" + this.id + "_" + id);
            var numboxmax = document.getElementById("groupcountmax_" + this.id + "_" + id);
            numboxmin.rule = this;
            numboxmin.id = id;
            numboxmax.rule = this;
            numboxmax.id = id;
            numboxmin.addEventListener("input", function () {
                if (this.value < 0) {
                    this.value = 0;
                }
                this.rule.setx(parseInt(this.value), this.rule.conidtoindex(this.id));
            });
            numboxmax.addEventListener("input", function () {
                if (this.value < 0) {
                    this.value = 0;
                }
                this.rule.setx(parseInt(this.value), this.rule.conidtoindex(this.id), true);
            });
        }



        //add event listeners to all the colorboxes
        const colorboxes = document.getElementById("checkcolor_" + this.id + "_condition_" + id).children;
        for (var i = 0; i < colorboxes.length; i++) {
            this.addcolorboxeventlistener(colorboxes[i].children[1], "check", this.conditions[index].colors, id);
        }
    },

    createelement: function () {

        var strinput = this.createcolorboxelements(this.cbefore);
        var stroutput = this.createcolorboxelements([this.cafter]);

        var title = this.id.split('_').join(' ');
        title = title.slice(0, 1).toUpperCase() + title.substring(1);

        var starthidden = "";

        var newconelems = "";
        for (var i = 0; i < ruletypes.length; i++) {
            newconelems += `<div id="newcon_${this.id}_${i}" class="newconoption transition flat">${ruletypes[i]}</div>`
        }

        var titleinputcolors = "";
        for (var i = 0; i < this.cbefore.length; i++) {
            var inelem = `<div id="inputcolor_${this.id}_${this.cbefore[i].name}" class = "titlecolor titlecolorinput ${this.cbefore[i].name}"></div>`;
            titleinputcolors += inelem;
        }

        var mainelem = `
            <div id="rulewrapper_${this.id}" class="ruleholder">
                <div class="ruledisplayholder ruleinputholder">
                    <div class="ruletitlebar">
                        <div class="titlespan pointer">
                            <div id="dd_${this.id}" class="row grow" data-value="${[this.id]}">
                                <div id="dd_arrow_${this.id}" class="ddarrow">&lt;</div>
                                <div class="title">${title}</div>
                            </div>
                            <div class="row">
                                <div id="reorder_${this.id}" class="endcap column reorderwrapper">
                                    <div id="reorderup_${this.id}" class="reorderarrow"><div><</div></div>
                                    <div id="reorderdown_${this.id}" class="reorderarrow"><div>></div></div>
                                </div>
                                <input type="checkbox" class="endcapruleheader" id="activate_${this.id}">
                                <div id="delete_${this.id}" class="endcapruleheader">X</div>
                            </div>
                        </div>
                        <div id="titlecolors_${this.id}" class="titlecolorbar">
                            <div id ="titleinputcolorholder_${this.id}" class="titlecolorinputholder"> ${titleinputcolors}</div>
                            <div class="titlecolorspacer">></div>
                            <div id="titleoutputcolor_${this.id}" class = "titlecolor titlecoloroutput ${this.cafter.name}"></div>
                        </div>
                    </div>
                    <div id="dd_content_${this.id}" class="fullwidth ${starthidden}">
                        <div id="inputcolor_${this.id}" class="colorholder-colors">${strinput}</div>
                        <div class="spacer"><div class="arrow"></div></div>
                        <div class="conditionwrapper">
                            <div class="ctitle">Conditions</div>
                            <div id="ruleconditions_${this.id}"></div>
                            <div id="newconwrapper_${this.id}" class="newelembutton pointer">
                                <div id="newcontitle_${this.id}" class="button buttontitle">New Condition</div>
                                <div class="full">
                                <div id="newconditionoptions_${this.id}" class="newconwrapper">
                                <div class="flat subtitle">Choose condition type:</div>
                                    ${newconelems}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div class="spacer"><div class="arrow"></div></div>
                        
                        <div id="outputcolor_${this.id}" class="colorholder-colors">${stroutput}</div>
                    </div>
                </div>
            </div>
        `

        document.getElementById("rules").insertAdjacentHTML("beforeend", mainelem);




        //move rules up/down in the order
        const arrowup = document.getElementById("reorderup_" + this.id);
        const arrowdown = document.getElementById("reorderdown_" + this.id);

        arrowup.rule = this;
        arrowdown.rule = this;

        arrowup.addEventListener("click", function () {
            if (this.rule.orderindex == 0) { console.log("returning from arrowup"); return; }
            var targetrule = ruleorder.find((ro) => ro.orderindex == this.rule.orderindex - 1);
            targetrule.orderindex++;
            this.rule.orderindex--;

            const ruleblock = document.getElementById("rulewrapper_" + this.rule.id);
            if (ruleblock.previousElementSibling) {
                ruleblock.parentNode.insertBefore(ruleblock, ruleblock.previousElementSibling);
            }
            for (var i = 0; i < this.rule.cbefore.length; i++) {
                removerulecolor(this.rule, this.rule.cbefore[i]);
            }
            for (var i = 0; i < this.rule.cbefore.length; i++) {
                addrulecolor(this.rule, this.rule.cbefore[i]);
            }
        });
        arrowdown.addEventListener("click", function () {
            if (this.rule.orderindex == ruleorder.length - 1) { console.log("returning from arrowdown"); return; }
            var targetrule = ruleorder.find((ro) => ro.orderindex == this.rule.orderindex + 1);
            targetrule.orderindex--;
            this.rule.orderindex++;

            const ruleblock = document.getElementById("rulewrapper_" + this.rule.id);
            if (ruleblock.nextElementSibling) {
                ruleblock.parentNode.insertBefore(ruleblock.nextElementSibling, ruleblock);
            }
            for (var i = 0; i < this.rule.cbefore.length; i++) {
                removerulecolor(this.rule, this.rule.cbefore[i]);
            }
            for (var i = 0; i < this.rule.cbefore.length; i++) {
                addrulecolor(this.rule, this.rule.cbefore[i]);
            }
        });


        //new condition buttons
        for (var i = 0; i < ruletypes.length; i++) {
            const elem = document.getElementById("newcon_" + this.id + "_" + i);
            elem.rule = this;
            elem.ruletype = i;
            elem.addEventListener("click", function () {
                // var conoptions = Array.from(document.getElementById("newconditionoptions_" + this.rule.id).children);
                // conoptions.forEach(element => { element.classList.toggle("flat"); });
                // document.getElementById("newconwrapper_" + this.rule.id).classList.toggle("fullwidth");
                //CONDITION OBJECT: {type, colors, x, targets, active}
                // console.log("Adding new condition: " + ruletypes[this.ruletype]);
                this.rule.initcondition({ type: ruletypes[this.ruletype], colors: white, x: 5, targets: undefined, active: false })
            });
        }

        //delete button
        const deleterule = document.getElementById("delete_" + this.id);
        deleterule.rule = this;
        deleterule.addEventListener("click", function () {
            deleteRule(this.rule);
            // this.rule.deleteself();
        });

        //disable rule
        const disablerule = document.getElementById("activate_" + this.id);
        disablerule.rule = this;
        disablerule.checked = true;
        disablerule.addEventListener("click", function () {
            this.rule.toggleactive();
            // this.rule.active = !this.rule.active;
            // document.getElementById("rulewrapper_" + this.rule.id).classList.toggle("overlay");
        });


        //newcondition
        document.getElementById("newconwrapper_" + this.id).classList.add("transition");
        const newcontitle = document.getElementById("newconwrapper_" + this.id);
        newcontitle.rule = this;
        newcontitle.addEventListener("click", function () {
            this.classList.toggle("pointer");
            // var wrapper = ;
            var conoptions = Array.from(document.getElementById("newconditionoptions_" + this.rule.id).children);
            conoptions.forEach(element => { element.classList.toggle("flat"); });
            this.classList.toggle("fullwidth");
        });

        //add functionality for drop downs
        document.getElementById("dd_arrow_" + this.id).classList.add("transition");
        document.getElementById("dd_" + this.id).addEventListener("click", function () {
            document.getElementById("dd_content_" + this.dataset.value).classList.toggle("hidden");
            this.children[0].classList.toggle("ddarrowflip");
        });

        //Add function for changing the output colors
        const outputcolors = document.getElementById("outputcolor_" + this.id).children;
        for (var i = 0; i < outputcolors.length; i++) {
            var colorbox = outputcolors[i].children[1];
            colorbox.ref = this;
            colorbox.addEventListener("click", function (e) {
                var r = this.ref;
                var col = colors.find((cf) => cf.name == this.dataset.value);
                if (r.cafter.name == col.name) { return; }
                r.setcolorafter(col);
                var gparent = this.parentNode.parentNode;
                for (var i = 0; i < gparent.children.length; i++) {
                    gparent.children[i].children[0].children[0].classList.add("hidden");
                    gparent.children[i].children[1].classList.remove("target");
                    gparent.children[i].children[2].children[0].classList.add("hidden");
                }
                this.classList.add("target");
                this.parentNode.children[0].children[0].classList.remove("hidden");
                this.parentNode.children[2].children[0].classList.remove("hidden");
                r.updateelement();
            })
        }

        //add functions for changing the input color
        const inputcolors = document.getElementById("inputcolor_" + this.id).children;
        for (var i = 0; i < inputcolors.length; i++) {
            this.addcolorboxeventlistener(inputcolors[i].children[1], "input", this.cbefore);
        }

        //Add in a condition box
        // this.createconditionelement(0);
    },
    toggleactive: function () {
        this.active = !this.active;
        document.getElementById("rulewrapper_" + this.id).classList.toggle("overlay");
    },
    togglecondition: function(conid){
        document.getElementById(this.id + "_condition_" + conid).classList.toggle("overlay");
        this.conditions[this.conidtoindex(conid)].active = !this.conditions[this.conidtoindex(conid)].active;
    },

    updateelement: function () {
        if (this.initiated) {
            // document.getElementById("ruletitle_" + this.id).innerHTML = this.rulestring();
        }
    },
};

function countpixelgroup(pixel, color, orthagonal) {
    orthagonal = true;

    if (pixel.pc.id == color.id) {
        if (pixel.groupsize !== null) {
            // console.log(pixel.i + ' Group already counted: ' + pixel.groupsize);
            return pixel.groupsize;
        }
        var validneighbors = new Set();
        validneighbors.add(pixel.i);
        var uncheckedneighbors = [pixel.i];

        while (uncheckedneighbors.length > 0) {
            var current = uncheckedneighbors.pop();
            var newneighbors = pixels[current].neighborswithcolor(color, orthagonal);
            for (var i = 0; i < newneighbors.length; i++) {
                if (!validneighbors.has(newneighbors[i])) {
                    uncheckedneighbors.push(newneighbors[i]);
                    validneighbors.add(newneighbors[i]);
                }
            }
        }
        validneighbors.forEach((vn) => {    // for (var i = 0; i < validneighbors.length; i++) {
            pixels[vn].groupsize = validneighbors.size;
            pixels[vn].groupid = "group_" + newid();
        });
        return validneighbors.size;

    } else {
        var nc = pixel.neighborswithcolor(color, orthagonal);
        var gids = new Set();
        var groups = [];
        for (var i = 0; i < nc.length; i++) {
            if (pixels[nc[i]].groupid !== null) {
                if (!gids.has(pixels[nc[i]].groupid)) {
                    gids.add(pixels[nc[i]].groupid);
                    groups.push(pixels[nc[i]].groupsize);
                }
            } else {
                groups.push(countpixelgroup(pixels[nc[i]], color, orthagonal));
                gids.add(pixels[nc[i]].groupid);
            }
        }
        return groups;
    }


    // var validneighbors = new Set();
    // var uncheckedneighbors = [];

    // var nc = pixel.neighborswithcolor(color, orthagonal);

    // var validgroup = false;
    // for (var i = 0; i < nc.length; i++) {
    //     if(pixels[nc[i]].groupid !== null){
    //         if(validneighbors.has())

    //     }else{

    //     }

    //     validneighbors.add(nc[i]);
    //     uncheckedneighbors.push(nc[i]);
    //     // validneighbors.push(nc[i]);
    // }
    // // console.log(validneighbors);


    // if (uncheckedneighbors.length == 0) {
    //     pixel.groupsize[color.id] = validneighbors.size;
    //     return validneighbors.size;
    // }



    // if (pixel.pc.id == color.id) {
    //     validneighbors.add(pixel.i)
    // } else {
    //     counter = 0;
    //     validneighbors.forEach((vn) => {    // for (var i = 0; i < validneighbors.length; i++) {

    //         var c = countpixelgroup(pixels[vn], color, orthagonl);

    //     });

    // }



    // while (uncheckedneighbors.length > 0) {
    //     var current = uncheckedneighbors.pop();
    //     var newneighbors = pixels[current].neighborswithcolor(color, orthagonal);
    //     for (var i = 0; i < newneighbors.length; i++) {
    //         if (!validneighbors.has(newneighbors[i])) {
    //             uncheckedneighbors.push(newneighbors[i]);
    //             validneighbors.add(newneighbors[i]);
    //         }
    //     }
    // }


    // validneighbors.forEach((vn) => {    // for (var i = 0; i < validneighbors.length; i++) {

    //     pixels[vn].groupsize[color.id] = validneighbors.size;
    // });

    // console.log("pixel " + pixel.i + ' counting ' + color.name + " neighbors: " + validneighbors.size);


    // return validneighbors.size;
    //while
    //two different arrays: one containing all of the pixels found to be a part of the group
    //a second one of all the pixels in the group that haven't had their neighbors checked yet
    //every loop, find neighbors and add them to the group we are checking, then remove this one from that group
    //while loop goes until the group is empty


}


function newRule(cbefore, cafter, conditions) {
    var object = Object.create(ruleObj);
    object.init(ruleorder.length, cbefore, cafter, conditions);
    ruleorder.push(object);


    return object;
}





///////////////////////////////////////////////////////////////////////////////////
//MAIN LOOP//
///////////////////////////////////////////////////////////////////////////////////

function addrandompixels(inputcolors, percent) {
    const numpixels = Math.floor(pixels.length * percent);
    // console.log(percent);
    // console.log(pixels.length);
    // console.log(numpixels);
    // console.log(pixels.length);
    const randomspots = randints(numpixels, pixels.length);

    for (i = 0; i < randomspots.length; i++) {
        pixels[randomspots[i]].pc = inputcolors[i % inputcolors.length];
        pixels[randomspots[i]].cc = inputcolors[i % inputcolors.length];
    }
    draw();
};

var counter = 0;
function update() {

    for (i = 0; i < (w * h); i++) {
        processrules(i);
    }




    draw();

    for (i = 0; i < (w * h); i++) {
        // pixels[i].pc = pixels[i].cc;
        pixels[i].reset();
    }


    counter++;
    // if(counter % 100 == 0){
    //     console.log('beep');
    // }
    if (counter == 200) {
        console.timeEnd('test');
        // debugger;
    }

}

function draw() {

    const data = imd.data;
    const datargb = new Uint32Array(data.buffer);
    for (var i = 0; i < datargb.length; i++) {
        if (i == 0) {
            // console.log(pixels[i].cc.name);
            // console.log(pixels[i].cc.col32);
        }
        datargb[i] = pixels[i].cc.col32;
    }
    ctx.putImageData(imd, 0, 0, 0, 0, w, h);

    // ctx.save();
    // ctx.setTransform(scale, 0, 0, scale, 5, 5);
    // ctx.clearRect(0,0,w,h);
    // ctx.drawImage(img,0,0);
    // for (var i = 0; i < pixels.length; i++) {
    //     var p = pixels[i];
    //     ctx.fillStyle = p.cc.rgb;
    //     ctx.fillRect((p.p.x), (p.p.y), 1, 1);
    // }
    // ctx.restore();
}




function initelements() {


    //PLAY/PAUSE/NEXT
    document.getElementById("playbutton").addEventListener("click", function () { pause(); });
    document.getElementById("nextbutton").addEventListener("click", () => { if (paused) { update(); } });


    //BRUSH SIZE
    brushelem = document.getElementById("brush");
    brushsizeelem = document.getElementById("sizeslider");
    brushsizeelem.min = 1;
    brushsizeelem.max = 99;
    brushsizeelem.value = 20;
    brushsizeelem.addEventListener("input", () => { setbrushsize() });
    setbrushsize();


    //SPEED SLIDER
    var slider = document.getElementById("speedslider");
    slider.addEventListener("change", () => { speed = minspeed - slider.value; });
    slider.max = minspeed;
    slider.min = 0;
    slider.value = minspeed / 2;
    speed = minspeed / 2;

    //DENSITY SLIDER
    var denelem = document.getElementById("densityslider");
    denelem.min = 1;
    denelem.max = 100;
    denelem.value = 50;


    //DRAWING INPUT
    addEventListener("mousedown", (e) => {
        mousepos = Vector(event.clientX, event.clientY);
        mousedown = true
        if (withinElem(mousepos, cv)) { drawpixels(); }
    });
    addEventListener("mouseup", (e) => { mousedown = false });

    //MOVING BRUSH ELEMENT
    window.addEventListener('mousemove', function (event) {
        mousepos = Vector(event.clientX, event.clientY);
        if (withinElem(mousepos, cv)) {
            brushelem.classList.remove("hidden");
            brushelem.style.top = (mousepos.y - (brushsize / 2)) + "px";
            brushelem.style.left = (mousepos.x - (brushsize / 2)) + "px";
            this.document.body.style.cursor = "none";
            if (mousedown) { drawpixels(event); }
        } else {
            this.document.body.style.cursor = "";
            brushelem.classList.add("hidden");
        }
    });

    //ADD PIXELS BUTTON
    document.getElementById("addpixelsbutton").addEventListener("click", function () { addrandompixels(menucolors, document.getElementById("densityslider").value / 100); });

    //MENU COLOR BOXES
    const colorboxes = document.getElementsByClassName("cb-header");
    for (var i = 0; i < colorboxes.length; i++) {
        colorboxes[i].addEventListener("click", function (e) {
            const col = colors.find((c => c.name == this.dataset.value))
            if (shift) {
                if (menucolors.length == 1 && menucolors[0].name == this.dataset.value) { return; }
                this.classList.toggle("target");
                const index = menucolors.findIndex((c) => c.name == this.dataset.value);
                if (index == -1) { menucolors.push(col); }
                else { menucolors.splice(index, 1); }
                this.parentNode.children[0].children[0].classList.toggle("hidden");
                this.parentNode.children[2].children[0].classList.toggle("hidden");
            } else {
                setheadercolor(col);
            }
        })
    }

    //NEW RULE BUTTON
    document.getElementById("newrule").addEventListener("click", function () {
        rules.push(newRule(white, black));
    });


    //SAVE PRESET BUTTON
    var saveelementelem = document.getElementById("savepresettitle");
    saveelementelem.addEventListener("click", function(){
        var textinput = document.getElementById("presetname");
        var savebutton = document.getElementById("savebutton");
        // textinput.classList.add("textinputopen");
        console.log('save');
        if(textinput.value == ""){
            console.warnlog('Need a name in order to save a preset');
        }else{
            if(ruleorder.length == 0){
                console.warn("cannot save empty ruleset");
            }else{
                storepreset(textinput.value, true);
                console.log('ruleset saved!');
            }
        }
    });
    
    document.getElementById("storepreset").addEventListener("mouseleave", function(){
        console.log('test');
        document.activeElement.blur();
        var textinput = document.getElementById("presetname");
    });






}

function deleteallrules() {
    for (var i = 0; i < colors.length; i++) { rulesbycolor[i] = { id: colors[i].id, c: [] }; }
    ruleorder = [];
    document.getElementById("rules").innerHTML = "";
}

function deleteRule(rule) {

    var i = ruleorder.findIndex((ro) => ro.id == rule.id);
    ruleorder.splice(i, 1);
    var io = rule.orderindex;
    for (var i = 0; i < ruleorder.length; i++) {
        if (ruleorder[i].orderindex > io) { ruleorder[i].orderindex-- }
    }
    rule.deleteself();
    console.log(ruleorder);
}


function setheadercolor(color) {
    const colorboxes = Array.from(document.getElementsByClassName("cb-header"));
    for (var i = 0; i < colorboxes.length; i++) {
        colorboxes[i].classList.remove("target");
        colorboxes[i].parentNode.children[0].children[0].classList.add("hidden");
        colorboxes[i].parentNode.children[2].children[0].classList.add("hidden");
    }
    var t = colorboxes.find((cb) => cb.dataset.value == color.name);
    menucolors = [color];
    t.classList.add("target");
    t.parentNode.children[0].children[0].classList.remove("hidden");
    t.parentNode.children[2].children[0].classList.remove("hidden");
}


function setbrushsize() {
    brushsizeelem = document.getElementById("sizeslider");
    brushsize = (brushsizeelem.value * pixelwidth);
    brushelem.style.width = (brushsizeelem.value * pixelwidth) + "px";
    brushelem.style.height = (brushsizeelem.value * pixelwidth) + "px";
    brushelem.style.borderRadius = (brushsizeelem.value * pixelwidth) + "px";
}

function updatesize() {
    var wrapper = cv.parentElement;

    cv.style.display = "none";
    var aw = wrapper.offsetWidth;
    var ah = wrapper.offsetHeight;
    cv.style.display = "";
    var wrapratio = ah / aw;
    var cvratio = w / h;

    if (wrapratio > cvratio) {
        cv.style.height = ah + "px";
        cv.style.width = (ah * cvratio) + "px";
    } else {
        cv.style.width = aw + "px";
        cv.style.height = (aw / cvratio) + "px";

    }

    pixelwidth = cv.offsetWidth / w;
    setbrushsize();
}

function canvassize() {
    // var bounds = cv.getBoundingClientRect();

    var wrapper = cv.parentElement;
    w = Math.floor(wrapper.offsetWidth / scale);
    h = Math.floor(wrapper.offsetHeight / scale);

    ctx.canvas.width = w;
    ctx.canvas.height = h;


    // console.log('full w: ' + bounds.width);
    // console.log('offset w: ' + cv.offsetWidth);

    // console.log('full h: ' + bounds.height);
    // console.log('offset h: ' + cv.offsetHeight);
    // console.log("a" + cv.offsetWidth);
    // ctx.canvas.width = (cv.offsetWidth / scale);
    // ctx.canvas.height = (cv.offsetHeight / scale);
    // console.log("b" + cv.offsetWidth);
    // console.log("b" + (cv.offsetWidth / scale));

    // ctx.canvas.width = (cv.offsetWidth / scale);
    // ctx.canvas.height = (cv.offsetHeight / scale);
    // w = Math.floor((cv.offsetWidth / scale));
    // w = Math.floor((cv.offsetWidth / scale));
    // h = Math.floor((cv.offsetHeight / scale));

    // w = Math.floor(ctx.canvas.width);
    // h = Math.floor(ctx.canvas.height);
    //w = offset * scale
    //offset = w/scale

    // console.log("w: " + w);
    // console.log("h: " + h);
}

function pause() {
    paused = !paused;
    if (!paused) {
        document.getElementById("playbutton").innerHTML = "| |";
        document.getElementById("nextbutton").classList.add("fade");
        loop();
    } else {
        document.getElementById("playbutton").innerHTML = ">";
        document.getElementById("nextbutton").classList.remove("fade");
    }
}

function init() {
    console.time('test');

    rules = [];
    for (var i = 0; i < colors.length; i++) { rulesbycolor[i] = { id: colors[i].id, c: [] }; }

    initelements();

    cv = document.getElementById("cv");
    ctx = cv.getContext('2d');
    // console.log(cv.offsetWidth);
    canvassize();
    pixelwidth = cv.offsetWidth / w;
    updatesize();

    setheadercolor(orange);

    setbrushsize();
    imd = ctx.createImageData(w, h);
    initbg();
    pause();
    // setB36S23();
    // setflow2();
    // ruletests();
    // ruletests();
    document.addEventListener("keydown", (event) => { shift = event.shiftKey; });
    document.addEventListener("keyup", (event) => {
        shift = event.shiftKey;
        if (event.key == "c") {  }
    });

    // pixelwidth = cv.getBoundingClientRect().width / w;

    // ruletests();

    draw();
    // setGOL();
    // storepreset("Game of Life", false, [black, white]);
    // setflow();
    // storepreset("Flow", false, [black, white]);

    // setswirls(cyan, violet, white);
    // storepreset("Swirls", false, [cyan, violet, white]);

    if (!localStorage.getItem("presets")) {
        localStorage.setItem("presets", JSON.stringify(builtinpresets));
    }


    // console.log(rulesbycolor);
    refreshpresets();
    // restorepreset("Swirls");

}


function loop() {
    if (paused) return;
    setTimeout(() => requestAnimationFrame(loop), speed);
    update();
}

window.addEventListener('load', function () {
    "use strict";
    init();
    loop();
});


/////////////////////////////////////////////////////////////////
//RULE SETS
/////////////////////////////////////////////////////////////////


function initbg() {
    // console.log(w);
    // console.log(h);

    pixels = Array(w * h);
    for (i = 0; i < (w * h); i++) {
        pixels[i] = newPixel(i, itop(i), black);
    }



    // addrandompixels([blue, red, green], 0.99);



    // colors = randfromarray(colorOptions, numColors);
    // colors = [black, white];


    // pixels[i] = newPixel(i, itop(i), green);
    // pixels[i] = newPixel(i, itop(i), randcolor());
    // console.log(pixels[(w * h) - 1]);





    // var randomspots = randints(100, pixels.length / 2);
    // var randomspots = randints(pixels.length / 10, pixels.length / 2);
    // for (i = 0; i < randomspots.length; i++) {
    //     // if (i < randomspots.length / 2) {
    //     pixels[randomspots[i]].pc = white;
    //     pixels[randomspots[i]].cc = white;
    //     // } else {
    //     //     pixels[randomspots[i]].pc = green;
    //     //     pixels[randomspots[i]].cc = green;
    //     // }
    // }

    // var mid = Math.floor(((w * h) / 2) - (w / 2));

    // var test = [mid, mid+1, mid-1, mid+w, mid-w];//plus

    // var test = [mid, mid + 1, mid - 1, mid - 2, mid + 2, mid + w, mid - w, mid + (2 * w), mid - (2 * w)];


    // for (var i = 0; i < test.length; i++){
    //     pixels[test[i]].pc = white;
    //     pixels[test[i]].cc = white;
    // }

    // for (var i = 0; i < test.length; i++){
    //     pixels[test[i]+8000].pc = menucolors[1];
    //     pixels[test[i]+8000].cc = menucolors[1];
    // }

    // for (var i = 0; i < test.length; i++){
    //     pixels[test[i]-8000].pc =green;
    //     pixels[test[i]-8000].cc =green;
    // }
}

function setswirls(col1, col2, col3) {

    if (col1 && col2 && col3) {
        c1 = col1;
        c2 = col2;
        c3 = col3;
    } else {
        c1 = blue;
        c2 = green;
        c3 = red;
    }


    for (var i = 0; i < pixels.length; i++) {
        pixels[i].pc = c1;
        pixels[i].cc = c1;
    }
    addrandompixels([c1, c3, c2], 0.99);

    // rules.push(newRule("xcolors", c2, c3, c3, [3, 4, 5, 6, 7, 8]));
    // rules.push(newRule("xcolors", c1, c2, c2, [3, 4, 5, 6, 7, 8]));
    // rules.push(newRule("xcolors", c3, c1, c1, [3, 4, 5, 6, 7, 8]));

    newRule(c2, c3, { type: "xcolors", colors: c3, x: [3, 4, 5, 6, 7, 8] });
    newRule(c1, c2, { type: "xcolors", colors: c2, x: [3, 4, 5, 6, 7, 8] });
    newRule(c3, c1, { type: "xcolors", colors: c1, x: [3, 4, 5, 6, 7, 8] });
}

function ruletests(col1, col2, col3) {




    //NEW ONE:
    //black 1-8 white, turn white
    //white 8white and white group >50, turn cyan
    //white 2-5 cyan, turn cyan
    //cyan, 8 cyan and cyan group greater than 75, turn red
    //red group red greater than 25 and 7 or 8 red nearby, turn black
    //cyan, 1-8 red, turn red
    //red, 1-8 black, turn black












    var s2 = { type: "xcolors", colors: white, x: [2, 3], active: true };
    var sblue = { type: "xcolors", colors: white, x: [2, 3], active: true };
    var group = { type: "groupcountgreater", colors: white, x: [15], active: true };
    var b3 = { type: "xcolors", colors: white, x: [3], active: true };
    var death = { type: "xcolors", colors: [white, black], x: [1, 2, 3, 4, 5, 6, 7, 8], active: true };


    rules.push(newRule(white, blue, group));
    rules.push(newRule(white, white, s2));
    rules.push(newRule(black, white, b3));
    rules.push(newRule(white, black, death));


    //     rules.push(newRule("xcolors", blue, [black, white], cyan, [6, 7, 8]));



    // if (col1 && col2 && col3) {
    //     c1 = col1;
    //     c2 = col2;
    //     c3 = col3;
    // } else {
    //     c1 = orange;
    //     c2 = white;
    //     c3 = black;
    // }




    // rules.push(newRule("xcolors", black, green, white, 3));
    // for (var i = 0; i < pixels.length; i++) {
    //     pixels[i].pc = c1;
    //     pixels[i].cc = c1;
    // }
    // addrandompixels([c3], 0.99);




    // rules.push(newRule("xcolors", c1, [c2, c1], c1, [6, 7, 8]));
    // rules.push(newRule("xcolors", c2, [c2, c1], c1, [6, 7, 8]));
    // rules.push(newRule("xcolors", c2, [c2, c1], c1, [3, 4, 5, 6, 7]));
    // // rules.push(newRule("xcolors", c1, c1, c1, 2));
    // // rules.push(newRule("xcolors", c1, c1, c1, [2, 3, 4]));
    // rules.push(newRule("xcolors", c1, c1, c2, 2));
    // rules.push(newRule("xcolors", c1, c1, c1, [2, 3, 4]));
    // // rules.push(newRule("xcolors", c1, c1, c1, [2, 3, 4]));

    // rules.push(newRule("xcolors", c2, [c2, c1], c2, [3, 4, 5]));
    // // rules.push(newRule("xcolors", c2, [c2, c1], c2, 3));
    // rules.push(newRule("xcolors", c3, c2, c2, [3, 2]));

    // rules.push(newRule("xcolors", [c1, c2], [c1, c2], c3, [0, 1, 2, 3, 4, 5, 6, 7, 8]));



    // rules.push(newRule("morethancolors", [black, green, white, blue], green, blue, 6));

    // rules.push(newRule("xcolors", blue, blue, blue, 3));
    // rules.push(newRule("morethancolors", blue, [white,green,blue], black, 1));


    // rules.push(newRule("xcolors", [black, red], white, green, 3));
    // rules.push(newRule("xcolors", [black, red], green, white, 3));


    // rules.push(newRule("xcolors", black, white, white, 3));
    // rules.push(newRule("xcolors", black, green, green, 3));

    // rules.push(newRule("morethancolors", black, red, red, 1));
    // rules.push(newRule("morethancolors", red, [green, white], white, 3));
    // rules.push(newRule("morethancolors", red, red, white, 8));
    // rules.push(newRule("lessthancolors", red, [green, white, red, blue], black, 8));




    // var birthrules = randints(4, 5, 1);
    // var birthrules = randints(randint(8,1), 5, 1);

    // var coltest = [white, green, red];
    // console.log(birthrules);
    // for (var i = 0; i < birthrules.length; i++){
    //     var c = coltest[randint(coltest.length)];
    //     rules.push(newRule("xcolors", black, c, c, birthrules[i]));
    // }

    // // var liferules = randints(randint(3,1), 5, 1);
    // var liferules = randints(2, 8, 1);
    // console.log(liferules);
    // for (var i = 0; i < liferules.length; i++){
    //     var c = coltest[randint(coltest.length)];
    //     rules.push(newRule("xcolors", c, c, c, liferules[i]));
    // }

    // addrandompixels(coltest, 0.4);



    // rules.push(newRule("xcolors", white, white, white, 2));
    // rules.push(newRule("xcolors", white, white, white, 3));
    // rules.push(newRule("xcolors", green, green, white, 2));
    // rules.push(newRule("xcolors", green, green, white, 3));




    /////////////////////




    // rules.push(newRule("xcolors", white, [white,green], white, 2));
    // rules.push(newRule("xcolors", white, [white,green], white, 3));
    // rules.push(newRule("xcolors", black, [white,green], white, 3));

    // rules.push(newRule("xcolors", black, black, black, 1));

    //B16S12??

    // rules.push(newRule("xcolors", white, white, white, 1));
    // rules.push(newRule("xcolors", white, white, white, 2));
    // rules.push(newRule("xcolors", white, white, white, 3));
    // rules.push(newRule("xcolors", white, white, white, 4));
    // rules.push(newRule("xcolors", white, white, white, 5));
    // rules.push(newRule("xcolors", white, white, white, 6));
    // rules.push(newRule("xcolors", white, white, white, 7));
    // rules.push(newRule("xcolors", white, white, white, 8));
    // rules.push(newRule("xcolors", white, white, white, 2));

    // rules.push(newRule("xcolors", black, white, white, 1));
    // rules.push(newRule("xcolors", black, white, white, 2));
    // rules.push(newRule("xcolors", black, white, white, 3));



    // rules.push(newRule("morethancolors", green, [red,green], green, 6));
    // rules.push(newRule("xcolors", red, [red,green], red, 3));
    // rules.push(newRule("morethancolors", red, [red,green], green, 4));

    // rules.push(newRule("xcolors", green, green, green, 2));
    // rules.push(newRule("xcolors", green, green, green, 3));


    // // rules.push(newRule("xcolors", black, white, white, 2));
    // rules.push(newRule("xcolors", black, red, red, 3));
    // rules.push(newRule("xcolors", black, red, red, 2));

    // // rules.push(newRule("xcolors", red, black, black, 3));
    // // rules.push(newRule("lessthancolors", [white,green,red], [white,green,red], black,3));


    // // rules.push(newRule("xcolors", black, white, white, 7));
    // // rules.push(newRule("xcolors", black, white, white, 8));


    // rules.push(newRule("lessthancolors", [white,green,red], [white,green,red], black, 8));

}

function setflow(col1, col2, col3) {
    var c1 = col1 !== undefined ? col1 : orange;
    var c2 = col2 !== undefined ? col2 : white;
    var c3 = col3 !== undefined ? col3 : black;

    if (c1.id == c2.id) {
        if (c1.id == white.id) { c1 = orange; }
        else { c1 = white; }
    }

    if (c3.id == c1.id || c3.id == c2.id) {
        if (c1.name !== "white" && c2.name !== "white") {
            c3 = white;
        } else if (c1.name !== "orange" && c2.name !== "orange") {
            c3 = orange;
        } else {
            c3 = black;
        }
    }




    // var orangesurvive = {type:"xcolors", colors: [c2,c1], x:[2,3], active:true};
    // var s2 = { type: "xcolors", colors: white, x: [2, 3], active: true };


    //c1 = orange
    //c2 = white
    //c3 = black

    var ow678 = { type: "xcolors", colors: [c2, c1], x: [6, 7, 8], active: true };
    rules.push(newRule(c1, c1, ow678));

    var ow4t8 = { type: "xcolors", colors: [c2, c1], x: [4, 5, 6, 7, 8], active: true };
    rules.push(newRule(c2, c1, ow4t8));

    var o23 = { type: "xcolors", colors: c1, x: [2, 3], active: true };
    rules.push(newRule(c1, c1, o23));

    var ow3 = { type: "xcolors", colors: [c2, c1], x: 3, active: true };
    rules.push(newRule(c2, c2, ow3));

    var w32 = { type: "xcolors", colors: c2, x: [2, 3], active: true };
    rules.push(newRule(c3, c2, w32));

    var death = { type: "xcolors", colors: [c2, c2], x: [0, 1, 2, 3, 4, 5, 6, 7, 8], active: true };
    rules.push(newRule([c1, c2], c3, death));


    // rules.push(newRule("xcolors", c1, c1, [c2, c1], [6, 7, 8]));
    // rules.push(newRule("xcolors", c2, c1, [c2, c1], [4, 5, 6, 7, 8]));
    // rules.push(newRule("xcolors", c1, c1, c1, [2, 3]));

    // rules.push(newRule("xcolors", c2, c2, [c2, c1], 3));
    // rules.push(newRule("xcolors", c3, c2, c2, [3, 2]));

    // rules.push(newRule("xcolors", [c1, c2], c3, [c1, c2], [0, 1, 2, 3, 4, 5, 6, 7, 8]));

}


function setflow2(col1, col2, col3) {
    var c1 = col1 !== undefined ? col1 : orange;
    var c2 = col2 !== undefined ? col2 : white;
    var c3 = col3 !== undefined ? col3 : black;

    if (c1.id == c2.id) {
        if (c1.id == white.id) { c1 = orange; }
        else { c1 = white; }
    }

    if (c3.id == c1.id || c3.id == c2.id) {
        if (c1.name !== "white" && c2.name !== "white") {
            c3 = white;
        } else if (c1.name !== "orange" && c2.name !== "orange") {
            c3 = orange;
        } else {
            c3 = black;
        }
    }


    var group1 = { type: "groupcountless", colors: c1, x: 1000, active: true };
    var group2 = { type: "xcolors", colors: c3, x: [1, 2, 3, 4, 5, 6, 7, 8], active: true };

    var group3 = { type: "groupcountless", colors: c3, x: 4, active: true };
    var group4 = { type: "groupcountless", colors: c1, x: 4, active: true };

    var ow678 = { type: "xcolors", colors: [c2, c1], x: [6, 7, 8], active: true };
    var ow4t8 = { type: "xcolors", colors: [c2, c1], x: [4, 5, 6, 7, 8], active: true };
    var o23 = { type: "xcolors", colors: c1, x: [2, 3], active: true };

    var ow3 = { type: "xcolors", colors: [c2, c1], x: 3, active: true };
    var w32 = { type: "xcolors", colors: c2, x: [2, 3], active: true };
    var death = { type: "xcolors", colors: [c2, c2], x: [0, 1, 2, 3, 4, 5, 6, 7, 8], active: true };
    // var death = {type:"xcolors", colors: [c2,c2], x:[0,1,2,3,4,5,6,7,8], active:true};

    // var orangesurvive = {type:"xcolors", colors: [c2,c1], x:[2,3], active:true};
    // var s2 = { type: "xcolors", colors: white, x: [2, 3], active: true };
    var w1 = { type: "xcolors", colors: c2, x: [3, 4, 5], active: true };
    var b1 = { type: "xcolors", colors: c1, x: [1], active: true };
    var wg50 = { type: "groupcountgreater", colors: c2, x: [50], active: true };
    var b3m = { type: "xcolors", colors: c3, x: [3, 4, 5, 6, 7, 8], active: true };
    var w0 = { type: "xcolors", colors: c2, x: [0], active: true };
    var w4 = { type: "xcolors", colors: c2, x: [1, 2, 3, 4, 5, 6, 7, 8], active: true };

    var w8 = { type: "xcolors", colors: c2, x: [3, 4, 5, 6, 7], active: true };
    var gw = { type: "groupcountless", colors: c2, x: [50], active: true };
    var noorange = { type: "xcolors", colors: c1, x: [0], active: true };


    // rules.push(newRule(c2, c1, b1));
    newRule(c2, c1, [b1]);
    // rules.push(newRule(c2, c3, [wg50, noorange]));

    // rules.push(newRule(c3, c1, b1));
    // rules.push(newRule(c1, c2, b1));
    // rules.push(newRule(c3, c2, w1));
    // rules.push(newRule(c2, c3, [g50, b3m]));
    // rules.push(newRule(c2, c3, w0));
    // rules.push(newRule(c1, blue, [group1]));
    // rules.push(newRule(c1, blue, [group1]));
    // rules.push(newRule(c3, c1, group3));
    // rules.push(newRule(c1, c3, group4));
    // // rules.push(newRule(c1, c3, [group1, group2]));
    // rules.push(newRule(c1, c1, ow678));
    // rules.push(newRule(c2, c1, ow4t8));
    // rules.push(newRule(c1, c1, o23));

    // rules.push(newRule(c2, c2, ow3));
    // rules.push(newRule(c3, c2, w32));

    // rules.push(newRule([c1, c2], c3, death));


    // rules.push(newRule("xcolors", c1, c1, [c2, c1], [6, 7, 8]));
    // rules.push(newRule("xcolors", c2, c1, [c2, c1], [4, 5, 6, 7, 8]));
    // rules.push(newRule("xcolors", c1, c1, c1, [2, 3]));

    // rules.push(newRule("xcolors", c2, c2, [c2, c1], 3));
    // rules.push(newRule("xcolors", c3, c2, c2, [3, 2]));

    // rules.push(newRule("xcolors", [c1, c2], c3, [c1, c2], [0, 1, 2, 3, 4, 5, 6, 7, 8]));

}


function setB36S23() {

    //B36S23

    // var ow678 = { type: "xcolors", colors: [c2, c1], x: [6, 7, 8], active: true };
    // var ow678 = { type: "xcolors", colors: white, x: 2};

    //
    newRule(white, white, { type: "xcolors", colors: white, x: [2, 3] });
    // newRule("xcolors", white, white, white, 3);

    newRule(black, white, { type: "xcolors", colors: white, x: [3, 6] });
    // newRule("xcolors", black, white, white, 6);
    newRule(white, black, { type: "xcolors", colors: black, x: [1, 2, 3, 4, 5, 6, 7, 8] });
    // rules.push(newRule("lessthancolors", white, white, black, 8));

}

function setGOL(col1, col2) {

    var c1 = col1 !== undefined ? col1 : white;
    var c2 = col2 !== undefined ? col2 : black;

    // B3S23
    var s2 = { type: "xcolors", colors: c1, x: [2, 3], active: true };
    var b3 = { type: "xcolors", colors: c1, x: [3], active: true };
    var death = { type: "xcolors", colors: [c1, c2], x: [1, 2, 3, 4, 5, 6, 7, 8], active: true };
    newRule(c1, c1, s2);
    newRule(c2, c1, b3);
    newRule(c1, c2, death);


    // rules.push(newRule("xcolors", c1, c1, c1, [2, 3]));
    // rules.push(newRule("xcolors", c2, c1, c1, 3));
    // rules.push(newRule("xcolors", c1, c2, c2, [1, 2, 3, 4, 5, 6, 7, 8]));
}

function inputtest() {

    const colorboxes2 = document.getElementsByClassName("cb-input");
    for (var i = 0; i < colorboxes2.length; i++) {
        colorboxes2[i].addEventListener("click", function (e) {
            if (menucolors.length == 1 && menucolors[0].name == e.target.dataset.value) { console.log('Need at least one color selected'); }
            else {
                e.target.classList.toggle("target");
                const index = menucolors.findIndex((c) => c.name == e.target.dataset.value);
                if (index == -1) { menucolors.push(colors.find((c => c.name == e.target.dataset.value))); }
                else { menucolors.splice(index, 1); }
                e.target.parentNode.children[0].classList.toggle("hidden");
                e.target.parentNode.children[2].classList.toggle("hidden");
            }
        })
        if (menucolors.find((c) => c.name == colorboxes2[i].dataset.value)) {
            colorboxes2[i].classList.add("target");
            colorboxes2[i].parentNode.children[0].classList.toggle("hidden");
            colorboxes2[i].parentNode.children[2].classList.toggle("hidden");
        }
    }
}