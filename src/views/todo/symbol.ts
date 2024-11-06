import { InjectionKey } from 'vue';
import { options } from './data';

export const optionsKey = Symbol() as InjectionKey<typeof options>;
