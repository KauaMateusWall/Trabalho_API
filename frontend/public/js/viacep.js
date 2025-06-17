document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cepInput');
    const consultarBtn = document.getElementById('consultarBtn');
    const resultadoDiv = document.getElementById('resultado');

    if (consultarBtn && cepInput && resultadoDiv) {
        consultarBtn.addEventListener('click', async () => {
            const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

            if (cep.length !== 8) {
                resultadoDiv.innerHTML = '<p class="error">Por favor, digite um CEP válido com 8 dígitos.</p>';
                return;
            }

            resultadoDiv.innerHTML = '<p>Buscando...</p>';

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    resultadoDiv.innerHTML = '<p class="error">CEP não encontrado.</p>';
                } else {
                    resultadoDiv.innerHTML = `
                        <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                        <p><strong>Complemento:</strong> ${data.complemento || 'N/A'}</p>
                        <p><strong>Bairro:</strong> ${data.bairro}</p>
                        <p><strong>Cidade:</strong> ${data.localidade}</p>
                        <p><strong>UF:</strong> ${data.uf}</p>
                        <p><strong>DDD:</strong> ${data.ddd}</p>
                        <p><strong>IBGE:</strong> ${data.ibge}</p>
                    `;
                }
            } catch (error) {
                resultadoDiv.innerHTML = '<p class="error">Erro ao consultar o CEP. Verifique sua conexão e tente novamente.</p>';
                console.error('Erro na requisição ViaCEP:', error);
            }
        });
    } else {
        console.error("Elementos HTML não encontrados para ViaCEP.");
    }
});