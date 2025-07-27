function firstPageAnim() {
    var tl = gsap.timeline();

    gsap.set(".bounding1, .bounding2, .bounding3", {
        y: "100%"
    });

    tl.from("#nav", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        ease: "Expo.easeInOut"
    })
    .to(".bounding1, .bounding2, .bounding3", {
        y: 0,
        ease: "Expo.easeInOut",
        duration: 1.5,
        delay: -1,
        stagger: 0.2
    })
    .from("#footer", {
        y: 10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: "Expo.easeInOut"
    });
}

function cursorEffect() {
    const cursor = document.querySelector("#minicircle");
    if (!cursor) return;

    let xprev = 0;
    let yprev = 0;
    
    window.addEventListener("mousemove", function (e) {
        const xscale = gsap.utils.clamp(0.7, 1.3, (e.clientX - xprev) * 0.2);
        const yscale = gsap.utils.clamp(0.7, 1.3, (e.clientY - yprev) * 0.2);

        xprev = e.clientX;
        yprev = e.clientY;

        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            scaleX: xscale,
            scaleY: yscale,
            duration: 0.5,
            ease: "power1.out",
        });
    });
}

document.querySelectorAll(".elem").forEach(function (elem) {
    let rot = 0;
    let diffrot = 0;

    elem.addEventListener("mousemove", function (dets) {
        var rect = elem.getBoundingClientRect();
        var diff = dets.clientY - rect.top;

        diffrot = dets.clientX - rot;
        rot = dets.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: "power3", 
            duration: 0.5,  
            top: diff,
            left: dets.clientX,
            rotation: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });


    elem.addEventListener("mouseleave", function () {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.5,
        });
    });
});

function updateClock() {
    var clockElement = document.getElementById("realtimeclock");
    if (!clockElement) return;

    var now = new Date();
    var timeString = now.toLocaleTimeString();
    clockElement.textContent = timeString;
}

firstPageAnim();
cursorEffect();
setInterval(updateClock, 1000);
updateClock();
