//当たり判定
function hit(typ,x7,y7,dir,extra){
    let type = typ;
    if(muteki == true)return 0;
    let raddir = dir / 180 * Math.PI; 
    let px = playerX + 16;
    let py = playerY + 33;
    let phit = 3;
    if(type == 9){
        let a = [3,1,4,5,6,7,8];
        type = a[extra];
    }
    switch(type){
        case 1:
        case 4:
        case 5:
        case 8:
            switch(type){
                case 1:
                case 4:
                case 5:
                    var w = 4;
                    var h = 10.5;
                    break;
                case 8:
                    var w = 10;
                    var h = 10;
                    break;
            }
            //1.軸変更
                //0を設定
                var nx0 = x7;
                var ny0 = y7;
                //プレイヤー中心を定義
                var nxp = px - nx0;
                var nyp = ny0 - py;
                //回転処理
                var nxp2 = nxp * Math.cos(raddir) - nyp * Math.sin(raddir);
                var nyp2 = nxp * Math.sin(raddir) + nyp * Math.cos(raddir);
            //2.判定
                if((h > (Math.abs(nyp2) - phit)) && (w > (Math.abs(nxp2) - phit))){
                    scene = 4;
                }
            break;
        case 2:
        case 3:
            var bx = x7 + 8;
            var by = y7 + 8;
            var x2 = Math.abs(px - bx);
            var y2 = Math.abs(py - by);
            var check = Math.sqrt(x2 ** 2 + y2 ** 2);
            var min = phit + 13;
            if(check < min){
                scene = 4;
            }
            break;
        case 6:
        case 7:
            var bx = x7 + 10;
            var by = y7 + 10;
            var x2 = Math.abs(px - bx);
            var y2 = Math.abs(py - by);
            var check = Math.sqrt(x2 ** 2 + y2 ** 2);
            var min = phit + 5;
            if(check < min){
                scene = 4;
            }
    }
}
//音楽
/*キー設定開始*/
    const keyEnter = 13;
    const keyShift = 16;
    const keyCtrl = 17;
    const keyAlt = 18;
    const keyEsc = 27;
    const keySpace = 32;
    const key0 = 48;
    const key1 = 49;
    const key2 = 50;
    const key3 = 51;
    const key4 = 52;
    const key5 = 53;
    const key6 = 54;
    const key7 = 55;
    const key8 = 56;
    const key9 = 57;
    const keyA = 65;
    const keyB = 66;
    const keyC = 67;
    const keyD = 68;
    const keyE = 69;
    const keyF = 70;
    const keyG = 71;
    const keyH = 72;
    const keyI = 73;
    const keyJ = 74;
    const keyK = 75;
    const keyL = 76;
    const keyM = 77;
    const keyN = 78;
    const keyO = 79;
    const keyP = 80;
    const keyQ = 81;
    const keyR = 82;
    const keyS = 83;
    const keyT = 84;
    const keyU = 85;
    const keyV = 86;
    const keyW = 87;
    const keyX = 88;
    const keyY = 89;
    const keyZ = 90;
    const keyLeft = 37;
    const keyUp = 38;
    const keyRight = 39;
    const keyDown = 40;
/*キー設定終了*/
function reset(){
    //windowオブジェクトを用いた関数内からのグローバル変数の宣言
    window.muteki = false;
    window.scene3count1 = 0;
    window.playerX = 300;
    window.playerY = 660;
    window.playerSpeed = 5;
    window.enemyX = 300;
    window.enemyY = 110;
    window.standX = 370;
    window.standY = 10;
    window.time = 0;
    window.spellcardtime = 100;
    window.frame = 0;
    window.startbulletmake = true;
    window.endspellcard = false;
    window.startspellcard = false;
    window.spcX = 270;
    window.spcY = 300;
    window.bullet = [];
    window.bullettype = [];
    window.bulletX = [];
    window.bulletY = [];
    window.bulletdir = [];
    window.bulletspeed = [];
    window.bulletdraw = [];
    window.bulletcn1 = [];
    window.bulletcn2 = [];
    window.bulletrenderdir = [];
    window.bulletdel1 = false;
    window.border = [0,0];
    window.spellcardtime = 99;
    window.bordersizereset = true;
    window.bulletdelcheck = [false,false,false,false,false];
    window.gameovcl = 0;
    window.gameover = 0;
    window.staffroll = new Image();
    window.staffroll.src = "./images/staffroll.svg";
    window.staffrollY = 768;
    window.musicstart = [false,false,false,false];
    window.spcframe = [0,0,0,0,0,0,0,0];
    window.bulletdraw1 = 1;
    window.scene3count2 = 1;
    window.scene3count3 = 1;
    window.scene4count1 = 1;
    window.dissolvespellY = 400;
    window.dissolvespellbordersize = 0;
    window.breakleaflist = [];
    window.breakleafdir = 90;
    musicstart = [false,false,false,false];
}

