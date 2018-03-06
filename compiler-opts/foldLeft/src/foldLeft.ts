const foldLeft = (f, acc, list) => {
  const [x, ...xs] = list;
  if (!x) {
    return acc;
  } else {
    return foldLeft(f, f(acc, x), xs);
  }
};

const test = () => {
  const xs = ["one", "two", "three"];
  const join = (x: string, y: string) => x === "" ? y : x + ", " + y
  console.log(foldLeft(join, null, xs));
};

test();
