## Installation Instructions
* clone or download
* bring in the script and defer in the head of document. run the script.js 
* bring in the stylesheet.css
* Or use both from cdn link:
```
    <script src="https://cdn.jsdelivr.net/gh/bradicalone/loader@0.1.5/dist/index.min.js"></script> 
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bradicalone/loader@0.1.5/dist/stylesheet.css">
```
## Usage

This exposes `Loading` by default. To make it ready for use, you need to initialize the class to use it's methods:

```javascript
/**
* @param {Object} data Object of key value pairs about how you want to use the loader.
* @param {String} data.containerId The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {String} data.hasElText class name if there is a element with text
* @param {String} data.textElId class name of element if <hasElText> is true
*/
const loader = new Loading({
    containerId: 'btn-loader',
    count: 5,
    hasElText: false,
    textElId: 'loading-element'
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
* @param {Object} data Object of key value pairs about how you want to use the loader.
* @param {String} data.containerId The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {String} data.hasElText class name if there is a element with text
* @param {String} data.textElId class name of element if <hasElText> is true
*/
const loaderTwo = new Loading({
    containerId: 'btn-loader-two',
    count: 5,
    hasElText: true,
    textElId: 'loading-element-two'
})

document.getElementById('btn-loader-two').onclick = function () {
    loaderTwo.initRotate()
}
document.getElementById('btn-loader-stop-two').onclick = function () {
    loaderTwo.clearRotation()
}
```