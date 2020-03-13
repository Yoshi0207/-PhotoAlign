# Photo-Align

photo-alignクラスを持つタブで囲まれたimg要素を整列させるプログラムです.

## Requirements
+ ES6
+ CSS3

## 使い方
+ photo-align.jsをjsフォルダにダウンロードし,htmlに読み込む
```
<script src="js/photo-align.js"></script>
```

+ photo-align.cssをcssフォルダにダウンロードし,htmlに読み込む
```
<link rel="stylesheet" href="css/photo-align.css">
```

+ imgタグをclass="photo-align"をつけたdivタグ,またはulタグで囲む.
```
<div class="photo-align">
    <img src="">
    <img src="">
</div>
```

+ imgタグにaタグをつけることもできます.
```
<div class="photo-align">
    <a><img src=""></a>
    <a><img src=""></a>
</div>
```

+ imgタグをaタグやliタグで囲んでいない場合は,写真をクリックすることで写真の拡大表示を行うことができます。
