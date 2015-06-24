
// height css3 vh browser not support IE8--
$(function() {

    //window Height
    var wheight = $(window).height(); // get height of window;
    $('#hero, #auditorium, #loading').css('height', wheight);

    $(window).resize(function() {
        var wheight = $(window).height(); // get height of window;
        $('#hero, #auditorium, #loading').css('height', wheight);
    }); // on resize

});


// paging #link scrolling 
$(function() {

    var topOffset = 43;
    var wheight = $(window).height();

    // Animated scrolling
    // https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - topOffset
                }, 1000);
                return false;
            } // if target.length
        } // location hostname
    }); // onClick

    $(window).scroll(function() {

        var windowPos = $(window).scrollTop() + topOffset;
        if (wheight < windowPos) {
            $('#navigation').addClass('ableBg');
        } else {
            $('#navigation').removeClass('ableBg');
        }

        $('nav li a').removeClass('active');

        if (windowPos < $('#speakers').offset().top) {
            $('nav li a').removeClass('active');
            $('a[href$="#home"]').addClass('active');
        } // if windowPos

        if (windowPos > $('#speakers').offset().top) {
            $('nav li a').removeClass('active');
            $('a[href$="#speakers"]').addClass('active');
        } // if windowPos

        if (windowPos > $('#agenda').offset().top) {
            $('nav li a').removeClass('active');
            $('a[href$="#agenda"]').addClass('active');
        } // if windowPos

        if (windowPos > $('#auditorium').offset().top) {
            $('nav li a').removeClass('active');
            $('a[href$="#auditorium"]').addClass('active');
        } // if windowPos

        if (windowPos > $('#sponsors').offset().top) {
            $('nav li a').removeClass('active');
            $('a[href$="#sponsors"]').addClass('active');
        } // if windowPos
    });
});

//support IE 10 -- :::: flex-box
$(function() {
    for (var i = 0; i < $('.speakers__pic').length; i++) {
        var picObj = $('.speakers__pic img').eq(i).height();
        $('.speakers__desc').eq(i).height(picObj);
    }

    $(window).resize(function() {
        for (var i = 0; i < $('.speakers__pic').length; i++) {
            var picObj = $('.speakers__pic img').eq(i).height();
            $('.speakers__desc').eq(i).height(picObj);
        }
    }); // on resize

});


// active event
$(function() {
    $('.speakersList__container__main, .speakersList__container__sub').hover(function() {
        // $(this).addClass('active');
        $(this).children().addClass('active');
        $(this).children().children().addClass('active');
    }, function() {
        $(this).children().removeClass('active');
        $(this).children().children().removeClass('active');
    });
});

//arrow detect for direction
$(function() {
    for (var i = 0; i < $('.arrow').length; i++) {
        if (i > 2) {
            if (i % 4 == 0 || i % 4 == 3) {
                $('.arrow').eq(i).addClass('right');
            } else {
                $('.arrow').eq(i).addClass('left');
            }
        } else {
            $('.arrow').eq(i).addClass('left');
        }
    }
});

// HTML Loading finished
$(document).ready(function(){ 
  $('#loading').addClass('loaded');
  var loading = $('#loading');
  loading.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    function() {
    loading.remove();
    });
}); // $(document).ready
