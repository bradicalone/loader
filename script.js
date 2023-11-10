
/**
* @param {Object} data Information about the loader.
* @param {HTMLElement} data.containerElement The element id of the loader cirlces is going to be in
* @param {number} data.count how many rotated circles. | defualt: 5
* @param {Number|String} data.circleSize size of circle in pixels | default: half target container devided by count
* @param {String} data.color color of circles | default: black
* @param {Number|String} data.width how much width of the whole rotation in pixels | default: half width of target container
*/
function Loading(data) {
    const { containerElement, count=5, circleSize, color, width } = data
    this.size = (Number(circleSize) || Number(circleSize?.replace(/[^0-9]/g, ''))) || containerElement.offsetWidth / 2 / count
    this.width = (Number(width) || Number(width?.replace(/[^0-9]/g, ''))) || containerElement.offsetWidth / 2
    const targetEl = containerElement
    const targetChildren = Array.from(targetEl?.childNodes)
    const fragment = document.createDocumentFragment();
    const scaleDifference = .5 // Size of the circle scaling down to
    // If target element has text instead of element 
    let previousText = ''
    let progress = 0
    let circles = [], container, animateId;
    
    const scaleEase = (startX, distance, progress) => (startX + (distance * Math.cos(progress * (Math.PI * 2)))).toFixed(3)
    const rubberBand = (startX, distance, progress) => (startX + (distance * Math.sin(progress * (Math.PI * 2))))
    
    // 2nd Gets Elements inplace and ready (Also helps for animaton rendering)
    this.initRotate = function () {
        if(targetChildren) {
            targetChildren.forEach(el => {
                if(el.nodeType == 1) {
                    el.style.display = 'none'
                } else {
                    previousText = el.textContent
                    el.textContent = ''
                }
            })
        }
        container.style.display = 'block'
        requestAnimationFrame(this.rotateCircles)
    } 

    //4th stop animation
    this.clearRotation = function () {
        container.style.display = 'none'
        if(targetChildren) {
            targetChildren.forEach(el => {
                if(el.nodeType == 1) {
                    el.style.display = null
                } else {
                    el.textContent = previousText
                }
            })
        }
        cancelAnimationFrame(animateId)  // 👈  timeout to stop animation and remove if needed
    }

    // 3rd animates circles
    this.rotateCircles = function (timestamp) {
        let index = circles.length
        progress +=.009
        while (index--) {
            const { el, x_start, y_start, y_dist, x_offset, x_dist} = circles[index]
            const x = rubberBand(x_start, x_dist, progress + x_offset);
            const y = scaleEase(y_start, y_dist, progress + x_offset); // 👈  Current
            const scale = scaleEase(1, scaleDifference, progress + x_offset);
            const opacity = scaleEase(1, .8, progress + x_offset)
            el.style.opacity = opacity
            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${-scale})`
        }
        animateId = requestAnimationFrame(this.rotateCircles)
    }.bind(this)

    // 1st Creates the elements and adds necessary styles on page load (Helps with animation rendering)
    const createFragment = () => {
        const style = window.getComputedStyle(targetEl);
        const extraSizingWidth = ['padding-left', 'padding-right', 'border-left', 'border-right']
        .map((key) => parseInt(style.getPropertyValue(key), 10) || 0)
        .reduce((prev, cur) => prev + cur);

        const extraSizingHeight = ['border-top', 'border-bottom']
        .map((key) => parseInt(style.getPropertyValue(key), 10) || 0)
        .reduce((prev, cur) => prev + cur);

        const containerWidth = targetEl.getBoundingClientRect().width - extraSizingWidth
        const targetContainerHeight = targetEl.getBoundingClientRect().height 
        const circleWidth =  this.size || containerWidth / (count + 2)

        const halfHeight = targetContainerHeight/2 
        const xSpacing = (this.width / 2) - circleWidth / 2 
        const xStart = xSpacing + (containerWidth - this.width) / 2
        const y_offset = (targetContainerHeight - circleWidth * 2) / 2
        const y_start = circleWidth * scaleDifference/2
        container = document.createElement('div')
        container.className = 'c-rotate'

        for (let i = 0; i <= count; i++) {
            const circle = container.appendChild(document.createElement('div'));
            circle.style.width = circleWidth + 'px'
            circle.style.height = circleWidth + 'px'
            circle.style.background = color
            const x_offset = i / count 
 
            circles.push({
                el: circle,
                x_offset,
                y_start,
                y_dist: circleWidth/2,
                x_start: xStart,
                x_dist: xSpacing
            })
        }
        fragment.appendChild(container)
        container.style.top = 'calc(50% ' + '+ ' + y_offset +'px)'
        container.style.height = targetContainerHeight +'px'
        targetEl.style.height = targetContainerHeight +'px'
        container.style.display = 'none'
        targetEl.appendChild(fragment)
    }
    createFragment()
}


