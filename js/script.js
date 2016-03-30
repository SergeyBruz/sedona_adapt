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


;( function( window, document )
{
  var link = document.querySelector(".btn--title");
  var search_form = document.querySelector(".main_footer__search_form");
  var i = 0;
  var j=0;
  var mobile_menu_open = document.querySelector(".item--mobile_menu_open");
  var mobile_menu_close = document.querySelector(".item--mobile_menu_close");
  //форма поиска
  link.addEventListener("click", function(event) {
    if (i==0){
      event.preventDefault();
      search_form.classList.add("main_footer__search_form--show");
      i=1;
    }
    else if (i==1){
      i=0;
      event.preventDefault();
      search_form.classList.remove("main_footer__search_form--show");
    }
});
  //календарь
  var calendar = document.querySelector(".datepicker");
  var datepicker_open = document.querySelector(".calendar_icon");
  datepicker_open.addEventListener("click", function(event) {
    $(function(){
      $.datepicker.setDefaults(
            $.extend($.datepicker.regional["ru"])
      );
      $("#datepicker").datepicker({
        minDate: "+1",
        altField:"#date_in",
        altFormat:"dd.mm.yy",
        onSelect: function(datepicker, j){

          j=1;
          return j;
        }
      });
    });

    if (j==0){
      event.preventDefault();
      calendar.classList.add("datepicker--show");
      j=1;
    }
    else if(j==1){
      j=0;
      event.preventDefault();
      calendar.classList.remove("datepicker--show");
    }
});
  //мобильное меню
  mobile_menu_open.addEventListener("click", function(event) {
    event.preventDefault();
    var mobile_menu = document.querySelectorAll(".item--mobile_menu");
    for (var i = 0; i < mobile_menu.length; i++) {
      mobile_menu[i].classList.add("item--mobile_menu_show");
    }
});
  mobile_menu_close.addEventListener("click", function(event) {
    event.preventDefault();
    var mobile_menu = document.querySelectorAll(".item--mobile_menu");
    for (var i = 0; i < mobile_menu.length; i++) {
      mobile_menu[i].classList.remove("item--mobile_menu_show");
    }
  });
}( window, document ) );

  //форма поиска элементы
    $(document).ready(function() {

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
