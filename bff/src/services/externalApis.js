const axios = require('axios');

const externalApis = {
    fetchPokemon: async (name) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error.message);
            return null;
        }
    },

    fetchChuckNorrisJoke: async () => {
        try {
            const response = await axios.get('https://api.chucknorris.io/jokes/random');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar piada Chuck Norris:', error.message);
            return null;
        }
    },

    fetchRandomUser: async () => {
        try {
            const response = await axios.get('https://randomuser.me/api/');
            return response.data.results[0];
        } catch (error) {
            console.error('Erro ao buscar usuário aleatório:', error.message);
            return null;
        }
    },

    fetchWeather: async (latitude = -27.63, longitude = -52.27) => { 
        try {
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            return response.data.current_weather;
        } catch (error) {
            console.error('Erro ao buscar clima:', error.message);
            return null;
        }
    }
};

module.exports = externalApis;