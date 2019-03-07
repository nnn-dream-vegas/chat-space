$(function() {

  function appendUser(user) {
    var html = `
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>
               `
   return html;
  };

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var href = window.location.href

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          var html = appendUser(user);
          $(".user-search-result").append(html);
        });
      }
    })

    .fail(function(){
      alert('通信に失敗しました');
    });

  });



  function clickHTML(user){
    var userId = user.attr("data-user-id");
//Jqueryのattrメソッドの結果をuerIdに代入
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${userId}'>
                  <input name='group[user_ids][]' type='hidden' value="${userId}">
                  <p class='chat-group-user__name'>${user.attr("data-user-name")}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
               </div>`
    return html;
  };


    var add_user_html = clickHTML($input);
    $("#search-users").append(add_user_html);


  $(document).on("click",".user-search-remove", function() {
    $input = $(this);

  });

  function addNewMessagesHTML(comment){
    var imagehtml = comment.image == null ? "" : `<img src="${comment.image}" class="lower-message__image">`
    var html = `
                 <div class = "message" data-messageid="${comment.id}">
                   <div class = "upper-message">
                     <div class = "upper-message__user-name">
                     ${comment.name}
                     </div>
                     <div class = "upper-message__date">
                     ${comment.date}
                     </div>
                   </div>
                   <div class = "lower-message">
                     <p class="lower-message__content">
                     ${comment.content}
                     </p>
                     ${imagehtml}
                   </div>
                 </div>
                `
    return html;
  };

 if (window.location.href.match(/\/groups\/\d+\/messages/)){
       setInterval(autoUpdate,5000)
  };

  function autoUpdate() {
    var href = window.location.href;
    var lastId = $('.message').last().attr('data-messageid');

    $.ajax({
      url: href,
      dataType:'json',
      type:'GET',
    })

    .done(function(data) {
       data.messages.forEach(function(message){
         if (message.id > lastId){
           var html = addNewMessagesHTML(message);
           $('.messages').append(html);
           $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
         };
       });
    })
    .fail(function(){
      alert('メッセージの取得に失敗しました');
    });
  };

});


