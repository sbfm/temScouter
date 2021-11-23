const cardText = {type:"type", category:"category", wait:"wait", priority:"priority", dmg:"dmg", sta:"sta" }
//const cardText = {type:"タイプ", category:"種別", wait:"ウェイト", priority:"優先度", dmg:"威力", sta:"スタミナ" }

/*
 * モンスターデータを更新する
 */
function updateBlock(text) {
  teamList = JSON.parse(text);
  for (let i = 0; i < 8; i++) {
    let dsb = document.getElementsByClassName('stCard')[i];
    var mdata = teamList["monster"][i];
    // -------------------
    // 基本情報のセット
    // -------------------
    // 名前
    dsb.getElementsByClassName('baseName')[0].innerText = mdata["name"];
    // 個性
    dsb.getElementsByClassName('trateName')[0].innerText = mdata["trate"]["name"];
    // 持ち物
    dsb.getElementsByClassName('itemBox')[0].innerText = mdata["item"]["name"];
    // -------------------
    // ステータスセット
    // -------------------
    for (var j = 0; j < 7; j++) {
      // カテゴリー背景
      dsb.getElementsByClassName('statusBackground')[j].style.backgroundImage = "url( " +  makeStatusCategory() + " )";
      // 実数値
      dsb.getElementsByClassName('statusValue')[j].innerText = mdata["allstatus"][j]["v"];
      // 配分割合
      dsb.getElementsByClassName('statusValue')[j].style.background = "linear-gradient(" + makeStatusBar(mdata["allstatus"][j]["BS"],mdata["allstatus"][j]["SV"],mdata["allstatus"][j]["TV"]) + ")";
    }
    // -------------------
    // タイプ・弱点
    // -------------------
    let typeImg = makeTypeIcon(mdata["type1"],17);
    if ( mdata["type2"] != 0 ) {
      typeImg += makeTypeIcon(mdata["type2"],17);
    }
    // 自分のタイプをセット
    dsb.getElementsByClassName('type')[0].innerHTML = typeImg;
    let week = ["","","",""];
    for (var j = 1; j < 13; j++) {
      let ans = weakness[j][mdata["type1"]] + weakness[j][mdata["type2"]];
      if(ans == 2) {
        week[3] += makeTypeIcon(j,17);
      }else if(ans == 3) {
        week[2] += makeTypeIcon(j,17);
      }else if(ans == 5) {
        week[1] += makeTypeIcon(j,17);
      }else if(ans == 6) {
        week[0] += makeTypeIcon(j,17);
      }
    }
    for (var j = 0; j < 4; j++) {
      // 弱点のセット
      dsb.getElementsByClassName('weeklist')[j].innerHTML = week[j];
    }
    // -------------------
    // 技のセット
    // -------------------
    for (var j = 0; j < 4; j++) {
      // 技名をセット
      dsb.getElementsByClassName('techniqueName')[j].innerText = mdata["technique"][j]["nosynergy"]["name"];
      // 技のクールとタイプをセット
      dsb.getElementsByClassName('techniqueCard')[j].style.backgroundImage = "url( " +  makeTechniqueBackground(mdata["technique"][j]["nosynergy"]["type"],mdata["technique"][j]["nosynergy"]["wait"]) + " )";
    }
  }
  return 0;
}

