import { randomFisherYates } from './shuffle.js';
// pokemon api obj
const pokeapi = {
    api: 'https://pokeapi.co/api/v2/pokemon/',
    offset: 0,
    limit: 4,
    // get list
    getPokemons: async function()
    {
        const response = await fetch(`${this.api}?offset=${this.offset}&limit=${this.limit}`);
        const data = await response.json();
        return data.results.flatMap(item => [item, item]);
    },
    // get details data
    getPokemonDetails: async function(pokemon)
    {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
    },
    // render pokemons cards
    renderPokemons: async function(pokemons)
    {
        let index = 1;
        const cards = randomFisherYates(pokemons);
        cards.forEach(async (pokemon) =>
        {
            const details = await pokeapi.getPokemonDetails(pokemon);
            const card = document.createElement('div');
            card.innerHTML = `<div id="${index}" class="card" data-action="card" data-pokemonid="${details.id}"><div class="card-body card-back d-none"><img src="${details.sprites.other.dream_world.front_default}" alt="${details.name}" class="img-fluid" width="240"></div><div class="card-body card-front"><img src="img/question-circle.svg" alt="Back card" class="img-fluid" width="240"></div></div>`;
            document.querySelector('.grid').appendChild(card);
            index++;
        });
    }
};
export { pokeapi }