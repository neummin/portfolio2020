$(function(){

   var $cursor = $('.cursor');

   function moveCursor(e) {
     $cursor.addClass('is-moving');
     
      TweenLite.to($cursor, 0.23, {
       left: e.pageX,
       top: e.pageY,
       ease: Power4.easOut
     });
     
     clearTimeout(timer);
   
      var timer = setTimeout(function() {
          $cursor.removeClass('is-moving');
      }, 100);
   }
   
   $(window).on('mousemove', moveCursor);

   // 윈도우 시작하면 화면 맨위로 이동
  $("html,body").stop().animate({"scrollTop":0},1500,"swing")

  $(".logo").click(function(){
    $("html,body").stop().animate({"scrollTop":0},1000,"swing");
  });
});

$(document).ready(function() {
  
  var $wrapper = $('.tab-wrapper'),
      $allTabs = $wrapper.find('.tab-content > div'),
      $tabMenu = $wrapper.find('.tab-menu li'),
      $line = $('<div class="line"></div>').appendTo($tabMenu);
  
  $allTabs.not(':first-of-type').hide();  
  $tabMenu.filter(':first-of-type').find(':first').width('100%')
  
  $tabMenu.each(function(i) {
    $(this).attr('data-tab', 'tab'+i);
  });
  
  $allTabs.each(function(i) {
    $(this).attr('data-tab', 'tab'+i);
  });
  
  $tabMenu.on('click', function() {
    
    var dataTab = $(this).data('tab'),
        $getWrapper = $(this).closest($wrapper);
    
    $getWrapper.find($tabMenu).removeClass('active');
    $(this).addClass('active');
    
    $getWrapper.find('.line').width(0);
    $(this).find($line).animate({'width':'100%'}, 'fast');
    $getWrapper.find($allTabs).hide();
    $getWrapper.find($allTabs).filter('[data-tab='+dataTab+']').show();
  });

});//end ready

