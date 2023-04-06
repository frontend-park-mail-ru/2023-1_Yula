import store from '@modules/state-manager';
import { defaultTheme } from '@shared/config';

/**
 * Установка темы
 * @param {string} theme - тема 
 */
export const setTheme = (theme) => {
    const body = document.querySelector('body');
    
    if (defaultTheme === 'dark') {
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
    }

    store.setState('theme', theme);
}