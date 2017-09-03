$(document).ready(function () {
    /*** Variables ***/
    var running = false,
        t,
        countdown,
        timer,
        minute,
        second;
    /*** Plus-Minus Buttons ***/

    /*** Break ***/
    $("#break .minus").click(function () {
        $("#blength").text(function () {
            var br = eval($("#blength").text());
            if (br > 1 && running == false) br--;
            return br;
        });
        if ($("#title").text() == "BREAK" && running == false) {
            bar.setText($("#blength").text());
            bar.animate(1.0, { duration: 100 });
        }
    });
    $("#break .plus").click(function () {
        $("#blength").text(function () {
            var br = eval($("#blength").text());
            if (running == false) br++;
            return br;
        });
        if ($("#title").text() == "BREAK" && running == false) {
            bar.setText($("#blength").text());
            bar.animate(1.0, { duration: 100 });
        }
    });
    /*** Session ***/
    $("#session .minus").click(function () {
        $("#slength").text(function () {
            var se = eval($("#slength").text());
            if (se > 1 && running == false) se--;
            return se;
        });
        if (running == false && $("#title").text() == "SESSION") {
            bar.setText($("#slength").text());
            bar.animate(0.0, { duration: 100 });
        }        
    });
    $("#session .plus").click(function () {
        $("#slength").text(function () {
            var se = eval($("#slength").text());
            if (running == false) se++;
            return se;
        });
        if (running == false && $("#title").text() == "SESSION") {
            bar.setText($("#slength").text());
            bar.animate(0.0, { duration: 100 });
        }        
    });
    /*** Clock  ***/
    function prep() {
        if ($(".progressbar-text").text().indexOf(":") == -1) {
            countdown = eval($(".progressbar-text").text());
            bar.setText(countdown + " : " + "00");
        }
        timer = $(".progressbar-text").text().split(":");
        minute = eval(timer[0]);
        second = eval(timer[1]);
    }
    $("#clock").click(function () {
        clearInterval(t);
        running = !running;
        if (!running) {
            bar.stop();
            return
        };
        if ($(".progressbar-text").text() == "0 : 00") {
            if ($("#title").text() == "SESSION") {
                $("#title").text("BREAK");
                bar.setText($("#blength").text());
            } else {
                $("#title").text("SESSION");
                bar.setText($("#slength").text());
            }
        }
        prep();
        t = setInterval(function () {
            if ($("#title").text() == "SESSION") {
                bar.animate(1.0, { duration: minute * 60000 + second * 1000 - 1000 }, function () {
                    bar.animate(0.0, { duration: minute * 60000 + second * 1000 - 1000 });
                }); // Number from 0.0 to 1.0
            }
            else if ($("#title").text() == "BREAK") {
                bar.animate(0.0, { duration: minute * 60000 + second * 1000 - 1000 }, function () {
                    bar.animate(1.0, { duration: minute * 60000 + second * 1000 - 1000 });
                }); // Number from 0.0 to 1.0
            }
            if (second == 0) {
                --minute;
                second = 60;
            }
            second = second > 0 ? --second : second;
            second = second < 10 ? "0" + second : second;
            bar.setText(minute + " : " + second);
            running = true;
            if ($(".progressbar-text").text() == "0 : 00") {
                if ($("#title").text() == "SESSION") {
                    $("#title").text("BREAK");
                    bar.setText($("#blength").text());
                    prep();
                } else {
                    $("#title").text("SESSION");
                    bar.setText($("#slength").text());
                    prep();
                }
            }
        }, 1000);
    });
    var bar = new ProgressBar.Circle(clock, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'linear',
        duration: 0,
        text: {
            autoStyleContainer: false,
            value: "25"
        },
        from: { color: '#6666ff', width: 2 },
        to: { color: '#0d093c', width: 4 },
        // Set default step function for all animate calls
        step: function (state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);
            var value = $(".progressbar-text").text();
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value);
            }
        }
    });
    bar.text.style.fontFamily = 'Keania One';
    bar.text.style.fontSize = '2.5rem';
});
