const express = require('express');
const router = express.Router();
const externalApis = require('../services/externalApis');

router.get('/dashboard', async (req, res) => {
    try {
        const [pokemonData, jokeData] = await Promise.all([
            externalApis.fetchPokemon('snorlax'), // Exemplo: busca Snorlax
            externalApis.fetchChuckNorrisJoke()
        ]);

        const consolidatedData = {
            featuredPokemon: pokemonData ? {
                name: pokemonData.name,
                image: pokemonData.sprites.front_default,
                types: pokemonData.types.map(t => t.type.name)
            } : null,
            dailyJoke: jokeData ? jokeData.value : "Não foi possível carregar a piada do Chuck Norris."
        };

        res.json(consolidatedData);
    } catch (error) {
        console.error('Erro no endpoint /dashboard do BFF:', error);
        res.status(500).json({ message: 'Erro ao carregar dados do dashboard.' });
    }
});

router.get('/details', async (req, res) => {
    try {
        const [userData, weatherData] = await Promise.all([
            externalApis.fetchRandomUser(),
            externalApis.fetchWeather() // Exemplo: busca a previsão do tempo atual
        ]);

        const consolidatedData = {
            randomUser: userData ? {
                name: `${userData.name.first} ${userData.name.last}`,
                email: userData.email,
                picture: userData.picture.large,
                city: userData.location.city,
                country: userData.location.country
            } : null,
            currentWeather: weatherData ? {
                temperature: weatherData.temperature,
                windspeed: weatherData.windspeed,
                winddirection: weatherData.winddirection,
                time: weatherData.time
            } : null
        };

        res.json(consolidatedData);
    } catch (error) {
        console.error('Erro no endpoint /details do BFF:', error);
        res.status(500).json({ message: 'Erro ao carregar dados de detalhes.' });
    }
});

module.exports = router;