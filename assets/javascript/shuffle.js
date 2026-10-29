const randomFisherYates = (list_arr) =>
{
    // Algoritmo de Fisher-Yates
    const input_arr = list_arr;
    for (let i = input_arr - 1; i>0; i--)
    {
        const j = Math.floor(Math.random() * (i+1));
        [input_arr[i], input_arr[j]] = [input_arr[j], input_arr[i]]
    }
    return input_arr;
}
export { randomFisherYates }