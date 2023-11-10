## Installation Instructions
* clone or download
* bring in the script and defer in the head of document. run the script.js 
* bring in the stylesheet.css
* Or use both from cdn link:
```
    <script src="https://cdn.jsdelivr.net/gh/bradicalone/loader@1.1.0/dist/index.min.js"></script> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bradicalone/loader@0.1.5/dist/stylesheet.css">
```
## Usage

This exposes `Loading` by default. To make it ready for use, you need to initialize the class to use it's methods:

```javascript
/**
* @param {Object} data Information about the loader.
* @param {HTMLElement} data.containerElement The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {Boolean} data.hasElText If there is a child element in the containerElement with text
* @param {HTMLElement} data.textElement child text element or any text element if it exists <hasElText> is true
* @param {Number|String} data.circleSize size of circle in pixels
* @param {Number|String} data.width how much width of the whole rotation in pixels
*/
const loader = new Loading({
    containerElement: document.getElementById('btn-loader'),
    count: 8,
    hasElText: false,
    textElement: document.getElementById('loading-element'),
    circleSize: 18,
    color: '#969696',
    width: '125px'
})

document.getElementById('btn-loader').onclick = function () {
    // Start the animation loader on click or possibly waiting for the page to load
    loader.initRotate()
}
document.getElementById('btn-loader-stop').onclick = function () {
    // Stop the animation loader on another click event or possibly when page is done loading
    loader.clearRotation()
}

/**
* @param {Object} data Information about the loader.
* @param {HTMLElement} data.containerElement The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {Boolean} data.hasElText If there is a child element in the containerElement with text
* @param {HTMLElement} data.textElement child text element or any text element if it exists <hasElText> is true
* @param {Number|String} data.circleSize size of circle in pixels
* @param {String} data.color color of circles
* @param {Number|String} data.width how much width of the whole rotation in pixels
*/
const loaderTwo = new Loading({
    containerElement: document.getElementById('btn-loader-two'),
    count: 6,
    hasElText: true,
    textElement: document.getElementById('loading-element-two'),
    circleSize: '2px'
})

document.getElementById('btn-loader-two').onclick = function () {
    loaderTwo.initRotate()
}
document.getElementById('btn-loader-stop-two').onclick = function () {
    loaderTwo.clearRotation()
}
```

## Playground
* Open HTML file in the browser
* Play with the constructor params `test-script.js` for each button

![Alt text](./loader-screenshot.png)
