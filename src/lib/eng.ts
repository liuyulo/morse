import type { Lang } from "./types"
const data = Object.freeze({
    "a": "・－",
    "b": "－・・・",
    "c": "－・－・",
    "d": "－・・",
    "e": "・",
    "f": "・・－・",
    "g": "－－・",
    "h": "・・・・",
    "j": "・－－－",
    "k": "－・－",
    "l": "・－・・",
    "m": "－－",
    "n": "－・",
    "o": "－－－",
    "p": "・－－・",
    "q": "－－・－",
    "r": "・－・",
    "s": "・・・",
    "t": "－",
    "u": "・・－",
    "v": "・・・－",
    "w": "・－－",
    "x": "－・・－",
    "y": "－・－－",
    "z": "－－・・",
    "i": "・・",
})

const name = "ENG";
const encode = new Map(Object.entries(data));
const decode = new Map(Object.entries(data).map(([k, v]) => [v, k]));
export default { name, encode, decode } as Lang
