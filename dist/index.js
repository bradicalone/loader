"use strict";

/**
* @param {Object} data Information about the loader.
* @param {HTMLElement} data.containerElement The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {Boolean} data.hasElText If there is a child element in the containerElement with text
* @param {HTMLElement} data.textElement child text element or any text element if it exists
* @param {Number|String} data.circleSize size of circle in pixels
* @param {String} data.color color of circles
* @param {Number|String} data.width how much width of the whole rotation in pixels
*/
function Loading(data) {
  var _this = this;

  var containerElement = data.containerElement,
      count = data.count,
      hasElText = data.hasElText,
      textElement = data.textElement,
      circleSize = data.circleSize,
      color = data.color,
      width = data.width;
  this.size = Number(circleSize) || Number(circleSize === null || circleSize === void 0 ? void 0 : circleSize.replace(/[^0-9]/g, '')) || containerElement.offsetWidth / 2 / count;
  this.width = Number(width) || Number(width === null || width === void 0 ? void 0 : width.replace(/[^0-9]/g, '')) || containerElement.offsetWidth / 2;
  var targetEl = containerElement;
  var text = hasElText && textElement || (targetEl === null || targetEl === void 0 ? void 0 : targetEl.childNodes[0]);
  var fragment = document.createDocumentFragment();
  var scaleDifference = .5; // Size of the circle scaling down to
  // If target element has text instead of element 

  var previousText = '';
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
    progress += .009;

    while (index--) {
      var _circles$index = circles[index],
          el = _circles$index.el,
          x_start = _circles$index.x_start,
          y_start = _circles$index.y_start,
          y_dist = _circles$index.y_dist,
          x_offset = _circles$index.x_offset,
          x_dist = _circles$index.x_dist;
      var x = rubberBand(x_start, x_dist, progress + x_offset);
      var y = scaleEase(y_start, y_dist, progress + x_offset); // 👈  Current

      var scale = scaleEase(1, scaleDifference, progress + x_offset);
      var opacity = scaleEase(1, .8, progress + x_offset);
      el.style.opacity = opacity;
      el.style.transform = "translate3d(".concat(x, "px, ").concat(y, "px, 0) scale(").concat(-scale, ")");
    }

    animateId = requestAnimationFrame(this.rotateCircles);
  }.bind(this); // 1st Creates the elements and adds necessary styles on page load (Helps with animation rendering)


  var createFragment = function createFragment() {
    var style = window.getComputedStyle(targetEl);
    var extraSizingWidth = ['padding-left', 'padding-right', 'border-left', 'border-right'].map(function (key) {
      return parseInt(style.getPropertyValue(key), 10) || 0;
    }).reduce(function (prev, cur) {
      return prev + cur;
    });
    var extraSizingHeight = ['border-top', 'border-bottom'].map(function (key) {
      return parseInt(style.getPropertyValue(key), 10) || 0;
    }).reduce(function (prev, cur) {
      return prev + cur;
    });
    var containerWidth = targetEl.getBoundingClientRect().width - extraSizingWidth;
    var targetContainerHeight = targetEl.getBoundingClientRect().height;
    var circleWidth = _this.size || containerWidth / (count + 2);
    var halfHeight = targetContainerHeight / 2;
    var xSpacing = _this.width / 2 - circleWidth / 2;
    var xStart = xSpacing + (containerWidth - _this.width) / 2;
    var y_offset = (targetContainerHeight - circleWidth * 2) / 2;
    var y_start = circleWidth * scaleDifference / 2;
    container = document.createElement('div');
    container.className = 'c-rotate';

    for (var i = 0; i <= count; i++) {
      var circle = container.appendChild(document.createElement('div'));
      circle.style.width = circleWidth + 'px';
      circle.style.height = circleWidth + 'px';
      circle.style.background = color;
      var x_offset = i / count;
      circles.push({
        el: circle,
        x_offset: x_offset,
        y_start: y_start,
        y_dist: circleWidth / 2,
        x_start: xStart,
        x_dist: xSpacing
      });
    }

    fragment.appendChild(container);
    container.style.top = 'calc(50% ' + '+ ' + y_offset + 'px)';
    container.style.height = targetContainerHeight + 'px';
    targetEl.style.height = targetContainerHeight + 'px';
    container.style.display = 'none';
    targetEl.appendChild(fragment);
  };

  createFragment();
}
