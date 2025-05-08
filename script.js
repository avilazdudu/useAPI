function buscarLivros() {
    const termo = document.getElementById('busca').value;

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}`)
    .then(res => res.json())
    .then(data => {
        const lista = document.getElementById('resultado');
        lista.innerHTML = '';

        if (data.docs.length === 0) {
            lista.innerHTML = '<li>Nenhum livro encontrado.</li>'; 
        }

        // Mostra até 10 resultados
        data.docs.slice(0, 10).forEach(livro => {
            const item = document.createElement('li');
            item.textContent = `${livro.title} — ${livro.author_name ? livro.author_name.join(', ') : 'Autor desconhecido'}`;
            lista.appendChild(item);
        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById('resultado').innerHTML = '<li>Erro ao buscar livros.</li>';
    });
}

const btnBuscar = document.getElementById('btnBuscar');
btnBuscar.addEventListener('click', () => {
    const alert = document.getElementById('alert');
    alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
        Espere um momento, a API está buscando...
        </div>`
    setTimeout(() => {
        alert.innerHTML = '';
    }, 2400);
    buscarLivros();
});

const inputBusca = document.getElementById('busca');
if (inputBusca) {
    inputBusca.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            buscarLivros();
            const alert = document.getElementById('alert');
            alert.innerHTML = `
                <div class="alert alert-danger" role="alert">
                Espere um momento, a API está buscando...
                </div>`
            setTimeout(() => {
                alert.innerHTML = '';
            }, 2400);
        }
    });
}