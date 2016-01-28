---
layout: post
title:  "Como realizar teste unitário de serviço com Mocha.js e Angular.js"
subtitle: "Guia simples para entendimento sobre testes unitários"
date:   2016-01-22
categories: [angularjs, mocha]
tags: [angularjs, mocha, unit test, tdd]
featured: true
image: false
comments: true
description: Hoje estou inspirado pra falar sobre teste unitário de serviço utilizando mocha.js. Para este post nosso serviço deverá ser capaz de trabalhar dentro do node e no browser através do mesmo código.
---

Olá devs,

Hoje estou inspirado pra falar sobre teste unitário de serviço utilizando mocha.js. Para este post nosso serviço deverá ser capaz de trabalhar dentro do node e no browser através do mesmo código.

### O Básico
Node e npm instalados. Para este post vou usar o node 0.12.7 e npm 2.11.3 - meu ambiente de desenvolvimento atual é o windows.

### Intro
Mocha é uma framework javascript para testes, que roda no node.js e no browser. Ele é simples, flexível e divertido.

<img src="http://i.imgur.com/AxA93C2.jpg">

haha, é isto o que dizem, e concordo plenamente. Tirado da própria [doc deles](https://github.com/mochajs/mocha).

> Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser. For more information view the documentation.

### O Objetivo

Para entendermos melhor como tudo isso funciona, vamos imaginar um cenário comum onde nosso site irá oferece determinados tipos de serviços, a partir de planos de negócio formados por valor e quantidade. Este site possui um sistema de afiliados e iremos escrever um simples serviço que irá nos calcular uma regra de comissão, para remunerar os usuários que fizerem indicações.

Os requisitos seriam:

- Receber 3 regras compostas por: range de cobertura (min/max), porcentagem e valor fixo;
- Aplicar a regra de comissão em cima de um valor único ou em um array de pedido;
- Imprimir o resultado final com 2 informações: total da comissão e total líquido (valor após aplicada regra).

### Mãos na massa

Para começar vamos escrever primeiramente o teste unitário, cujo serviço em angular deverá respeitar. Lembrando que este serviço terá de atender tanto no browser quanto no node, evitando assim códigos duplicados. Imagine se tudo que você fizer no angular, tiver que repetir no node em?

<img src="http://i.imgur.com/43PGbLW.jpg">

Então vamos começar instalando o mocha de maneira global

```
npm install -g mocha
```

Vamos instalar também o `expect.js` que é um framework minimalistico de afirmação.

```
npm install expect.js --save
```
<br />

### O teste

Criando o arquivo de teste

```
touch commission.spec.js
```

Requerendo as dependencias

```js
var expect = require("expect.js"); //to assertion
var Commission = require("./Commission"); //our future lib
```
Agora vamos iniciar nosso teste descrevendo do que se trata, que neste caso é o "Serviço de Comissão". Isto aparecerá como um "título" na saída do terminal quando o executarmos.


```js
describe('Commission Service', function() {
```

O próximo passo é definir duas variáveis pra mockar as situações, ou seja, representar o cenário real dentro do ambiente de testes. A primeira é uma array que vai armazenar as regras que nossos planos deverão respeitar. A segunda outra array formada por valor (preço) e quantidade, originada de um possível pedido.


```js
var _rules = [{
    range: {
        min: 0,
        max: 50
    },
    percent: 0,
    value: 5
}, {
    range: {
        min: 51,
        max: 500
    },
    percent: 10,
    value: 0
}, {
    range: {
        min: 501,
        max: 99999
    },
    percent: 8,
    value: 10
}];

var _order = [{
    product: {
        name: '',
        price: 54.00
    },
    qty: 1
}, {
    product: {
        name: '',
        price: 501.00
    },
    qty: 2
}, {
    product: {
        name: '',
        price: 45.00
    },
    qty: 3
}];
```
Agora vamos instânciar nosso serviço de comissão passando as regras como opção para atender aos requisitos e escrever os testes.

```js
var commission = new Commission({
    rules: _rules
});
```

Primeiro requesito

```js
it('Should have three rules composed with range, percent and fixed value', function() {
    expect(commission.rules).to.eql(_rules);
});
``` 

Segundo requesito

```js
it('Should apply rule on specific value', function() {
    expect(commission.calc(60)).to.eql({
        fee: 6.00,
        liquid: 54.00
    });
});

it('Should apply rule on multiple plans', function() {
    expect(commission.calc(_plans)).to.eql({
        fee: 120.56,
        liquid: 1070.44
    });
});
``` 

Terceiro requesito

```js
it('Should print specific information about calc', function () {
    expect(commission.calc(60)).to.eql({
        fee: 6.00,
        liquid: 54.00
    });
});
``` 

Ok, agora temos o teste unitário do serviço porém ele ainda não irá funcionar sem a nossa lib.

<br />

### A Classe

Agora vamos trabalhar o serviço da comissão. Lembrando que o mesmo poderá ser utilizado tanto pelo browser (com angular), quanto pelo node (com o mocha).

<img src="http://i.imgur.com/MOC7YeL.jpg">

Precisaremos também de uma outra pequena lib chamada `lodash` para efetuar algumas operações.

```
npm install lodash --save
touch commission.js
```

Requerendo dependências para quando estiver sendo rodada pelo node

```js
//
// Requires dependencies for node
//
if (typeof module !== 'undefined' && module.exports) {
    var _ = require('lodash');
}
```

Por boas práticas vamos aplicar o Immediately-invoked function expression (IIFE) e passar as dependências externas para dentro do escopo

```js
(function (_) {
    'use strict';
```

Agora criamos o construtor de nossa classe com as regras e padrões, além de extendemos todas propriedades para quando houverem opções

```js
var Commission = function (options) {
    this.rules = [{
        range: {
            min: 0,
            max: 50
        },
        percent: 0,
        value: 5
    }, {
            range: {
                min: 51,
                max: 500
            },
            percent: 10,
            value: 0
        }, {
            range: {
                min: 501,
                max: 99999
            },
            percent: 8,
            value: 10
        }];
    //
    // Extend by options
    //
    _.merge(this, options);
};
```

Lógica para o cálculo das comissões baseada nos ranges

```js 
function calc(arg) {
    if (_.isArray(arg)) {
        var fee = 0,
            total = 0;
        _.each(arg, function (row) {
            var sub = this.sub(row.product.price);
            fee += sub.fee * row.qty;
            total += row.product.price * row.qty;
        }.bind(this));
        total -= fee;
        return {
            fee: fee.toFixed(2),
            liquid: total.toFixed(2)
        }
    } else if (_.isNumber(arg)) {
        var sub = this.sub(arg);
        return {
            fee: sub.fee,
            liquid: sub.liquid
        }
    }
}
function sub(value) {
    var fee = 0,
        liquid = value;
    _.each(this.rules, function (plan) {
        if (value >= plan.range.min && value <= plan.range.max) {
            if (plan.percent) fee += (value * plan.percent) / 100;
            if (plan.value) fee += plan.value;
        }
    });
    liquid -= fee;
    return {
        fee: fee.toFixed(2),
        liquid: liquid.toFixed(2)
    }
}
```

Exportando API da nossa classe

```js
Commission.prototype.calc = calc;
Commission.prototype.sub = sub;
   
//
// Node
//    
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Commission;
}
//
// Browser
//
else {
    window.Commission = Commission;
}
```
Agora que nossa lib está pronta para rodar, vamos executar o teste com o comando

```
mocha commission.spec.js
```

<img src="http://i.imgur.com/v02PyUf.png">

####Tá bom stewones, mas e o angular? aonde o danado entra nesta história?

Bom agora é muito fácil, basta criar nosso serviço em angular separadamente retornando a classe que está anexada ao objeto window, e seja feliz.

```js
(function () {
    'use strict';
    angular.module('myapp', [])
        .service('Commission', function () {
            return window.Commission;
        })
})();
```

<img src="http://i.imgur.com/TUB57Xl.png">

<br />

Exemplo em funcionamento

<iframe width="100%" height="300" src="//jsfiddle.net/stewones/8an2hwyn/64/embedded/result,js,html/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<br />

Espero ter ajudado de alguma forma e ter esclarecido um pouco sobre testes unitários. Se tiverem alguma dúvida, só largar um comentário ai embaixo.


Cya [=

Repositório deste post no Github: https://github.com/stewones/angular-mocha-service-tdd

---

- [English version](http://stpa.co/angularjs/mocha/2016/01/22/angular-mocha-service-tdd.html)

---