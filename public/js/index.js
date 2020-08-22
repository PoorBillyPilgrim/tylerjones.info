$(document).ready(function () {
    $('.toggle-dark-mode').click(function () {
        $('body').toggleClass('bg-light dark-mode');
        $('nav').toggleClass('navbar-light navbar-dark')
        if ($('body').hasClass('dark-mode')) {
            $('.nav-btn').attr('src', 'images/sun-32x32.png');
        } else {
            $('.nav-btn').attr('src', 'images/moon-32x32.png');
        }

    });
});