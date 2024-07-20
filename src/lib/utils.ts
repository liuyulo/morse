import { daku, half } from "./jpn";
import type { Lang } from "./types";

export function translate(lang: Lang, cache: string, value: string) {
    let char = lang.decode.get(cache) ?? '';
    const last = value.slice(-1);
    switch (char) {
        case "゛":
            if (!last || !daku.includes(last)) break;
            return value.slice(0, -1) + String.fromCharCode(last.charCodeAt(0) + 1);
        case "゜":
            if (!last || !half.includes(last)) break;
            return value.slice(0, -1) + String.fromCharCode(last.charCodeAt(0) + 2);
    }
    return value + char;
}

