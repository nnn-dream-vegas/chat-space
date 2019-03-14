$(document).on('turbolinks:load', function() {

var search_list = $("#user-search-result");
var member_list = $("#chat-group-users")

    function appendUserToSearch(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class= "chat-group-user__btn class chat-group-user__btn--add",id="add_btn" data-user-id=${user.id} data-user-name${user.name}>追加</a>
               </div>`
    search_list.append(html);


   }


    function appendErrMsgToHTML(msg){
      var html =
        `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${ msg }</p>
        </div>`

      search_list.append(html)
    }




  function appendMember(id,name) {
    var html =
      `<div class="chat-group-user clearfix" id="chat-group-user">
      <input type="hidden" name="group[user_ids][]" value=${id}>
      <p class="chat-group-user__name" >${name}
      </p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove" data-user-id=${id}>削除
      </a>
      </div>`

      member_list.append(html);

  }



  $("#user-search-field").on("keyup",function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

     .done(function(user){
      $("#user-search-result").empty();
     if (user.length !== 0) {
       user.forEach(function(user){
       appendUserToSearch(user);
       });
     }
     else {
       appendErrMsgToHTML("一致するユーザがいません");
     }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })


// 追加ボタンの機能
  $("#user-search-result").on("click",function(){

    var name = $(this).data('user.name')
    var id   = $(this).data('user.id')
    var html = appendMember(name,id);

    $('#chat-group-users').append(html);
    $(this).parent('.chat-group-user').remove();
  });

// 削除ボタンの機能

  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $('#chat-group-user').remove();
  })

});


