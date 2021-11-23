var token = "";
var tuid = "";
var ebs = "";

var twitch = window.Twitch.ext;
twitch.rig.log('headmanx');

//var requests = {
//    set: createRequest('POST', 'cycle')
//};

/*
 * rigのログにエラーを表示する
 */
function logError(_, error, status) {
  twitch.rig.log('1EBS request returned '+status+' ('+error+')');
}

function updateBlock(hex) {
}

/*
 * リクエストを作成する
 * IN type   method
 * out ????
 */
function createRequest(type, method) {
  // ボタンを押したときは'POST', 'cycle'
  return {
    // タイプ、問い合わせ先、成功時の処理、ログエラーの関数
    type: type,
    //url: location.protocol + '//localhost:8081/v2/' + method,
    url: 'https://tw.sbfm.jp/v2/' + method,
    success: updateBlock,
    data: { 
      data: document.fm.teamBox.value,
    },
    error: logError
  }
}
function createRequest2 (type, method) {
  // ボタンを押したときは'POST', 'cycle'
  return {
    // タイプ、問い合わせ先、成功時の処理、ログエラーの関数
    type: type,
    //url: location.protocol + '//localhost:8081/v2/' + method,
    url: 'https://tw.sbfm.jp/v2/color/' + method,
    success: updateBlock2,
    error: logError
  }
}
// 初回起動時の処理
function updateBlock2(hex) {
  document.fm.teamBox.value = hex;
}

/*
 * Twitch向けのなにか？
 * このコールバックは、拡張機能のコンテキストが発生したときに発生します。
 */
twitch.onContext(function(context) {
    twitch.rig.log(context);
});

twitch.onAuthorized(function(auth) {
    // authはユーザーのが勝手に入っている
    token = auth.token;
    var firstRequest = { get: createRequest2('POST', 'getTeamJson')};
    Object.keys(firstRequest).forEach((req) => {
        firstRequest[req].headers = { 'Authorization': 'Bearer ' + token }
    });
    $.ajax(firstRequest.get);
});

/*
 * トークンを利用して認証を作成する
 */
function setAuth(token) {
    Object.keys(requests).forEach((req) => {
        //twitch.rig.log('Setting auth headers');
        requests[req].headers = { 'Authorization': 'Bearer ' + token }
    });
}


$(function() {
    /*
     * ボタンを押したとき
     */
    $('#cycle').click(function() {
        // トークンが設定されていないとき、エラーを出力する
        if(!token) { return twitch.rig.log('Not authorized'); }
        // Requestのset createRequest('POST', 'cycle') をよぶ
        var requests = { set: createRequest('POST', 'cycle')};
        Object.keys(requests).forEach((req) => {
            requests[req].headers = { 'Authorization': 'Bearer ' + token }
        });
        $.ajax(requests.set);
    });
});
