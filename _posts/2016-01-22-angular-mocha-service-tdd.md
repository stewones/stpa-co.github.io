---
layout: post
title:  "Unit test for service with Mocha.js and Angular.js"
subtitle: ""
date:   2016-01-22
categories: [angularjs, mocha]
tags: [angularjs, mocha]
featured: false
image: false
comments: true
description: 
---

Hello devs,

Today i am excited to talk about service unit test with mocha.js. Our service should work within the node and also in browser through the same code. I will write this post in EN/PT to try to reach as many people as possible. If goes well I can keep writing in this format =D

_Olá devs,_

_Hoje estou inspirado pra falar sobre teste unitário de serviço utilizando mocha.js. Nosso serviço deverá trabalhar dentro do node e no browser através do mesmo código. Irei escrever este post em EN/PT pra tentar alcançar o maior número de pessoas possíveis. Caso dê certo posso continuar a escrever assim =D_

### The basics
Node and npm installed. For this post I will use the node 0.12.7 and npm 2.11.3 - my current development environment is windows.

_Node e npm instalados. Para este post vou usar o node 0.12.7 e npm 2.11.3 - meu ambiente de desenvolvimento atual é o windows._


### Intro
Mocha is a javascript framework for testing, which runs on node.js and browser. It is simple, flexible and fun.

_Mocha é uma framework javascript para testes, que roda no node.js e no browser. Ele é simples, flexível e divertido._

<img src="http://i.imgur.com/AxA93C2.jpg">

haha , that's what they say, and I agree fully. Taken from their [own doc](https://github.com/mochajs/mocha).

> Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser. For more information view the documentation.

