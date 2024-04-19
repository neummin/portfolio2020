/*main.js*/ 

$(function(){
  imagesProgress();
  
  function imagesProgress() {
      var $container = $('#progress'),
          $progressBar = $container.find('.progress-bar'),
          $progressText = $container.find('.progress-text'),
          imgLoad = imagesLoaded('html'),
          imgTotal = imgLoad.images.length,
          imgLoaded = 0,
          current = 0,
          progressTimer = setInterval(updateProgress, 1000 / 60);
      
      imgLoad.on('progress', function(){
          imgLoaded++;
      });
      
      function updateProgress() {
          var target = (imgLoaded / imgTotal) * 100;
          
          current += (target - current) * 0.1;
          
          $progressBar.css({width: current + '%'});
          $progressText.text(Math.floor(current) + '%');
          
          if(current >= 100) {
              clearInterval(progressTimer);
              $container.addClass('progress-complete');
              $progressBar.add($progressText)
                  .delay(500)
                  .animate({opacity: 0}, 250, function() {
                  $container.animate({
                      top: '-100%'
                  }, 1000, 'swing');
              });
          }
          
          if(current > 99.9) {
              current = 100;
          }
      }
  }
});

$(function(){

  // 브라우저의 높이값을 div의 높이값으로
  var ht = $(window).height();
  $("#container>div").height(ht);
  

  // window크기가 바뀔때마다 100%로 리사이즈
  $(window).resize(function(){
      var ht = $(window).height();
      $("#container>div").height(ht);
  });

  
  // scroll 움직일때
  $(window).scroll(function(){
  
  var scroll = $(this).scrollTop(); //현재 scroll 위치값
  var content = $("#container>div"); 


  // content1
  if(scroll>=content.eq(0).offset().top-$("#container").offset().top){
      
      $("#gnb li").removeClass("on");
      $("#gnb li").eq(0).addClass("on");

      // 내용물 움직임 시작
      $(".content1>section").addClass("on");
  }else{
      // 움직임 취소
      $(".content1>section").removeClass("on")
  };
  // content2
  if(scroll>=content.eq(1).offset().top-$("#container").offset().top){
          
      $("#gnb li").removeClass("on");
      $("#gnb li").eq(1).addClass("on");

      // 내용물 움직임 시작
      $(".content2>section").addClass("on");
  }else{
      // 움직임 취소
      $(".content2>section").removeClass("on");
  };
  // content3
      if(scroll>=content.eq(2).offset().top-$("#container").offset().top){
          
          $("#gnb li").removeClass("on");
          $("#gnb li").eq(2).addClass("on");
      
          // 내용물 움직임 시작
          $(".content3>section").addClass("on");
      }else{
          // 움직임 취소
          $(".content3>section").removeClass("on")

      };
  // content4
  if(scroll>=content.eq(3).offset().top-$("#container").offset().top){
          
      $("#gnb li").removeClass("on");
      $("#gnb li").eq(3).addClass("on");
  
      // 내용물 움직임 시작
      $(".content4>section").addClass("on");
  }else{
      // 움직임 취소
      $(".content4>section").removeClass("on")
  };

  // 한페이지씩 이동       mousewheel 이벤트는 mousewheel플러그인을 html에 꽂아야 사용가능.
  $("#container>div").mousewheel(function(event,delta){
    event.preventDefault();

      if(delta>0){ //마우스 휠을 올렸을떄
          
          var prev = $(this).prev().offset().top;
          $("html,body").stop().animate({"scrollTop":prev},1000,"swing")
      
      }else if(delta<0){//마우스 휠을 내렸을떄
          
          var next = $(this).next().offset().top;
          $("html,body").stop().animate({"scrollTop":next},1000,"swing")
      }
  });

  });//scroll

  $("#gnb li,.quick li").click(function(){
      var ht = $(window).height(); 
      var i = $(this).index();
      var target = i*ht;

      $("#gnb").removeClass("on");
      $(".gnb_menu").removeClass("on");
      $(".gnb_bg").removeClass("on"); 
      $("html,body").stop().animate({"scrollTop":target},1000,"swing");
  });

  $(".go_portfolio").click(function(){

    $("html,body").stop().animate({"scrollTop":$(document).height()},1800,"swing");

  });

  $(".logo").click(function(){
    $("html,body").stop().animate({"scrollTop":0},1000,"swing");
  });

  /*햄버거 버튼 열기/닫기*/
$(".gnb_menu").click(function(){
  $(this).toggleClass("on");
  $("#gnb").toggleClass("on");
  $(".gnb_bg").toggleClass("on"); 
});
$(".gnb_bg").click(function(){
  $(this).removeClass("on");
  $("#gnb").removeClass("on");
  $(".gnb_menu").removeClass("on");
});

  var tmax_optionsGlobal = {
    repeat: -1,
    repeatDelay: 0.8,
    yoyo: true
  };
  
  CSSPlugin.useSVGTransformAttr = true;
  
  var tl = new TimelineMax(tmax_optionsGlobal),
      path = 'svg *',
      stagger_val = 0.0125,
      duration = 0.75;
  
  $.each($(path), function(i, el) {
    tl.set($(this), {
      x: '+=' + getRandom(-500, 500),
      y: '+=' + getRandom(-500, 500),
      rotation: '+=' + getRandom(-720, 720),
      scale: 0,
      opacity: 0
    });
  });
  
  var stagger_opts_to = {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: 0,
    ease: Power4.easeInOut
  };
  
  tl.staggerTo(path, duration, stagger_opts_to, stagger_val);
  
  var $svg = $('svg');
  $svg.hover(
    function() {
      tl.timeScale(0.15);
    },
    function() {
      tl.timeScale(0.9);
    });
  
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  

var $cursor = $('.cursor');


function moveCursor(e) {
  $cursor.addClass('is-moving');
  
	TweenLite.to($cursor, 0.2, {
    left: e.pageX,
    top: e.pageY,
    ease: Power4.easOut
  });

  $(".logo,.gnb_menu,.go_portfolio,#gnb>ul>li,.banner_pre,.banner_next,.view_detail").mouseover(function(){
    $(".cursor").addClass("hover");
  });
  $(".logo,.gnb_menu,.go_portfolio,#gnb>ul>li,.banner_pre,.banner_next,.view_detail").mouseout(function(){
    $(".cursor").removeClass("hover");
  });

  $(".logo,.gnb_menu,.go_portfolio,#gnb>ul>li,.banner_pre,.banner_next,.view_detail").hover(function(){
    $(this).css('cursor','pointer');
  });
  
  clearTimeout(timer);

   var timer = setTimeout(function() {
       $cursor.removeClass('is-moving');
   }, 400);
}

$(window).on('mousemove', moveCursor);
  
var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.001;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('.go_portfolio').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

    $('.gnb_bg').css({
      background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
      background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"}).css({"opacity":"0.5"});
      
      $('#gnb ul li').css({
        background: "#fff"});

      $('#gnb ul li.on').css({
        background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
        background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

        $('.gnb_circle').css({
          background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
          background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

          $('.progressred').css({
            background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
            background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

              $('.skill-box > .skills-circle > ul > li > span.bar-circle-right, .skill-box > .skills-circle > ul > li > span.bar-circle-left').css({
                background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
                background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);

var current = 1; //keeps track of the current div
var height = $('.about').height(); //the height of the roles div
var numberDivs = $('.about').children().length; //the number of children of the roles div
var first = $('.about div:nth-child(1)'); //the first div nested in roles div
setInterval(function() {
    var number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2000);


var lang = {
  "html": "80%",
  "css": "75%",
  "javascript": "60%",
};

var multiply = 4;

$.each( lang, function( language, pourcent) {

  var delay = 700;
  
  setTimeout(function() {
    $('#'+language+'-pourcent').html(pourcent);
  },delay*multiply);
  
  multiply++;

});


$('.skill-box').find('b').each(function (i) {
  return $(this).prop('Counter', 0).animate({
    Counter: $(this).parent().data('percent') },
  {
    duration: 1000,
    easing: 'swing',
    step: function (now) {
      return $(this).text(Math.ceil(now) + '%');
    } });

});
return $('.skill-box .skills-circle li').each(function (i) {
  var _left, _percent, _right, deg, full_deg, run_duration;
  _right = $(this).find('.bar-circle-right');
  _left = $(this).find('.bar-circle-left');
  _percent = $(this).attr('data-percent');
  deg = 3.6 * _percent;
  if (_percent <= 50) {
    return _right.animate({
      circle_rotate: deg },
    {
      step: function (deg) {
        $(this).css('transform', 'rotate(' + deg + 'deg)');
      },
      duration: 1000 });

  } else {
    full_deg = 180;
    deg -= full_deg;
    run_duration = 1000 * (50 / _percent);
    return _right.animate({
      circle_rotate: full_deg },
    {
      step: function (full_deg) {
        $(this).css('transform', 'rotate(' + full_deg + 'deg)');
      },
      duration: run_duration,
      easing: 'linear',
      complete: function () {
        run_duration -= 1000;
        _left.css({
          'clip': 'rect(0, 150px, 150px, 75px)',
          'background': '#B0DAB9' });

        return _left.animate({
          circle_rotate: deg },
        {
          step: function (deg) {
            $(this).css('transform', 'rotate(' + deg + 'deg)');
          },
          duration: Math.abs(run_duration),
          easing: 'linear' });

      } });

  }

});

});

window.addEventListener("DOMContentLoaded", function() {
  
  var slides = document.querySelectorAll(".slide");
  var numbers = document.querySelectorAll(".banner_numbers span");
  var preBtn = document.querySelector(".banner_pre");
  var nextBtn = document.querySelector(".banner_next");
  var bannerNumberMove = document.querySelector(".number_move");
  var slideToolBtn = document.querySelector(".banner_tool_container");
  var slideToolItems = document.querySelectorAll(".banner_tool_menu_item");
  var activeSlide;
  var nextSlide;
  var preSlide;
  var activeBannerNumber;
  var nextBannerNumber;
  var preBannerNumber;
  var numberClicked;
  var distanceBannerNumber = "33";
  
  var typeOfAutoSlide = "right";
  
  var slideIndex = 1;
  // var autoSlide = null;
  // autoSlide = setInterval(function() {
  //   // console.log(typeOfAutoSlide);
  //   if (typeOfAutoSlide == "right")
  //     slideMoveNext();
  //   else
  //     slideMovePre();
  // }, 9000);
  
  // console.log(autoSlide);


  nextBtn.addEventListener("click", function() {
    document.querySelector(".banner_tool_menu").classList.remove("banner_tool_menu_appear");
    // clearInterval(autoSlide);
    autoSlide = null;
    slideMoveNext();
  });
  
  function slideMoveNext() {
    activeSlide = document.querySelector(".slide_active");
    if (parseInt(activeSlide.getAttribute("data-num")) == slides.length) {
      nextSlide = slides[0];
      bannerNumberMove.textContent = 1;
      bannerNumberMove.style.left = "0";
    } else {
      // nextSlide = activeSlide.nextElementSibling;
      nextSlide = slides[parseInt(activeSlide.getAttribute("data-num"))];
      bannerNumberMove.textContent = parseInt(activeSlide.getAttribute("data-num")) + 1;
      bannerNumberMove.style.left = parseInt(distanceBannerNumber) * parseInt(activeSlide.getAttribute("data-num")) + "px";
    }
    
    activeSlide.classList.add("left");
    nextSlide.classList.add("left_active");
    
    activeSlide.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("slide_active");
      this.classList.remove("left");
    });
    nextSlide.addEventListener("webkitAnimationEnd", function() {
      this.classList.add("slide_active");
      this.classList.remove("left_active");
    });
  }
  
  preBtn.addEventListener("click", function() {
    document.querySelector(".banner_tool_menu").classList.remove("banner_tool_menu_appear");
    // clearInterval(autoSlide);
    autoSlide = null;
    slideMovePre();
  });
  
  function slideMovePre () {
    activeSlide = document.querySelector(".slide_active");
    if (parseInt(activeSlide.getAttribute("data-num")) == 1) {
      preSlide = slides[slides.length-1];
      bannerNumberMove.textContent = 3;
      console.log(distanceBannerNumber * slides.length);
      bannerNumberMove.style.left = distanceBannerNumber * (slides.length-1) + "px";
    } else {
      // preSlide = activeSlide.previousElementSibling;
      preSlide = slides[parseInt(activeSlide.getAttribute("data-num"))-2];
      bannerNumberMove.textContent = parseInt(activeSlide.getAttribute("data-num")) - 1;
      bannerNumberMove.style.left = parseInt(distanceBannerNumber) * (parseInt(activeSlide.getAttribute("data-num"))-2) + "px";
    }
    
    activeSlide.classList.add("right");
    preSlide.classList.add("right_active");
    
    activeSlide.addEventListener("webkitAnimationEnd", function() {
      this.classList.remove("slide_active");
      this.classList.remove("right");
    });
    preSlide.addEventListener("webkitAnimationEnd", function() {
      this.classList.add("slide_active");
      this.classList.remove("right_active");
    });
  }
  
  for(var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function() {
      
      document.querySelector(".banner_tool_menu").classList.remove("banner_tool_menu_appear");
      
      // clearInterval(autoSlide);
      autoSlide = null;
      
      numberClicked = parseInt(this.textContent);
      if (numberClicked > parseInt(bannerNumberMove.textContent)) {
        bannerNumberMove.textContent = numberClicked;
        bannerNumberMove.style.left = parseInt(distanceBannerNumber) * (numberClicked-1) + "px";
        
        activeSlide = document.querySelector(".slide_active");
        nextSlide = slides[numberClicked-1];
        activeSlide.classList.add("left");
        nextSlide.classList.add("left_active");

        activeSlide.addEventListener("webkitAnimationEnd", function() {
          this.classList.remove("slide_active");
          this.classList.remove("left");
        });
        nextSlide.addEventListener("webkitAnimationEnd", function() {
          this.classList.add("slide_active");
          this.classList.remove("left_active");
        });
      } else {
        bannerNumberMove.textContent = numberClicked;
        bannerNumberMove.style.left = parseInt(distanceBannerNumber) * (numberClicked - 1) + "px";
        
        activeSlide = document.querySelector(".slide_active");
        preSlide = slides[numberClicked-1];
        activeSlide.classList.add("right");
        preSlide.classList.add("right_active");

        activeSlide.addEventListener("webkitAnimationEnd", function() {
          this.classList.remove("slide_active");
          this.classList.remove("right");
        });
        preSlide.addEventListener("webkitAnimationEnd", function() {
          this.classList.add("slide_active");
          this.classList.remove("right_active");
        });
      }
    });
  }
  
  //Slide tool
  dragElement(document.querySelector(".banner_tool_container"));

  function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
                  pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  //Slide tool
  slideToolBtn.addEventListener("click", function() {
    document.querySelector(".banner_tool_menu").classList.toggle("banner_tool_menu_appear");
  });
  
  for(var i = 0; i < slides.length; i++) {
    slides[i].addEventListener("click", function() {
      document.querySelector(".banner_tool_menu").classList.remove("banner_tool_menu_appear");
    });
  }
  //Slide tool
  
  //Slide tool items
  for(var i = 0; i < slideToolItems.length; i++) {
    slideToolItems[i].addEventListener("click", function() {
      switch(parseInt(this.getAttribute("data-item"))) {
      case 1:
          console.log(autoSlide);
          if(autoSlide == null) {
            autoSlide = setInterval(function() {
              if (typeOfAutoSlide == "right")
                slideMoveNext();
              else
                slideMovePre();
            }, 3000);
          }
        break;
      case 2:
          typeOfAutoSlide = "left";
        break;
      case 3 :
          typeOfAutoSlide = "right";
        break;
      default:
        break;
    }
    });
  }
  //Slide tool items

});



