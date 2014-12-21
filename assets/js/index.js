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