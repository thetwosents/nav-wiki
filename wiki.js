
// gumshoe.init({
//   selector: '#toc a',
// });

$('#toc').append('<div id="split-bar"></div>');

var min = 10;
var max = 3600;
var mainmin = 200;

$('#split-bar').mousedown(function (e) {
  e.preventDefault();
  $(document).mousemove(function (e) {
      e.preventDefault();
      var x = e.pageX - $('#toc').offset().left;
      if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {  
        $('#toc').css("width", x);
        $('#content').css("margin-left", x);
      }
  })
});
$(document).mouseup(function (e) {
  $(document).unbind('mousemove');
});

// animating scroll behavior of anchor links

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
  }, 300);
});