let curDown = false;
let startx = 0;
let diffx = 0;
let el;

$(document).ready(function() {
    el = document.getElementById("category");

    $(".category").mousemove(function(e) {
        if (curDown) {
            diffx = startx - (e.clientX + el.scrollLeft);
            el.scrollLeft += diffx;
        }
    });
    $(".category").mousedown(function(e) {
        curDown = true;
        e.preventDefault();
        startx = e.clientX + el.scrollLeft;
        diffx = 0;
    });
    $(".category").mouseup(function(e) {
        curDown = false;
        if (!e) {
            e = window.event;
        }
        let start = 1,
            animate = function() {
                var step = Math.sin(start);
                if (step <= 0) {
                    window.cancelAnimationFrame(0);
                } else {
                    el.scrollLeft += diffx * step;
                    start -= 0.02;
                    window.requestAnimationFrame(animate);
                }
            };
        animate();
    });
});