let entidadeSelecionada = null;

let paisSelecionado = null;

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

const nomesExibicao = {

    "Africa_do_Sul": "África do Sul",
    "Coreia_do_Sul": "Coreia do Sul",
    "Tchequia": "Tchéquia",
    "Canada": "Canadá",
    "Bosnia": "Bósnia e Herzegovina",
    "Suica": "Suíça",
    "Escocia": "Escócia",
    "Australia": "Austrália",
    "Curacao": "Curaçao",
    "Japao": "Japão",
    "Suecia": "Suécia",
    "Tunisia": "Tunísia",
    "Belgica": "Bélgica",
    "Ira": "Irã",
    "Arabia_Saudita": "Arábia Saudita",
    "Costa_do_Marfim": "Costa do Marfim",
    "Nova_Zelandia": "Nova Zelândia",
    "Franca": "França",
    "Argelia": "Argélia",
    "Austria": "Áustria",
    "Jordania": "Jordânia",
    "Uzbequistao": "Uzbequistão",
    "Colombia" : "Colômbia",
    "Croacia" : "Croácia",
    "Panama": "Panamá",
    "Mexico": "México",
    "Estados_Unidos": "Estados Unidos",
    "Coca_Cola": "Coca-Cola"
};

const emojisEntidades = {

    "PANINI": "📖",
    "FIFA": "⚽",
    "Coca_Cola": "🥤"
};

const codigosEntidades = {
    "PANINI": null,
    "FIFA": "FWC",
    "Coca_Cola": "CC"
};

let todasFigurinhas = [];

function atualizarResumoAlbum() {

    const total = todasFigurinhas.length;
    const obtidas = todasFigurinhas.filter(figurinha => figurinha.obtida).length;
    const faltantes = total - obtidas;
    const percentual = total > 0 ? (obtidas * 100) / total : 0;

    document.getElementById("total-figurinhas").textContent = total;
    document.getElementById("obtidas-figurinhas").textContent = obtidas;
    document.getElementById("faltantes-figurinhas").textContent = faltantes;
    document.getElementById("percentual-figurinhas").textContent = `${percentual.toFixed(0)}%`;
}

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

    if (todasFigurinhas.length > 0) {
        atualizarResumoAlbum();
    }
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

    atualizarResumoAlbum();
    renderizarFigurinhas();
}

function renderizarNavegacaoGrupos(secoes, busca) {

    const navegacao = document.getElementById("navegacao-grupos");
    navegacao.innerHTML = "";
    navegacao.classList.toggle("visivel", !busca);

    if (busca) {
        return;
    }

    Object.entries(grupos).forEach(([nomeGrupo, paises]) => {

        if (!paises.some(pais => secoes[pais])) {
            return;
        }

        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "atalho-grupo";
        botao.textContent = nomeGrupo.replace("Grupo ", "");
        botao.setAttribute("aria-label", `Ir para ${nomeGrupo}`);

        botao.addEventListener("click", () => {
            const grupo = document.getElementById(`grupo-${nomeGrupo.replace(" ", "-")}`);

            if (grupo) {
                grupo.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });

        navegacao.appendChild(botao);
    });
}

function criarCardFigurinha(
    figurinha
) {

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
        figurinha.codigo !== "00"
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

    return div;
}

function criarGradeFigurinhas(
    figurinhas
) {

    const grade =
        document.createElement(
            "div"
        );

    grade.className =
        "grade";

    grade.style.marginTop =
        "10px";

    figurinhas.forEach(
        figurinha => {

            grade.appendChild(
                criarCardFigurinha(
                    figurinha
                )
            );
        }
    );

    return grade;
}

function obterSecoesFiltradas(
    busca
) {

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

            const prefixoCodigo =
                figurinha.codigo
                    .match(/^[A-Z]+/)?.[0]
                    ?.toLowerCase() || "";

            if (codigo === busca) {
                return true;
            }

            if (secao.includes(busca)) {
                return true;
            }

            if (
                prefixoCodigo.includes(busca)
            ) {
                return true;
            }

            return busca.length <= 2 &&
                codigo.includes(busca);

        })
        .forEach(figurinha => {

            if (
                !secoes[
                    figurinha.secao
                    ]
            ) {

                secoes[
                    figurinha.secao
                    ] = [];
            }

            secoes[
                figurinha.secao
                ].push(
                figurinha
            );
        });

    return secoes;
}

