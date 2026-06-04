let todasFigurinhas = [];

async function carregarProgresso() {

    const response =
        await fetch("/figurinhas/progresso");

    const progresso =
        await response.json();

    document.getElementById("progresso").textContent =
        `Progresso: ${progresso.obtidas} / ${progresso.total} (${progresso.percentual.toFixed(2)}%)`;

    document.getElementById(
        "barra-progresso"
    ).style.width =
        `${progresso.percentual}%`;
}

async function alternarFigurinha(codigo) {

    await fetch(
        `/figurinhas/${codigo}`,
        {
            method: "PATCH"
        }
    );

    await carregarProgresso();

    await carregarFigurinhas();
}

async function carregarFigurinhas() {

    const response =
        await fetch("/figurinhas");

    todasFigurinhas =
        await response.json();

    renderizarFigurinhas();
}

function renderizarFigurinhas() {

    const container =
        document.getElementById(
            "figurinhas"
        );

    const busca =
        document.getElementById(
            "busca"
        ).value
            .trim()
            .toLowerCase();

    container.innerHTML = "";

    const secoes = {};

    todasFigurinhas
        .filter(figurinha => {

            if (!busca) {
                return true;
            }

            return (
                figurinha.codigo
                    .toLowerCase()
                    .includes(busca)
                ||
                figurinha.secao
                    .toLowerCase()
                    .includes(busca)
            );
        })
        .forEach(figurinha => {

            if (!secoes[
                figurinha.secao
                ]) {

                secoes[
                    figurinha.secao
                    ] = [];
            }

            secoes[
                figurinha.secao
                ].push(figurinha);
        });

    Object.keys(secoes)
        .forEach(secao => {

            const secaoDiv =
                document.createElement(
                    "div"
                );

            secaoDiv.className =
                "secao";

            const totalSecao =
                secoes[secao].length;

            const obtidasSecao =
                secoes[secao].filter(
                    figurinha =>
                        figurinha.obtida
                ).length;

            const percentual =
                Math.round(
                    (obtidasSecao * 100)
                    / totalSecao
                );

            const titulo =
                document.createElement(
                    "h2"
                );

            titulo.className =
                "titulo-secao";

            titulo.textContent =
                `▶ ${secao} (${obtidasSecao}/${totalSecao} • ${percentual}%)`;

            secaoDiv.appendChild(
                titulo
            );

            const grade =
                document.createElement(
                    "div"
                );

            grade.className =
                "grade";

            grade.style.display =
                busca
                    ? "flex"
                    : "none";

            titulo.addEventListener(
                "click",
                () => {

                    const aberta =
                        grade.style.display
                        === "flex";

                    if (aberta) {

                        grade.style.display =
                            "none";

                        titulo.textContent =
                            `▶ ${secao} (${obtidasSecao}/${totalSecao} • ${percentual}%)`;

                    } else {

                        grade.style.display =
                            "flex";

                        titulo.textContent =
                            `▼ ${secao} (${obtidasSecao}/${totalSecao} • ${percentual}%)`;
                    }
                }
            );

            secoes[secao]
                .forEach(figurinha => {

                    const div =
                        document.createElement(
                            "div"
                        );

                    div.className =
                        figurinha.obtida
                            ? "figurinha obtida"
                            : "figurinha faltante";

                    let numero =
                        figurinha.codigo;

                    if (
                        figurinha.codigo
                        !== "00"
                    ) {

                        numero =
                            figurinha.codigo
                                .replace(
                                    /^[A-Z]+/,
                                    ""
                                );
                    }

                    div.textContent =
                        numero;

                    div.addEventListener(
                        "click",
                        () => {
                            alternarFigurinha(
                                figurinha.codigo
                            );
                        }
                    );

                    grade.appendChild(
                        div
                    );
                });

            secaoDiv.appendChild(
                grade
            );

            container.appendChild(
                secaoDiv
            );
        });
}

document
    .getElementById("busca")
    .addEventListener(
        "input",
        renderizarFigurinhas
    );

carregarProgresso();
carregarFigurinhas();