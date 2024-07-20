<script lang="ts">
    import jpn from "./lib/jpn";
    import eng from "./lib/eng";
    import { translate } from "./lib/utils";

    let cache = "";
    let value = "";
    let volume = 100;
    let unit = 100;
    let lang = jpn;
    const langs = { [jpn.name]: eng, [eng.name]: jpn };

    const straight = "`";
    const a = new window.AudioContext();
    const g = a.createGain();
    let label: number;
    let on = false;
    let o = a.createOscillator();
    let t = 0;

    $: g.gain.value = volume * 0.0025;
    g.connect(a.destination);
    o.start();

    function keydownK() {
        on = true;
        o.stop();
        o = a.createOscillator();
        o.connect(g);
        t = Date.now();
        o.start();
        clearTimeout(label);
    }

    function keyupK() {
        on = false;
        o.stop();
        const d = Date.now() - t;
        const char = d < 100 ? "・" : "－";
        cache += char;
        label = setTimeout(() => {
            value = translate(lang, cache, value);
            cache = "";
        }, 100);
    }

    // iambic

    type Key = {
        dur: number;
        on: boolean;
        key: string;
        other: () => Key;
        char: string;
    };

    // @ts-expect-error
    const keys = {
        z: { key: "z", dur: unit, on: false, char: "・" },
        x: { key: "x", dur: unit * 3, on: false, char: "－" },
    } as { [id: string]: Key };
    keys.z.other = () => keys.x;
    keys.x.other = () => keys.z;

    let next: string | undefined;
    function play(key: string) {
        const k: Key = keys[key];
        o.stop();
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
                value = translate(lang, cache, value);
                cache = "";
            }
        }, unit + k.dur);
    }

    function keydownI(key: string) {
        if (!(key in keys)) return;
        const k = keys[key];
        if (k.on) return;
        // trigger reactivity
        keys[key] = { ...keys[key], on: true };
        next = key;
        if (!k.other().on) play(key);
    }

    function keyupI(key: string) {
        if (!(key in keys)) return;
        keys[key] = { ...keys[key], on: false };
    }
    function keydown({ key, target }: KeyboardEvent) {
        if ((target as HTMLElement).tagName == "TEXTAREA") return;

        if (key == straight && !on) return keydownK();
        if (key in keys) return keydownI(key);
    }
    function keyup({ key, target }: KeyboardEvent) {
        if ((target as HTMLElement).tagName == "TEXTAREA") return;

        if (key == straight) return keyupK();
        if (key in keys) return keyupI(key);
    }

    $: one = keys.z.on;
    $: ont = keys.x.on;
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
    class="flex flex-col items-center m-2 gap-4 h-[90vh]"
    on:keydown={keydown}
    on:keyup={keyup}
>
    <section>
        <input type="range" bind:value={volume} class="w-1/2" />
        Volume {volume}
        <input type="range" bind:value={unit} class="w-1/2" />
        {unit}ms
        <button on:click={() => (lang = langs[lang.name])}>
            {lang.name}
        </button>
    </section>

    <section class="w-full border border-white flex-1 flex flex-col">
        <div class="dark text-center h-[24pt]">{cache}</div>
        <textarea class="px-2 flex-1 w-full" bind:value />
    </section>

    <button class="dark w-full" class:on><br /></button>
    <section class="w-full flex gap-2">
        <button
            class="flex-1"
            class:one
            on:touchstart|preventDefault={() => keydownI(keys.z.key)}
            on:touchend|preventDefault={() => keyupI(keys.z.key)}
        >
            {keys.z.char}
        </button>
        <button
            class="flex-1"
            class:ont
            on:touchstart|preventDefault={() => keydownI(keys.x.key)}
            on:touchend|preventDefault={() => keyupI(keys.x.key)}
        >
            {keys.x.char}
        </button>
    </section>
    <section class="w-full flex gap-2">
        <button class="flex-1" on:click={() => (value = "")}>Clear</button>
        <button class="flex-1" on:click={() => (value = value.slice(0, -1))}>
            Backspace
        </button>
    </section>
</main>

<style>
    .dark {
        background: #1a1a1a;
    }

    .on,
    .one,
    .ont {
        outline: solid red;
    }
</style>
