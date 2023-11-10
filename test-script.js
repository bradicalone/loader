const loader = new Loading({
    containerElement: document.getElementById('btn-loader'),
    count: 8,
    hasElText: false,
    textElement: document.getElementById('loading-element'),
    circleSize: 25,
    color: '#969696',
    width: '125px'
})

document.getElementById('btn-loader').onclick = function () {
    loader.initRotate()
}
document.getElementById('btn-loader-stop').onclick = function () {
    loader.clearRotation()
}

const loaderTwo = new Loading({
    containerElement: document.getElementById('btn-loader-two'),
    count: 15,
    hasElText: true,
    textElement: document.getElementById('loading-element-two'),
    circleSize: '10px'
})

document.getElementById('btn-loader-two').onclick = function () {
    loaderTwo.initRotate()
}
document.getElementById('btn-loader-stop-two').onclick = function () {
    loaderTwo.clearRotation()
}