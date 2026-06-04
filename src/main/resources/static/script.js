async function carregarProgresso() {

    const response =
        await fetch("/figurinhas/progresso");

    const progresso =
        await response.json();

    document.getElementById("progresso").textContent =
        `Progresso: ${progresso.obtidas} / ${progresso.total} (${progresso.percentual.toFixed(2)}%)`;

    document.getElementById("barra-progresso").style.width =
        `${progresso.percentual}%`;
}

async function alternarFigurinha(codigo) {

    await fetch(`/figurinhas/${codigo}`, {
        method: "PATCH"
    });

    await carregarProgresso();

    await carregarFigurinhas();
}

async function carregarFigurinhas() {

    const response = await fetch("/figurinhas");

    const figurinhas = await response.json();

    const container =
        document.getElementById("figurinhas");

    container.innerHTML = "";

    const secoes = {};

    figurinhas.forEach(figurinha => {

        if (!secoes[figurinha.secao]) {
            secoes[figurinha.secao] = [];
        }

        secoes[figurinha.secao].push(figurinha);
    });

    Object.keys(secoes).forEach(secao => {

        const titulo =
            document.createElement("h2");

        titulo.textContent = secao;

        container.appendChild(titulo);

        secoes[secao].forEach(figurinha => {

            const div =
                document.createElement("div");

            div.className = "figurinha";

            div.textContent =
                `${figurinha.obtida ? "☑" : "☐"} ${figurinha.codigo}`;

            div.addEventListener("click", () => {
                alternarFigurinha(figurinha.codigo);
            });

            container.appendChild(div);
        });
    });
}

carregarProgresso();
carregarFigurinhas();