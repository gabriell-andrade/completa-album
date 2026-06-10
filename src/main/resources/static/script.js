let entidadeSelecionada = null;

let paisSelecionado = null;

let secoesAbertas =
    JSON.parse(
        localStorage.getItem(
            "secoesAbertas"
        ) || "[]"
    );

const grupos = {

    "Grupo A": [
        "Mexico",
        "Africa_do_Sul",
        "Coreia_do_Sul",
        "Tchequia"
    ],

    "Grupo B": [
        "Canada",
        "Bosnia",
        "Catar",
        "Suica"
    ],

    "Grupo C": [
        "Brasil",
        "Marrocos",
        "Haiti",
        "Escocia"
    ],

    "Grupo D": [
        "Estados_Unidos",
        "Paraguai",
        "Australia",
        "Turquia"
    ],

    "Grupo E": [
        "Alemanha",
        "Curacao",
        "Costa_do_Marfim",
        "Equador"
    ],

    "Grupo F": [
        "Holanda",
        "Japao",
        "Suecia",
        "Tunisia"
    ],

    "Grupo G": [
        "Belgica",
        "Egito",
        "Ira",
        "Nova_Zelandia"
    ],

    "Grupo H": [
        "Espanha",
        "Cabo_Verde",
        "Arabia_Saudita",
        "Uruguai"
    ],

    "Grupo I": [
        "Franca",
        "Senegal",
        "Iraque",
        "Noruega"
    ],

    "Grupo J": [
        "Argentina",
        "Argelia",
        "Austria",
        "Jordania"
    ],

    "Grupo K": [
        "Portugal",
        "Congo",
        "Uzbequistao",
        "Colombia"
    ],

    "Grupo L": [
        "Inglaterra",
        "Croacia",
        "Gana",
        "Panama"
    ]
};

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

const emojisEntidades = {

    "PANINI": "🏆",

    "FIFA": "⚽",

    "Coca_Cola": "🥤"
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

    const entidades = [
        "PANINI",
        "FIFA",
        "Coca_Cola"
    ];

    const entidadesDiv =
        document.createElement("div");

    if (!busca) {

        const tituloEntidades =
            document.createElement("h2");

        tituloEntidades.className =
            "titulo-grupo";

        tituloEntidades.textContent =
            "📦 Entidades";

        container.appendChild(
            tituloEntidades
        );

        entidadesDiv.className =
            "entidades-grid";

        container.appendChild(
            entidadesDiv
        );
    }

    const entidadesConteudo =
        document.createElement("div");

    entidadesConteudo.id =
        "entidades-conteudo";

    const tituloEntidadeSelecionada =
        document.createElement("div");

    tituloEntidadeSelecionada.id =
        "titulo-entidade-selecionada";

    container.appendChild(
        tituloEntidadeSelecionada
    );

    container.appendChild(
        entidadesConteudo
    );

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

    const secoesNormais =
        Object.keys(secoes)
            .filter(
                secao =>
                    !entidades.includes(secao)
            );

    const secoesOrdenadas = [
        ...entidades.filter(
            entidade => secoes[entidade]
        ),
        ...Object.keys(secoes)
            .filter(
                secao =>
                    !entidades.includes(secao)
            )
    ];

    secoesOrdenadas.forEach(secao => {

            const secaoDiv =
                document.createElement(
                    "div"
                );

        const ehEntidade =
            entidades.includes(secao);

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

        if (ehEntidade) {

            secaoDiv.className =
                "card-entidade";

            grade.style.display =
                "flex";

            const emoji =
                emojisEntidades[secao] || "";

            titulo.textContent =
                `${emoji} ${secao.replaceAll("_", " ")} (${obtidasSecao}/${totalSecao})`;

            if (
                entidadeSelecionada === secao
            ) {

                secaoDiv.classList.add(
                    "ativa"
                );
            }

            secaoDiv.innerHTML = "";

            secaoDiv.appendChild(
                titulo
            );

            secaoDiv.addEventListener(
                "click",
                () => {

                    entidadeSelecionada =
                        entidadeSelecionada === secao
                            ? null
                            : secao;

                    renderizarFigurinhas();
                }
            );

            if (!busca) {

                entidadesDiv.appendChild(
                    secaoDiv
                );
            }

            if (
                entidadeSelecionada === secao
            ) {

                document.getElementById(
                    "titulo-entidade-selecionada"
                ).textContent =
                    `📂 ${secao.replaceAll("_", " ")}`;

                entidadesConteudo
                    .appendChild(
                        grade
                    );
            }

        } else {

            return;
        }
    });

    Object.entries(grupos)
        .forEach(([nomeGrupo, paises]) => {

            const paisesFiltrados =
                paises.filter(
                    pais => secoes[pais]
                );

            if (
                busca &&
                paisesFiltrados.length === 1
            ) {

                paisSelecionado =
                    paisesFiltrados[0];
            }

            if (
                paisesFiltrados.length === 0
            ) {
                return;
            }

            const tituloGrupo =
                document.createElement("h2");

            tituloGrupo.className =
                "grupo-titulo";

            tituloGrupo.textContent =
                `🏆 ${nomeGrupo}`;

            container.appendChild(
                tituloGrupo
            );

            const grid =
                document.createElement("div");

            grid.className =
                "paises-grid";

            container.appendChild(
                grid
            );

            paisesFiltrados.forEach(pais => {

                if (!secoes[pais]) {
                    return;
                }

                const total =
                    secoes[pais].length;

                const obtidas =
                    secoes[pais].filter(
                        f => f.obtida
                    ).length;

                const card =
                    document.createElement(
                        "div"
                    );

                card.className =
                    "card-pais";

                if (
                    paisSelecionado === pais
                ) {

                    card.classList.add(
                        "ativo"
                    );
                }

                card.innerHTML = `
                    <div class="nome-pais">
                        ${bandeiras[pais] || "🏳️"}
                        ${pais.replaceAll("_", " ")}
                    </div>
                
                    <div class="progresso-pais">
                        ${obtidas}/${total}
                    </div>
                `;

                card.addEventListener(
                    "click",
                    () => {

                        paisSelecionado =
                            paisSelecionado === pais
                                ? null
                                : pais;

                        renderizarFigurinhas();
                    }
                );

                grid.appendChild(
                    card
                );

                if (
                    paisSelecionado === pais
                ) {

                    const tituloPaisSelecionado =
                        document.createElement("div");

                    tituloPaisSelecionado.className =
                        "titulo-pais-selecionado";

                    tituloPaisSelecionado.textContent =
                        `📂 ${bandeiras[pais] || "🏳️"} ${pais.replaceAll("_", " ")}`;

                    container.appendChild(
                        tituloPaisSelecionado
                    );

                    const grade =
                        document.createElement(
                            "div"
                        );

                    grade.className =
                        "grade";

                    grade.style.marginTop =
                        "10px";

                    secoes[pais]
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

                    container.appendChild(
                        grade
                    );
                }
            });
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