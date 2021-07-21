import gsap from "gsap";

const animateHeader = () => {
    const tl = gsap.timeline()
    tl.to('#circle-primary', {
        clipPath: 'circle(200% at 0 0)',
        ease: 'Expo.easeInOut',
        onComplete: () => {
            tl.to('#circle-primary', {
                opacity: 0,
                display: 'none',
            })
            tl.to('body', {
                delay: .1,
                duration: 1,
                clipPath: 'circle(200% at 0 0)',
                ease: 'Expo.easeInOut'
            }, '-=.1')
            tl.from('header h6', {
                delay: .2,
                duration: 1,
                y: '-100%',
                opacity: 0,
                ease: 'Expo.easeInOut'
            }, '-=1')
            tl.from('header h1', {
                duration: 1,
                y: '-100%',
                opacity: 0,
                ease: 'Expo.easeInOut'
            }, '-=1')
            tl.from('header p', {
                duration: 1,
                y: '-100%',
                opacity: 0,
                ease: 'Expo.easeInOut'
            }, '-=1')
            tl.from('header .scroll', {
                duration: 1,
                y: '100%',
                opacity: 0,
                ease: 'Expo.easeInOut'
            }, '-=.6')
            tl.from('header nav', {
                duration: 1,
                y: '-100%',
                opacity: 0,
                ease: 'Expo.easeInOut',
            }, '-=.6')
        }
    })
}

const animateScroll = (y, minus_y, delay) => {
    gsap.to('.scroll_point', {
        delay,
        duration: 2,
        ease: "Expo.easeInOut",
        y: `${y}px`,
    })
    gsap.to('.scroll_point', {
        duration: 2,
        ease: "Expo.easeInOut",
        y: `-${minus_y}px`,
        onComplete: () => {
            animateScroll(30, 15, 0)
        }
    }, '-=1')
}

const initCursor = () => {
    document.body.addEventListener("mousemove", event => {    
        gsap.set(".cursor", {
            x: event.pageX - 12,
            y: event.pageY - 12,
            scale: 1,
        })
    })
}
const animateCursorOnHover = () => {
    const items = document.querySelectorAll('.nav_item')
    items.forEach(item => {
        item.addEventListener('mouseenter', event => {
            gsap.to(".cursor", {
                padding: '20px',
                ease: "Expo.easeInOut",
                onComplete: () => {
                    item.addEventListener('mouseleave', event => {
                        gsap.set(".cursor", {
                            padding: '10px',
                            x: event.pageX - 12,
                            y: event.pageY - 12,
                        });
                    })
                }
            });
        })
    })
}

animateScroll(15, 15, 1)
animateHeader()
initCursor()
animateCursorOnHover()