$(document).ready(function () {
    $('.toggle-dark-mode').click(function () {
        $('body').toggleClass('bg-light dark-mode');
        $('.projects-card').toggleClass('projects-card-dark projects-card-light');
        $('.notes-card').toggleClass('notes-card-dark notes-card-light');
        $('a').toggleClass('nav-light');
        $('i').toggleClass('social-light');
        $('p a').toggleClass('a-light');
        if ($('body').hasClass('bg-light')) {
            $('.nav-btn').attr('src', 'images/moon-32x32.png');
        } else {
            $('.nav-btn').attr('src', 'images/sun-32x32.png');
        }

    });
});