---
layout: post
title:  "Dashboard com Angular.js, Morris.js e Google Material Light"
subtitle: "Como criar uma simples dashboard utilizando estas tecnologias"
date:   2016-02-03
categories: [angularjs]
tags: [angularjs, morrisjs, charts]
featured: false
image: false
comments: true
description: 
---

O Google lançou recentemente uma ferramenta chamada Material Design Light (MDL). Se trata de uma espécie de Bootstrap, onde você pode trabalhar o conceito de [Material Design](https://design.google.com/) através de seus componentes, estilos e templates. Além dele ser otimizado para uso em celulares e browsers antigos, sem a necessidade de interagir com outras frameworks javascript.

> Material Design Lite lets you add a Material Design look and feel to your websites. It doesn’t rely on any JavaScript frameworks and aims to optimize for cross-device use, gracefully degrade in older browsers, and offer an experience that is immediately accessible


Sendo assim, neste post iremos trabalhar um exemplo de Dashboard utilizando MDL, Angular.js e Morris.js.


_Mas perai Stewan, se não é necessário uso de framework com MDL, então pra que vamos utilizar o Angular?_
<img src="http://i.imgur.com/GHPV1aR.jpg" />

É porque vamos precisar também de um módulo em angular que comecei aproximadamente 1 ano atrás, chamado [angular-morris-chart](http://angular-morris-chart.stpa.co/), que visa justamente facilitar o uso do Morris.js através de diretivas.

Não se preocupe pois a lib é bem levinha e fácil de usar, pesa apenas 7kb na [versão minificada](https://raw.githubusercontent.com/stewones/angular-morris-chart/master/src/angular-morris-chart.min.js), [aqui tem a documentação](http://angular-morris-chart.stpa.co) com exemplos que você pode dar uma conferida depois.

Então vamos ao que interessa!

## Pré-requesitos
- Node 0.12.x com Npm 2.11.x
- MDL 1.0.x
- Morris 0.5.x
- Angular 1.x
- Angular Morris Chart 1.2.x

## Objetivo
Nossa dashboard deverá contar com:

- 02 gráfico em linhas com o balanço dos últimos anos;
    - receitas / despesas
    - novas compras / compras recorrentes 
- 01 gráfico em pizza com porcentagem total de gênero dos usuários;
    - masculino / feminino
- 01 gráfico em barras com total de usuários masculinos e femininos baseados em ranges de idade:
    - 18-25 / 26-35 / 36-50 / +50


## Mãos a massa
Levantando ambiente

```
$ mkdir angular-mdl-morris-dashboard && cd angular-mdl-morris-dashboard
```

Instalando as dependências

```
$ npm install angular
$ npm install jquery
$ npm install raphael
$ npm install morris.js
$ npm install material-design-lite
$ npm install angular-morris-chart@1.2
```

Vamos utilizar o `http-server` que servirá para rodarmos um simples servidor web e executarmos corretamente o index.html, desta forma evitaremos problemas com os caminhos dos scripts e imagens.

```
$ npm install http-server -g
```


arquivo `app/index.module.js`

```
$ touch index.js
$ vim index.js
```

Por boas práticas vamos encapsular todo o código dos nossoas arquivos `.js` em uma [IIFE](/angularjs/2014/12/23/cinco-erros-de-padrao-ao-desenvolver-com-angular-js.html)

```js
(function () {
    'use strict';
    //...
})();
```

Criaremos o módulo principal da nossa aplicação em angular, adicionando como dependência a lib _'angular.morris-chart'_

```js
(function () {
    'use strict';    
    angular.module('my.app', ['angular.morris-chart']);    
})();
``` 

---

## Serviço API
Como o objetivo do post é apenas demonstrar a utlização do MDL com Angular e Morris, também pra não ficar muito longo e cansativo, não irei desenvolver a parte do backend.
Este poderá ser implementado na sua linguagem de preferência: Node, PHP, .Net, Python, Java, o que você achar melhor.


Serviço responsável pelos relatórios

arquivo `app/report.factory.js`

```js
(function () {
    angular.module('my.app')
    //
    // naming and coding a factory like the john papa guide. 
    // https://github.com/johnpapa/angular-styleguide#factories
    //
        .factory('report', function () {
            return {
                balance: balance,
                order: order,
                genre: genre,
                age: age
            }

            function balance() {
                //    
                // mocking data for goal #1a
                //
                return [
                    { y: "2009", a: 100, b: 90 },
                    { y: "2010", a: 75, b: 65 },
                    { y: "2011", a: 50, b: 40 },
                    { y: "2012", a: 75, b: 65 },
                    { y: "2013", a: 50, b: 40 },
                    { y: "2014", a: 175, b: 65 },
                    { y: "2015", a: 300, b: 90 }
                ];
            }

            function order() {
                //    
                // mocking data for goal #1b
                //
                return [
                    { y: "2009", a: 50, b: 80 },
                    { y: "2010", a: 75, b: 65 },
                    { y: "2011", a: 90, b: 98 },
                    { y: "2012", a: 190, b: 165 },
                    { y: "2013", a: 220, b: 280 },
                    { y: "2014", a: 388, b: 659 },
                    { y: "2015", a: 600, b: 490 }
                ];
            }

            function genre() {
                //
                // mocking data for goal #2
                //
                return [
                    { label: "Male", value: 35 },
                    { label: "Female", value: 65 }
                ];
            }

            function age() {
                //
                // mocking data for goal #3
                //
                return [
                    { y: '18-25', a: 100, b: 90 },
                    { y: '26-35', a: 75, b: 65 },
                    { y: '35-50', a: 50, b: 40 },
                    { y: '+50', a: 75, b: 65 }
                ];
            }
        });
})();
```
Nota

> Em um ambiente real ao invés dos métodos devolverem uma array contendo os objetos, eles poderiam ser facilmente trocados por serviços assíncronos e retornarem uma promessa.
>
> Exemplo:
> ```
>    function age() {
>        return $http.post(url);
>    }
> ```

Agora vamos escrever nosso controlador que irá utilizar o serviço/factory `report`. 

Arquivo `app/dashboard.controller.js`

```js
(function () {
    angular.module('my.app')
    .controller('DashboardCtrl', ['report', function(report) {    
        var vm = this;
        //
        // Goal #1a
        // Morris settings
        vm.reportBalanceXkey = 'y';
        vm.reportBalanceYkeys = '["a", "b"]';
        vm.reportBalanceLabels = '["Income", "Expense"]';
        vm.reportBalanceColors = '["#31C0BE", "#c7254e"]';
        // data from api
        vm.reportBalanceData = report.balance();  
        
        //
        // Goal #1b
        // Morris settings
        vm.reportOrderXkey = 'y';
        vm.reportOrderYkeys = '["a", "b"]';
        vm.reportOrderLabels = '["New Orders", "Recurring Orders"]';
        vm.reportOrderColors = '["#31C0BE", "#c7254e"]';
        // data from api
        vm.reportOrderData = report.order();  
        
        //
        // Goal #2
        // Morris settings
        vm.reportGenreColors = '["#31C0BE","#c7254e","#98a0d3"]';
        vm.reportGenreFormatter = function(y, data) { return y+'%' }
        // data from api
        vm.reportGenreData = report.genre();
                
        //
        // Goal #3
        // Morris settings
        vm.reportAgeX = 'y';
        vm.reportAgeY = '["a", "b"]';
        vm.reportAgeLabels = '["Female", "Male"]';
        vm.reportAgeColors = '["#31C0BE", "#c7254e"]';
        // data from api
        vm.reportAgeData = report.age();   
    }]);
})();
```


---

## Template
O bacana é que de cara o Google já lançou [vários templates](http://getmdl.io/templates/) de exemplo, vamos escolher o [modelo Dashboard](http://getmdl.io/templates/dashboard/index.html) para trabalharmos em cima dele.

<img src="http://i.imgur.com/4CbSNPr.jpg" />


`arquivo index.html`

Vamos acertar alguns paths do nosso template copiado [diretamente de seu repositório](https://github.com/google/material-design-lite/tree/master/templates/dashboard).

Procure no arquivo index.html a primeira ocorrência por `<link rel="stylesheet" href="`

e substitua os dois ultimos styles pelo seguinte:

```html
<!--
<link rel="stylesheet" href="$$hosted_libs_prefix$$/$$version$$/material.cyan-light_blue.min.css">
<link rel="stylesheet" href="styles.css">
-->
<link rel="stylesheet" href="/node_modules/material-design-lite/material.min.css">
<link rel="stylesheet" href="/node_modules/material-design-lite/dist/templates/dashboard/styles.css">
```

Temos que fazer isto pois se você reparar bem o penúltimo elemento está com variáveis $$ no atributo "href", isto ocorre pois o template está em seu estado de concepção e ainda não foi compilado.

Agora é necessário acertar as dependências de javascript. Vá até o final do arquivo index.html, antes de `</body>` e remova os elementos `<a>` e `<script>` substituindo pelo seguinte

```html
<!--
<a href="https://github.com/google/material-design-lite/blob/master/templates/dashboard/" target="_blank" id="view-source" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white">View Source</a>
<script src="$$hosted_libs_prefix$$/$$version$$/material.min.js"></script>
-->
<!-- Dep -->
<script type="text/javascript" src="/node_modules/angular/angular.min.js"></script>    
<script type="text/javascript" src="/node_modules/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="/node_modules/raphael/raphael-min.js"></script>
<script type="text/javascript" src="/node_modules/morris.js/morris.min.js"></script>
<script type="text/javascript" src="/node_modules/angular-morris-chart/src/angular-morris-chart.min.js"></script>
<script type="text/javascript" src="/node_modules/material-design-lite/material.min.js"></script>    
<!-- App -->
<script type="text/javascript" src="/app/index.module.js"></script>
<script type="text/javascript" src="/app/report.factory.js"></script>
<script type="text/javascript" src="/app/dashboard.controller.js"></script>     
```


Vamos acertar também o caminhos de todas as imagens procurando por `"images/`

e substituindo por `"/node_modules/material-design-lite/dist/templates/dashboard/images/`


Para finalizar as adequações no template será necessário apagar o código html dentro da tag `<main>`.
Isto servirá para entrarmos com o nosso conteúdo no lugar do que vem no template:

<img src="http://i.imgur.com/in7kFpF.png" />


Agora precisamos criar as condições mínimas de template para que o angular execute corretamente, adicionando os atributos ng-app e ng-controller.

Localize no início do documento o elemento `<html lang="en">`

e substitua por `<html lang="en" ng-app="my.app">`

Localize também o elemento `<main class="mdl-layout__content mdl-color--grey-100">`

e susbstitua por `<main ng-controller="DashboardCtrl as vm" class="mdl-layout__content mdl-color--grey-100">`

Pronto. Agora podemos inserir a parte de html dos gráficos

dentro da tag `<main>` adicione o seguinte código html:

```html
<div class="mdl-grid demo-content">
    <div class="demo-graphs mdl-cell mdl-cell--8-col">
    <div style="padding: 20px" class="mdl-shadow--2dp mdl-color--white">
    <div
        line-chart
        line-data='vm.reportBalanceData'
        line-xkey='{{vm.reportBalanceXkey}}'
        line-ykeys='vm.reportBalanceYkeys'
        line-labels='vm.reportBalanceLabels'
        line-colors='vm.reportBalanceColors'>
    </div>
    <br /> <br />
    <div
        line-chart
        line-data='vm.reportOrderData'
        line-xkey='{{vm.reportOrderXkey}}'
        line-ykeys='vm.reportOrderYkeys'
        line-labels='vm.reportOrderLabels'
        line-colors='vm.reportOrderColors'>
    </div>
    </div>
    </div>          
    <div class="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
    <div style="padding: 10px;" class="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
        <div
            donut-chart
            donut-data='vm.reportGenreData'
            donut-formatter="vm.reportGenreFormatter"
            donut-colors='vm.reportGenreColors'>
        </div>
    </div>
    <div class="demo-separator mdl-cell--1-col"></div>
    <div style="padding: 10px" class="demo-options mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
        <div
            bar-chart 
            bar-data='vm.reportAgeData'
            bar-x='{{vm.reportAgeX}}'
            bar-y='vm.reportAgeY'
            bar-labels='vm.reportAgeLabels'
            bar-colors='vm.reportAgeColors'>
        </div>
    </div>
    </div>
</div>
``` 

Agora só precisamos servir nossa aplicação no browser. Na pasta raíz do projeto, execute:

```
$  http-server ./
```

Deverá aparecer algo assim:

```
Starting up http-server, serving ./
Available on:
  http:192.168.1.4:8080
  http:127.0.0.1:8080
Hit CTRL-C to stop the server
```

Abra seu navegador e entre com qualquer um dos endereços. Um é o local (127.0.0.1) e o outro seu ip para ser acessado dentro da mesma rede.

Este é o resultado final

<iframe width="100%" height="500" src="//jsfiddle.net/stewones/48p9wy40/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



---

- [Repositório](https://github.com/stewones/angular-mdl-morris-dashboard) deste post no Github
- [Repositório](https://github.com/google/material-design-lite/tree/master/templates/dashboard) do tema
- [Documentação](https://www.getmdl.io) do MDL
- [Documentação](http://angular-morris-chart.stpa.co/) do angular-morris-chart
- [Documentação](http://morrisjs.github.io/morris.js/) do Morris.js
