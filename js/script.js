(function() {
  //форма поиска
  var link = document.querySelector(".btn--title");
  var search_form = document.querySelector(".main_footer__search_form");
  var i = 0;
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
  //мобильное меню
  var mobile_menu_open = document.querySelector(".item--mobile_menu_open");
  var mobile_menu_close = document.querySelector(".item--mobile_menu_close");
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
})();

//отправка формы
/*(function() {
  if (!("FormData" in window)) {
    return;
  }
  var form = document.querySelector(".search_form");
  var data = new FormData(form);
var xhr = new XMLHttpRequest();
xhr.open("post", "/send");
xhr.addEventListener("readystatechange", function() {
if (xhr.readyState == 4) {
console.log(xhr.responseText);
}
});
xhr.send(data);
  console.log(data);
})();*/


//JQuery

  $(document).ready(function() {


    $(".calendar_icon--in").click(function(){
        $('.datepicker_in').toggle();
    });
    $(".calendar_icon--out").click(function(){
        $('.datepicker_out').toggle();
    });

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

//календарь
    $(function(){
      $.datepicker.setDefaults(
            $.extend($.datepicker.regional["ru"])
      );
    })
    $(function(){
        $( ".datepicker_in" ).datepicker({
            inline: true, //Отображать в div вместо input
            defaultDate: "+0d",
            numberOfMonths: 1,
            dateFormat:"dd.mm.yy",
            altFormat: "dd M yy",
            beforeShowDay: allowedDates, //Функция блокировки дат
            //Поле формы, куда записывать значение календаря
            altField:"#date_in",
            //Переставляем дату во втором календаре
            onSelect: function( selectedDate ) {
                $(".datepicker_out" ).datepicker( "option", "minDate", selectedDate ).css('display','block');
                $(".datepicker_in").css('display','none');
            }
        });

        //Второй календарь, с конечной датой
        $( ".datepicker_out" ).datepicker({
            inline: true,
            defaultDate: "+0d",
            numberOfMonths: 1,
            altFormat: "dd M yy",
            dateFormat:"dd.mm.yy",
            beforeShowDay: allowedDates,
            altField:"#date_out",
            //Переставляем дату в первом календаре
            onSelect: function( selectedDate ) {
                $(".datepicker_in" ).datepicker( "option", "maxDate", selectedDate );
                $(".datepicker_out").css('display','none');
                $("#adults").focus();
            }
        });
        $(document).mouseup(function (e) {
            var container = $(".datepicker_in");
            if (container.has(e.target).length === 0){
                container.hide();
            }
        });
        $(document).mouseup(function (e) {
            var container = $(".datepicker_out");
            if (container.has(e.target).length === 0){
                container.hide();
            }
        });

    });

    //Массив с датами, которые нужно сделать недоступными
    var jsForbiddenDatesArray={}
    jsForbiddenDatesArray=[new Date("8/30/2012"),new Date("8/31/2012"),new Date("8/24/2012")];

    //Функция которая делает даты недоступными
    function allowedDates(date) {

        now=new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);

        //Исключаем даты раньше сегодняшнего дня
        if (date.getTime() < now.getTime()) return [false, ''];

        //Исключаем даты из массива
        for (var i = 0; i < jsForbiddenDatesArray.length; i++) {
            if (date.getTime() == jsForbiddenDatesArray[i].getTime())
                return [false, ''];
        }
        //Если нужно исключить выходные дни раскомментируйте строку ниже
        //return jQuery.datepicker.noWeekends(date);
        return [true,''];
    }

  });