const switchBlock = ["b1","b2","b3","b4","b5","b6","b7","b8"];
const statusBlock = ["layoutBox1","layoutBox2","layoutBox3","layoutBox4","layoutBox5","layoutBox6","layoutBox7","layoutBox8"];
// -----------------------
// リスナー登録
// -----------------------
for (let i = 0; i < 8; i++) {
  let statusBox = document.getElementById(statusBlock[i]);
  // ステータス画面表示処理
  document.getElementById(switchBlock[i]).addEventListener("mouseover", function(){ statusBox.style.display = 'block';}, false); 
  statusBox.getElementsByClassName("stCard")[0].addEventListener("mouseover", function(){statusBox.style.display = 'block';}, false);
  //ステータス画面非表示処理
  document.getElementById(switchBlock[i]).addEventListener("mouseout", function(){ statusBox.style.display = 'none';}, false);
  statusBox.getElementsByClassName("stCard")[0].addEventListener("mouseout", function(){ statusBox.style.display = 'none';}, false);
  //技の詳細表示
  for (let j = 0; j < 4; j++) {
    statusBox.getElementsByClassName("techniqueCard")[j].addEventListener("mouseover", function(){
      let dw = statusBox.getElementsByClassName("detail")[0];
      let dt = statusBox.getElementsByClassName("detail-t")[0];
      let du = statusBox.getElementsByClassName("detail-u")[0];
      const mtl = teamList["monster"][i]["technique"][j]["nosynergy"];
      dw.innerHTML = "<table class=\"techniqueDetail\"><tr><td>" + cardText["type"] + "</td><td class=\"ttype\"></td><td>" + cardText["category"] + "</td><td class=\"tcategory\"></td><td>" + cardText["wait"] + "</td><td class=\"twait\"></td></tr><tr><td>" + cardText["priority"] + "</td><td class=\"tpriority\"></td><td>" + cardText["dmg"] + "</td><td class=\"tpow\"></td><td>" + cardText["sta"] + "</td><td class=\"tsta\"></td></tr><tr><td colspan=\"6\" class=\"tdetail\"></td></tr></table>"; 
      du.innerHTML = "<table class=\"techniqueDetail\"><tr><td>" + cardText["type"] + "</td><td class=\"ttype\"></td><td>" + cardText["category"] + "</td><td class=\"tcategory\"></td><td>" + cardText["wait"] + "</td><td class=\"twait\"></td></tr><tr><td>" + cardText["priority"] + "</td><td class=\"tpriority\"></td><td>" + cardText["dmg"] + "</td><td class=\"tpow\"></td><td>" + cardText["sta"] + "</td><td class=\"tsta\"></td></tr><tr><td colspan=\"6\" class=\"tdetail\"></td></tr></table>"; 
      du.getElementsByClassName("ttype")[0].innerHTML = makeTypeIcon(mtl["type"],17); 
      du.getElementsByClassName("tcategory")[0].innerHTML = categoryLitst[mtl["category"]]; 
      du.getElementsByClassName("twait")[0].innerHTML = mtl["wait"]; 
      du.getElementsByClassName("tpriority")[0].innerHTML = priorityLitst[mtl["priority"]]; 
      du.getElementsByClassName("tpow")[0].innerHTML = mtl["pow"]; 
      du.getElementsByClassName("tsta")[0].innerHTML = mtl["sta"]; 
      du.getElementsByClassName("tdetail")[0].innerHTML = mtl["text"]; 
      du.style.display = 'block';
      // triggerがある場合、処理を続行
      if (teamList["monster"][i]["technique"][j]["trigger"]){
        const mtt = teamList["monster"][i]["technique"][j]["synergy"];
        dw.getElementsByClassName("tdetail")[0].innerHTML = mtt["text"]; 
        dw.getElementsByClassName("ttype")[0].innerHTML = makeTypeIcon(mtt["type"],17); 
        dw.getElementsByClassName("tcategory")[0].innerHTML = categoryLitst[mtt["category"]]; 
        dw.getElementsByClassName("twait")[0].innerHTML = mtt["wait"]; 
        dw.getElementsByClassName("tpriority")[0].innerHTML = priorityLitst[mtt["priority"]]; 
        dw.getElementsByClassName("tpow")[0].innerHTML = mtt["pow"]; 
        dw.getElementsByClassName("tsta")[0].innerHTML = mtt["sta"]; 
        dw.getElementsByClassName("tdetail")[0].innerHTML = mtt["text"]; 
        dw.style.visibility = 'visible';
        dt.innerHTML = "↑ +" + makeTypeIcon(teamList["monster"][i]["technique"][j]["trigger"],20);; 
        dt.style.visibility = 'visible';
      }
    }, false);
    statusBox.getElementsByClassName("techniqueCard")[j].addEventListener("mouseout", function(){
      statusBox.getElementsByClassName("detail")[0].style.visibility = 'hidden';
      statusBox.getElementsByClassName("detail-t")[0].style.visibility = 'hidden';
      statusBox.getElementsByClassName("detail-u")[0].style.display = 'none';
    }, false);
  }
  // 持ち物の詳細表示
  statusBox.getElementsByClassName("itemBox")[0].addEventListener("mouseover", function(){
    statusBox.getElementsByClassName("detail")[0].innerHTML = teamList["monster"][i]["item"]["text"]; 
    statusBox.getElementsByClassName("detail")[0].style.visibility = 'visible';
  }, false);
  statusBox.getElementsByClassName("itemBox")[0].addEventListener("mouseout", function(){
    statusBox.getElementsByClassName("detail")[0].style.visibility = 'hidden';
  }, false);
  // 個性の詳細表示
  statusBox.getElementsByClassName("trateBox")[0].addEventListener("mouseover", function(){
    statusBox.getElementsByClassName("detail")[0].innerHTML = teamList["monster"][i]["trate"]["text"]; 
    statusBox.getElementsByClassName("detail")[0].style.visibility = 'visible';
  }, false);
  statusBox.getElementsByClassName("trateBox")[0].addEventListener("mouseout", function(){
    statusBox.getElementsByClassName("detail")[0].style.visibility = 'hidden';
  }, false);
}