_haha, é isto que dizem, e concordo plenamente. Tirado da própria [doc deles](https://github.com/mochajs/mocha)._

### The Goal

To better understand how all this works, let's imagine a common scenario where our website will provide certain types of services, it will have business plans that consist of value and quantity. This site has an affiliate system and we will write a simple service that calculates the commission based on the rules, to reward the users.

_Para entendermos melhor como tudo isso funciona, vamos imaginar um cenário comum onde nosso site irá oferece determinados tipos de serviços, a partir de planos de negócio formados por valor e quantidade. Este site possui um sistema de afiliados e iremos escrever um simples serviço que irá nos calcular uma regra de comissão, para remunerar os usuários que fizerem indicações._

The requirements are:

- Receive three rules that consist of: coverage range (min/max), percentage and fixed amount;
- Apply the commission rule on a single value or in array of orders;
- Print the final result with 2 information: total of commission and total liquid (after applied).

_Os requisitos seriam:_

- _Receber 3 regras compostas por: range de cobertura (min/max), porcentagem e valor fixo;_
- _Aplicar a regra de comissão em cima de um valor único ou em um array de pedido;_
- _Imprimir o resultado final com 2 informações: total da comissão e total líquido (valor após aplicada regra)._

### Hands on

To begin we will first write unit testing, whose service in angular must respect. Remembering that this service has to meet both the browser and in the node, thus avoiding duplicate codes. Imagine if all you do in angular, you have to repeat in node?

_Para começar vamos escrever primeiramente o teste unitário, cujo serviço em angular deverá respeitar. Lembrando que este serviço terá de atender tanto no browser quanto no node, evitando assim códigos duplicados. Imagine se tudo que você fizer no angular, tiver que repetir no node em?_

<img src="http://i.imgur.com/43PGbLW.jpg">

So let's start installing mocha globally

_Então vamos começar instalando o mocha de maneira global_

```
npm install -g mocha
```

We will also install `expect.js` which is a minimalistic framework for assertion.

_Vamos instalar também o `expect.js` que é um framework minimalistico de afirmação._

```
npm install expect.js --save
```
<br />

### The spec

Creating the test file / _Criando o arquivo de teste_

```
touch commission.spec.js
```

Requiring the dependencies / _Requerendo as dependencias_

```js
var expect = require("expect.js"); //to assertion
var Commission = require("./Commission"); //our future lib
```
Now let's start our test describing what it is , which in this case is the "Commission Service". This will appear as a "title" in terminal log when we execute.

_Agora vamos iniciar nosso teste descrevendo do que se trata, que neste caso é o "Serviço de Comissão". Isto aparecerá como um "título" na saída do terminal quando o executarmos._

```js
describe('Commission Service', function() {
```

The next step is define two variables to mock situations. The first is an array that will store the rules that our plans must comply. The second array is formed by value (price) and quantity, which may have been originated by an order.

_O próximo passo é definir duas variáveis pra mockar as situações, ou seja, representar o cenário real dentro do ambiente de testes. A primeira é uma array que vai armazenar as regras que nossos planos deverão respeitar. A segunda outra array formada por valor (preço) e quantidade, originada de um possível pedido._

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
Now we instantiate our service commission with options to meet the requirements and start writing tests.

_Agora vamos instânciar nosso serviço de comissão passando as regras como opção para atender aos requisitos e escrever os testes._

```js
var commission = new Commission({
    rules: _rules
});
```

First requirement / _Primeiro requesito_

```js
it('Should have three rules composed with range, percent and fixed value', function() {
	expect(commission.rules).to.eql(_rules);
});
``` 

Second requirement / _Segundo requesito_

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

Third requirement / _Terceiro requesito_

```js
it('Should print specific information about calc', function () {
    expect(commission.calc(60)).to.eql({
        fee: 6.00,
        liquid: 54.00
    });
});
``` 

Ok, we now have the spec for our service but it will not work without the commission lib.

_Ok, agora temos o teste unitário do serviço porém ele ainda não irá funcionar sem a nossa lib._

<br />

### The service

Now let's work the Commission Service. Not forgetting that it should work both the browser (with angular), as in node (with mocha).

_Agora vamos trabalhar o serviço (lib, ou classe) da comissão. Lembrando que o mesmo poderá ser utilizado tanto pelo browser (com angular), quanto pelo node (com o mocha)._

<img src="http://i.imgur.com/MOC7YeL.jpg">

We will also need another small lib called ` lodash` to perform some operations.

_Precisaremos também de uma outra pequena lib chamada `lodash` para efetuar algumas operações._

```
npm install lodash --save
touch commission.js
```

Requiring dependencies for when the lib runs on node

_Requerendo dependências para quando estiver sendo rodada pelo node_

```js
//
// Requires dependencies for node
//
if (typeof module !== 'undefined' && module.exports) {
    var _ = require('lodash');
}
```

For best practices we apply Immediately-invoked function expression (IIEF) and crossing the external dependencies into the scope.

_Por boas práticas vamos aplicar o Immediately-invoked function expression (IIFE) e passar as dependências externas para dentro do escopo._

```js
(function (_) {
	'use strict';
```

Now we create the constructor of our class with the rules and standards, and extend all option properties

_Agora criamos o construtor de nossa classe com as regras e padrões, além de extendemos todas propriedades para quando houverem opções_

```js
var Commission = function (options) {
    var _ = window.lodash ? window.lodash : require('lodash');
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

Logic for calculating commissions based on ranges

_Lógica para o cálculo das comissões baseada nos ranges_

```js 
function calc(arg) {
    var _ = window.lodash ? window.lodash : require('lodash');
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
    var _ = window.lodash ? window.lodash : require('lodash');
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

Exporting the API of our class

_Exportando API da nossa classe_

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
Now that our lib is ready, let's run the test with the command

_Agora que nossa lib está pronta para rodar, vamos executar o teste com o comando_

```
mocha commission.spec.js
```

<img src="http://i.imgur.com/v02PyUf.png">

####Stewones okay, but what about the angular? where he goes in this story?

Well now it's very easy , just create the angular service separately, then return the class that is attached to the window object.

####_Tá bom stewones, mas e o angular? aonde ele entra nesta história?_

_Bom agora é muito fácil, basta criar nosso serviço em angular separadamente retornando a classe que está anexada ao objeto window e ser feliz._

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

Working sample. _Eexemplo em funcionamento._

<iframe width="100%" height="300" src="//jsfiddle.net/stewones/8an2hwyn/61/embedded/result,js,html/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<br />

I hope to have clarified a little bit about unit testing and that this helps in some way. If you have any questions, just drop a comment.

_Espero ter ajudado de alguma forma e ter esclarecido um pouco sobre testes unitários. Se tiverem alguma dúvida, só largar um comentário ai embaixo._

Cya [=

Repository of this post in Github: https://github.com/stewones/angular-mocha-service-tdd

_Repositório deste post no Github: https://github.com/stewones/angular-mocha-service-tdd_
