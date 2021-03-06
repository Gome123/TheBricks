//sweet alert
function sweet() {
    Swal.fire({
        title: 'ABOUT ME',
        html: '<p>Jani Gomezel</p>' +
            '<p>Šol. Leto 2020/21</p>' +
            '<p>Razred 4. Ra</p>',
        customClass: 'swal',
        showConfirmButton: false
    })

}

function startSweet() {
    Swal.fire({
        title: 'WELCOME!',
        html: '<p>Use left/right arrow key to move.</p>' +
            '<p>You start the game by pressing the up arrow key.</p>',
        customClass: 'swal',
        showConfirmButton: false
    })
}

var swt = true;
function drawIt() {
    if (swt)
        startSweet();
    swt = false;
    //crack
    var crackimg = document.getElementById("crack");
    var crackimg2 = document.getElementById("crack2");
    //button
    var gumb = document.getElementById('reset');
    gumb.style.visibility = 'hidden';
    //<p>
    var highScore = document.getElementById('highScore');
    var gameover = document.getElementById('konec');
    //canvas
    var canvas = document.getElementById('igra');
    var ctx = canvas.getContext('2d');
    var lifeCan = document.getElementById('lifeCan');
    var ctd = lifeCan.getContext('2d');
    var sirinaCan = canvas.width;
    canvas.height = sirinaCan / 16 * 9;
    var visinaCan = canvas.height;
    //plošček
    var right = false;
    var left = false;
    var sirina = 100;
    var visina = 11;
    var x2 = sirinaCan / 2 - sirina / 2;
    var dx2 = 6;
    //žoga 
    var r = 10;
    var x;
    var y;
    var dx = 0;
    var dy = -4;
    //opeke
    var vrsta = 4;
    var stolpec = 15;
    var padding = 5;
    var brickHeight = 20;
    var brickhWidth = sirinaCan / stolpec + padding;
    var bricks = new Array(vrsta);
    var crack = new Array(vrsta);
    var i;
    var j;
    localStorage.setItem('score', 0);
    //čas
    var sekundeI;
    var minuteI;
    var sekunde = 0;
    var izpisTimer = "00:00";
    var intervalTimer;
    var time = false;
    //gameplay
    var x = 0;
    var score = 0;
    var vseTocke = 0;
    var up = true;
    var life = 3;
    var refreshInterval;
    var rowheight = brickHeight + padding * 2;
    var colwidth = brickhWidth + padding;
    gameover.style.display = 'none';
    //inicializacija opek
    for (i = 0; i < vrsta; i++) {
        bricks[i] = new Array(stolpec);
        crack[i] = new Array(stolpec);
        for (j = 0; j < stolpec; j++) {
            crack[i][j] = 0;
            if (i > 1) {
                bricks[i][j] = 1;
                vseTocke++;
            } else if (i == 1) {
                bricks[i][j] = 2;
                vseTocke = vseTocke + 2;
            } else if (i == 0) {
                bricks[i][j] = 3;
                vseTocke = vseTocke + 3;
            }
        }
    }
    //čas
    function timer() {
        if (time) {
            sekunde++;
            sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
            minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
            izpisTimer = minuteI + ":" + sekundeI;
        }
        cas.innerHTML = "Time:" + izpisTimer;
    }
    //reset
    this.reset = function () {
        gumb.style.visibility = 'hidden';
        score = 0;
        life = 3;
        x2 = sirinaCan / 2 - sirina / 2;
        x = x2 + sirina / 2 - r / 2;
        y = visinaCan - visina - r - 2;
        for (i = 0; i < vrsta; i++) {
            bricks[i] = new Array(stolpec);
            for (j = 0; j < stolpec; j++) {
                if (i > 1)
                    bricks[i][j] = 1;
                else if (i == 1)
                    bricks[i][j] = 2;
                else if (i == 0)
                    bricks[i][j] = 3;
            }
        }
    }

    function draw() {
        //žoga
        if (up) {
            x = x2 + sirina / 2 - r / 2;
            y = visinaCan - visina - r - 2;
        }
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.clearRect(0, 0, sirinaCan, visinaCan);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        //plošček
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.beginPath();
        ctx.rect(x2, visinaCan - visina, sirina, visina);
        ctx.closePath();
        ctx.fill();
        //točke
        point.innerHTML = "Score:" + score;
        point.style.width = 125 + 'px';
        //risanje opek
        for (i = 0; i < bricks.length; i++) {
            for (j = 0; j < bricks[i].length - 2; j++) {
                if (bricks[i][j] != 0) {
                    ctx.fillStyle = "#006FE2";
                    ctx.beginPath();
                    ctx.rect(j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                    ctx.closePath();
                    ctx.fill();
                    cracked();
                }
            }
        }
        //life
        var srce = document.getElementById("life");
        var broken = document.getElementById("broken");
        switch (life) {
            case 0:
                ctd.beginPath();
                ctd.clearRect(0, 0, 200, 200);
                ctd.drawImage(broken, 0, 0, 50, 50);
                ctd.drawImage(broken, 55, 0, 50, 50);
                ctd.drawImage(broken, 110, 0, 50, 50);
                ctd.closePath();
                ctd.fill();
                break;
            case 1:
                ctd.beginPath();
                ctd.clearRect(0, 0, 200, 200);
                ctd.drawImage(srce, 0, 0, 50, 50);
                ctd.drawImage(broken, 55, 0, 50, 50);
                ctd.drawImage(broken, 110, 0, 50, 50);
                ctd.closePath();
                ctd.fill();
                break;
            case 2:
                ctd.beginPath();
                ctd.clearRect(0, 0, 200, 200);
                ctd.drawImage(srce, 0, 0, 50, 50);
                ctd.drawImage(srce, 55, 0, 50, 50);
                ctd.drawImage(broken, 110, 0, 50, 50);
                ctd.closePath();
                ctd.fill();
                break;
            case 3:
                ctd.beginPath();
                ctd.clearRect(0, 0, 200, 200);
                ctd.drawImage(srce, 0, 0, 50, 50);
                ctd.drawImage(srce, 55, 0, 50, 50);
                ctd.drawImage(srce, 110, 0, 50, 50);
                ctd.closePath();
                ctd.fill();
                break;
            default:
                ctd.clearRect(0, 0, 200, 200);
                break;
        }
    }

    function konec(niz) {
        //ustavljanje
        gumb.style.visibility = 'visible';
        time = false;
        clearInterval(intervalTimer);
        clearInterval(refreshInterval);
        //game over animacija
        if (niz == 'gameOver') {
            gameover.innerHTML = 'GAME OVER';
            gameover.style.display = 'block';
            gameover.style.animation = 'fadein 1s';
            gameover.style.marginTop = ((-visinaCan / 2) - gameover.clientHeight / 3) + 20 + 'px';
            gameover.style.marginLeft = ((canvas.offsetLeft + sirinaCan / 2) - gameover.clientWidth / 2) + 'px';
        } else if (niz == 'youWin') {
            gameover.innerHTML = 'YOU WIN';
            gameover.style.display = 'block';
            gameover.style.animation = 'fadein 1s';
            gameover.style.marginTop = ((-visinaCan / 2) - gameover.clientHeight / 3) + 20 + 'px';
            gameover.style.marginLeft = ((canvas.offsetLeft + sirinaCan / 2) - gameover.clientWidth / 2) + 'px';
        }
        //local storage
        if (localStorage.getItem('score') < score) {
            localStorage.setItem('score', score);
            highScore.innerHTML = "High Score:" + score;
        }
    }

    function move() {
        draw();
        //konec igre
        if (score >= vseTocke) {
            konec('youWin');
        }
        //odboj od roba
        if (life > 0) {
            if (y <= 0 + r)
                dy = dy * (-1);
            else if (x >= sirinaCan - r || x <= 0 + r) {
                if (x < 0 + r - dx) {
                    x = 0 + r;
                }
                else if (x > sirinaCan - r + dx) {
                    x = sirinaCan - r;
                }
                dx = dx * (-1);
            }
            else if (y > visinaCan - r) {
                life--;
                dy = dy * (-1);
            }
        } else {
            konec('gameOver');
        }
        //tipkovnica
        document.addEventListener('keydown', function (event) {
            if (event.keyCode == 37) {
                left = true;
            } else if (event.keyCode == 39) {
                right = true;
            } else if (event.keyCode == 38 && up) {
                up = false;
            }
        });
        document.addEventListener('keyup', function (event) {
            if (event.keyCode == 37)
                left = false;
            else if (event.keyCode == 39)
                right = false;
        });
        if (right && x2 < sirinaCan - sirina)
            x2 = x2 + dx2;
        else if (left && x2 > 0)
            x2 = x2 - dx2;
        //odboj od ploščka
        if (x - r >= x2 && x <= x2 + sirina && y >= visinaCan - visina - r && y < visinaCan) {
            dx = 8 * ((x - (x2 + sirina / 2)) / sirina);
            dy = -dy;
        }
        //odboj od opeke
        i = Math.floor(y / rowheight);
        j = Math.floor(x / colwidth);
        if (y <= vrsta * rowheight && i >= 0 && j >= 0 && bricks[i][j] > 0) {
            dy = -dy;
            bricks[i][j] = bricks[i][j] - 1;
            score++;
            crack[i][j]++;
        }
        //start
        if (up) { } else {
            time = true;
            x += dx;
            y += dy;
        }
    }

    function cracked() {
        switch (crack[i][j]) {
            case 1:
                ctx.beginPath();
                ctx.drawImage(crackimg, j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                ctx.closePath();
                break;
            case 2:
                ctx.beginPath();
                ctx.drawImage(crackimg, j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                ctx.drawImage(crackimg2, j * (brickhWidth + padding) + padding, i * (brickHeight + padding) + padding, brickhWidth, brickHeight);
                ctx.closePath();
                break;
            default:
                break;
        }
    }
    intervalTimer = setInterval(timer, 1000);
    refreshInterval = setInterval(move, 10);
}