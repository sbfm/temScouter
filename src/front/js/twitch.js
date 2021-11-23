var token = "";
var tuid = "";
var ebs = "";
var twitch = window.Twitch.ext;


var requests = {
    set: createRequest('POST', 'cycle'),
    get: createRequest('GET', 'getTeamStatus')
};

/*
 * リクエストを作成する
 * IN type   method
 * out ????
 */
function createRequest(type, method) {
    return { // タイプ、問い合わせ先、成功時の処理、ログエラーの関数
        type: type,
        //url: location.protocol + '//localhost:8081/v2/' + method,
        url: 'https://tw.sbfm.jp/v2/' + method,
        success: updateBlock,
        error: logError
    }
}

/*
 * トークンを利用して認証を作成する
 */
function setAuth(token) {
    Object.keys(requests).forEach((req) => {
        //twitch.rig.log('Setting auth headers');
        requests[req].headers = { 'Authorization': 'Bearer ' + token }
    });
}

/*
 * Twitchの機能からコールバックがあったらログに出す
 * このコールバックは、拡張機能のコンテキストが発生したときに発生します。
 */
twitch.onContext(function(context) {
    twitch.rig.log(context);
});

/*
 * このコールバックは、JWTが更新されるたびに発生します。
 */
twitch.onAuthorized(function(auth) {
    // authはユーザーのが勝手に入っている
    token = auth.token;
    tuid = auth.userId;

    // 認証を作成する
    setAuth(token);
    // get
    $.ajax(requests.get);
});


/*
 * rigのログにエラーを表示する
 */
function logError(_, error, status) {
  twitch.rig.log('EBS request returned '+status+' ('+ error + ')');
}

/*
 * rigのログに成功を表示する
 */
function logSuccess(hex, status) {
  twitch.rig.log('EBS request returned '+hex+' ('+status+')');
}

/*
 * ブロードキャストの受領
 */
$(function() {
    twitch.listen('broadcast', function (target, contentType, text) {
        twitch.rig.log("hogeeeeeeee????");
        // 更新する
        $.ajax(requests.get);
    });
});

