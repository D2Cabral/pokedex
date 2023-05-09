

const pokeApi = {}

function convertPokeApiDetailToPokemon(pokedetail){

    const pokemon = new Pokemon()
    pokemon.number = pokedetail.id
    pokemon.name = pokedetail.name    
   
    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)    
    const [type] = types //recebe primeira linha do array    
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokedetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((Response) => Response.json()) //converte detalhes para Json
    .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = (offset,limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset= ${offset}&limit=${limit}`
   
    return fetch(url) 
    .then((Response) => Response.json()) //Converte para Json
    .then((jsonBody) => jsonBody.results) // Pega lista de pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // converte lista de pokemnos em uma nova lista de requisição de detalhes
    .then((detailRequests) => Promise.all(detailRequests)) 
    .then((PokemonsDetails) => PokemonsDetails) //tem uma lista de detalhes de pokemons
}

