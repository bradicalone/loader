
/**
* @param {Object} data Information about the loader.
* @param {String} data.containerId The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles.
* @param {String} data.hasElText class name if there is a element with text
* @param {String} data.textElId class name of element if <hasElText> is true
*/
function Loading(data) {
    const { containerId, count, hasElText, textElId } = data
    const targetEl = document.getElementById(containerId)
    const text = hasElText && document.getElementById(textElId) || targetEl.childNodes[0]
    // If target element has text instead of element 
    let previousText = ''
    const fragment = document.createDocumentFragment();
    let circles = [], container;
    let progress = 0
    let animateId;

    const scaleEase = (startX, distance, progress) => (startX + (distance * Math.cos(progress * (Math.PI * 2)))).toFixed(3)
    const rubberBand = (startX, distance, progress) => (startX + (distance * Math.sin(progress * (Math.PI * 2))))

    // 2nd Gets Elements inplace and ready (Also helps for animaton rendering)
    this.initRotate = function () {
        if(text) {
            if(text.nodeType == 1) {
                text.style.display = 'none'
            } else {
                previousText = targetEl.firstChild.textContent
                targetEl.firstChild.textContent = ''
            }
        }
        
        container.style.display = 'block'
        requestAnimationFrame(this.rotateCircles)
    } 

    //4th stop animation
    this.clearRotation = function () {
        container.style.display = 'none'
        if(text) {
            if(text.nodeType == 1) {
                text.style.display = 'block'
            } else {
                targetEl.firstChild.textContent = previousText
            }
        }
        cancelAnimationFrame(animateId)  // 👈  timeout to stop animation and remove if needed
    }

    // 3rd animates circles
    this.rotateCircles = function (timestamp) {
        let index = circles.length
        progress +=.008
        while (index--) {
            const { el, x_start, x_offset, x_dist} = circles[index]
            const x = rubberBand(x_start, x_dist, progress + x_offset);
            const y = scaleEase(-3, 6, progress + x_offset);
            const scale = scaleEase(1, .3, progress + x_offset);
            const opacity = scaleEase(.8, .3, progress + x_offset)
            el.style.opacity = opacity
            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${-scale})`
        }
        animateId = requestAnimationFrame(this.rotateCircles)
    }.bind(this)

    // 1st Creates the elements and adds necessary styles on page load (Helps with animation rendering)
    const createFragment = function () {
        const style = window.getComputedStyle(targetEl);
        const extraSizing = ['padding-left', 'padding-right', 'border-left', 'border-right']
        .map((key) => parseInt(style.getPropertyValue(key), 10) || 0)
        .reduce((prev, cur) => prev + cur);

        const containerWidth = targetEl.getBoundingClientRect().width - extraSizing
        const containerHeight = targetEl.getBoundingClientRect().height 
        const circleWidth =  containerWidth / (count + 2)
        const xSpacing = (containerWidth / 2) - circleWidth / 2

        container = document.createElement('div')
        container.className = 'c-rotate'

        for (let i = 0; i <= count; i++) {
            const circle = container.appendChild(document.createElement('div'));
            circle.style.width = circleWidth + 'px'
            circle.style.height = circleWidth + 'px'

            const x_offset = i / count 

            circles.push({
                el: circle,
                x_offset,
                y_offset: 0,
                x_start: xSpacing,
                x_dist: xSpacing
            })
        }

        fragment.appendChild(container)
        container.style.top = 'calc(50% ' + '- ' + circleWidth +'px)'
        targetEl.style.height = containerHeight +'px'
        container.style.display = 'none'
        targetEl.appendChild(fragment)
    }
    createFragment()
}


