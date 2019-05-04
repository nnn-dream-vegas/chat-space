$(document).on('turbolinks:load', function() {


    function buildHTML(message){
    var content = message.content ? message.content : '';
    var image = message.image.url ? `<img src='${message.image.url}'> ` : '';


    var html = `<div class="message" data-id="${message.id}"}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      ${content}
                      </p>
                       ${image}

                    </div>
                  </div> `
    return html;
  }

function ScrollTopNew(){
  $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
}


// 非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.form__submit').removeAttr('data-disable-with');

    // 空文字で送信ボタンを押した時にアラート
    if ($('#message_content').val() == "" && $('#message_image').val() == ""){
      alert('メッセージ入力してください')
      return
    }

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })


     .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      ScrollTopNew();
      $('#new_message')[0].reset();
    })

    .fail(function(){
      alert('メッセージの送信失敗');
    })

  })

 // 自動更新

  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_id = $('.message:last-child').data('id');

      $.ajax({
        url: location.href,
        data: { id: last_id },
        type: "GET",
        dataType: 'json',
      })

      .done(function(data){
        if (data.length > 0) {
          var insertHTML = '';
          data.forEach(function(message){
          insertHTML += buildHTML(message);
          });
          $(".messages").append(insertHTML);
          ScrollTopNew()
        }
      })
      .fail(function(){
        alert('自動更新に失敗');
      });
    } else {
      clearInterval(interval);
    }
  }, 5000);

});
