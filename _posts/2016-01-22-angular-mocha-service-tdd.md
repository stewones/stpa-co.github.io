---
layout: post
title:  "How to unit test service with Mocha.js and Angular.js"
subtitle: "Simple guide for understand unit test easier"
date:   2016-01-22
categories: [angularjs, mocha]
tags: [angularjs, mocha, unit test, tdd]
featured: true
image: false
comments: true
description: Today i am excited to talk about service unit test with mocha.js. For this post our service should be able work within the node and also in browser through the same code.
---

Hello devs,

Today i am excited to talk about service unit test with mocha.js. For this post our service should be able to work within the node and also in browser through the same code.

### The basics
Node and npm installed. For this post I will use the node 0.12.7 and npm 2.11.3 - my current development environment is windows.

### Intro
Mocha is a javascript framework for testing, which runs on node.js and browser. It is simple, flexible and fun.

<img src="http://i.imgur.com/AxA93C2.jpg">

haha , that's what they say, and I agree fully. Taken from their [own doc](https://github.com/mochajs/mocha).

> Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser. For more information view the documentation.

### The Goal

To better understand how all this works, let's imagine a common scenario where our website will provide certain types of services, it will have business plans that consist of value and quantity. This site has an affiliate system and we will write a simple service that calculates the commission based on the rules, to reward the users.

The requirements are:

- Receive three rules that consist of: coverage range (min/max), percentage and fixed amount;
- Apply the commission rule on a single value or in array of orders;
- Print the final result with 2 information: total of commission and total liquid (after applied).

### Hands on

To begin we will first write unit testing, whose service in angular must respect. Remembering that this service has to meet both the browser and in the node, thus avoiding duplicate codes. Imagine if all you do in angular, you have to repeat in node?

<img src="http://i.imgur.com/43PGbLW.jpg">

So let's start installing mocha globally

```
npm install -g mocha
```

We will also install `expect.js` which is a minimalistic framework for assertion.

```
npm install expect.js --save
```
<br />

### The spec

Creating the test file

```
touch commission.spec.js
```

Requiring the dependencies

```js
var expect = require("expect.js"); //to assertion
var Commission = require("./Commission"); //our future lib
```
Now let's start our test describing what it is , which in this case is the "Commission Service". This will appear as a "title" in terminal log when we execute.


```js
describe('Commission Service', function() {
```

The next step is define two variables to mock situations. The first is an array that will store the rules that our plans must comply. The second array is formed by value (price) and quantity, which may have been originated by an order.


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

```js
var commission = new Commission({
    rules: _rules
});
```

First requirement

```js
it('Should have three rules composed with range, percent and fixed value', function() {
	expect(commission.rules).to.eql(_rules);
});
``` 

Second requirement

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

Third requirement

```js
it('Should print specific information about calc', function () {
    expect(commission.calc(60)).to.eql({
        fee: 6.00,
        liquid: 54.00
    });
});
``` 

Ok, we now have the spec for our service but it will not work without the commission lib.

<br />

### The service

Now let's work the Commission Service. Not forgetting that it should work both the browser (with angular), as in node (with mocha).

<img src="http://i.imgur.com/MOC7YeL.jpg">

We will also need another small lib called `lodash` to perform some operations.

```
npm install lodash --save
touch commission.js
```

Requiring dependencies for when the lib runs on node

```js
//
// Requires dependencies for node
//
if (typeof module !== 'undefined' && module.exports) {
    var _ = require('lodash');
}
```

For best practices we apply Immediately-invoked function expression (IIEF) and crossing the external dependencies into the scope.

```js
(function (_) {
	'use strict';
```

Now we create the constructor of our class with the rules and standards, and extend all option properties

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

Logic for calculating commissions based on ranges

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

Exporting the API of our class

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

```
mocha commission.spec.js
```

<img src="http://i.imgur.com/v02PyUf.png">

####Stewones okay, but what about the angular? where he goes in this story?

Well now it's very easy , just create the angular service separately, then return the class that is attached to the window object.

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

Working sample.

<iframe width="100%" height="300" src="//jsfiddle.net/stewones/8an2hwyn/64/embedded/result,js,html/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<br />

I hope to have clarified a little bit about unit testing and that this helps in some way. If you have any questions, just drop a comment.


Cya [=

Repository of this post in Github: https://github.com/stewones/angular-mocha-service-tdd

---

- [Versão em português](http://stpa.co/angularjs/mocha/2016/01/22/angular-mocha-service-tdd-pt.html)

---