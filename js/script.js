// http://osvaldas.info/caching-svg-sprite-in-localstorage
;( function( window, document )
{
    'use strict';

    var file     = 'img/sprite_sedona.svg',
        revision = 1;

    if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
        return true;

    var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
        request,
        data,
        insertIT = function()
        {
            document.body.insertAdjacentHTML( 'afterbegin', data );
        },
        insert = function()
        {
            if( document.body ) insertIT();
            else document.addEventListener( 'DOMContentLoaded', insertIT );
        };

    if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
    {
        data = localStorage.getItem( 'inlineSVGdata' );
        if( data )
        {
            insert();
            return true;
        }
    }

    try
    {
        request = new XMLHttpRequest();
        request.open( 'GET', file, true );
        request.onload = function()
        {
            if( request.status >= 200 && request.status < 400 )
            {
                data = request.responseText;
                insert();
                if( isLocalStorage )
                {
                    localStorage.setItem( 'inlineSVGdata',  data );
                    localStorage.setItem( 'inlineSVGrev',   revision );
                }
            }
        }
        request.send();
    }
    catch( e ){}

}( window, document ) );


/*Форма поиска*/
;( function( window, document )
{
  var link = document.querySelector(".btn--title");
  var popup = document.querySelector(".main_footer__search_form");
  var close = 0
  link.addEventListener("click", function(event) {
    if (close==0){
      event.preventDefault();
      popup.classList.add("main_footer__search_form--show");
      close=1;
    }
    else{
      close=0;
      event.preventDefault();
      popup.classList.remove("main_footer__search_form--show");
    }
});
}( window, document ) );

  //форма поиска элементы
    $(document).ready(function() {
      //календарь
      /*$.datepicker.setDefaults({changeYear: true}, $.extend($.datepicker.regional["ru"]));
        $("#datepicker_open").click(function(){
          $("#date_in").datepicker(
            "dialog",
            { showButtonPanel: true }
          );
        });*/

      //взрослые
        $('.min').click(function () {
            var $input = $(this).parent().find('#adults');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.max').click(function () {
            var $input = $(this).parent().find('#adults');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
      //дети
        $('.min').click(function () {
            var $input = $(this).parent().find('#children');
            var count = parseInt($input.val()) - 1;
            count = count < 0 ? 0 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.max').click(function () {
            var $input = $(this).parent().find('#children');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
    });
