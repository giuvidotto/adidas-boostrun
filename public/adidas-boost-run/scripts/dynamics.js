$(document).ready(function(){

    // PROVA
    var dynamicCurrentProva = 0;
    $.each($("a.dynamic-link[id^='provaLink_'"), function(i){
        var dynamicIntro = $(".parallax-prova .dynamic-content#provaContent_0");
        var dynamicLink = $(this);
        var dynamicContent = $(".parallax-prova .dynamic-content#provaContent_"+i);
        href = dynamicLink.attr("href");

        dynamicLink.click(function(e){
            $(".parallax-prova .dynamic-link").removeClass("breadcrumb");
            e.preventDefault();
            e.stopPropagation();
            breadcrumb.scrollTo(href);


            if(dynamicCurrentProva == i){
                TweenMax.to(dynamicIntro, .4, {
                    className:"dynamic-content active",
                    onComplete: function(){
                        dynamicCurrentProva = 0;
                        dynamicLink.removeClass("breadcrumb");
                    }
                });
                TweenMax.to(dynamicContent, .4, {
                    className:"dynamic-content backwards",
                    onComplete:function(){
                        dynamicContent.removeClass("backwards");
                    }
                });
            }else{
                TweenMax.to($(".parallax-prova .dynamic-content:not(#provaContent_"+i+")"), .4, {
                    className:"dynamic-content inactive",
                    onComplete:function(){
                        dynamicLink.addClass("breadcrumb");
                        $(".parallax-prova .dynamic-content:not(#provaContent_"+i+"):not(#provaContent_0)").removeClass("inactive");
                    }
                });
                TweenMax.to(dynamicContent, .4, {
                    className:"dynamic-content active",
                    onComplete:function(){
                        dynamicCurrentProva = i;
                    }
                });
            }
        });
    });

    // PERCURSO
    var dynamicCurrentPercurso = 1;
    $(".dynamic-link[id^='percursoLink_'").on( "click" , function (e) {
        var i = $(this).attr('id').replace( 'percursoLink_' , '' );
        var dynamicLink = $(this);
        var dynamicContent = $(".parallax-percurso .dynamic-content#percursoContent_"+i);

        $(".parallax-percurso .dynamic-link").removeClass("breadcrumb");
        dynamicLink.addClass("breadcrumb");
        e.stopPropagation();

        if(dynamicCurrentPercurso!=i){
            TweenMax.to($(".parallax-percurso .dynamic-content"), .4, {
                className:"dynamic-content"
            });
            TweenMax.to(dynamicContent, .4, {
                delay:.2,
                className:"dynamic-content active",
                onComplete:function(){
                    dynamicCurrentPercurso = i;
                }
            });
        }
    });


    // SLIDER

    var percursoSlider = new TimelineMax({
        paused:true,
        onComplete:function(){
            this.restart();
        }
    });

    var percursoSliderNext = null;
    
    $.each($(".parallax-percurso .dynamic-link"), function(index){
        var i = index+1;
        var percursoThis = $(this);
        percursoSlider.add('percursoSlider_'+i, "+=0").to(percursoThis, 3.5,{onComplete:function(){
            percursoThis.click();
        }});
    });

    percursoSlider.play('percursoSlider_'+2);

    $(".parallax-percurso .distance").on("mouseenter", function(){
        percursoSlider.pause();
    }).on("mouseleave", function(){
        if(dynamicCurrentPercurso == $(".parallax-percurso .dynamic-link").length){
            percursoSliderNext = 1;
        }else{
            percursoSliderNext = parseInt(dynamicCurrentPercurso) + 1;
        }
        percursoSlider.play('percursoSlider_'+percursoSliderNext);
    });
});