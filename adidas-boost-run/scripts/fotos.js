var fotos_quantity = 740;

var fotos_dir = 'adidas-boost-run/images/fotos/',
    fotos_dir_relative = '../images/fotos/',
    fotos_name = 'adidas-boostrun-sp-2019-fotos_';

var fotos_full_width = 1920,
    fotos_widths = [720, 960],
    fotos_heights = [140, 185]
    fotos_breakpoints = [280, 640],
    fotos_blank_number = 'XXXXXX',

    //templates
    fotos_data_download_url = fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_full_width+'w.jpg',
    fotos_data_src = fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_widths[1]+'w.jpg',
    fotos_data_src_set = fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_widths[0]+'w.jpg '+fotos_breakpoints[0]+'w, '+fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_widths[1]+'w.jpg '+fotos_breakpoints[1]+'w',
    fotos_data_sizes = '(min-width:'+fotos_breakpoints[1]+'px) '+fotos_widths[1]+'px, '+fotos_widths[0]+'px',
    fotos_thumb_src = fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_heights[1]+'h.jpg',
    fotos_thumb_srcset = fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_heights[0]+'h.jpg '+fotos_breakpoints[0]+'w, '+fotos_dir+fotos_name+fotos_blank_number+'.min@'+fotos_heights[1]+'h.jpg '+fotos_breakpoints[1]+'w';

$(document).ready(function(){

    new ScrollMagic.Scene({ triggerElement: '#fotos', reverse:false })
        .on("enter", function () {
            //cria lista
            $('<ul>', {id: 'galeria', class: 'runners-ins--list'})
                .appendTo('#galeria_container');
            
            $fotos_container = $('#galeria_container');
            $fotos = $('#galeria');

            //popula lista
            for (var i = 1; i <= fotos_quantity; i++){

                //cria html do item
                var list_item = $('<li class="runners-ins--item" data-width="'+fotos_full_width+'" data-download-url="'+fotos_data_download_url.replace(/XXXXXX/g, i)+'" data-src="'+fotos_data_src.replace(/XXXXXX/g, i)+'" data-src-set="'+fotos_data_src_set.replace(/XXXXXX/g, i)+'" data-sizes="' +fotos_data_sizes.replace(/XXXXXX/g, i)+'"> \
                    <img class="runners-ins--img" alt="adidas BOOST RUN SP 2019 : fotos do evento" src="'+fotos_thumb_src.replace(/XXXXXX/g, i)+'" srcset="'+fotos_thumb_srcset.replace(/XXXXXX/g, i)+'" /> \
                </li>');

                //popula item na lista
                $fotos.append(list_item);

                if(i===fotos_quantity){
                    var galeria = $fotos.lightSlider({
                        autoWidth:true,
                        slideMargin:30,
                        mode:'slide',
                        useCSS:true,
                        cssEasing:'cubic-bezier(0.25, 0, 0.25, 1)',
                        easing:'linear',
                        speed:600,
                        auto:true,
                        loop:true,
                        slideEndAnimation:true,
                        pause:2000,
                        keyPress:true,
                        controls:false,
                        prevHtml:'',
                        nextHtml:'',
                        thumbItem:1,
                        pager:false,
                        gallery:true,
                        //galleryMargin:30,
                        //thumbMargin:30,
                        enableTouch:true,
                        enableDrag:true,
                        freeMove:true,
                        swipeThreshold:30,
                        onSliderLoad: function(){
                            $('.runners-ins--fotos .paginate_button').fadeIn(200);
                            var $prev = $('.runners-ins--fotos .paginate_button.previous');
                            var $next = $('.runners-ins--fotos .paginate_button.next');
                            $prev.click(function(){
                                galeria.goToPrevSlide();
                            });
                            $next.click(function(){
                                galeria.goToNextSlide();
                            });
                        }
                    }).lightGallery({
                        cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                        speed:600,
                        addClass:'',
                        counter:true,
                        swipeThreshold:30,
                        zoom:false,
                    });
                }
            }
        })
    .addTo(controller);
});