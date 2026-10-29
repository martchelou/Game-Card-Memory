import { getPage, getModal } from './fetch.js';
import { pokeapi } from './poke-api.js';
import { modalClose } from './modal.js';
import { resetGameCount, toggleCardFlip } from './cards.js';

const clickControl = e =>
{
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action } = btn.dataset;
    const file  = btn.href ? btn.href.split('#')[1] : null;
    if (action === 'content')
    {
        location.hash = '#' + file;
        getPage(file+'.html', action, file.charAt(0).toUpperCase() + file.slice(1));
    }
    if (action === 'modal') getModal(file+'.html');
    if (action === 'board')
    {
        pokeapi.limit = Math.floor(btn.id/2);
        const board_game = document.querySelector('.grid');
        board_game.innerHTML = '';
        board_game.classList.add(`grid__col--${btn.id}`);
        pokeapi.getPokemons()
        .then(pokemons => pokeapi.renderPokemons(pokemons))
        .then(() => modalClose())
        .then(() => resetGameCount())
    }
    if (action === 'card') toggleCardFlip(e, btn.id);
}
const setupInteractions = () => document.querySelector('body')?.addEventListener('click', clickControl);

export { setupInteractions };