//グローバル変数
var msgbox = JSON.parse(localStorage.getItem("msgbox"));
if (msgbox == null) {
  var msgbox = {
    "text1": ["friend_text", "はじめまして", "2020/1/1 00:00:00"],
  };
}
var replybox = JSON.parse(localStorage.getItem("replybox"));
if (replybox == null) {
  var replybox = {
    "0": "おはよう",
    "1": "よろしくね",
    "2": "こんにちは",
    "3": "こんばんわ",
    "4": "そうなんだ",
  };
}
var i = 1;

//初回メッセージ表示
var page1 = document.getElementById('first-page');
  Object.keys(msgbox).forEach(function (key) {
    var c_type = msgbox[key][0];
    if (c_type == "my_text") {
      t = "my_cont";
    } else {
      t = "friend_cont";
    }

    $('<div class="mess_cont" id="message_' + i + '">').text("").appendTo('#messages');
    $('<div class= "' + t + '">').html('<img src="./kao2.png" class="icon_pic">').appendTo('#message_' + i);
    $('<div class="container_child" id="messages_child_' + i + '">').text("").appendTo('#message_' + i);
    $('<div class= "' + c_type + '"id="mess_id_' + i + '">').text(msgbox[key][1]).appendTo('#messages_child_' + i);
    $('<div class= "time_print">').text(msgbox[key][2] + " に送信").appendTo('#mess_id_' + i);
    i += 1;
  });
  sc();

//スクロール処理
function sc() {
  $('html').animate({
    scrollTop: document.getElementById("messages").scrollHeight
  });
}

//最新メッセージの表示
function mess_print_one(key) {
  var c_type = msgbox[key][0];
  if (c_type == "my_text") {
    t = "my_cont";
  } else {
    t = "friend_cont";
  }

  $('<div class="mess_cont" id="message_' + i + '">').text("").appendTo('#messages');
  $('<div class= "' + t + '">').html('<img src="./kao2.png" class="icon_pic">').appendTo('#message_' + i);
  $('<div class="container_child" id="messages_child_' + i + '">').text("").appendTo('#message_' + i);
  $('<div class= "' + c_type + '"id="mess_id_' + i + '">').text(msgbox[key][1]).appendTo('#messages_child_' + i);
  $('<div class= "time_print">').text(msgbox[key][2] + " に送信").appendTo('#mess_id_' + i);
  i += 1;
}

//メッセージ送信
function message_push() {
  var push_text = document.getElementById("message").value;
  if (push_text != "") {
    var insert_num = Object.keys(msgbox).map(function (data) {
      return data;
    })
    insert_num = insert_num.length + 1;
    if(insert_num%3==0){realtime_input_message();}; //3の倍数の時に学習
    var insert_name = "text" + insert_num;
    var today = new Date();
    today = today.toLocaleString({ timeZone: 'Asia/Tokyo' });
    msgbox[insert_name] = ["my_text", push_text, today];
    localStorage.setItem("msgbox", JSON.stringify(msgbox));
    document.getElementById("message").value = "";
    mess_print_one(insert_name);
    sc();
    setTimeout(reply, 1000);
  }

}

//メッセージ返信
function reply() {
  var random_num = Object.keys(replybox).map(function (data) {
    return data;
  })
  random_num = Math.floor(Math.random() * random_num.length);
  var push_text = replybox[random_num];
  var insert_num = Object.keys(msgbox).map(function (data) {
    return data;
  })
  insert_num = insert_num.length + 1;
  var insert_name = "text" + insert_num;
  var today = new Date();
  today = today.toLocaleString({ timeZone: 'Asia/Tokyo' });
  msgbox[insert_name] = ["friend_text", push_text, today];
  localStorage.setItem("msgbox", JSON.stringify(msgbox));
  mess_print_one(insert_name);
  sc();
}


function set_btn() {
  document.getElementById("setting_box").classList.toggle('is-show');
  var v_flg = document.getElementById("setting_back").style.visibility;
  if (v_flg == "hidden") {
    document.getElementById("setting_back").style.visibility = "visible";
    document.getElementById("send_area").style.visibility = "hidden";
    $('html').animate({
      scrollTop: 0
    });
  } else if (v_flg == "visible") {
    document.getElementById("setting_back").style.visibility = "hidden";
    document.getElementById("send_area").style.visibility = "visible";
    sc();
  } else {
    document.getElementById("setting_back").style.visibility = "visible";
    document.getElementById("send_area").style.visibility = "hidden";
        $('html').animate({
      scrollTop: 0
    });
  }

};

function input_message() {
  var get_input = document.getElementById("input_text").value;
  $("#print_box").text(get_input);
  var insert_num = Object.keys(replybox).map(function (data) {
    return data;
  })
  insert_num = insert_num.length;
  replybox[insert_num] = get_input;
  localStorage.setItem("replybox", JSON.stringify(replybox));
  document.getElementById("input_text").value = "";
}

function reset() {
  localStorage.clear();
  alert("すべての履歴を消去しました。");
}

function realtime_input_message() {
  var get_input = document.getElementById("message").value;
  var insert_num = Object.keys(replybox).map(function (data) {
    return data;
  })
  insert_num = insert_num.length;
  replybox[insert_num] = get_input;
  localStorage.setItem("replybox", JSON.stringify(replybox));
  document.getElementById("input_text").value = "";
}