// based on https://dribbble.com/shots/3913847-404-page
window.onload = function getBody () {
    const pageY = document.body.clientHeight
    const pageX = document.body.clientWidth
    let mouseY = 0
    let mouseX = 0
    document.body.addEventListener('mouseover', function (event) {
        mouseY = event.pageY
        const yAxis = ((pageY / 2 - mouseY) / pageY) * 300
        // horizontalAxis
        mouseX = event.pageX / -pageX
        const xAxis = -mouseX * 100 - 100
        document.getElementsByClassName('box__ghost-eyes')[0].style.transform = 'translate(' + xAxis + '%,-' + yAxis + '%)'
    })
}
