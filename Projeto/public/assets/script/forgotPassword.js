function afterSubmit() {
    document.getElementById('recuperarSenha').value = ''
}

$(function() {
    window.onbeforeunload = function () {return false;}
    $('#button_card_success').on('click', function() {
        $('#button_card_success').parent().hide()
    })
})