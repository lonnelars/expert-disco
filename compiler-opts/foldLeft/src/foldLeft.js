var foldLeft = function (f, acc, list) {
    var x = list[0], xs = list.slice(1);
    if (!x) {
        return acc;
    }
    else {
        return foldLeft(f, f(acc, x), xs);
    }
};
var test = function () {
    var xs = ["one", "two", "three"];
    var join = function (x, y) { return x === "" ? y : x + ", " + y; };
    console.log(foldLeft(join, null, xs));
};
test();
