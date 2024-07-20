<script lang="ts">
    import { translate } from "./lib/utils";
    import { vol, unit, lang } from "./lib/stores";

    export let cache: string;
    export let value: string;

    type Key = {
        dur: number;
        on: boolean;
        key: string;
        other: () => Key;
        char: string;
    };

    // @ts-expect-error
    const keys = {
        z: { key: "z", dur: $unit, on: false, char: "・" },
        x: { key: "x", dur: $unit * 3, on: false, char: "－" },
    } as { [id: string]: Key };
    keys.z.other = () => keys.x;
    keys.x.other = () => keys.z;

    const a = new window.AudioContext();
    const g = a.createGain();
    g.connect(a.destination);
    g.gain.value = $vol;

    let o: OscillatorNode;
    let next: string | undefined;
    function play(key: string) {
        const k: Key = keys[key];
        if (o) o.stop();
        o = a.createOscillator();
        o.connect(g);
        o.start();
        o.stop(a.currentTime + k.dur / 1000);
        cache += k.char;
        setTimeout(() => {
            const k = keys[key];
            const other = k.other();
            if (next && next != key) {
                play(next);
                next = undefined;
            } else if (other.on) {
                play(other.key);
            } else if (k.on) {
                play(key);
            } else {
                value = translate($lang, cache, value);
                cache = "";
            }
        }, $unit + k.dur);
    }

    function keydown({ key }: { key: string }) {
        if (!(key in keys)) return;
        const k = keys[key];
        if (k.on) return;
        // trigger reactivity
        keys[key] = { ...keys[key], on: true };
        next = key;
        if (!k.other().on) play(key);
    }

    function keyup({ key }: { key: string }) {
        if (!(key in keys)) return;
        keys[key] = { ...keys[key], on: false };
    }
    $: dit = keys.z.on;
    $: dah = keys.x.on;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
    class="w-full flex gap-2"
    on:keydown|preventDefault={keydown}
    on:keyup|preventDefault={keyup}
>
    <button
        class="flex-1"
        class:dit
        on:touchstart|preventDefault={() => keydown({ key: keys.z.key })}
        on:touchend|preventDefault={() => keyup({ key: keys.z.key })}
    >
        {keys.z.char}
    </button>
    <button
        class="flex-1"
        class:dah
        on:touchstart|preventDefault={() => keydown({ key: keys.x.key })}
        on:touchend|preventDefault={() => keyup({ key: keys.x.key })}
    >
        {keys.x.char}
    </button>
</section>

<style>
    .dit,
    .dah {
        outline: solid red;
    }
</style>
