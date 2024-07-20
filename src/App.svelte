<script lang="ts">
    import jpn from "./lib/jpn";
    import eng from "./lib/eng";
    import Straight from "./Straight.svelte";
    import Iambic from "./Iambic.svelte";
    import { volume, unit, lang } from "./lib/stores";

    let cache = "";
    let value = "";
    const langs = { [jpn.name]: eng, [eng.name]: jpn };
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main class="flex flex-col items-center m-2 gap-4 h-[90vh]">
    <section>
        <input type="range" bind:value={$volume} class="w-1/2" />
        Volume {$volume}
        <input type="range" bind:value={$unit} class="w-1/2" />
        {$unit}ms
        <button on:click={() => ($lang = langs[$lang.name])}>{$lang.name}</button>
    </section>

    <section class="w-full border border-white flex-1 flex flex-col">
        <div class="dark text-center h-[24pt]">{cache}</div>
        <textarea class="px-2 flex-1 w-full" bind:value />
    </section>

    <Straight bind:cache bind:value />
    <Iambic bind:cache bind:value />
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
</style>
