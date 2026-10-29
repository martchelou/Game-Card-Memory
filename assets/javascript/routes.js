import { getPage } from './fetch.js'

switch (location.hash)
{
    case '':
    case '#home':
        getPage('home.html','content','Memory Game');
        break;
    case '#about':
        getPage('about.html','content','About');
        break;
    case '#privacy':
        getPage('privacy.html','content','Privacy');
        break;
    default:
        throw new Error('Eita!!! A rota não existe');
        break;
}