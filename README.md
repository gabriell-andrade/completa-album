<div align="center">

# Completa Album

### Seu album digital da Copa do Mundo 2026

Organize sua colecao, acompanhe o progresso e encontre rapidamente as figurinhas que ainda faltam.

![Version](https://img.shields.io/badge/version-2.0.0-dc3b35?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-21-f2b84b?style=for-the-badge&logo=openjdk&logoColor=17212b)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.6-1f8a68?style=for-the-badge&logo=springboot&logoColor=white)

</div>

## Sobre o projeto

O Completa Album e uma aplicacao web para registrar e acompanhar uma colecao de figurinhas. Cada figurinha pode ser marcada como obtida, enquanto o painel resume o andamento do album em tempo real.

A versao `2.0.0` traz uma nova identidade visual, experiencia mobile aprimorada e suporte para instalacao como aplicativo no celular.

## O que voce encontra

- **Progresso visual:** acompanhe total, obtidas, faltantes e percentual da colecao.
- **Navegacao por grupos:** salte rapidamente entre os grupos A ate L.
- **Busca pratica:** encontre paises e figurinhas pelo nome ou codigo.
- **Filtro de faltantes:** veja somente o que ainda precisa ser conquistado.
- **Entidades especiais:** organize tambem figurinhas da Panini, FIFA e Coca-Cola.
- **Experiencia responsiva:** interface adaptada para computador, tablet e celular.
- **PWA instalavel:** adicione o album a tela inicial e abra em modo de aplicativo.

## Previa da versao 2.0.0

A atualizacao principal renovou a experiencia com uma linguagem visual inspirada em albuns esportivos:

- cabecalho com identidade propria;
- paleta editorial com vermelho, dourado, verde e tons de papel;
- cards de paises e figurinhas mais claros;
- layout compacto para telas pequenas;
- rodape com identificacao da versao.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Backend | Java 21 + Spring Boot 4.0.6 |
| Persistencia | Spring Data JPA + PostgreSQL |
| Frontend | HTML, CSS e JavaScript |
| Documentacao da API | Springdoc OpenAPI |
| Build | Maven Wrapper |
| Instalacao mobile | Web App Manifest + Service Worker |

## Como executar localmente

### Pre-requisitos

- Java 21;
- PostgreSQL;
- banco de dados `completa_album` criado localmente.

Configure as credenciais do banco em `src/main/resources/application.properties` ou por variaveis de ambiente antes de iniciar a aplicacao.

### Iniciar a aplicacao

No Windows:

```powershell
./mvnw.cmd spring-boot:run
```

Depois, acesse:

```text
http://localhost:8080
```

### Executar os testes

```powershell
./mvnw.cmd test
```

## Estrutura principal

```text
src/main/java/       Backend Spring Boot
src/main/resources/  Configuracoes e interface estatica
src/test/java/       Testes automatizados
```

## Versao

Versao atual: **v2.0.0**

Consulte as [releases do projeto](https://github.com/gabriell-andrade/completa-album/releases) para acompanhar as mudancas publicadas.

## Proximos passos

- historico de evolucao da colecao;
- compartilhamento do progresso;
- melhorias continuas na experiencia mobile;
- novas ferramentas para organizacao do album.

## Licenca

Projeto pessoal para gerenciamento de uma colecao de figurinhas.
