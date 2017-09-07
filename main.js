var cnt = 1;

$(function (){
  // 初期表示
  tab_view();

  // 更新クリック
  $('#view_reload').click(function(){
    location.reload();
    return false;
  });
  // 一括ダウンロードクリック
  $('#all_download').click(function(){
    all_download();
    return false;
  });
});

function tab_view() {

  // Window取得
  chrome.windows.getAll(null, function(windows){

    for (var i=0; i<windows.length; i++) {
      var winId = windows[i].id;

      // Window.idからWindowのタブを取得
      chrome.tabs.getAllInWindow(winId, function(tabs){

        // タブ一覧
        for (var j=0; j<tabs.length; j++) {

          // 自分は除外
          if (tabs[j].title == 'Tab Viewer') {
            continue;
          }

          // タブタイトル
         var title = tabs[j].title;

         var extend = ":orig";
         var url = tabs[j].url;

         // すでにorigで終わってる場合、なにも追加しない
         if (":orig" == url.slice(-5)) {
           extend = "";
         }
         url = url + extend;

         var tLst = $("<div class='tgt_item form-group'>"
                + "<label class='tab_title' for='name'>" + title + "</label>"
                + "<input type='text' class='tab_url form-control' value=" + url + "></div>");

          // リストに追加
         $('#tab_list').append(tLst);
        }

        /// $('#window_list').append($('<li></li>'));
      });
    }
  });
}

function all_download() {
  $('.tgt_item').each(function() {
    var filename = $(this).find('.tab_title').text();
    var url = $(this).find('.tab_url').val();

    if (url == null || url == "") {
      return true;
    }

    core_download(url, filename);
  });
}

function core_download(url, filename) {

  if (url == null || filename == null || url.length <= 5) {
    return false;
  }
  if (":orig" != url.slice(-5)) {
    return false;
  }
  // XMLHttpRequestオブジェクトを作成する
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob"; // Blobオブジェクトとしてダウンロードする
  xhr.onload = function (oEvent) {

    // ダウンロード完了後の処理を定義する
    var blob = xhr.response;

    // それ以外のブラウザ
    // Blobオブジェクトを指すURLオブジェクトを作る
    var objectURL = window.URL.createObjectURL(blob);
    // リンク（<a>要素）を生成し、JavaScriptからクリックする
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = objectURL;
    link.download = filename;
    link.click();
    document.body.removeChild(link);
  };
  // XMLHttpRequestオブジェクトの通信を開始する
  xhr.send();
}
