
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

// need to store "x" value as a cookie to keep it on reload


// animating scroll behavior of anchor links

$(document).on('click', 'a[href^="#"]', function (event) {
  event.preventDefault();

  $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
  }, 250);
});

// copied from https://www.w3schools.com/howto/howto_js_collapsible.asp

// need to make .toclevel-n collapsible 
// -- by adding the "collapsible" class to it 
// -- once i get collapsiblity working, add a new cursor selector to the collapse section like this:
// -- https://css-tricks.com/almanac/properties/c/cursor/


// $("div#toc.toc ul toclevel-1").addClass("collapsible");

// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.maxHeight){
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     } 
//   });
// }


// copied from http://sebastien-roch.github.io/collapsible-list/demo.html

/**
 * A plugin targeted at a 2 levels lists DOM to collapse and search the nested lists.
 *
 * Expected html structure is as follows:
 * =======================================
 *
 * <ul id="mylist">
 *     <li class="header">Actors</li>
 *     <ul>
 *         <li>Tom Cruise</li>
 *         <li>Nicolas Cage</li>
 *     </ul>
 *     <li class="header">Producers</li>
 *     <ul>
 *         <li>Steven Spielberg</li>
 *         <li>...</li>
 *     </ul>
 * </ul>
 *
 * Usage with the previous example:
 * ================================
 *
 * $('#mylist').collapsibleList('li.header');
 *
 *
 *
 * Author: Sebastien Roch - http://github.com/sebastien-roch
 */

(function ($) {
  $.fn.collapsibleList = function (headerSelector, opts) {
      var ESCAPE_KEY = 27;
      var defaults = {
          search: false,
          animate: true
      };
      var options = $.extend(defaults, $.fn.collapsibleList.defaults, opts);

      // case insensitive "contains" selector
      jQuery.expr[':'].cicontains = function(a,i,m) {
          return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
      };

      return this.each(function () {
          var headers,
              allElements,
              searchField,
              mainUl = $(this);

          function getHeaders() {
              var headers = mainUl.find('> ' + headerSelector);
              headers.css('cursor', 'pointer');

              return headers;
          }

          function setHeadersClickHandler() {
              headers.on('click', function() {
                  toggleCollapse($(this));
              });
          }

          function hideListElements(liElems) {
              if (options.animate) {
                  return liElems.slideUp().promise();
              }
              return liElems.hide().promise();
          }

          function showListElements(liElems) {
              if (options.animate) {
                  return liElems.slideDown().promise();
              }
              return liElems.show().promise();
          }

          function collapseAllHeaders() {
              return hideListElements(allElements);
          }

          function expandAllHeaders() {
              return showListElements(allElements);
          }

          function collapseHeader(header) {
              return hideListElements(findHeadersList(header).find('> li'))
                  .done(function() {
                      header.addClass('collapsed');
                  });
          }

          function expandHeader(header) {
              return showListElements(findHeadersList(header).find('> li'))
                  .done(function() {
                      header.removeClass('collapsed');
                  });
          }

          function toggleCollapse(header) {
              return isHeaderCollapsed(header) ? expandHeader(header) : collapseHeader(header);
          }

          function isHeaderCollapsed(header) {
              return true === header.hasClass('collapsed');
          }

          function findHeadersList(header) {
              return header.next('ul, ol');
          }

          function setSearchField() {
              if (options.search === true) {
                  searchField = $('<input class="collapsible-search"/>');
              } else if (options.search instanceof jQuery) {
                  searchField = $(options.search);
              } else {
                  throw "invalid search option passed: must be true, false or a jQuery object";
              }

              searchField.on('keyup', function(e) {
                  if (e.which === ESCAPE_KEY) {
                      return quitSearch();
                  }
                  doSearch(searchField.val());
              });

              // append the field if it's not already in the DOM
              if (searchField.parents('body').length === 0) {
                  mainUl.prepend(searchField);
              }

              return searchField;
          }

          function quitSearch() {
              searchField.val('');
              doSearch('');
              searchField.blur();
          }

          function isEmptyInput(rawInput) {
              return '' === rawInput;
          }

          function doSearch(input) {
              if (isEmptyInput(input)) {
                  restoreMainListState().done(showHeaders);
                  return;
              }

              var p1 = hideListElements(allElements.filter(':not(:cicontains(' + input + '))'));
              var p2 = showListElements(allElements.filter(':cicontains(' + input + ')'));
              $.when(p1, p2).done(hideHeadersWithEmptyList);
          }

          function hideHeadersWithEmptyList() {
              headers.each(function(){
                  if ($(this).next('ul').find('li:visible').length === 0) {
                      $(this).hide();
                  } else {
                      $(this).show();
                  }
              });
          }

          function showHeaders() {
              headers.show();
          }

          function restoreMainListState() {
              var promises = [];
              headers.each(function() {
                  var header = $(this);
                  if (isHeaderCollapsed(header)) {
                      promises.push(hideListElements(findHeadersList(header).find('> li')));
                  } else {
                      // hide the list elements that matched the last search
                      promises.push(showListElements(findHeadersList(header).find('> li')));
                  }
              });

              return $.when.apply(this, promises);
          }

          function setApi() {
              mainUl.data('collapsibleList', {
                  collapseAll: collapseAllHeaders,
                  expandAll: expandAllHeaders,
              });
          }

          function init() {
              allElements = mainUl.find('> ul > li, ol > li');
              headers = getHeaders();

              setHeadersClickHandler();
              setApi();
              if (options.search !== false) {
                  setSearchField();
              }
          }

          init();
      });
  };
})(jQuery);