function renderizarGrupos(
    container,
    secoes,
    busca
) {

    if (busca) {

        Object.keys(secoes)
            .forEach(secao => {

                if (
                    [
                        "PANINI",
                        "FIFA",
                        "Coca_Cola"
                    ].includes(secao)
                ) {
                    return;
                }

                const titulo =
                    document.createElement(
                        "div"
                    );

                titulo.className =
                    "titulo-pais-selecionado";

                const codigoPais =
                    secoes[secao][0]
                        .codigo
                        .match(/^[A-Z]+/)[0];

                titulo.textContent =
                    `📂 ${bandeiras[secao] || "🏳️"} ${nomeExibicao(secao)} (${codigoPais})`;

                container.appendChild(
                    titulo
                );

                const grade =
                    criarGradeFigurinhas(
                        secoes[secao]
                    );

                container.appendChild(
                    grade
                );
            });

        return;
    }

    Object.entries(grupos)
        .forEach(([nomeGrupo, paises]) => {

            const paisesFiltrados =
                paises.filter(
                    pais => secoes[pais]
                );

            if (
                busca
            ) {

                if (
                    paisesFiltrados.length === 1
                ) {

                    paisSelecionado =
                        paisesFiltrados[0];

                } else {

                    paisSelecionado =
                        null;
                }
            }

            if (
                paisesFiltrados.length === 0
            ) {
                return;
            }

            const tituloGrupo =
                document.createElement("div");

            tituloGrupo.className =
                "grupo-titulo";
            tituloGrupo.id =
                `grupo-${nomeGrupo.replace(" ", "-")}`;

            tituloGrupo.innerHTML = `
                <span class="grupo-titulo-text">🏆 ${nomeGrupo}</span>
            `;

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

                const codigoPais =
                    secoes[pais][0]
                        .codigo
                        .match(/^[A-Z]+/)[0];

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
                        ${nomeExibicao(pais)}
                    </div>
                
                    <div class="progresso-pais">
                        ${codigoPais} • ${obtidas}/${total}
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
                        `📂 ${bandeiras[pais] || "🏳️"} ${nomeExibicao(pais)} (${codigoPais})`;

                    container.appendChild(
                        tituloPaisSelecionado
                    );

                    const grade =
                        criarGradeFigurinhas(
                            secoes[pais]
                        );

                    container.appendChild(
                        grade
                    );
                }
            });
        });
}

