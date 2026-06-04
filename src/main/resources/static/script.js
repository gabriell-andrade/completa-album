let secoesAbertas =
    JSON.parse(
        localStorage.getItem(
            "secoesAbertas"
        ) || "[]"
    );

const bandeiras = {

    "Mexico": "🇲🇽",
    "Africa_do_Sul": "🇿🇦",
    "Coreia_do_Sul": "🇰🇷",
    "Tchequia": "🇨🇿",
    "Canada": "🇨🇦",
    "Bosnia": "🇧🇦",
    "Catar": "🇶🇦",
    "Suica": "🇨🇭",
    "Brasil": "🇧🇷",
    "Marrocos": "🇲🇦",
    "Haiti": "🇭🇹",
    "Escocia": "🏴",
    "Estados_Unidos": "🇺🇸",
    "Paraguai": "🇵🇾",
    "Australia": "🇦🇺",
    "Turquia": "🇹🇷",
    "Alemanha": "🇩🇪",
    "Curacao": "🇨🇼",
    "Costa_do_Marfim": "🇨🇮",
    "Equador": "🇪🇨",
    "Holanda": "🇳🇱",
    "Japao": "🇯🇵",
    "Suecia": "🇸🇪",
    "Tunisia": "🇹🇳",
    "Belgica": "🇧🇪",
    "Egito": "🇪🇬",
    "Ira": "🇮🇷",
    "Nova_Zelandia": "🇳🇿",
    "Espanha": "🇪🇸",
    "Cabo_Verde": "🇨🇻",
    "Arabia_Saudita": "🇸🇦",
    "Uruguai": "🇺🇾",
    "Franca": "🇫🇷",
    "Senegal": "🇸🇳",
    "Iraque": "🇮🇶",
    "Noruega": "🇳🇴",
    "Argentina": "🇦🇷",
    "Argelia": "🇩🇿",
    "Austria": "🇦🇹",
    "Jordania": "🇯🇴",
    "Portugal": "🇵🇹",
    "Congo": "🇨🇩",
    "Uzbequistao": "🇺🇿",
    "Colombia": "🇨🇴",
    "Inglaterra": "🏴",
    "Croacia": "🇭🇷",
    "Gana": "🇬🇭",
    "Panama": "🇵🇦"
};

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

            const codigo =
                figurinha.codigo.toLowerCase();

            const secao =
                figurinha.secao.toLowerCase();

            if (codigo === busca) {
                return true;
            }

            if (secao.includes(busca)) {
                return true;
            }

            if (
                busca.length <= 2 &&
                codigo.includes(busca)
            ) {
                return true;
            }

            return false;
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

            const bandeira =
                bandeiras[secao] || "🏳️";

            titulo.textContent =
                `▼ ${bandeira} ${secao.replaceAll("_", " ")} (${obtidasSecao}/${totalSecao})`;

            secaoDiv.appendChild(
                titulo
            );

            const grade =
                document.createElement(
                    "div"
                );

            grade.className =
                "grade";

            const aberta =
                busca ||
                secoesAbertas.includes(
                    secao
                );

            grade.style.display =
                aberta
                    ? "flex"
                    : "none";

            titulo.textContent =
                aberta
                    ? `▼ ${bandeira} ${secao} (${obtidasSecao}/${totalSecao})`
                    : `▶ ${bandeira} ${secao} (${obtidasSecao}/${totalSecao})`;

            titulo.addEventListener(
                "click",
                () => {

                    const estaAberta =
                        grade.style.display
                        === "flex";

                    if (estaAberta) {

                        grade.style.display =
                            "none";

                        secoesAbertas =
                            secoesAbertas.filter(
                                s => s !== secao
                            );

                        titulo.textContent =
                            `▶ ${bandeira} ${secao} (${obtidasSecao}/${totalSecao})`;

                    } else {

                        grade.style.display =
                            "flex";

                        if (
                            !secoesAbertas.includes(
                                secao
                            )
                        ) {

                            secoesAbertas.push(
                                secao
                            );
                        }

                        titulo.textContent =
                            `▼ ${bandeira} ${secao} (${obtidasSecao}/${totalSecao})`;
                    }

                    localStorage.setItem(
                        "secoesAbertas",
                        JSON.stringify(
                            secoesAbertas
                        )
                    );
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