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

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })

 // 非同期通信
  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var id = $('.message:last-child').data('id');
      $.ajax({
        url: location.href,
        data: { id: id },
        type: "GET",
        dataType: 'json',
      })

      .done(function(data){
        var insertHTML = '';
        data.forEach(function(message){
        insertHTML += buildHTML(message);
        });
        $(".messages").append(insertHTML);
        ScrollTopNew();
      })
      .fail(function(){
        alert('自動更新に失敗');
      });
    } else {
      clearInterval(interval);
    }
  }, 5000);

});
