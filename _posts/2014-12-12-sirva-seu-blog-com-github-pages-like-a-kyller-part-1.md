---
layout: post
title:  "Sirva seu blog com GitHub Pages Like a Kyller"
subtitle: "Parte 1: Conceitos, prós e contras"
date:   2014-12-12
categories: [github, jekyll]
tags: [featured, github, jekyll]
featured: true
image: /assets/images_articles/2014-12-12-sirva-seu-blog-com-github-pages-like-a-kyller/post-jekyll-e-github-pages.jpg
comments: true
description: Você pode hospedar seu(s) site(s) estático(s) no GitHub, de graça, sem limites, com domínio customizado, apenas configurando corretamente os repositórios em sua conta.
---


Estava pensando há algum tempo em ter um blog, que eu pudesse atualizar de maneira fácil e com baixo custo. Sou desenvolvedor, mas como diz o velho ditado "casa de ferreiro, espeto é de pau", ainda não tinha tirado um tempo pra arrumar este meu espaço. Como um bom adepto do código livre, sempre gostei de compartilhar conhecimento e penso que quanto mais colaboramos, mais temos a capacidade de evoluir.

De tanto quebrar a cabeça tentando organizar as bases de códigos e processos de trabalho do meu atual emprego, certo dia resolvi dar finalmente atenção necessária ao GitHub.

GitHub pra mim já era sem dúvidas o melhor serviço para manter e evoluir código, mas ao analisar melhor o produto "GitHub Pages", pude perceber alguns fatos interessantes.

Você pode hospedar seu(s) site(s) estático(s) no GitHub, de graça, sem limites, com domínio customizado, apenas configurando corretamente os repositórios em sua conta. O GitHub Pages irá funcionar primáriamente na branch `master` do repositório com nome de `username.github.io`, ou em qualquer repositório que contiver a branch `gh-pages`. 

A cada commit enviado para a branch correta, o GitHub Pages irá servir seu conteúdo estático (html+js+css) automagicamente, bastando apenas conter um arquivo `index.html` na raíz do repositório. 

O GitHub Pages trabalha em conjunto com um cara chamado Jekyll. Jekyll seria uma espécie de parser, que executa algumas tarefas com o propósito de te servir de maneira simples e rápida um site/blog pronto para produção. O resultado da junção dos dois é um pu*# site com alto desempenho, altamente escalado.

A idéia é quando eu terminar de escrever este post, publicar a versão final em segundos, através de um simples commit <a href='https://github.com/stpa-co/stpa-co.github.io' target="_blank">para este repositório</a>. Interessante não?

Prós
----
- GitHub Pages é de graça
	- Sério, por incrível que pareça.
- CDN Rápido
	- Eles utilizam o Fastly. Um dos melhores CDN's existentes atualmente.
- CMS Built-in
	- Caso deixe o GitHub gerar a build, você poderá usar o editor built-in deles e quando commitar suas alterações, ele efetuará o deploy em segundos.
- Gzip e Minify de fábrica
	- Sim, o GitHub realiza um trabalho muito bem feito ao servir assets. Tudo é automaticamente gzipado e minificado.

Contras
-------
- É necessário usar um subdominio?
	- Há quem diga que devido a implementações de segurança contra ataques DDoS, o GitHub trabalha mais rápido (1a requisição) com "www" (ou qualquer coisa antes do dominio). Mas isto não te impede de trabalhar sem o "www", como é o meu caso. Sinceramente não senti tanta diferença no tempo de resposta.

- Baixo controle sobre URLs
	- Existem duas opções de como exibir a URL do seu Post. Ex.: "stpa.co/my-post.html" ou "stpa.co/my-post". Pessoalmente eu não me importo em usar a extensão .html

- Sem cookies
	- Algumas vezes seria bom alterar o conteúdo do seu visitante, com base em cookies. Porém existe um <a href='https://github.com/blog/1466-yummy-cookies-across-domains' target='_blank'>problema</a> de segurança ao compartilhar cookies entre os domínios do GitHub.

- Sem Task Runners? Plugins?
	- Grunt / Gulp / Rake / etc - Você pode utilizar seu Task Runner com seus plugins locamente e enviar apenas seu site "buildado", ou deixar com que o próprio GitHub efetue esta tarefa. Na segunda opção você não poderá usar nenhum plugin, também por questões de segurança.

- Sem suporte SSL?
	- Por padrão todos domínios *.github.io já suportam HTTPS. Para domínios customizados (como no meu caso), a solução que encontrei foi utlizar o SSL da CloudFlare, que inclusive achei a configuração bem simples e irei comentar na parte 3 deste post.
	
Confira a [parte 2](https://stpa.co/github/jekyll/2014/12/14/sirva-seu-blog-com-github-pages-like-a-kyller-part-2.html)
	
