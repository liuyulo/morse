<script lang="ts">
    import { translate } from "./lib/utils";
    import { vol, unit, lang } from "./lib/stores";

    export let cache: string;
    export let value: string;

    const key = "`";
    const a = new window.AudioContext();
    const g = a.createGain();

    let label: number;
    let on = false;
    let o = a.createOscillator();
    let t = 0;

    g.gain.value = $vol;
    g.connect(a.destination);
    o.start();

    function start(e: KeyboardEvent | TouchEvent) {
        if ("repeat" in e && e.repeat) return;
        if ("key" in e && e.key != key) return;
        on = true;
        o.stop();
        o = a.createOscillator();
        o.connect(g);
        t = Date.now();
        o.start();
        clearTimeout(label);
    }

    function stop(e: KeyboardEvent | TouchEvent) {
        if ("repeat" in e && e.repeat) return;
        if ("key" in e && e.key != key) return;
        on = false;
        o.stop();
        const d = Date.now() - t;
        const char = d < $unit ? "・" : "－";
        cache += char;
        label = setTimeout(() => {
            value = translate($lang, cache, value);
            cache = "";
        }, 100);
    }
</script>

<button
    class="dark w-full"
    class:on
    on:keypress|preventDefault={start}
    on:keyup|preventDefault={stop}
    on:touchstart={start}
    on:touchend={stop}
>
    <br />
</button>

<style>
    .on {
        outline: solid red;
    }
</style>
