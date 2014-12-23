---
layout: post
title:  "Sirva seu blog com Github Pages Like a Kyller"
subtitle: "Parte 2: O que é Jekyll? Entenda como funciona"
date:   2014-12-14
categories: [github, jekyll]
tags: [featured, github, jekyll]
featured: true
image: /assets/images_articles/sirva-seu-blog-com-github-pages-like-a-kyller/post-jekyll-e-github-pages.jpg
comments: true
description: Jekyll é um parser engine distribuído como um gem do Ruby. Ele é utilizado para gerar websites estáticos, através de componentes como templates, partials, liquid, markdown, entre outros.
---

# O que é Jekyll?

Jekyll é um parser engine distribuído como um gem do Ruby. Ele é utilizado para gerar websites estáticos, através de componentes como templates, partials, liquid, markdown, entre outros. Esse cara é conhecido como gerador de sites estático.


Este website é um exemplo de site estático, open-source, [disponível aqui](https://github.com/stpa-co/meditator), desenvolvido em Jekyll =)

Você pode encontrar [outros exemplos aqui](https://github.com/jekyll/jekyll/wiki/Sites).


# O que ele faz?

Jekyll é um parser, como dito acima. Você poderá instalar localmente, utilizar pelo GitHub Pages, ou ambos. Quando instalado localmente, rodando o comando `jekyll serve` no terminal, dentro do diretório do projeto, o mesmo irá realizar o parser de todos arquivos markdown/textile, computar categorias, tags, permalinks e construir suas páginas a partir dos templates/partials, para no final armazenar o resultado da build na pasta `_site`. O conteúdo será servido estáticamente através do endereço `localhost:4000`

# Porque usá-lo?
Jekyll é minimalístico e muito eficiente. O ponto mais importante a se considerar, é que ele cria uma representação do seu site, sendo dependente apenas de um simples servidor estático. Websites dinâmicos tradicionais, utilizando-se de tecnologias como WordPress, necessitam obrigatóriamente de uma base de dados e um código no lado do servidor. Estes sites quando possuem um tráfico muito pesado, acabam necessitando de uma camada de cache, que irá realizar o mesmo trabalho do Jekyll, servir um conteúdo estático para maior desempenho.

Se você é desenvolvedor e prefere manter as coisas simples trabalhando com linha de comando, será feliz utilizando  Jekyll. Se você é um usuário apenas, terá que aprender um pouco dos paranauês sobre <a href="https://help.github.com/articles/markdown-basics/" target="_blank">Markdown</a> e GitHub para publicar seus posts. Confira abaixo algumas vantagens:

- Você pode escrever conteúdo via Markdown no seu editor de texto favorito;
- Você pode escrever conteúdo e pré-visualizar via interface do GitHub;
- Você pode escrever conteúdo e pré-visualizar localmente (instalando o Jekyll);
- Não é necessário conexão com internet;
- Não é necessário base de dados;
- Você pode publicar sites/blogs em ambiente de produção via Git;
- Você pode hospedar sites/blogs em qualquer servidor estático (Amazon S3, GitHub Pages, etc...);
- Você pode hospedar sites/blogs gratuitamente através do GitHub Pages;

# Como Jekyll funciona
**Atenção!**

Abaixo irei falar um pouco sobre como o Jekyll funciona, porém sem exemplos. A informação a seguir não tem por objetivo lhe ensinar a desenvolver em Jekyll, mas sim lhe mostrar uma visão geral sobre o assunto

# Setup inicial
Após a instalação, você precisará formatar a organização de diretórios e arquivos do seu site, de forma com que o Jekyll interprete-os. Caso não queira ter este trabalho, você pode fazer uma [fork deste blog](https://github.com/stpa-co/meditator).

Jekyll irá esperar de você o seguinte:

- _config.yml
- _includes
- _layouts
  - default.html
  - post.html
- _posts
  - 2014-12-12-hello-world.md
  - 2014-12-14-open-source-is-good.md
- _site
  - index.html
- assets
- css
  - style.css
- javascripts

**_config.yml** - Irá guardar todas as configurações do seu site como nome, descrição, email e etc.

**_includes** - Esta pasta será para os partials views

**_layouts** - Aqui ficará os arquivos de templates, você poderá ter diferentes layouts por página/post

**_posts** - Esta pasta conterá seu conteúdo "dinâmico", ou posts. O nome dos arquivos deverá seguir o formato padrão `ANO-MES-DIA-titulo-do-post.md` (ou .markdown)

**_site** - É onde será armazenado o resultado final do build `jekyll serve`

**assets** - Esta pasta não faz parte da estrutura padrão do Jekyll, mas será servida normalmente como qualquer outra pasta.

Saiba mais sobre a usabilidade do Jekyll [aqui](http://jekyllrb.com/docs/usage/)

# Configurações do Jekyll

Jekyll suporta algumas configurações, como descrito na documentação [aqui](http://jekyllrb.com/docs/configuration/)

Continuação - [parte 1](https://stpa.co/github/jekyll/2014/12/12/sirva-seu-blog-com-github-pages-like-a-kyller-part-1.html) / [parte 3](https://stpa.co/github/jekyll/cloudflare/2014/12/22/sirva-seu-blog-com-github-pages-like-a-kyller-part-3.html)