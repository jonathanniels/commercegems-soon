$(function() {
    "use strict";



    /* ==========================================================================
   On Scroll animation
   ========================================================================== */
    
    if ($(window).width() > 992) {
        new WOW().init();
    };
    


    /* ==========================================================================
   Tweet
   ========================================================================== */
    
    
    $('.tweet').twittie({
        username: 'envatomarket', // change username here
        dateFormat: '%b. %d, %Y',
        template: '{{tweet}} {{user_name}}',
        count: 10
    }, function() {
        var item = $('.tweet ul');
        
        item.children('li').first().show().siblings().hide();
        setInterval(function() {
            item.find('li:visible').fadeOut(500, function() {
                $(this).appendTo(item);
                item.children('li').first().fadeIn(500);
            });
        }, 5000);
    });

    /* ==========================================================================
   countdown
   ========================================================================== */
    
    $('.countdown').downCount({
        date: '11/01/2021 12:00:00' // m/d/y
    });


    /* ==========================================================================
     sub form
     ========================================================================== */
    
    var $form = $('#mc-form');
    
    $('#mc-subscribe').on('click', function(event) {
        if (event)
            event.preventDefault();
        register($form);
    });
    
    function register($form) {
        $.ajax({
            type: $form.attr('method'),
            url: "php/notify.php",
            data: $form.serialize(),
            error: function(err) {
                $('#mc-notification').hide().html('<span class="alert">Could not connect to server. Please try again later.</span>').fadeIn("slow");
            },
            success: function(data) {   
                $("#mc-form")[0].reset();
                $('#mc-notification').hide().html('<span class="success"><i class="fa fa-envelope"></i>' + 'Awesome! We sent you a confirmation email.' + '</span>').fadeIn("slow");
            }
        });
    }


    /* ==========================================================================
     Textrotator
     ========================================================================== */
    
    
    
    $(".rotate").textrotator({
        animation: "dissolve",
        separator: ",",
        speed: 2500
    });

    /* ==========================================================================
       Contact Form
       ========================================================================== */
    
    
    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: "<i class='fa fa-exclamation-triangle'></i>Please specify your name.",
            email: {
                required: "<i class='fa fa-exclamation-triangle'></i>We need your email address to contact you.",
                email: "<i class='fa fa-exclamation-triangle'></i>Please enter a valid email address."
            },
            message: "<i class='fa fa-exclamation-triangle'></i>Please enter your message."
        },
        submitHandler: function(form) {
            $(form).ajaxSubmit({
                type: "POST",
                data: $(form).serialize(),
                url: "php/contact-me.php",
                success: function() {
									  $("#contact-form")[0].reset();
                    $('#contact-form :input').attr('disabled', 'disabled');
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor', 'default');
                        $('.success-cf').fadeIn();
                    });
                },
                error: function() {
                    $('#contact-form').fadeTo("slow", 0.15, function() {
                        $('.error-cf').fadeIn();
                    });
                }
            });
        }
    });

    /* ==========================================================================
   ScrollTop Button
   ========================================================================== */
    
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.scroll-top a').fadeIn(200);
        } else {
            $('.scroll-top a').fadeOut(200);
        }
    });
    
    
    $('.scroll-top a').click(function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });



});
