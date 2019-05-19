

$(function () {
  'use strict'

    $('[data-toggle="cf-navbar"]').on('click', function () {
        $('.cf-navbar-collapse').toggleClass('open');
        $('.cf-navbar-collapse .navbar-nav').toggleClass('open');
    })

    $('.cf-navbar-collapse-closer').on('click', function(){
        $('.cf-navbar-collapse').toggleClass('open');
        $('.cf-navbar-collapse .navbar-nav').toggleClass('open');
    })
})