const spcframemax = [5,3,5,2,2,32,1,0];
let music = undefined;
let scene = 1;
let updatecnt = 1;                      //再描画回数
const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");    //キャンバス指定
reset();
window.addEventListener("load", update);

//描画関数
function render(src, x, y){
    var image = new Image();
    image.src = src;
    ctx.drawImage(image, x, y);
}
//キー入力確認
var input_key = new Array(90);
for(let i = 0;i > 90;i++){
    input_key.push(false)
}
window.addEventListener("keydown", handlekeydown);
function handlekeydown(e){
    input_key[e.keyCode] = true;
}
window.addEventListener("keyup", handlekeyup);
function handlekeyup(e){
    input_key[e.keyCode] = false;
}

function wait(joken,timeout){
    if(timeout == undefined){
        var time = 1000000;
    }
    else{
        var time = timeout * 1000;
    }
    let roop = 0;
    while(joken == true || roop > time){
    setTimeout(function(){roop++;},1);
    }
    if(roop > time){
        return undefined;
    }
    else{
        return (roop / 1000);   //かかった秒数
    }
}
function newbullet(type,x,y,dir,speed,cn1,cn2){
        bullet.push("live")
        bullettype.push(type);
        bulletX.push(x);
        bulletY.push(y);
        bulletdir.push(dir);
        bulletspeed.push(speed);
        bulletdraw.push(true);
        bulletcn1.push(cn1);
        bulletcn2.push(cn2);
        bulletrenderdir.push(dir);
        return bullet.length
}
function randomint(max){
    return (Math.floor(Math.random() * (max + 1)))
}
function framechange(s){
    return (60 * s);
}
function bulletdel(i){
    bullet.splice(i,1);
    bulletX.splice(i,1);
    bulletY.splice(i,1);
    bulletcn1.splice(i,1);
    bulletcn2.splice(i,1);
    bulletdir.splice(i,1);
    bulletdraw.splice(i,1);
    bullettype.splice(i,1);
    bulletspeed.splice(i,1);
    bulletrenderdir.splice(i,1);
}
function bulletupdate(option){
    //弾幕作成処理
    if(option != false){
        //2~12秒の処理(第一フェーズの準備必要なやつ)
            if(frame > framechange(2) && frame < framechange(12)){
                //2
                if(spcframe[1] > spcframemax[1]){
                    newbullet(2,randomint(700),500,0,undefined,(3 + randomint(2)));
                    spcframe[1] = 0;
                }
                else{
                    spcframe[1]++;
                }
            }
        //4~14,24~34秒の処理(第一第三フェーズ共通)
            if(frame >= framechange(4) && frame < framechange(14)){
                //1(5フレーム毎)
                if(spcframe[0] > spcframemax[0]){
                    const n = randomint(15);
                    for(let i = n;i < 360 + n;i += 15){
                        newbullet(1,enemyX + 16,enemyY + 33,i,5);
                    }
                    spcframe[0] = 0;
                }
                else{spcframe[0]++;}
            }
        //14~34秒の処理(第二第三フェーズ共通)
            if(frame >= framechange(14) && frame < framechange(34)){
                if(spcframe[2] == spcframemax[2]){
                    for(let i = bulletdraw1;i < (360 + bulletdraw1);i += 60){
                        newbullet(3,enemyX,enemyY,i,6,0,(Math.PI * i / 180));
                    }
                    spcframe[2] = 0;
                    bulletdraw1 -= 1.17;
                }
                else{
                    spcframe[2]++;
                }
                if(spcframe[3] == spcframemax[3]){
                    if(enemyY < playerY){var a1 = Math.PI;}
                    else if(playerY == enemyY){
                        var a1 = Math.PI;
                    }
                    else{var a1 = 0;}
                    newbullet(4,enemyX + 16,enemyY + 33,Math.atan(((playerX + 16) - (enemyX + 16)) / ((enemyY + 33) - (playerY + 33))) - 0.8 + a1,5);
                    newbullet(4,enemyX + 16,enemyY + 33,Math.atan(((playerX + 16) - (enemyX + 16)) / ((enemyY + 33) - (playerY + 33))) + a1,5);
                    newbullet(4,enemyX + 16,enemyY + 33,Math.atan(((playerX + 16) - (enemyX + 16)) / ((enemyY + 33) - (playerY + 33))) + 0.8 + a1,5);
                    spcframe[3] = 0;
                }
                else{
                    spcframe[3]++;
                }
                }
        //24~34秒の処理(第三フェーズ)
            if(frame >= framechange(24) && frame < framechange(34)){
                if(spcframe[4] == spcframemax[4]){
                    if(enemyY < playerY){var a1 = Math.PI;}
                    else if(playerY == enemyY){
                        var a1 = Math.PI;
                    }
                    else{var a1 = 0;}
                    newbullet(5,enemyX + 16,enemyY + 33,Math.atan(((playerX + 16) - (enemyX + 16)) / ((enemyY + 33) - (playerY + 33))) - 0.1 + a1,6);
                    newbullet(5,enemyX + 16,enemyY + 33,Math.atan(((playerX + 16) - (enemyX + 16)) / ((enemyY + 33) - (playerY + 33))) + 0.1 + a1,6);
                    spcframe[4] = 0;
                }
                else{
                    spcframe[4]++;
                }
                if(spcframe[5] > spcframemax[5]){
                    const n = randomint(15);
                    const p = randomint(1) + 6;
                    for(let i = n;i < 360 + n;i += 15){
                        newbullet(p,enemyX + 16,enemyY + 33,i,5);
                    }
                    spcframe[5] = 0;
                }
                else{spcframe[5]++;}
            }
        //35~45秒の処理(第四フェーズ)
            if(frame >= framechange(35) && frame < framechange(45)){
                if(spcframe[6] == spcframemax[6]){
                    let n;
                    let x;
                    let dir;
                    let y = randomint(766) + 1;
                    if(randomint(1) == 1){
                        x = 3;
                        n = 1;
                        dir = 90;
                    }
                    else{
                        x = 699;
                        n = -1;
                        dir = 270;
                    }
                    newbullet(8,x,y,dir,3,n,dir);
                    spcframe[6] = 0;
                }
                else{
                    spcframe[6]++;
                }
            }
        //45秒~の処理(最終フェーズ)
            if(frame >= framechange(45) && endspellcard == false){
                if(bulletdel1 == false){
                    bullet = [];
                    bullettype = [];
                    bulletX = [];
                    bulletY = [];
                    bulletdir = [];
                    bulletspeed = [];
                    bulletdraw = [];
                    bulletcn1 = [];
                    bulletcn2 = [];
                    bulletrenderdir = [];
                    bulletdel1 = true;
                }
                for(let i = 0;i < 3;i++){
                    let n = randomint(6);
                    newbullet(9,enemyX + 16,enemyY + 33,randomint(359),(randomint(1) + 2),undefined,n)
                }
            }
    }
    //既存弾幕処理+敵移動処理
        for (let i = 0; i < bulletdraw.length + 1; i++){
                hit(bullettype[i],bulletX[i],bulletY[i],bulletrenderdir[i],bulletcn2[i]);
                switch(bullettype[i]){
                    case 1:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            let n = bulletdir[i] / 180 * Math.PI;
                            bulletX[i] += Math.sin(n) * bulletspeed[i];
                            bulletY[i] -= Math.cos(n) * bulletspeed[i];
                        }
                        else{
                            bulletdel(i);
                        }
                        break;
                    case 2:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            bulletY[i] -= bulletcn1[i];
                            bulletcn1[i] -= 0.025;
                        }
                        else{
                            bulletdel(i);
                        }
                        break;
                    case 3:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            let x = Math.sin(bulletcn1[i]) * 50;
                            let y = bulletcn1[i] * 40;
                            let dir = bulletcn2[i];
                            bulletX[i] = (x * Math.cos(dir) - y * Math.sin(dir)) + enemyX + 16;
                            bulletY[i] = (x * Math.sin(dir) + y * Math.cos(dir)) + enemyY + 33;
                            bulletcn1[i] += 0.17;
                        }
                        else{
                            bulletdel(i);
                        }
                        if(enemyY < 320){
                            enemyY += 0.2;
                        }
                        break;
                    case 4:
                    case 5:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            bulletX[i] += Math.sin(bulletdir[i]) * bulletspeed[i];
                            bulletY[i] -= Math.cos(bulletdir[i]) * bulletspeed[i];
                        }
                        else{
                            bulletdel(i);
                        }
                        break;
                    case 6:
                    case 7:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            let n = bulletdir[i] / 180 * Math.PI;
                            bulletX[i] += Math.sin(n) * bulletspeed[i];
                            bulletY[i] -= Math.cos(n) * bulletspeed[i];
                            bulletrenderdir[i] += 5;
                        }
                        else{
                            bulletdel(i);
                        }
                        break;
                    case 8:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            bulletX[i] += (bulletcn1[i] * bulletspeed[i]);
                        }
                        else{
                            bulletdel(i);
                        }
                        break;
                    case 9:
                        if(bulletX[i] > 0 && bulletY[i] > 0 && bulletX[i] < 700 && bulletY[i] < 720){
                            let n = bulletdir[i] / 180 * Math.PI;
                            bulletX[i] += Math.sin(n) * bulletspeed[i];
                            bulletY[i] -= Math.cos(n) * bulletspeed[i];
                            if(bulletcn2[i] == 4 || bulletcn2[i] == 5){
                                bulletrenderdir[i] += 5;
                            }
                        }
                        else{
                            bulletdel(i);
                        }

                }
        }
}
function bulletrender(){
        for(let i = 0; i < bulletdraw.length; i++){
                switch(bullettype[i]){
                        case 1:
                            setdegrender("./images/bullet/b3.png", bulletX[i], bulletY[i],bulletrenderdir[i]);
                            break;
                        case 2:
                            render("./images/bullet/b2.png",bulletX[i],bulletY[i]);
                            break;
                        case 3:
                            render("./images/bullet/b1.png",bulletX[i],bulletY[i]);
                            break;
                        case 4:
                            setdegrender("./images/bullet/b4.png", bulletX[i], bulletY[i], bulletdir[i] * 180 / Math.PI);
                            break;
                        case 5:
                            setdegrender("./images/bullet/b5.png", bulletX[i], bulletY[i], bulletdir[i] * 180 / Math.PI);
                            break;
                        case 6:
                            setdegrender("./images/bullet/b6.png", bulletX[i], bulletY[i], bulletrenderdir[i]);
                            break;
                        case 7:
                            setdegrender("./images/bullet/b7.png", bulletX[i], bulletY[i], bulletrenderdir[i]);
                            break;
                        case 8:
                            setdegrender("./images/bullet/b8.png", bulletX[i], bulletY[i], bulletcn2[i]);
                            break;
                        case 9:
                            ctx.save();
                            ctx.translate(bulletX[i],bulletY[i])
                            ctx.rotate(bulletrenderdir[i] / 180 * Math.PI);
                            var image = new Image()
                            const src = ["./images/bullet/b1.png","./images/bullet/b3.png","./images/bullet/b4.png","./images/bullet/b5.png","./images/bullet/b6.png","./images/bullet/b7.png","./images/bullet/b8.png"]
                            image.src = src[bulletcn2[i]];
                            ctx.drawImage(image, -(image.width/2), -(image.height/2));
                            ctx.restore();
                            break;
                }
        }
}

