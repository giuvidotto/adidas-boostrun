
// controllers
var navigation = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onLeave",
    }
});
var breadcrumb = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onCenter",
    }
});
var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onEnter",
        duration: "340%"
    }
});
var controllerLong = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onEnter",
        duration: "500%"
    }
});
var controllerCenter = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onCenter",
        duration: "340%"
    }
});
var controllerLeave = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: "onLeave",
        duration: "340%"
    }
});

// navigation
breadcrumb.scrollTo(function (newpos, callback) {
    TweenMax.to(window, 1, { scrollTo: { y: newpos, ease: Expo.easeInOut, onComplete: callback } });
});

function urlChange(href) {
    if (window.history && window.history.pushState) {
        history.pushState("", document.title, href);
    }
}

function breadcrumbChange(href) {
    $(".runners-ins--menu a:not([href='" + href + "'])").removeClass("breadcrumb");
    $(".runners-ins--menu a[href='" + href + "']").addClass("breadcrumb");
}

$(document).on("click", ".runners-ins--menu a, [data-scroll]", function (e) {
    var href = $(this).attr("href");

    e.preventDefault();

    if ( typeof( $(this).attr("data-scroll") ) == "undefined" ) {
        breadcrumbChange(href);
        urlChange(href);
    }

    $('.menu').trigger("click");

    breadcrumb.scrollTo(href);
});

new ScrollMagic.Scene({ triggerElement: "#home" })
    .setTween(".runners-ins--menu", .2, { className: "+=fixed" })
    .offset(100)
    .addTo(navigation);

$('.runners-ins--menu a').each(function (index) {
    var href = $(this).attr('href');
    new ScrollMagic.Scene({ triggerElement: href })
        .on("start end enter leave", function (e) {    
            if (e.type == "start" || e.type == "leave") {
                TweenMax.to(document, 0, {
                    opacity: 1, onComplete: function () {
                        //$(".runners-ins--menu a[href='" + href + "']").removeClass("breadcrumb"); 
                    }
                });
            } else {
                TweenMax.to(document, 0, {
                    opacity: 1, onComplete:
                    function () {
                        breadcrumbChange(href);
                        urlChange(href);
                    }
                });
            }
        })
        .offset(index == 0 ? 500 : -60)
        .addTo(navigation);
});

// parallax global
$('.parallaxContainer').each(function (index) {
    i = index + 1;

    if ($(".parallaxContainer:nth-of-type(" + i + ") .parallaxParent").hasClass("parallaxPattern")) {
        new ScrollMagic.Scene({ triggerElement: ".parallaxContainer:nth-of-type(" + i + ")" })
            .setTween(".parallaxContainer:nth-of-type(" + i + ") .parallaxParent > .parallaxChild:nth-child(1)",
                {
                    y: "20%",
                    ease: Linear.easeNone
                })
            .addTo(controller);

        new ScrollMagic.Scene({ triggerElement: ".parallaxContainer:nth-of-type(" + i + ")" })
            .setTween(".parallaxContainer:nth-of-type(" + i + ") .parallaxParent > .parallaxChild:nth-child(2)",
                {
                    y: "-15%",
                    ease: Linear.easeNone
                })
            .addTo(controller);
    } else if ($(".parallaxContainer:nth-of-type(" + i + ") .parallaxParent").hasClass("parallaxLong")) {
        new ScrollMagic.Scene({ triggerElement: ".parallaxContainer:nth-of-type(" + i + ")" })
            .setTween(".parallaxContainer:nth-of-type(" + i + ") .parallaxParent > .parallaxChild",
                {
                    y: "50%",
                    ease: Linear.easeNone
                })
            .addTo(controllerLong);
    } else {
        new ScrollMagic.Scene({ triggerElement: ".parallaxContainer:nth-of-type(" + i + ")" })
            .setTween(".parallaxContainer:nth-of-type(" + i + ") .parallaxParent > .parallaxChild",
                {
                    y: "75%",
                    ease: Linear.easeNone
                })
            .addTo(controller);
    }

    new ScrollMagic.Scene({ triggerElement: ".parallaxContainer:nth-of-type(" + i + ")" })
        .setTween(TweenMax.from(".parallaxContainer:nth-of-type(" + i + ") .runner-ins--section", 1,
            {
                opacity: 0,
                y: "-40px",
                ease: Linear.easeInOut
            }))
        .addTo(controller);

    new ScrollMagic.Scene({ triggerElement: ".parallaxContainer:nth-of-type(" + i + ")" })
        .setTween(".parallaxContainer:nth-of-type(" + i + ") .parallaxDecorItem",
            {
                opacity: -2,
                ease: Linear.easeIn
            })
        .addTo(controllerLeave);
});



// home
new ScrollMagic.Scene({ triggerElement: "#parallax1" })
    .setTween("#parallax1 .parallaxDecorItem:nth-child(1)",
        {
            x: "-200%",
            y: "-125%",
            ease: Linear.easeNone
        })
    .offset(450)
    .addTo(controllerCenter);

