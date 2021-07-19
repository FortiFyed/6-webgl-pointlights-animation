import gsap from "gsap";

const animateHeader = () => {
    const tl = gsap.timeline()
    tl.from('header h1', {
        duration: 1,
        y: '-100%',
        opacity: 0,
        ease: 'Expo.easeInOut'
    })
}

animateHeader()