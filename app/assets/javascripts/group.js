$(document).on('turbolinks:load', function() {

var search_list = $("#user-search-result");
var member_list = $("#chat-group-users")

    function appendUserToSearch(user){
    var html =`<div class="chat-group-user clearfix" id="chat-group-member">
                <p class="chat-group-user__name">${user.name}</p>
                <a id="add_btn" class= "chat-group-user__btn class chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
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




  function appendMember(memberName,memberId) {
    var html =
      `<div class="chat-group-user clearfix" id="chat-group-user">
      <input type="hidden" name="group[user_ids][]" value=${memberId}>
      <p class="chat-group-user__name" >${memberName}
      </p>
      <a id="remove_btn"class="user-search-remove chat-group-user__btn chat-group-user__btn--remove">削除
      </a>
      </div>`

      member_list.append(html);

  }

  var currentId = $('#current').val();
  var user_list = [currentId];
  console.log(user_list)

  $("#user-search-field").on("keyup",function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input, id: user_list},
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
  $("#user-search-result").on("click",'#add_btn',function(e){
    var memberName = $(this).data('user-name')
    var memberId   = $(this).data('user-id')
    var html = appendMember(memberName,memberId);
    user_list.push(memberId);
    console.log(user_list);
    $('#chat-group-member').remove();
  });

// 削除ボタンの機能

  $('#chat-group-users').on('click','#remove_btn',function(e){
    var memberId   = $(this).data('user-id')
    $('#chat-group-user').remove();
    user_list.shift(memberId);

  })
});


