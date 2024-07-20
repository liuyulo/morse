import { derived, writable } from 'svelte/store'
import jpn from "./jpn";

export const volume = writable(100);
export const vol = derived(volume, v => v * 0.0025)
export const unit = writable(100);
export const lang = writable(jpn);
