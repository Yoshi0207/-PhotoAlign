// addEventLisnerでのクラスメソッドやインスタンス変数の使い方がわからなかったので写真拡大処理において仮でグローバル変数使用中

// ページ内の全ての<div class="photo-align"></div>で囲まれた部分に含まれるimgタグのsrcのパスを保持するリスト
// 例；[[写真1, 写真2],[写真1, 写真2, 写真3],[写真1]]
// <div class="photo-align">
//   <img src="写真1">
//   <img src="写真2">
// </div>
// <div class="photo-align">
//   <img src="写真1">
//   <img src="写真2">
//   <img src="写真3">
// </div>
// <div class="photo-align">
//   <img src="写真1">
// </div>
const PHOTOSLISTLIST = []; 

// PhotoScreenで表示する写真のパスがあるリストのインデックス
let CURRENTPHOTOLISTINDEX;

// PhotoScreenで表示するための写真のパスを保持するリスト
let CURRENTPHOTOLIST = [];

// PhotoScreen表示中かを表す
// True:表示中
// False:非表示(初期値)
let PHOTOSCREEN = false;

// 写真拡大表示を扱うクラス
class PhotoScreen {
    constructor(listListIndex, photoIndex) {
        // グローバル変数にこのPhotoScreenで使用する写真のリストとインデックスを設定
        CURRENTPHOTOLIST = PHOTOSLISTLIST[listListIndex];
        CURRENTPHOTOLISTINDEX = photoIndex;

        // PhotoScreenのステータスを表示中に変更
        PHOTOSCREEN = true;

        // 写真の表示スペースを追加
        const screenImg = `<div id="screen-photo-wrapper"><img id="screen-photo" src=""></div>`;
        document.body.insertAdjacentHTML("beforeend", screenImg);
        
        // 黒のレイヤーと写真を切り替えるボタンを追加
        // ボタンには、写真を切り替えるための関数をセット
        const h = `<div id="fadeLayer"></div>`
            + `<p id="arrow-right" onclick="PhotoScreen.screenPhotoChangeRight()" class="arrow right" style="position:fixed;">`
            + `<p id="arrow-left" onclick="PhotoScreen.screenPhotoChangeLeft()" class="arrow left" style="position:fixed;">`;
        document.body.insertAdjacentHTML("beforeend",h);

        // PhotoScreenの表示位置を設定
        PhotoScreen.PhotoScreenAdjustment();
        
        // id="screen-photo"に写真を設定
        PhotoScreen.setImgPhotoScreen();

        // fadeLayerのクリックイベントにfadeLayerを削除するための関数を設定
        const fadeLayer = document.getElementById("fadeLayer");
        fadeLayer.addEventListener('click', PhotoScreen.finishPhotoScreen);
        const screenPhotoWrapper = document.getElementById("screen-photo-wrapper");
        screenPhotoWrapper.addEventListener('click', PhotoScreen.finishPhotoScreen);
    }
    
    // 写真を表示スペースにセット
    static setImgPhotoScreen() {
        const photoScreenImgSrc = document.getElementById("screen-photo");
        photoScreenImgSrc.src = CURRENTPHOTOLIST[CURRENTPHOTOLISTINDEX];
    }

    // PhotoScreenの表示位置を調整するメソッド
    static PhotoScreenAdjustment() {
        // 写真を中央に表示するための計算
        const screenPhoto = document.getElementById("screen-photo-wrapper");
        const [height, width] = OtherFunction.getContantSize(screenPhoto);
        const top = (window.innerHeight-height)/2;
        const left = (window.innerWidth-width)/2;

        // 写真の表示スペースの位置を調整
        screenPhoto.style["top"] = `${top}`;
        screenPhoto.style["left"] = `${left}`;

        // 写真を切り替えるボタンの表示位置を調整
        const arrowRight = document.getElementById("arrow-right");
        const arrowLeft = document.getElementById("arrow-left");
        const [arrowRightHeight, arrowRightWidth] = OtherFunction.getContantSize(arrowRight);
        const [arrowLeftHeight, arrowLeftWidth] = OtherFunction.getContantSize(arrowLeft);
        arrowRight.style["top"] = `${top+(height-arrowRightHeight)/2}`;
        arrowRight.style["left"] = `${left+width}`;
        arrowLeft.style["top"] = `${top+(height-arrowLeftHeight)/2}`;
        arrowLeft.style["left"] = `${left-arrowLeftWidth}`;
    }
    
