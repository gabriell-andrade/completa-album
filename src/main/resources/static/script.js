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

        const secaoDiv =
            document.createElement("div");

        secaoDiv.className = "secao";

        const totalSecao = secoes[secao].length;

        const obtidasSecao =
            secoes[secao].filter(
                figurinha => figurinha.obtida
            ).length;

        const titulo =
            document.createElement("h2");

        titulo.className = "titulo-secao";

        titulo.textContent =
            `${secao} (${obtidasSecao}/${totalSecao})`;

        titulo.textContent =
            `▶ ${secao} (${obtidasSecao}/${totalSecao})`;

        titulo.addEventListener("click", () => {

            const aberta =
                grade.style.display === "flex";

            if (aberta) {

                grade.style.display = "none";

                titulo.textContent =
                    `▶ ${secao} (${obtidasSecao}/${totalSecao})`;

            } else {

                grade.style.display = "flex";

                titulo.textContent =
                    `▼ ${secao} (${obtidasSecao}/${totalSecao})`;
            }
        });

        secaoDiv.appendChild(titulo);

        const grade =
            document.createElement("div");

        grade.className = "grade";

        grade.style.display = "none";

        secoes[secao].forEach(figurinha => {

            const div =
                document.createElement("div");

            div.className =
                figurinha.obtida
                    ? "figurinha obtida"
                    : "figurinha faltante";

            let numero = figurinha.codigo;

            if (figurinha.codigo !== "00") {
                numero =
                    figurinha.codigo.replace(/^[A-Z]+/, "");
            }

            div.textContent =
                `${figurinha.obtida ? "☑" : "☐"} ${numero}`;

            div.addEventListener("click", () => {
                alternarFigurinha(figurinha.codigo);
            });

            grade.appendChild(div);
        });

        secaoDiv.appendChild(grade);

        container.appendChild(secaoDiv);
    });
}

carregarProgresso();
carregarFigurinhas();