new ScrollMagic.Scene({ triggerElement: "#parallax1" })
    .setTween("#parallax1 .parallaxDecorItem:nth-child(2)",
        {
            x: "200%",
            y: "125%",
            ease: Linear.easeNone
        })
    .offset(450)
    .addTo(controllerCenter);

new ScrollMagic.Scene({ triggerElement: "#parallax1" })
    .setTween("#parallax1 .parallaxDecorItem:nth-child(3)",
        {
            x: "200%",
            ease: Linear.easeNone
        })
    .offset(450)
    .addTo(controllerCenter);

new ScrollMagic.Scene({ triggerElement: "#parallax1" })
    .setTween("#parallax1 .parallaxDecorItem:nth-child(4)",
        {
            x: "-200%",
            ease: Linear.easeNone
        })
    .offset(450)
    .addTo(controllerCenter);



//prova

new ScrollMagic.Scene({ triggerElement: "#parallax2" })
    .setTween("#parallax2 .parallaxDecorItem",
        {
            x: "100%",
            y: "75%",
            ease: Linear.easeNone
        })
    .offset(600)
    .addTo(controllerCenter);



// percurso

// new ScrollMagic.Scene({ triggerElement: "#parallax5" })
//     .setTween("#parallax5 .parallaxDecorItem:nth-child(1)",
//         {
//             x: "-100%",
//             ease: Linear.easeNone
//         })
//     .offset(200)
//     .addTo(controllerCenter);

// new ScrollMagic.Scene({ triggerElement: "#parallax5" })
//     .setTween("#parallax5 .parallaxDecorItem:nth-child(2)",
//         {
//             x: "100%",
//             ease: Linear.easeNone
//         })
//     .offset(200)
//     .addTo(controllerCenter);



// atracoes

new ScrollMagic.Scene({ triggerElement: "#parallax7" })
    .setTween("#parallax7 .parallaxDecorItem:nth-child(1)",
        {
            x: "-100%",
            ease: Linear.easeNone
        })
    .offset(200)
    .addTo(controllerCenter);

new ScrollMagic.Scene({ triggerElement: "#parallax7" })
    .setTween("#parallax7 .parallaxDecorItem:nth-child(2)",
        {
            x: "100%",
            ease: Linear.easeNone
        })
    .offset(200)
    .addTo(controllerCenter);



// cadastro