    // 右ボタンがクリックされた時の処理
    static screenPhotoChangeRight() {
        if (CURRENTPHOTOLISTINDEX+1>CURRENTPHOTOLIST.length-1) {
            CURRENTPHOTOLISTINDEX = 0;
        } else {
            CURRENTPHOTOLISTINDEX = CURRENTPHOTOLISTINDEX+1;
        }
        PhotoScreen.setImgPhotoScreen();
    }
    
    // 左ボタンがクリックされた時の処理
    static screenPhotoChangeLeft() {
        if (CURRENTPHOTOLISTINDEX-1<0) {
            CURRENTPHOTOLISTINDEX = CURRENTPHOTOLIST.length-1;
        } else {
            CURRENTPHOTOLISTINDEX = CURRENTPHOTOLISTINDEX-1;
        }
        this.setImgPhotoScreen();
    }
    
    // スクリーン表示を終了
    static finishPhotoScreen() {
        document.getElementById("screen-photo").remove();
        document.getElementById("screen-photo-wrapper").remove();
        document.getElementById("arrow-right").remove();
        document.getElementById("arrow-left").remove();
        document.getElementById("fadeLayer").remove();

        // PhotoScreenのステータスを非表示に変更
        PHOTOSCREEN = false;
    }

}

// 一つの<div class="photo-align"></div>に対してその子要素の写真を整列させる処理を行うクラス
class PhotoAlign {
    constructor(element) {
        
    }

    // 写真をグリットに整列するメソッド
    // imgsはimgタグのリスト
    // 一度に5枚まで表示可能
    align(imgs) {
        if (imgs.length === 1) {
            this.gridContantActivate(imgs[0], 6, 2, 1);
        }
        if (imgs.length === 2) {
            if (OtherFunction.getContantRatio(imgs[0]) < 3/4) {
                this.gridContantActivate(imgs[0], 3, 2, 1);
                this.gridContantActivate(imgs[1], 3, 2, 2);
            } else {
                this.gridContantActivate(imgs[0], 6, 1, 1);
                this.gridContantActivate(imgs[1], 6, 1, 2);
            }
        }
        if (imgs.length === 3) {
            if (OtherFunction.getContantRatio(imgs[0]) < 3/4) {
                this.gridContantActivate(imgs[0], 3, 2, 1);
                this.gridContantActivate(imgs[1], 3, 1, 2);
                this.gridContantActivate(imgs[2], 3, 1, 3);
            } else {
                this.gridContantActivate(imgs[0], 6, 1, 1);
                this.gridContantActivate(imgs[1], 3, 1, 2);
                this.gridContantActivate(imgs[2], 3, 1, 3);
            }
            
        }
        if (imgs.length === 4) {
            this.gridContantActivate(imgs[0], 3, 1, 1);
            this.gridContantActivate(imgs[1], 3, 1, 2);
            this.gridContantActivate(imgs[2], 3, 1, 3);
            this.gridContantActivate(imgs[3], 3, 1, 4);
        }
        if (imgs.length === 5) {
            this.gridContantActivate(imgs[0], 3, 1, 1);
            this.gridContantActivate(imgs[1], 3, 1, 2);
            this.gridContantActivate(imgs[2], 2, 1, 3);
            this.gridContantActivate(imgs[3], 2, 1, 4);
            this.gridContantActivate(imgs[4], 2, 1, 5);
        }
        if (imgs.length >= 6) {
            this.gridContantActivate(imgs[0], 3, 1, 1);
            this.gridContantActivate(imgs[1], 3, 1, 2);
            this.gridContantActivate(imgs[2], 2, 1, 3);
            this.gridContantActivate(imgs[3], 2, 1, 4);
            this.gridContantActivate(imgs[4], 2, 1, 5);
            this.addPhotoCounter(imgs[4], imgs.length-4);
        }
    }

    addPhotoCounter(img, length) {
    
    }

    gridContantActivate(img, height, weght, photoNumber) {
        
    }

    static photoClick(list, photoIndex) {

    }
}

// 一つの<div class="photo-align"></div>に対してその子要素の写真を整列させる処理を行うクラス
// imgタグがliで囲われている場合
class PhotoAlignLi extends PhotoAlign {
    constructor(element) {
        super()
        this.imgs = [];
        this.lis = element.getElementsByTagName("li");
        for (this.j=0; this.j<this.lis.length; this.j++) {
            const img = this.lis[this.j].getElementsByTagName("img");
            this.imgs.push(img);
        }
        this.align(this.imgs);
    }

    gridContantActivate(img, height, weght, photoNumber) {
        const parent = img[0].parentNode;
        parent.classList.add("grid-contant-ul");
        parent.style["grid-column"] = `span ${height}`;
        parent.style["grid-row"] = `span ${weght}`;
    }
}

