const CNPJ_LENGTH = 18
const CPF_LENGTH = 14
const MIN_LENGTH_NAME_CLIENT = 6
$(function(){
 $('#doc').mask('999.999.999-99')
 $('#nome').on('keyup', validateNome)
 $('#email').on('keyup', validateEmail)
 $('#doc').on('keyup', validateDoc)
  $('#pessoa_fisica').on('change', function(){
      $('#doc').mask('999.999.999-99')
      if($('#doc').val().length < CPF_LENGTH) {
        $('#doc').addClass('is-invalid')
      } else {
        $('#doc').addClass('is-valid')
      }
  })
  $('#pessoa_juridica').on('change', function(){
      $('#doc').mask('99.999.999/9999-99')
      if($('#doc').val().length < CNPJ_LENGTH) {
        $('#doc').addClass('is-invalid')
        $('#doc_error').show(500)
      } else {
        $('#doc').addClass('is-valid')
        $('#doc_error').hide(500)
      }
  })  
})

function validateDoc() {
    if(document.getElementById('pessoa_juridica').checked) {
        if($(this).val().length < CNPJ_LENGTH) {
            $(this).addClass('is-invalid')
            $(this).removeClass('is-valid')
            $('#doc_error').show(500)
          } else {
            $(this).addClass('is-valid')
            $(this).removeClass('is-invalid')
            $('#doc_error').hide(500)
          }
    } else {
        if($(this).val().length < CPF_LENGTH) {
            $(this).addClass('is-invalid')
            $(this).removeClass('is-valid')
            $('#doc_error').show(500)
          } else {
            $(this).addClass('is-valid')
            $(this).removeClass('is-invalid')
            $('#doc_error').hide(500)
          }
    }
}

function validateNome(){
    if($(this).val().length < MIN_LENGTH_NAME_CLIENT) {
        $(this).addClass('is-invalid')
        $(this).removeClass('is-valid')
    } else {
        $(this).removeClass('is-invalid')
        $(this).addClass('is-valid')
    }
}

function validateEmail() {
    if(new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/).test(this.value.toString())) {
        $(this).removeClass('is-invalid')
        $(this).addClass('is-valid')
        $('#email_error').hide(500)
    } else {
        $(this).removeClass('is-valid')
        $(this).addClass('is-invalid')
        $('#email_error').show(500)
    }
}