new ScrollMagic.Scene({ triggerElement: "#parallax11" })
    .setTween("#parallax11 .parallaxDecorItem",
        {
            x: "-100%",
            ease: Linear.easeNone
        })
    .offset(700)
    .addTo(controllerCenter);


    var accordion = {
        init: function () {
            var othis = this;
    
            othis.accordions = $('.accordion:not(.inactive)');
    
            othis.accordionsAll = othis.accordions.find('.accordion-content');
    
            othis.accordions.find('.accordion-content').hide();
    
            othis.addEventListeners();
        },
    
        addEventListeners: function () {
            var othis = this;
    
            othis.accordions.find('.accordion-header').click(function () {
                othis.toggle($(this));
            });
        },
    
        toggle: function ($el) {
            var othis = this;
    
            if ($el.parent().hasClass('active'))
                othis.close($el);
            else
                othis.open($el);
        },
    
        open: function ($el) {
            var othis = this;
    
            othis.close(othis.accordionsAll);
            $el.parent().addClass('active')
                .find('.accordion-content').slideDown();
        },
    
        close: function ($el) {
            var othis = this;
    
            $el = $el != undefined ? $el.parent() : othis.accordions.filter('.active');
    
            $el.removeClass('active')
                .find('.accordion-content').slideUp();
        }
    }
    
    var sendmail = {
        init: function () {
            var othis = this;
            othis.formContato = $('#form-contato');
            othis.formCadastro = $('#form-cadastro');
            othis.btnContato = $('#btn-contato');
            othis.btnCadastro = $('#btn-cadastro');
            othis.nomeCompleto = $("#form-cadastro input[name='nome']");
            othis.emailCadastro = $("#form-cadastro input[name='email']");
            othis.sexoCadastro = $("#form-cadastro input[name='sexo']");
            othis.noticia1Cadastro = $("#form-cadastro input[name='noticia1']");
            othis.noticia2Cadastro = $("#form-cadastro input[name='noticia2']");

            othis.addEventListeners();
        },
    
        addEventListeners: function () {
            var othis = this;
    
            othis.btnContato.on('click' , function (e){
                e.preventDefault();
                othis.send( othis.formContato.serialize() );
            });
    
            othis.btnCadastro.on('click' , function (e){
                e.preventDefault();
                othis.sendApi( othis.formContato.serialize() );
            });
        },
    
        send: function ($form) {
            var othis = this;

            $.post( '/api/send-contato' , $form , function (data) {
                othis.alert( "Mensagem enviada com sucesso!" );
            } )
        },
    
        sendApi: function ($form) {
            var othis = this;
            var $data = { 
                "clientId":"19CD08C076617E865B824BEA2AB61967",
                "consents":{  
                   "consent":[
                      {  
                         "consentType":"AMF",
                         "consentValue":othis.noticia2Cadastro.val()
                      }
                   ]
                },
                "minAgeConfirmation":othis.noticia1Cadastro.val(),
                "countryOfSite":"BR",
                "email": othis.emailCadastro.val(),
                "firstName": othis.nomeCompleto.val(),
                "gender": othis.sexoCadastro.val(),
                "lastName": othis.nomeCompleto.val(),
                "newsletterTypeId": 100,
                "source":"543461016"
            }

            $.ajax({
                url: 'https://srs.adidas.com/scvRESTServices/account/createSubscription',
                type: 'POST',
                data: JSON.stringify($data),
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                success: function (data) {
                    console.log(data);
                    othis.alert( "Mensagem enviada com sucesso!" )
                }
            });

        },
    
        alert : function($msg) {
            Swal.fire($msg)
        }
    }

    var premiacao = {
        init: function () {
            var othis = this;
            othis.colIndividual = $('.col-individual');
            othis.titleIndividual = $('.title-individual');
            othis.contentDupla = $('.content-dupla');

            othis.colDupla = $('.col-dupla');
            othis.titleDupla = $('.title-dupla');
            othis.contentIndividual = $('.content-individual');

            othis.btnClose = $('.btn-close');

            othis.addEventListeners();
        },
    
        addEventListeners: function () {
            var othis = this;
    
            othis.titleIndividual.on("click" , function () {
                othis.btnClose.removeClass('hidden');
                othis.contentIndividual.addClass('active');
                othis.titleDupla.removeClass('active');
            });

            othis.titleDupla.on("click" , function () {
                othis.btnClose.removeClass('hidden');
                othis.contentDupla.addClass('active');
                othis.titleIndividual.removeClass('active');
            });

            othis.btnClose.on("click" , function () {
                othis.btnClose.addClass('hidden');
                othis.titleDupla.addClass('active');
                othis.titleIndividual.addClass('active');
                othis.contentIndividual.removeClass('active');
                othis.contentDupla.removeClass('active');

            } );
        },
    
        show : function () {

        },

        close: function () {

        }
    }
    
    $(function () {
        accordion.init();
        sendmail.init();
        premiacao.init();

        var hash = window.location.hash;
        breadcrumbChange(hash);
    
        $('.menu').on('click' , function (e) {
            if ( $("#mySidebar").css("width") != "0px" ) {
                $("#mySidebar").css( {  "width" : "0"  } );
            } else {
                $("#mySidebar").css( {  "width" : "100%"  } );
            }
        } )
        

        $('#significa').on('click' , function(e) {

            Swal.fire({
                'title' : '',
                'text' : 'Concordo em que adidas do Brasil ltda. pode me contatar por correio convencional, por e-mail, por mensagem de texto, por telefone ou por qualquer meio eletrônico para fins de marketing, publicidade e pesquisa de opinião do Grupo adidas. Para que eu possa ser contatado com informação que seja de interesse especial para mim, estou de acordo em que a minha interação geral com adidas do Brasil ltda.e com a adidas AG, Herzogenaurach (D) seja combinada, analisada e usada. Além disso, estou de acordo em que adidas do Brasil ltda. possa fornecer os meus dados de contato à adidas AG para os fins de marketing, publicidade e pesquisa de opinião do Grupo adidas. Para mais informação, leia a Política de Privacidade. Entendo que posso revogar o meu consentimento a qualquer momento, conforme indicado nas mensagens enviadas pela adidas do Brasil ltda.',
                'customClass': {
                    'content': 'content-box'
                }
            })
        } );

        // Set the date we're counting down to
        var countDownDate = new Date("Oct 7, 2019 13:25:25").getTime();
    
        // Update the count down every 1 second
        /*var x = setInterval(function() {
            // Get today's date and time
            var now = new Date().getTime();
            
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
    
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            // Display the result in the element with id="demo"
            var template =  days + "<small>D</small> "+ hours +"<small>H</small> "+minutes+"<small>M</small> "+seconds+"<small>S</small>";
            document.getElementById("score").innerHTML = template;
    
            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("score").innerHTML = "000<small>D</small> 00<small>H</small> 00<small>M</small> 00 <small>S</small>";
            }
        }, 1000);*/
        
        // Swal.fire({
        //     title: '<strong>Pré-venda exclusiva membros adidas runners de 24 a 28/07/2019</strong>',
        //     html:
        //       '<b> Inscrições de 29/07 a 29/09/2019</b> <br /><br />' +
        //       '<span> Ainda não é um membro adidas runners? <a href="https://www.adidas.com.br/adidasrunners/" target="_blank">Faça parte</a>  </span>',
        //     showCloseButton: true,
        //     focusConfirm: false,
        //     confirmButtonText: 'OK' ,
        // })
    })