var cnt = 1;


$(function() {
  // 初期表示
  tab_view();

  // 更新ボタンクリック
  $('#view_reload').click(function() {
    location.reload();
    return false;
  });
  // 一括ダウンロードボタンクリック
  $('#all_download').click(function() {
    all_download();
    return false;
  });
  // タブ閉じボタンクリック
  $('#tab_close').click(function() {
    tab_close();
    location.reload();
    return false;
  });
});

// 初期表示
function tab_view() {

  // Window取得
  chrome.windows.getAll(null, function(windows) {

    for (var i = 0; i < windows.length; i++) {
      var winId = windows[i].id;

      // Window.idからWindowのタブを取得
      chrome.tabs.getAllInWindow(winId, function(tabs) {

        // タブ一覧
        for (var j = 0; j < tabs.length; j++) {

          // 自分は除外
          if (tabs[j].title == 'Tab Viewer') {
            continue;
          }

          // タブタイトル
          var title = tabs[j].title;

          // 不可する文字列
          var extend = ":orig";
          var url = tabs[j].url;

          // すでにorigで終わってる場合、なにも追加しない
          if (":orig" == url.slice(-5)) {
            extend = "";
          }
          url = url + extend;

          var tLst = $("<div class='tgt_item form-group'>" +
            "<label class='tab_title' for='name'>" + title + "</label>" +
            "<input type='text' class='tab_url form-control' value=" + url + "></div>");

          // リストに追加
          $('#tab_list').append(tLst);
        }

        /// $('#window_list').append($('<li></li>'));
      });
    }
  });
}

// タブ閉じる処理
function tab_close() {

  // Window取得
  chrome.windows.getAll(null, function(windows) {

    for (var i = 0; i < windows.length; i++) {
      var winId = windows[i].id;

      // Window.idからWindowのタブを取得
      chrome.tabs.getAllInWindow(winId, function(tabs) {

        // タブ一覧
        for (var j = 0; j < tabs.length; j++) {

          // 自分は除外
          if (tabs[j].title == 'Tab Viewer') {
            continue;
          }
          // tabIDを指定してタブを閉じる
          chrome.tabs.remove(tabs[j].id);
        }
      });
    }
  });
}

// download関数
function all_download() {
  $('.tgt_item').each(function() {
    var filename = $(this).find('.tab_title').text();
    var url = $(this).find('.tab_url').val();

    if (url == null || url == "") {
      return true;
    }
    // download本題
    core_download(url, filename);
  });
}

// download本体
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
  xhr.onload = function(oEvent) {

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
