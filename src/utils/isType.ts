export const isObject = (value: unknown): value is Record<any, any> => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};

export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

export const isFunction = (value: unknown): value is (...args: any) => any =>
  typeof value === "function";

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isUndef = (value: unknown): value is undefined =>
  typeof value === "undefined";

export const isBrowser = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export function isPlainObject(value: unknown) {
  if (!isObjectLike(value) || getTag(value) !== "[object Object]") {
    // undefined null [object Array]
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

function isObjectLike(value: unknown) {
  return typeof value === "object" && value !== null;
}

function getTag(value: unknown) {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  return Object.prototype.toString.call(value);
}
