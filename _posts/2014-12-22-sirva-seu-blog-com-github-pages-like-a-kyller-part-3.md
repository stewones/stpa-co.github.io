---
layout: post
title:  "Sirva seu blog com GitHub Pages Like a Kyller"
subtitle: "Parte 3: Conheça o CloudFlare"
date:   2014-12-22
categories: [github, jekyll, cloudflare]
tags: [featured, github, jekyll, cloudflare]
featured: false
image: /assets/images_articles/sirva-seu-blog-com-github-pages-like-a-kyller/post-jekyll-e-github-pages-cloudflare.jpg
comments: true
description: CloudFlare é uma plataforma como serviço (SAAS) que age como um proxy entre o visitante e o servidor, dando mais velocidade e segurança ao site.
---

#O que é CloudFlare?

CloudFlare é uma plataforma como serviço (SAAS) que age como um proxy entre o visitante e o servidor, dando mais velocidade e segurança ao site. Além da proteção contra scripts maliciosos, você economiza banda e reduz drasticamente o tempo de carregamento das páginas.

#Como o CloudFlare funciona?

Uma vez que os name servers estiverem corretamente configurados, CloudFlare irá gerenciar o tráfego do seu domínio além de limpar e acelerar todos acessos. Com uma rede composta de 30+ [Data Centers](https://www.cloudflare.com/network-map) pelo mundo, CloudFlare irá te ajudar em:

- Oferecer aos visitantes a conexão mais rápida possível - CloudFlare irá rotear o acesso do visitante para o DataCenter mais próximo, independente do lugar que ele estiver;

- Defender o site de scripts maliciosos - CloudFlare recebe, analiza e filtra os acessos determinando se aquele visitante é um risco, baseando-se no IP, a origem da requisição, o payload, a frequência de requisições, dentre outras coisas. Os threats são bloqueados e os bons visitantes liberados para acessar a página requisitada;

- Cachear o conteúdo estático - Com exceção do html, CloudFlare faz o cache de todo o conteúdo (imagens, javascript e css);

#Vantagens de se usar CloudFlare

Existem muitas vantagens de se usar o serviço do CloudFlare. Irei citar algumas:

- Melhoria na performance - Como dito acima, CloudFlare possui dezenas de DataCenters ao redor do mundo. Com isto todos os acessos são roteados para o DataCenter mais próximo, acelerando os acessos;

- Otimização para celular - CloudFlare trabalha com algumas tecnologias, tais como Rocket Loader e AutoMinify que trabalham juntas para entregar conteúdo o mais rápido possível, não importando o dispositivo;

- Proteção contra robôs e ameaças - CloudFlare uitiliza os dados colhidos de sua própria rede, e de terceiros, para identificar ameças e pará-las antes de chegarem ao servidor da aplicação. Você pode acompanhar todas ameaças, robôs e visitantes através da Dashboard;

- Proteção contra comentários SPAM - Como dito acima, CloudFlare utiliza os dados da própria rede e de terceiros para identificar e eliminar possíveis ameaças, reduzindo o número de SPAM´s no seu site.

- Alerta de computador infectado - Caso seu visitante esteja com vírus, malwares, etc.. o mesmo será notificado e somente poderá continuar o acesso após confirmação de um CAPTCHA;

- Modo de navegação offline - No caso do servidor de sua aplicação cair, os visitantes poderão continuar navegando a partir do cache da CloudFlare;

- Baixa utilização de recursos - Como o CloudFlare filtra todos acessos eliminando o que é ruim, deixando apenas o que é bom, você acaba tendo uma economia significativa de recursos do servidor;

- Suporte SSL - CloudFlare suporta SSL além de possuir um ótimo nível gratuito através do [Universal SSL](https://www.cloudflare.com/ssl)

#Conclusão

Acredito que [GitHub Pages](https://stpa.co/github/jekyll/2014/12/12/sirva-seu-blog-com-github-pages-like-a-kyller-part-1.html) + [Jekyll](https://stpa.co/github/jekyll/2014/12/14/sirva-seu-blog-com-github-pages-like-a-kyller-part-2.html) + CloudFlare seja uma ótima stack para produzir aplicações como um "Kyller" hahaha.

Imagina que você consegue ter o melhor de todos os mundos e de graça. Você não precisa hospedar no GitHub Pages necessariamente apenas  jekyll blogs, mas você pode hospedar qualquer conteúdo estático, ou seja, você pode hospedar sua aplicação em angular.js, ember.js, seu hotsite em htmlzão, resumindo qualquer conteúdo estático.

A vantagem de se usar Jekyll é devido o GitHub ser escrito em Ruby On Rails, portanto já trabalha nativamente com suas gem´s. Agora junta isso com o poder do CloudFlare e você tem um ambiente totalmente escalonado, pronto para produzir com zero downtime e muita facilidade de realizar atualizações on-the-fly, ao menos na parte do front-end. Agora sim você poderá dormir tranquilamente a noite =D

Este blog é feito em Jekyll e utiliza um theme, open-source disponível em [meditator.stpa.co](https://meditator.stpa.co).

Enfim espero ter ajudado de alguma forma, deixe seu comentário.

Cheers,