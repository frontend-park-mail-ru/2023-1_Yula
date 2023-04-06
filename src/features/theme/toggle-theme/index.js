import store from '@modules/state-manager';

/**
 * Переключение темы
 * @returns {string} - тема
 * @example
 * toggleTheme();
 * // => 'dark'
 * toggleTheme();
 * // => 'light'
 */
export const toggleTheme = () => {
    const body = document.querySelector('body');
    body.classList.toggle('dark');

    const theme = store.getState('theme');
    const newTheme = (theme === 'light') ? 'dark' : 'light';
    store.setState('theme', newTheme);

    return newTheme;
}