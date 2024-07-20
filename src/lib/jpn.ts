import type { Lang } from "./types"
const data = Object.freeze({
    "い": "・－",
    "ろ": "・－・－",
    "は": "－・・・",
    "に": "－・－・",
    "ほ": "－・・",
    "へ": "・",
    "と": "・・－・・",
    "ち": "・・－・",
    "り": "－－・",
    "ぬ": "・・・・",
    "る": "－・－－・",
    "を": "・－－－",
    "わ": "－・－",
    "か": "・－・・",
    "よ": "－－",
    "た": "－・",
    "れ": "－－－",
    "そ": "－－－・",
    "つ": "・－－・",
    "ね": "－－・－",
    "な": "・－・",
    "ら": "・・・",
    "む": "－",
    "う": "・・－",
    "ゐ": "・－・・－",
    "の": "・・－－",
    "お": "・－・・・",
    "く": "・・・－",
    "や": "・－－",
    "ま": "－・・－",
    "け": "－・－－",
    "ふ": "－－・・",
    "こ": "－－－－",
    "え": "－・－－－",
    "て": "・－・－－",
    "あ": "－－・－－",
    "さ": "－・－・－",
    "き": "－・－・・",
    "ゆ": "－・・－－",
    "め": "－・・・－",
    "み": "・・－・－",
    "し": "－－・－・",
    "ゑ": "・－－・・",
    "ひ": "－－・・－",
    "も": "－・・－・",
    "せ": "・－－－・",
    "す": "－－－・－",
    "ん": "・－・－・",
    "ー": "・－－・－",
    "゛": "・・",
    "゜": "・・－－・",
})

export const daku = "かきくけこさしすせそたちつてとはひふへほ";
export const half = "はひふへほ";

const name = "JPN";
const encode = new Map(Object.entries(data));
const decode = new Map(Object.entries(data).map(([k, v]) => [v, k]));
export default { name, encode, decode } as Lang
