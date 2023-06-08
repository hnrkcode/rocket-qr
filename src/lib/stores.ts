import { writable } from 'svelte/store';

export const scale = writable(7);
export const errorResistance = writable(15);
export const foregroundColor = writable('#000000');
export const backgroundColor = writable('#ffffff');
export const quietZone = writable(1);
