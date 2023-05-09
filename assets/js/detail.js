
const loadDetail = document.getElementById('listdetail')
const maxRecords = 151
const limit = 10
let offset = 0;


function loadPokemonDetail(){
    pokeApi.getPokemons(offset ,limit).then((pokemons = []) => {    
        const newHtmlDetail = pokemons.map((pokemon) => 

            ` <span class="name"> ${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
      
            <div class="details">
              <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>      
              
            </div>
      
            <div class="image">
              <img src="${pokemon.photo}"
              alt="${pokemon.name}">
      
            </div>
      
          </div>
          `          
          )
         loadDetail.innerHTML = newHtmlDetail

    })

}


loadPokemonDetail(offset, limit)
