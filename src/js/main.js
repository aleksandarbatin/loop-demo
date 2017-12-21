// ###############################
// MAIN JAVASCRIPT 
// ###############################

(function() {
	// ###################
    // Mobile menu toggle

    $('.header__menuBtn').click(function(){
        $('.header__nav').toggle("slow");
    });

    // ###################
    // Calendar show

    var $calendar = $('.calendar');
    var $close    = $('.close');

    $calendar.click(function(){
        $('.termine').addClass('show-popup');

        $('.pageWrapper').addClass('overlay');
    });
    $close.click(function(){
        $('.termine').removeClass('show-popup');
        $('.pageWrapper').removeClass('overlay');
    });

     // ###################
    // News article show
    
    var $news = $('.news');
    var $close    = $('.close');

    $news.click(function(){
        $('.newsArticle').addClass('show-popup');
        $('.pageWrapper').addClass('overlay');
    });
    $close.click(function(){
        $('.newsArticle').removeClass('show-popup');
        $('.pageWrapper').removeClass('overlay');
    });


    // #####################
    // NEWS SLIDER

    //custom function showing current slide
      var $status = $('.slideInfo-current');
      var $total = $('.slideInfo-total');
      var $newsSlider = $('.news__slider ul');

      $newsSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text("0"+ i);
        $total.text('/' + "0" + slick.slideCount);
    });

    $newsSlider.slick({
        prevArrow: $('.btn-prev'),
        nextArrow: $('.btn-next')
    });

    // #####################
    // TEASERS SLIDER

    var $teasersSlider = $('.teasers__slider__wrapper');

    $teasersSlider.slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: $('.teasersBtn-prev'),
        nextArrow: $('.teasersBtn-next'),
        responsive: [
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true
          }
        }
        ]
    });



})();