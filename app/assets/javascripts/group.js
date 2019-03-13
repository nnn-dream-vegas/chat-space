$(function(){

var search_list = $("#user-search-result");

    function appendUserToSearch(user){
    var html =`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class= "chat-group-user__btn class chat-group-user__btn--add" data-user-id=${user.id} data-user-name${user.name}>追加</a>
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

  // var member = $("#chat-group-users")

  //    function appendMaemberHTML(member){
  //     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  //                   <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
  //                   <p class='chat-group-user__name'>ユーザー名</p>
  //                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
  //                 </div>`

    // }

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


  // $(".chat-group-user__btn class chat-group-user__btn--add").on("click",function(e){
  //   e.preventDefault()
  //   var userName = $(this).data('user.name')
  //   console.log(aaa)

  //   // var userId   = $(this).data('user.id')
  //   // appendGroupToMember(useName,userId)

  //   .done(function(member){
  //     $(',chat-group-user clearfix').remove();
  //   })
  // })



});
