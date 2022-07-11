"use strict";

/**
* @param {Object} data Information about the loader.
* @param {String} data.containerId The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {String} data.hasElText class name if there is a element with text
* @param {String} data.textElId class name of element if <hasElText> is true
*/
function Loading(data) {
  var containerId = data.containerId,
      count = data.count,
      hasElText = data.hasElText,
      textElId = data.textElId;
  var targetEl = document.getElementById(containerId);
  var text = hasElText && document.getElementById(textElId) || targetEl.childNodes[0]; // If target element has text instead of element 

  var previousText = '';
  var fragment = document.createDocumentFragment();
  var circles = [],
      container;
  var progress = 0;
  var animateId;

  var scaleEase = function scaleEase(startX, distance, progress) {
    return (startX + distance * Math.cos(progress * (Math.PI * 2))).toFixed(3);
  };

  var rubberBand = function rubberBand(startX, distance, progress) {
    return startX + distance * Math.sin(progress * (Math.PI * 2));
  }; // 2nd Gets Elements inplace and ready (Also helps for animaton rendering)


  this.initRotate = function () {
    if (text) {
      if (text.nodeType == 1) {
        text.style.display = 'none';
      } else {
        previousText = targetEl.firstChild.textContent;
        targetEl.firstChild.textContent = '';
      }
    }

    container.style.display = 'block';
    requestAnimationFrame(this.rotateCircles);
  }; //4th stop animation


  this.clearRotation = function () {
    container.style.display = 'none';

    if (text) {
      if (text.nodeType == 1) {
        text.style.display = 'block';
      } else {
        targetEl.firstChild.textContent = previousText;
      }
    }

    cancelAnimationFrame(animateId); // 👈  timeout to stop animation and remove if needed
  }; // 3rd animates circles


  this.rotateCircles = function (timestamp) {
    var index = circles.length;
    progress += .008;

    while (index--) {
      var _circles$index = circles[index],
          el = _circles$index.el,
          x_start = _circles$index.x_start,
          x_offset = _circles$index.x_offset,
          x_dist = _circles$index.x_dist;
      var x = rubberBand(x_start, x_dist, progress + x_offset);
      var y = scaleEase(-3, 6, progress + x_offset);
      var scale = scaleEase(1, .3, progress + x_offset);
      var opacity = scaleEase(.8, .3, progress + x_offset);
      el.style.opacity = opacity;
      el.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0) scale(").concat(-scale, ")");
    }

    animateId = requestAnimationFrame(this.rotateCircles);
  }.bind(this); // 1st Creates the elements and adds necessary styles on page load (Helps with animation rendering)


  var createFragment = function createFragment() {
    var style = window.getComputedStyle(targetEl);
    var extraSizing = ['padding-left', 'padding-right', 'border-left', 'border-right'].map(function (key) {
      return parseInt(style.getPropertyValue(key), 10) || 0;
    }).reduce(function (prev, cur) {
      return prev + cur;
    });
    var containerWidth = targetEl.getBoundingClientRect().width - extraSizing;
    var containerHeight = targetEl.getBoundingClientRect().height;
    var circleWidth = containerWidth / (count + 2);
    var xSpacing = containerWidth / 2 - circleWidth / 2;
    container = document.createElement('div');
    container.className = 'c-rotate';

    for (var i = 0; i <= count; i++) {
      var circle = container.appendChild(document.createElement('div'));
      circle.style.width = circleWidth + 'px';
      circle.style.height = circleWidth + 'px';
      var x_offset = i / count;
      circles.push({
        el: circle,
        x_offset: x_offset,
        y_offset: 0,
        x_start: xSpacing,
        x_dist: xSpacing
      });
    }

    fragment.appendChild(container);
    container.style.top = 'calc(50% ' + '- ' + circleWidth + 'px)';
    targetEl.style.height = containerHeight + 'px';
    container.style.display = 'none';
    targetEl.appendChild(fragment);
  };

  createFragment();
}