// 一つの<div class="photo-align"></div>に対してその子要素の写真を整列させる処理を行うクラス
// imgタグがaタグで囲われている場合
class PhotoAlignA extends PhotoAlign {
    constructor(element) {
        super()
        this.imgs = [];
        this.as = element.getElementsByTagName("a");
        for (this.j=0; this.j<this.as.length; this.j++) {
            const img = this.as[this.j].getElementsByTagName("img");
            this.imgs.push(img);
        }
        this.align(this.imgs);
    }

    gridContantActivate(img, height, weght, photoNumber) {
        const parent = img[0].parentNode;
        //parent.outerHTML = `<div class="grid-contant" style="grid-column: span ${height}; grid-row: span ${weght};">` + parent.outerHTML + `</div>`;
        parent.classList.add("grid-contant");
        parent.style["grid-column"] = `span ${height}`;
        parent.style["grid-row"] = `span ${weght}`;
    }
}


// 一つの<div class="photo-align"></div>に対してその子要素の写真を整列させる処理を行うクラス
// imgタグのみの場合
class PhotoAlignImg extends PhotoAlign {
    constructor(element) {
        super()
        this.photosList = [];
        // <div class="photo-align"></div>に含まれるimgタグの要素を配列で取得
        let imgs = element.getElementsByTagName('img');

        // グローバル変数PHOTOLISTLISTにこのphoto-alignクラスの写真のパスのリストを追加
        for (this.j=0; this.j<imgs.length; this.j++) {
            this.photosList.push(imgs[this.j].getAttribute('src'));
        }
        PHOTOSLISTLIST.push(this.photosList);
        this.align(imgs);
    }

    // グリットに表示するコンテンツを制御する
    gridContantActivate(img, height, weght, photoNumber){
        // 写真をクリックした時のイベントを追加
        // img.addEventListener('click', {photosList: this.photosList, photoIndex: photoNumber, handleEvent: photoClick});
        img.outerHTML = `<div onclick="PhotoAlignImg.photoClick(${PHOTOSLISTLIST.length-1},${photoNumber-1})" class="grid-contant" style="grid-column: span ${height}; grid-row: span ${weght};">` + img.outerHTML + `</div>`
    }

    // 写真が6枚以上の場合に最後の写真の上に数字をつける関数
    addPhotoCounter(img, number) {
        const p = `<p>+${number}</p>`;
        img.insertAdjacentHTML("afterend", p);
    }

    // 写真がクリックされた時に処理される関数
    // (addEventLisnerでのクラスメソッドの使い方がよくわからなかったので仮でグローバル関数使用中)
    static photoClick(list, photoIndex) {
        new PhotoScreen(list, photoIndex);
    }
}

// その他の処理を行うクラス
class OtherFunction {
    // 写真の縦横の大きさを求める関数
    static getImgSize(contant) {
        return [contant.naturalHeight, contant.naturalWidth];
    }

    // 写真の比を求める関数
    static getContantRatio(contant) {
        const [y, x] = this.getImgSize(contant);
        return x / y;
    }

    // 要素の縦横の大きさを求める関数
    static getContantSize(contant) {
        return [contant.clientHeight, contant.clientWidth];
    }
}

// html要素を読み込んだ後に実行される
window.addEventListener('DOMContentLoaded', function(){
    // photo-align.css読み込み
    var head = document.head;
    var linkElement = document.createElement("link");
   
    linkElement.type = "text/css";
    linkElement.rel = "stylesheet";
    linkElement.href = "css/photo-align.css";
    head.appendChild(linkElement);
    // css読み込みここまで

    // 全てのphoto-alignクラスを持つ要素を配列で取得
    const elements = document.getElementsByClassName('photo-align');

    // それぞれのphoto-alignに対して整列を実行
    for (i=0; i<elements.length; i++) {
        // imgタグがaタグで囲まれていた場合の処理
        if (elements[i].getElementsByTagName("a").length > 0) {
            new PhotoAlignA(elements[i]);
        } else 
        
        // imgタグがli,ulで囲われていた場合の処理
        if (elements[i].getElementsByTagName('li').length > 0) {
            new PhotoAlignLi(elements[i]);
        } else

        // imgタグがdivタグで囲われていた場合の処理
        if (elements[i].getElementsByTagName('div').length > 0) {
            
        } else

        // imgタグのみの場合の処理
        if (elements[i].getElementsByTagName("img").length > 0) {
            new PhotoAlignImg(elements[i]);
        }
    }
});

// windowのサイズが変更された場合に実行される 
window.addEventListener( 'resize', function() {
    if (PHOTOSCREEN===true){
        PhotoScreen.PhotoScreenAdjustment();
    }
});
