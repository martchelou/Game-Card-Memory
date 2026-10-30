import { pokeapi } from './poke-api.js';
import { modalOpen } from './modal.js';

// card control
const control = {
    card: [],
    turn_count: 0,
    attempt_count: 0,
    win_count: 0
}
const turned = new Set();
const cardFlip = (card_id) =>
{
    card_id.classList.toggle('flipCard');
    setTimeout(
        () => {
            card_id.querySelector('.card-back').classList.toggle('d-none');
            card_id.querySelector('.card-front').classList.toggle('d-none');
        },
        200
    );
}
const toggleCardFlip = (event, card_id) =>
{
    turnsControl();
    event.stopPropagation();
    event.preventDefault();
    const cardContainer = document.getElementById(card_id);
    if (!cardContainer) return;
    control.card.push(card_id);
    turned.add(card_id);
    let cardSt = document.getElementById(control.card[0]);
    let cardSd = document.getElementById(control.card[1]);
    if (control.card.length > 2)
    {
        if (cardSt.dataset.pokemonid === cardSd.dataset.pokemonid)
        {
            cardSt.classList.add('bg-warning');
            cardSd.classList.add('bg-warning');
            // remover o click dos que já viraram
            winControl();
        } else {
            cardFlip(cardSt);
            cardFlip(cardSd);
            attemptControl();
        }
        control.card.splice(0,2);
    }
    if (turned.size === pokeapi.limit * 2 && control.win_count === pokeapi.limit)
    {
        modalOpen(`<h1 class="text-center fw-light display-1 text-white p-5">Game Over!!!</h1>`,'bg-animation');
        winControl();
    }
    cardFlip(cardContainer);
}
const turnsControl = () =>
{
    control.turn_count += 1;
    document.getElementById('turn_count').innerText = control.turn_count;
}
const attemptControl = () =>
{
    control.attempt_count += 1;
    document.getElementById('attempt_count').innerText = control.attempt_count;
}

const winControl = () =>
{
    control.win_count += 1;
    document.getElementById('win_count').innerText = control.win_count;
}
const resetGameCount = () =>
{
    control.turn_count = 0;
    control.attempt_count = 0;
    control.win_count = 0;
    control.card = [];
    document.getElementById('turn_count').innerText = control.turn_count;
    document.getElementById('attempt_count').innerText = control.attempt_count;
    document.getElementById('win_count').innerText = control.win_count;
}
export { control, resetGameCount, toggleCardFlip, turnsControl, attemptControl, winControl }