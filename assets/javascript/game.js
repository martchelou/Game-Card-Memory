import { getModal } from './fetch.js';
// functions
const newGame = () => getModal('new_game.html');
// statements
const new_game_btn = document.getElementById('new-game');
new_game_btn.onclick = newGame;