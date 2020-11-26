var fotos_dir = 'adidas-boost-run/images/fotos/',
    fotos_dir_relative = '../images/fotos/',
    fotos_name = 'adidas-boostrun-sp-2019-fotos_';

var fotos_full_width =20,
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
    console.log('document ready');
    new ScrollMagic.Scene({ triggerElement: '#fotos' })
        .on("enter", function () {
            console.log('chegou em fotos');
            //cria lista
            $('<ul>', {id: 'galeria', class: 'runners-ins--list'})
                .appendTo('#galeria_container');
            
            $fotos_container = $('#galeria_container');

            console.log('montou container');
            //busca imgs e popula na lista
            $.ajax({
                url: fotos_dir,
                success: function(data){
                    $(data).find("a").attr("href", function (i, val) {
                        var number = i+1;

                        console.log('achou item '+i);

                        if(val.match(/\.(jpg|jpeg|png|gif)$/)){

                            //cria html do item
                            var list_item = $('<li class="runners-ins--item" data-width="'+fotos_full_width.replace(fotos_blank_number, number)+'" data-download-url="'+fotos_data_download_url.replace(fotos_blank_number, number)+'" data-src="'+fotos_data_src.replace(fotos_blank_number, number)+'" data-src-set="'+fotos_data_src_set.replace(fotos_blank_number, number)+'" data-sizes="' +fotos_data_sizes.replace(fotos_blank_number, number)+'> \
                                <img class="runners-ins--img" alt="adidas BOOST RUN : fotos do evento" src="'+fotos_thumb_src.replace(fotos_blank_number, number)+'" srcset="'+fotos_thumb_srcset.replace(fotos_blank_number, number)+'" /> \
                            </li>');

                            //popula item na lista
                            $fotos_container.append(list_item);
                        }
                    });

                    //carrega galeria
                    $("#galeria")
                        .lightSlider({
                            item:1,
                            autoWidth:true,
                            slideMove:1,
                            slideMargin:30,
                            mode:'slide',
                            useCSS:true,
                            cssEasing:'cubic-bezier(0.25, 0, 0.25, 1)',
                            easing:'linear',
                            speed:400,
                            loop:true,
                            slideEndAnimation:true,
                            pause:2000,
                            keyPress:true,
                            controls:true,
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
                        })
                        .lightGallery({
                            cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
                            speed:400,
                            addClass:'',
                            counter:false,
                            swipeThreshold:30,
                            zoom:false,
                        });
                },
                error: function(){
                    console.log('deu ruim.');
                }
            });
        })
    .addTo(controller);
});