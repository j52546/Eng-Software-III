$(function(){

})

function openModal(element) {
   $('#'+element.toString()).modal('show')
}

function updateAccount(element) {
    element.ROLE = document.getElementById(element.DOCIND).value
   $.ajax({
       url:'/atualizar_conta',
       method:'POST',
       data: element,
       timeout:10000,
       error: function(err) {
           console.log(err)
           alert('error ao atualizar cadastro')
       },
       success: function(res) {
           $('#'+element.COD.toString()).modal('hide')
           location.href='/'
       }
   })
}