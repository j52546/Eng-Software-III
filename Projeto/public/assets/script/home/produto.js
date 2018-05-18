let pedidos = new Map()
$(function() {
    $('#form_product').submit(validateForm)
})

function validateForm() {
    $.ajax({
        url:'/compra/find/purveyor',
        method:'POST',
        data: {id: $('#cod_fornec').val()},
        error: function ( err ) {
            $('#errorFind').modal('show')
        },
        success: populateTable
    })
    return false
}

function populateTable(result) {
    if(result) {
        $('#cod_fornec').attr('disabled', true)
        let name = $('#nome').val()
        let qtd = $('#qtd').val()
        let preco = $('#valor').val()
        let total = parseInt(preco) * parseInt(qtd)
        let html = `
            <tr>
                <td>${result.id}</td>
                <td>${result.name}</td>
                <td>${name}</td>
                <td>${qtd}</td>
                <td>${preco}</td>
                <td>${total}</td>
                <td><button class="btn btn-danger" onclick="deleteItem(this)">Excluir</button></td>
            </tr>
        `
        if(pedidos.has(result.id.toString())) {
            pedidos.set(result.id.toString(), [...pedidos.get(result.id.toString()), {
                id: result.id,
                name: result.name,
                name_produto: name,
                qtd,
                preco,
                total
            }])
        } else {
            pedidos.set(result.id.toString(), [{
                id: result.id,
                name: result.name,
                name_produto: name,
                qtd,
                preco,
                total
            }])
        }
        $('#table_body').append(html)
    } else {
        $('#purveyorNotFound').modal('show')
    }
}

function deleteItem(context) {
    let cod = $('#cod_fornec').val()
    pedidos.get(cod).splice($(context).parent().parent().index()-1, 1)
    pedidos.set(cod, [...pedidos.get(cod)])
    $(context).parent().parent().remove()
}

function showWarning() {
    $('#confirmPedido').modal('show')
}

function sendPedido() {
    if(pedidos.size > 0) {  
        $.ajax({
            url:'/compra/produtos',
            method:'POST',
            data: {cod:pedidos.keys().next().value,items:pedidos.get(pedidos.keys().next().value)},
            error: function ( err ) {
               $.snackbar({
                   content:'erro no servidor',
                   style:'toast',
                   timeout: 3000
               })
            },
            success: function( result ) {
                $.snackbar({
                    content:'pedido cadastrado com sucesso',
                    style:'toast',
                    timeout:3000
                })
            }
        })
    } else {
        $.snackbar({
            content:'Sem pedido na tabela',
            style:'toast',
            timeout:2000    
        })
    }
}