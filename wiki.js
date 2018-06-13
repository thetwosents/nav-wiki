console.log("wiki.js test 1")

// gumshoe.init({
//   selector: '#toc a',
// });

console.log("wiki.js test 2")

// // Elements
// var el = $('h2'),
//     menu = $('.menu li'),
//     $window = $(window),
//     innerHeight = window.innerHeight;

// var navs = $('.mw-headline');

// forEach(navs, (function (nav) {
//   nav.distance = getOffsetTop(nav.target); // Each navigation target
// }));

// console.log(navs);
// console.log('Done');

// // for (var i = 0; i < array.length; i++) {
// //   console.log(array[i])
// // }

// console.log(getDocumentHeight());

// // Check if window is scrolling
// $window.scroll(function() {

//   // console.log($('.mw-headline'));
//   // console.log(innerHeight);
//   // console.log('Document',$(document).scrollTop());

//     // Check if element is in view

//       // Get element text

//       // Find exact text in menu var

//       // Remove class from previous element

//       // Add class to element in menu

//       // If class is on element currently, return from function

// });

// function getDocumentHeight() {
//   return Math.max(
//     document.body.scrollHeight, document.documentElement.scrollHeight,
//     document.body.offsetHeight, document.documentElement.offsetHeight,
//     document.body.clientHeight, document.documentElement.clientHeight
//   );
// };

// function getOffsetTop(elem) {
//   console.log(elem);
//   var location = 0;
//   if (elem.offsetParent) {
//     do {
//       location += elem.offsetTop;
//       elem = elem.offsetParent;
//     } while (elem);
//   } else {
//     location = elem.offsetTop;
//   }
//   return location >= 0 ? location : 0;
// };

// function sortNavs() {
//   navs.sort( (function (a, b) {
//     if (a.distance > b.distance) {
//       return -1;
//     }
//     if (a.distance < b.distance) {
//       return 1;
//     }
//     return 0;
//   }));
// };

// function forEach( collection, callback, scope ) {
//   if ( Object.prototype.toString.call( collection ) === '[object Object]' ) {
//     for ( var prop in collection ) {
//       if ( Object.prototype.hasOwnProperty.call( collection, prop ) ) {
//         callback.call( scope, collection[prop], prop, collection );
//       }
//     }
//   } else {
//     for ( var i = 0, len = collection.length; i < len; i++ ) {
//       callback.call( scope, collection[i], i, collection );
//     }
//   }
// };

// function getNavs() {

//     // Get all navigation links
//     var navLinks = document.querySelectorAll( settings.selector );

//     // For each link, create an object of attributes and push to an array
//     forEach( navLinks, (function (nav) {
//       if ( !nav.hash ) return;
//       var target = document.querySelector( nav.hash );
//       if ( !target ) return;
//       navs.push({
//         nav: nav,
//         target: target,
//         parent: nav.parentNode.tagName.toLowerCase() === 'li' ? nav.parentNode : null,
//         distance: 0
//       });
//     }));

//   };



// moving the TOC (1) the NavBox (2) and the Body (3) around with jquery
// (1) and (2) to be stacked in a left column
// (3) to fill the right column
// separator to be adjustable 


console.log("wiki.js test 3")

function NewColumns () {

  var LeftColumn = document.createElement('LeftColumn');
  var RightColumn = document.createElement('RightColumn');

}

console.log("wiki.js test 4")

// unsure if jquery stuff goes in the jquery.js file, or if they can live here

jQuery("#TOC").detach().appendTo('LeftColumn')

jQuery("#NavBox").detach().appendTo('LeftColumn')
