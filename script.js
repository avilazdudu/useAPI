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
            capa.src = livro.cover_edition_key ? `https://covers.openlibrary.org/b/olid/${livro.cover_edition_key}-M.jpg` : capa.alt = `${livro.title} - Capa não disponível`;
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
         <div class="progress w-50 m-3">
            <div id="barraProgresso" class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`
    setTimeout(() => {
        const barraProgresso = document.getElementById('barraProgresso');
        let width = 10;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 25;
                barraProgresso.style.width = width + '%';
            }
        },600)
    }, 600);
    setTimeout(() => {
        alert.innerHTML = '';
    }, 3500);
    buscarLivros();
});

const inputBusca = document.getElementById('busca');
if (inputBusca) {
    inputBusca.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            buscarLivros();
            const alert = document.getElementById('alert');
             alert.innerHTML = `
         <div class="progress w-50 m-3">
            <div id="barraProgresso" class="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`
    setTimeout(() => {
        const barraProgresso = document.getElementById('barraProgresso');
        let width = 10;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);
            } else {
                width += 25;
                barraProgresso.style.width = width + '%';
            }
        },600)
    }, 600);
    setTimeout(() => {
        alert.innerHTML = '';
    }, 3500);
        }
    });
}