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

        data.docs.slice(0, 9).forEach(livro => {
            const divLivro = document.createElement('div');
            divLivro.className = 'd-flex flex-column align-items-center justify-content-center shadow m-3 divLivro';
            divLivro.style.minHeight = '80vh';

            const nomeLivro = document.createElement('p');
            nomeLivro.className = 'mt-3' ;
            nomeLivro.style.fontSize = '0.8rem';
            const autorLivro = document.createElement('p');
            autorLivro.className = 'h6';
            autorLivro.textContent = livro.author_name ? `Autor: ${livro.author_name.join(', ')}` : 'Autor: Desconhecido';
            const capa = document.createElement('img')
            capa.className = 'mt-5 rounded-lg';
            capa.src = livro.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${livro.cover_edition_key}-M.jpg` : 'https://via.placeholder.com/150';
            nomeLivro.textContent = `${livro.title}`;
            divLivro.appendChild(capa);
            divLivro.appendChild(nomeLivro);
            divLivro.appendChild(autorLivro);
            lista.appendChild(divLivro);
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