//UI描画
function setdegrender(src,x,y,deg,width,height){
    ctx.save();
    ctx.translate(x,y)
    ctx.rotate(deg / 180 * Math.PI);
    var image = new Image();
    image.src = src;
    if(width == undefined && height == undefined){
        ctx.drawImage(image, -(image.width/2), -(image.height/2));
    }
    else{
        ctx.drawImage(image, -(width/2), -(height/2), width, height);
    }
    ctx.restore();
}
function UIrender(option){
    //spellcardborder
    if((endspellcard == false && startspellcard == true && option != 1 && option != 2) || option == 3){
        setdegrender("images/spellcardborder.png",enemyX + 16,enemyY + 33,border[0],border[1],border[1]);
        border[0] += 4;
        if(border[1] < 800 && bordersizereset == true){
            border[1] += 25;
        }
        else{
            bordersizereset = false;
        }
        if(time > 2 && option != 3){
            border[1] -= 0.21328;
        }
    }
    //spellcardstandimage
    if(time > 2 && time < 4 && option != 2){
        if(endspellcard == false)
            standY += 2;
            render("images/standpicture.png",standX,standY);
        }
    //time
    if(option == 1){
        let _n1 = "images/time/0.png"
        let _n2 = "images/time/0.png"
        render(_n1,570,15);
        render(_n2,600,15);
    }
    else if(option != 2){
        let n1 = Math.floor(spellcardtime / 10);
        let n2 = Math.floor(spellcardtime - n1 * 10);
        let _n1 = "images/time/" + n1 + ".png"
        let _n2 = "images/time/" + n2 + ".png"
        render(_n1,570,15);
        render(_n2,600,15);
    }
    //スペルカード名
    if(time > 2){
        if(((endspellcard == false || option == 1) && option != 2) || option == 3){
            if(spcY > 60 && time > 3){spcY -= 6;}
            render("images/spellcard.png",spcX,spcY);
            if(startspellcard == false){
                spellcardtime = 61;
                startspellcard = true;
            }
        }
    }
    //敵の名前
    if(option != 2){
        render("images/enemyname.png",30,30);
    }
}
//撃破演出用の葉
class breakleaf{
    constructor(number,dir){
        this.x = enemyX + 16;
        this.y = enemyY + 33;
        this.dir = dir - 180;
        this.renderdir = (dir * Math.PI / 180);
        this.image = new Image();
        switch(randomint(3)){
            case 0:
                this.image.src = "./images/leaf/green.png";
                break;
            case 1:
                this.image.src = "./images/leaf/red.png";
                break;
            case 2:
                this.image.src = "./images/leaf/orange.png";
                break;
            case 3:
                this.image.src = "./images/leaf/yellow.png";
                break;
        }
        this.size = 1.5;
        this.number = number;
    }
    process(){
        let width = this.image.width;
        let height = this.image.height;
        let dir = this.dir * Math.PI / 180;
        //描画
        if(this.size > 0){
            ctx.save();
            ctx.translate(this.x,this.y);
            ctx.rotate(this.renderdir);
            ctx.drawImage(this.image, -(width/2), -(height/2), (width * this.size), (height * this.size));
            ctx.restore();
        }
        //処理
        this.renderdir += 0.01;
        this.x += (Math.sin(dir) * 10);
        this.y -= (Math.cos(dir) * 10);
        this.size -= (0.03 - randomint(1) * 0.01);
    }
}

