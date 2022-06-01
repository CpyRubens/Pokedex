require("dotenv").config();

const express = require("express");
const path = require("path")
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

//models

const pokemonList = [{
    id: 1,
    nome: "Bulbasaur",
    descricao: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Grass",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
}, {
    id: 2,
    nome: "Charmander",
    descricao: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "Fire",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png"
}, {
    id: 3,
    nome: "Squirtle",
    descricao: "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "Water",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png"

},
{
    id: 4,
    nome: 'Pikachu ',
    descricao: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
    tipo: 'Eletric',
    imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
}]


let pokemon = undefined;
let message = "";


//rotas


//rota principal
app.get("/", (req, res) => {

    setTimeout(() => {
        message = "";
      }, 1000);

    res.render("index", { pokemonList, pokemon, message });
});


// rota de create
app.post("/add", (req, res) => {
    const pokemon = req.body;

    pokemon.id = pokemonList.length + 1;
    pokemonList.push(pokemon);

    message =`Parabéns, ${pokemon.nome} foi adicionando com sucesso a sua pokédex` ;
    res.redirect("/#cards");

});

// rota de leitura
app.get("/detalhes/:id", (req, res) => {
    const id = Number(req.params.id);

    pokemon = pokemonList.find(pokemon => pokemon.id === id);

    res.redirect("/")

})


//rota de editar/update
app.post("/update/:id", (req, res) => {
    const id = Number(req.params.id - 1);

    const newPokemon = req.body;
    pokemonList[id] = newPokemon;
    newPokemon.id = id + 1;
    
    pokemon = undefined;
    res.redirect("/#cards")

})

//rota de delete
app.get("/deletar/:id", (req,res) => {
    const id = Number(req.params.id - 1);
    const pokemon = req.body;

    pokemon.id = pokemonList.length;
    delete pokemonList[id]
 

    res.redirect("/#cards")
} )



app.listen(port, () => console.log(`servidor rodando em http://localhost:${port}`));