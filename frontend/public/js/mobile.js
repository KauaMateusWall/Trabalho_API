document.addEventListener('DOMContentLoaded', async () => {
    const mobileHomeMain = document.getElementById('mobile-home-main');
    const mobileDetailMain = document.getElementById('mobile-detail-main');

    // Lógica para a Tela Inicial (mobile-home.html)
    if (mobileHomeMain) {
        mobileHomeMain.innerHTML = '<p class="loading-message">Carregando dados do dashboard...</p>';
        try {
            const response = await fetch('http://localhost:3000/api/mobile/dashboard'); // Chama o BFF
            const data = await response.json();

            if (response.ok) {
                mobileHomeMain.innerHTML = `
                    <div class="card">
                        <img src="${data.featuredPokemon.image}" alt="${data.featuredPokemon.name}">
                        <div class="card-content">
                            <h3>Pokémon em Destaque: ${data.featuredPokemon.name.toUpperCase()}</h3>
                            <p>Tipo(s): ${data.featuredPokemon.types.join(', ')}</p>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-content">
                            <h3>Piada do Dia:</h3>
                            <p>${data.dailyJoke}</p>
                        </div>
                    </div>
                    <a href="mobile-detail.html" class="link-button">Ver Detalhes Aleatórios</a>
                `;
            } else {
                mobileHomeMain.innerHTML = `<p class="error-message">Erro ao carregar dashboard: ${data.message || 'Erro desconhecido.'}</p>`;
            }
        } catch (error) {
            mobileHomeMain.innerHTML = '<p class="error-message">Erro de conexão com o BFF. Verifique se o BFF está rodando na porta 3000.</p>';
            console.error('Erro ao buscar dados do dashboard:', error);
        }
    }

    // Lógica para a Tela de Detalhes (mobile-detail.html)
    if (mobileDetailMain) {
        mobileDetailMain.innerHTML = '<p class="loading-message">Carregando detalhes...</p>';
        try {
            const response = await fetch('http://localhost:3000/api/mobile/details'); // Chama o BFF
            const data = await response.json();

            if (response.ok) {
                const userHtml = data.randomUser ? `
                    <div class="detail-card">
                        <img src="${data.randomUser.picture}" alt="Foto de Perfil" class="profile-pic">
                        <h2>${data.randomUser.name}</h2>
                        <p>Email: ${data.randomUser.email}</p>
                        <p>Localização: ${data.randomUser.city}, ${data.randomUser.country}</p>
                    </div>
                ` : '<p class="error-message">Não foi possível carregar dados do usuário.</p>';

                const weatherHtml = data.currentWeather ? `
                    <div class="weather-info">
                        <h3>Clima Atual (Erechim, RS):</h3>
                        <p>Temperatura: ${data.currentWeather.temperature}°C</p>
                        <p>Velocidade do Vento: ${data.currentWeather.windspeed} m/s</p>
                        <p>Direção do Vento: ${data.currentWeather.winddirection}°</p>
                        <p>Última atualização: ${new Date(data.currentWeather.time).toLocaleString()}</p>
                    </div>
                ` : '<p class="error-message">Não foi possível carregar dados do clima.</p>';


                mobileDetailMain.innerHTML = userHtml + weatherHtml +
                                            '<a href="mobile-home.html" class="link-button">Voltar para Home</a>';
            } else {
                mobileDetailMain.innerHTML = `<p class="error-message">Erro ao carregar detalhes: ${data.message || 'Erro desconhecido.'}</p>`;
            }
        } catch (error) {
            mobileDetailMain.innerHTML = '<p class="error-message">Erro de conexão com o BFF. Verifique se o BFF está rodando na porta 3000.</p>';
            console.error('Erro ao buscar dados de detalhes:', error);
        }
    }
});