//ここからmain
function update(){
    updatecnt++;
    if(scene == 1 || scene == 0){
        time = 0;
    }
    if(startspellcard == false && endspellcard == false){
        frame = 0;
    }
    else{
        frame++;
    }
    //描画
    objectupdate();
    forerender();

    window.requestAnimationFrame(update);   //60fps
}
function forerender(){
    switch(scene){
        case 1:
            var image = new Image();
            image.src = "./images/title.png";
            ctx.drawImage(image, 0, 0);
            break;
        case 2:
            var image = new Image();
            image.src = "./images/stage.png";
            ctx.drawImage(image, 0, 0);
            break;
        case 3:
        case 4:
        case 5:
            var image = new Image();
            image.src = "./images/stage.png";
            ctx.drawImage(image, 0, 0);
            break;
    }
}
function objectupdate(){
    switch(scene){
        case 1:
            if(input_key[keyX]){
            playerX = 300;
            playerY = 660;
            playerSpeed = 5;
            enemyX = 300;
            enemyY = 110;
            frame = 0;
            time = 0;
            spellcardtime = 100;
            scene = 2;
            ctx.clearRect(0,0,1024,768);
            break;
            }
            break;
        case 2:
            if(spellcardtime <= 0){
                scene = 3;
            }
            //フレーム加算
            time += (1 / 60);
            spellcardtime -= 0.016;
            var image = new Image();
            image.src = "./images/stage.png";
            ctx.drawImage(image, 0, 0);
            //低速か
                if(input_key[keyShift]){
                    playerSpeed = 2;
                }
                else{
                    playerSpeed = 5;    
                }
            //移動
                if(input_key[keyUp]){
                    playerY -= playerSpeed;
                    if(playerY < 20){playerY = 20;}
                }
                if(input_key[keyDown]){
                    playerY += playerSpeed;
                    if(playerY > 686){playerY = 686;}
                }
                if(input_key[keyRight]){
                    playerX += playerSpeed;
                    if(playerX > 591){playerX = 591;}
                }
                if(input_key[keyLeft]){
                    playerX -= playerSpeed;
                    if(playerX < 21){playerX = 21;}
                }
            //弾幕処理1
                bulletupdate();
            //背景描画
                render("images/back.png",0,0);
            //プレイヤー描画
                var image = new Image();
                image.src = "./images/chara/Player.png";
                ctx.drawImage(image, playerX, playerY);
            //弾幕描画
                bulletrender();
            //UI描画
                UIrender();
            //敵描画
                var image = new Image();
                image.src = "./images/chara/Enemy.png";
                ctx.drawImage(image, enemyX, enemyY);
            break;
        case 3:
            endspellcard == true;
            if(scene3count1 > framechange(15)){
                scene = 5;
            }
            else if(scene3count1 > framechange(10)){
                if(gameovcl == 0){
                    ctx.clearRect(0,0,1024,768);
                    gameovcl = 1;
                }
                var image = new Image();
                image.src = "./images/gameclear.png";
                ctx.drawImage(image, 0, 0);
            }
            else{
            if(scene3count2 > 3 || scene3count1 > framechange(5)){    
                /*撃破演出*/
                //フレーム加算
                    time += (1 / 60);
                    var image = new Image();
                    image.src = "./images/stage.png";
                   ctx.drawImage(image, 0, 0);
                //低速か
                    if(input_key[keyShift]){
                        playerSpeed = 2;
                    }
                    else{
                        playerSpeed = 5;    
                    }
                //移動
                    if(input_key[keyUp]){
                        playerY -= playerSpeed;
                        if(playerY < 20){playerY = 20;}
                    }
                    if(input_key[keyDown]){
                        playerY += playerSpeed;
                        if(playerY > 686){playerY = 686;}
                    }
                    if(input_key[keyRight]){
                        playerX += playerSpeed;
                        if(playerX > 591){playerX = 591;}
                    }
                    if(input_key[keyLeft]){
                        playerX -= playerSpeed;
                        if(playerX < 21){playerX = 21;}
                    }
                //弾幕処理1
                    bulletupdate(false);
                //背景描画
                    render("images/back.png",0,0);
                //ここで撃破演出
                    if(scene3count1 <= framechange(5)){
                        breakleaflist.push(undefined);
                        let long = (breakleaflist.length - 1);
                        breakleaflist[long] = new breakleaf(long,breakleafdir);
                        breakleafdir += (23 + randomint(67));
                    }
                    for(let i = 0;i <= (breakleaflist.length - 1);i++){
                        breakleaflist[i].process();
                    }
                //プレイヤー描画
                    var image = new Image();
                    if(scene3count3 > 5 || scene3count1 > framechange(5)){
                        image.src = "./images/chara/Player.png";
                        scene3count3++;
                        if(scene3count3 > 9){
                            scene3count3 = 1;
                        }
                    }
                    else{
                        image.src = "./images/chara/Player red.png";
                        scene3count3++;
                    }
                    ctx.drawImage(image, playerX, playerY);
                //弾幕描画
                    bulletrender();
                //UI描画
                    if(scene3count1 > framechange(5)){
                        UIrender(2);
                        bullet = [];
                        bullettype = [];
                        bulletX = [];
                        bulletY = [];
                        bulletdir = [];
                        bulletspeed = [];
                        bulletdraw = [];
                        bulletcn1 = [];
                        bulletcn2 = [];
                        bulletrenderdir = [];
                    }
                    else{UIrender(1);}
                //敵描画
                if(scene3count1 <= framechange(5)){
                    var image = new Image();
                    image.src = "./images/chara/Enemy.png";
                    ctx.drawImage(image, enemyX, enemyY);
                }
                scene3count2 = 1;
                }
                else{
                    scene3count2++;
                }
            }
            scene3count1++;
            break;
        case 4:
            endspellcard = true;
            if(scene4count1 > framechange(5)){
                if(gameover == 0){
                    gameover = 1;
                }
                
                ctx.clearRect(0,0,1024,768);
                var image = new Image();
                image.src = "./images/gameover.png";
                ctx.drawImage(image, 0, 0);
                if(input_key[key1] == true){
                    reset();
                    scene = 2;
                    ctx.clearRect(0,0,1024,768);
                    break;
                }
                else if(input_key[key2] == true){
                    reset();
                    scene = 1;
                    ctx.clearRect(0,0,1024,768);
                    break;
                }
            }
            else{
                /*被弾演出*/
                //フレーム加算
                    time += (1 / 60);
                    var image = new Image();
                    image.src = "./images/stage.png";
                    ctx.drawImage(image, 0, 0);
                //低速か
                    if(input_key[keyShift]){
                        playerSpeed = 2;
                    }
                    else{
                        playerSpeed = 5;    
                    }
                //移動
                    if(input_key[keyUp]){
                        playerY -= playerSpeed;
                        if(playerY < 20){playerY = 20;}
                    }
                    if(input_key[keyDown]){
                        playerY += playerSpeed;
                        if(playerY > 686){playerY = 686;}
                    }
                    if(input_key[keyRight]){
                        playerX += playerSpeed;
                        if(playerX > 591){playerX = 591;}
                    }
                    if(input_key[keyLeft]){
                        playerX -= playerSpeed;
                        if(playerX < 21){playerX = 21;}
                    }
                //弾幕処理1
                    bulletupdate(false);
                //背景描画
                    render("images/back.png",0,0);
                //ディソルブスペル演出1
                if(scene4count1 <= framechange(3)){
                    let Dspellcardborder = new Image();
                    Dspellcardborder.src = "images/dissolveborder.png";
                    let truesize = Dspellcardborder.width * dissolvespellbordersize;
                    ctx.drawImage(Dspellcardborder,(playerX - truesize / 2 + 16),(playerY - truesize / 2 + 32),truesize,truesize);
                    if(dissolvespellbordersize < 1.25 && scene4count1 > framechange(0.5)){
                        dissolvespellbordersize += 0.02;
                    }
                }
                //ディゾルブスペル演出2
                    if(scene4count1 > framechange(1.5)){
                        if(dissolvespellY < 680){dissolvespellY += 10;}
                        if(scene4count1 <= framechange(3)){
                            render("images/dissolvespell.png",30,dissolvespellY);
                        }
                    }
                    else if(scene4count1 <= framechange(3)){
                        render("images/dissolvespell.png",30,dissolvespellY);
                    }
                //プレイヤー描画
                    var image = new Image();
                    image.src = "./images/chara/Player.png";
                    ctx.drawImage(image, playerX, playerY);
                //弾幕描画
                if(scene4count1 <= framechange(3)){
                    bulletrender();
                }
                //UI描画
                    if(scene4count1 > framechange(3)){
                        UIrender(2);
                    }
                    else{
                        UIrender(3);
                    }
                //敵描画
                if(scene4count1 <= framechange(3)){
                    var image = new Image();
                    image.src = "./images/chara/Enemy.png";
                    ctx.drawImage(image, enemyX, enemyY);
                }
            }
            scene4count1++;
            break;
        case 5:
            ctx.clearRect(0,0,1024,768);
            render("images/back.png",0,0);
            //スタッフロール
            ctx.drawImage(staffroll,8,staffrollY,620,8000);
            if(input_key[keyCtrl] == true){
                staffrollY -= 10;
            }
            else if(staffrollY > 300 || staffrollY < -7000){
                staffrollY -= 2;
            }
            else{
                staffrollY -= 3;
            }
            if(staffrollY < -8000){
                reset();
                scene = 1;
                ctx.clearRect(0,0,1024,768);
            }
            break;
    }
}