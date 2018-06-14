
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

// adding smooth scrolling when clicking links in the TOC

// document.querySelectorAll('.toctext').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//       e.preventDefault();

//       document.querySelector(this.getAttribute('href')).scrollIntoView({
//           behavior: 'smooth'
//       });
//   });
// });

// trying it with jquery

$('toctext').click(function () {
  $('html, body').animate({
      scrollTop: $('[toctext="' + $.attr(this, 'href').substr(1) + '"]').offset().top
  }, 500);

  return false;
});