

const headerTag = document.querySelector("header")
const circleRight = document.querySelector("div.circle-right")
const circleLeft = document.querySelector("div.circle-left")
const arrow = document.querySelector("div.arrow")
const element = document.getElementsByClassName("div.rotate")
const stampsTag = document.querySelector("div.stamps")

// add stamps 



// move circles with mouse position

const moveCircle = function (tag, mouseX, mouseY){

    // get center of figure

    const circleMidX = tag.getBoundingClientRect().left
    const circleMidY = tag.getBoundingClientRect().top

    // find diff between circle and mouse

    const diffX = mouseX - circleMidX
    const diffY = mouseY - circleMidY

    // pythag

    const diff = Math.sqrt(diffX * diffX + diffY * diffY)

    // what is the capped radius

    const radius = Math.min(100, diff)

    // find angle

    const angle = Math.atan2(diffY, diffX)

    //get capped vrsion based on angle

    const cappedX = radius * Math.cos(angle)
    const cappedY = radius * Math.sin(angle)

    const circleTag = tag.querySelector("div")

    circleTag.style.left = cappedX + "px"
    circleTag.style.top = cappedY + "px"
}

document.addEventListener("mousemove", function(event){
    moveCircle(circleRight, event.pageX, event.pageY)
    moveCircle(circleLeft, event.pageX, event.pageY)
})

// move at 3s interval

let interval = null

const startInterval = function(){
    clearInterval(interval)
    interval = setInterval(() => {
        const x = Math.random() * window.innerWidth
        const y = Math.random() * window.innerHeight

        moveCircle(circleRight, x, y)
        moveCircle(circleLeft, x, y)
    }, 3000)
}

// run interval

startInterval()

// when scrolling, add opacity

const toggleHeader = function (){
    const pixels = window.scrollY

    if (pixels > 80){
        headerTag.classList.add("scrolled")
    } else {
        headerTag.classList.remove("scrolled")
    }
}

// when scrolling, add shadow box

const fadeBox = function (){
    const pixels = window.scrollY
    const alpha = Math.min(pixels / 200, 0.25)

    headerTag.style.boxShadow = `0 0 10px rgba(44, 44, 44, ${alpha})`
}

// add stamps

let number = 0
const stamps = [
    "assets/stamp-1.svg",
    "assets/stamp-2.svg",
    "assets/stamp-3.svg",
    "assets/stamp-4.svg",
    "assets/stamp-5.svg",
    "assets/stamp-6.svg",
    "assets/stamp-7.svg",
]

const addStamp = function(x, y){
    const img = document.createElement("img")
    img.setAttribute("src", stamps[number])
    img.style.left = (x - window.innerWidth / 2) + "px"
    img.style.top = y + "px"

    stampsTag.appendChild(img)

    // add audio

    const audio = document.createElement("audio")
    audio.setAttribute("src", "assets/type.mp3")
    audio.play()


    number = number + 1
    if (number > stamps.length - 1){
        number = 0
    }
}

document.addEventListener("click", function(event){
    addStamp(event.pageX, event.pageY)
})


// on scroll, run

document.addEventListener("scroll", function(){
    startInterval()
    toggleHeader()
    fadeBox()
}) 


// on load, run

toggleHeader()
fadeBox()