function renderizarEntidades(
    container,
    secoes,
    busca
) {

    const entidades = [
        "PANINI",
        "FIFA",
        "Coca_Cola"
    ];

    if (busca) {

        entidades
            .filter(
                entidade =>
                    secoes[entidade]
            )
            .forEach(entidade => {

                const titulo =
                    document.createElement(
                        "div"
                    );

                titulo.className =
                    "titulo-pais-selecionado";

                titulo.textContent =
                    `📂 ${emojisEntidades[entidade]} ${nomeExibicao(entidade)}${
                        codigosEntidades[entidade]
                            ? ` (${codigosEntidades[entidade]})`
                            : ""
                    }`;

                container.appendChild(
                    titulo
                );

                container.appendChild(
                    criarGradeFigurinhas(
                        secoes[entidade]
                    )
                );
            });

        return;
    }

    const buscaEhEntidade =
        entidades.some(
            entidade =>
                entidade
                    .toLowerCase()
                    .replaceAll("_", " ")
                    .includes(busca)
        );

    const entidadesFiltradas =
        entidades.filter(
            entidade =>
                entidade
                    .toLowerCase()
                    .replaceAll("_", " ")
                    .includes(busca)
        );

    if (busca) {

        if (
            buscaEhEntidade &&
            entidadesFiltradas.length === 1
        ) {

            entidadeSelecionada =
                entidadesFiltradas[0];

        } else {

            entidadeSelecionada =
                null;
        }
    }

    const entidadesDiv =
        document.createElement("div");

    if (
        !busca ||
        buscaEhEntidade
    ) {

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

    const secoesOrdenadas = [
        ...entidades.filter(
            entidade => secoes[entidade]
        )
    ];

    secoesOrdenadas.forEach(secao => {

        const totalSecao =
            secoes[secao].length;

        const obtidasSecao =
            secoes[secao].filter(
                figurinha =>
                    figurinha.obtida
            ).length;

        const titulo =
            document.createElement(
                "h2"
            );

        titulo.className =
            "conteudo-entidade";

        const emoji =
            emojisEntidades[secao] || "";

        titulo.innerHTML = `
            <div class="nome-pais">
                ${emoji} ${nomeExibicao(secao)}
            </div>
        
            <div class="progresso-pais">
                ${
                    codigosEntidades[secao]
                        ? `${codigosEntidades[secao]} • `
                        : ""
                }
                ${obtidasSecao}/${totalSecao}
            </div>
        `;

        const secaoDiv =
            document.createElement(
                "div"
            );

        secaoDiv.className =
            "card-entidade";

        if (
            entidadeSelecionada === secao
        ) {

            secaoDiv.classList.add(
                "ativa"
            );
        }

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

        if (
            !busca ||
            buscaEhEntidade
        ) {

            entidadesDiv.appendChild(
                secaoDiv
            );
        }

        if (
            entidadeSelecionada === secao
        ) {

            tituloEntidadeSelecionada.textContent =
                `📂 ${emojisEntidades[secao]} ${nomeExibicao(secao)}${
                    codigosEntidades[secao]
                        ? ` (${codigosEntidades[secao]})`
                        : ""
                }`;

            entidadesConteudo
                .appendChild(
                    criarGradeFigurinhas(
                        secoes[secao]
                    )
                );
        }
    });
}

function obterBusca() {

    return document
        .getElementById(
            "busca"
        )
        .value
        .trim()
        .toLowerCase();
}

function nomeExibicao(nome) {

    return nomesExibicao[nome]
        || nome.replaceAll("_", " ");
}

function renderizarFigurinhas() {

    const container =
        document.getElementById(
            "figurinhas"
        );

    const busca =
        obterBusca();

    container.innerHTML = "";

    const secoes =
        obterSecoesFiltradas(
            busca
        );

    const totalDeSecoes = Object.keys(secoes).length;

    if (totalDeSecoes === 0) {
        renderizarNavegacaoGrupos({}, busca);
        container.innerHTML = '<div class="empty-state">Nenhum resultado encontrado para sua busca.</div>';
        return;
    }

    renderizarNavegacaoGrupos(secoes, busca);

    renderizarEntidades(
        container,
        secoes,
        busca
    );

    renderizarGrupos(
        container,
        secoes,
        busca
    );
}

const buscaInput = document.getElementById("busca");
const limparBuscaBotao = document.getElementById("limpar-busca");

function atualizarEstadoBusca() {
    const busca = buscaInput.value.trim();
    limparBuscaBotao.classList.toggle("visible", busca.length > 0);
}

buscaInput.addEventListener(
    "input",
    () => {

        const busca =
            buscaInput.value
                .trim();

        atualizarEstadoBusca();

        if (!busca) {

            entidadeSelecionada =
                null;

            paisSelecionado =
                null;
        }

        renderizarFigurinhas();
    }
);

limparBuscaBotao.addEventListener(
    "click",
    () => {
        buscaInput.value = "";
        atualizarEstadoBusca();
        entidadeSelecionada = null;
        paisSelecionado = null;
        renderizarFigurinhas();
        buscaInput.focus();
    }
);

atualizarEstadoBusca();
carregarProgresso();
carregarFigurinhas();