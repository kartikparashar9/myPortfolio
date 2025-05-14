(function ($) {
    "use strict";

    // Navbar visibility toggle on scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling for navbar links
    $(".navbar-nav a").on('click', function (event) {
        const target = this.hash;
        if (target !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(target).offset().top - 45
            }, 1500, 'easeInOutExpo');

            // Highlight active link
            $('.navbar-nav .active').removeClass('active');
            $(this).closest('a').addClass('active');
        }
    });

    // Initialize Typed.js for text animation
    if ($('.typed-text-output').length) {
        const typedStrings = $('.typed-text').text().split(', ');
        new Typed('.typed-text-output', {
            strings: typedStrings,
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }

    // Video Modal handling
    $(document).ready(function () {
        let videoSrc;

        // When play button is clicked
        $('.btn-play').on('click', function () {
            videoSrc = $(this).data("src");
        });

        // When modal is shown, set video source with autoplay
        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', `${videoSrc}?autoplay=1&modestbranding=1&showinfo=0`);
        });

        // When modal is hidden, reset video source
        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', videoSrc); // Reset video source on modal close
        });
    });

    // Scroll-to-bottom button visibility
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });

    // Skills Progress Bar animation on scroll
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            const width = $(this).attr("aria-valuenow");
            $(this).css("width", `${width}%`);
        });
    }, { offset: '80%' });

    // Portfolio isotope filtering
    const portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $('#portfolio-flters li').removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Back-to-top button visibility and functionality
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Scroll to the top when back-to-top button is clicked
    $('.back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Testimonials carousel initialization
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);
