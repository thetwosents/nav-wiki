
// gumshoe.init({
//   selector: '#toc a',
// });

// making the sidebar adjustable

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


// copied from https://www.w3schools.com/howto/howto_js_collapsible.asp

// need to make .toclevel-n collapsible 
// -- by adding the "collapsible" class to it 

$("toc").click(function(){
  $("li").addClass("collapsible");
});

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
