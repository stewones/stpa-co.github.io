/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function($) {
    "use strict";

    $(document).ready(function() {

        Socialite.setup({
            facebook: {
                lang: 'pt_BR',
                appId: 335840849938569,
                onlike: function(url) { /* ... */ },
                onunlike: function(url) { /* ... */ },
                onsend: function(url) { /* ... */ }
            },
            twitter: {
                lang: 'pt_BR',
                onclick: function(e) { /* ... */ },
                ontweet: function(e) { /* ... */ },
                onretweet: function(e) { /* ... */ },
                onfavorite: function(e) { /* ... */ },
                onfollow: function(e) { /* ... */ }
            },
            googleplus: {
                lang: 'pt-BR',
                onstartinteraction: function(el, e) { /* ... */ },
                onendinteraction: function(el, e) { /* ... */ },
                callback: function(el, e) { /* ... */ }
            }
        });

        Socialite.load();

        $(".post-content").fitVids();

        // Calculates Reading Time
        /*        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
             lang: 'es'
        });
        */
        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if ($(this).attr("alt"))
                $(this).wrap('<figure class="image"></figure>')
                    .after('<figcaption>' + $(this).attr("alt") + '</figcaption>');
        });

    });

}(jQuery));

/**
 * cross-browser function to determine full browser height
 * needed to check when user hits the bottom of the webpage
 * source: http://james.padolsey.com/javascript/get-document-height-cross-browser/
 */
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    )
}

function autoHideSharerWhenHasImage() {
    var $window = $(window),
        $image = $('.post-image-image');
    var top = $window.scrollTop();
    //auto-hide sharer
    $(window).scroll(function() {
        var timer;
        var scrolltoppx = $(this).scrollTop();
        //console.debug(scrolltoppx, $(window).height() , (getDocHeight()-300));    
        if (scrolltoppx >= (getDocHeight() - ($(window).height() + 700)) || scrolltoppx < $(window).height() - 250) {
            $('.post-sharer').fadeOut(300);
        } else {
            $('.post-sharer').fadeIn(300);
        }

    });

    $window.on('scroll', function() {
        var top = $window.scrollTop();
        if (top < 0 || top > 1500) {
            return;
        }
        $image
            .css('transform', 'translate3d(0px, ' + top / 3 + 'px, 0px)')
            .css('opacity', 1 - Math.max(top / 700, 0));
    });
    $window.trigger('scroll');

}

function autoHideSharerWhenHasNotImage() {
    //auto-hide sharer
    $(window).scroll(function() {
        var timer;
        var scrolltoppx = $(this).scrollTop();
        //console.debug(scrolltoppx, $(window).height() , (getDocHeight()-300));    
        if (scrolltoppx >= (getDocHeight() - ($(window).height() + 700)) || scrolltoppx < $(window).height() - 330 /*250*/ ) {
            $('.post-sharer').fadeOut(300);
        } else {
            $('.post-sharer').fadeIn(300);
        }

    });
}