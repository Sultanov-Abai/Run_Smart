"use strict";

window.addEventListener('DOMContentLoaded', function() {
    const slider = tns({
        container: '.carousel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        controls: false,
        nav: false
    });
    
    document.querySelector('.prev').addEventListener('click', function () {
        slider.goTo('prev');
    });
    
    document.querySelector('.next').addEventListener('click', function () {
        slider.goTo('next');
    });

    // $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    //     $(this)
    //         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
    //         .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    // });

    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = 'flex') => {
        const header = document.querySelector(headerSelector),
              tab = document.querySelectorAll(tabSelector),
              content = document.querySelectorAll(contentSelector);
    
        function hideTabContent() {
            content.forEach(item => {
                item.style.display = 'none';
            });
    
            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
    
        function showTabContent(i = 0) {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        }
    
        hideTabContent();
        showTabContent();
    
        header.addEventListener('click', (e) => {
            const target = e.target;
            if (target && 
                (target.classList.contains(tabSelector.replace(/\./, '')) ||
            target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
    };

    tabs('.catalog__tabs', '.catalog__tab', '.catalog__content', 'catalog__tab_active');

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #oreder, #thanks').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: {
                    required: true,
                    email: true
                    }
                },
            messages: {
                name: 'Пожалуйста введите своё имя',
                phone: 'Пожалуйста введите корректный номер телефона',
                email: {
                    required: 'Введите адресс электронной почты',
                    email: 'Неправильно введен адрес почты'
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    // $('input[name=phone]').mask("+7 (999) 999-99-99")

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').value('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset');
            return false;
        });
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.page_up').fadeIn();
        } else {
            $('.page_up').fadeOut();
        }
    });

    $("a[href^=#up]").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});