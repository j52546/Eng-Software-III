let pedidos = new Map()
$(function() {
    $('#validateForm').on('click', validateForm)
    $('#form_product').submit(savePedido)
})

function validateForm() {
    $.ajax({
        url:'/compra/find/purveyor',
        method:'POST',
        data: {id_fornec: $('#cod_fornec').val(), id_prod: $('#id_produto').val()},
        error: function ( err ) {
            $('#errorFind').modal('show')
        },
        success: populateInputs
    })
}

function populateInputs(result) {
    if(!('prodNotFound' in result) && !('purveyorNotFound' in result)) {
        $('#cod_fornec').attr('disabled', true)
        $('#id_produto').attr('disabled', true)
        $('#valor').attr('disabled', true).val(result.preco_prod)
        $('#descricao').val(result.desc_prod)
        $('#nome_produto').val(result.name_prod)
        $('#nome_fornec').val(result.name_purveyor)
        $('#saveBtn').attr('disabled', false)
    } else if('purveyorNotFound' in result) {
        $('#purveyorNotFound').modal('show')
    } else {
        $('#prodNotFound').modal('show')
    }
}

function savePedido() {
    let name_prod = $('#nome_produto').val()
    let name_fornec = $('#nome_fornec').val()
    let cod_fornec = $('#cod_fornec').val()
    let cod_prod = $('#id_produto').val()
    let qtd = $('#qtd').val()
    let preco = $('#valor').val()
    let total = parseFloat(preco) * parseInt(qtd)
    let table = $('#dataTable').DataTable()
    table.row.add([
        cod_fornec,
        name_prod,
        name_fornec,
        qtd,
        preco,
        total.toFixed(2),
        '<button class="btn btn-danger" onclick="deleteItem(this)">Excluir</button>'
    ]).draw( false )

    if(pedidos.has(cod_fornec.toString())) {
        pedidos.set(cod_fornec.toString(), [...pedidos.get(cod_fornec.toString()), {
            id: cod_fornec,
            name_fornec: name_fornec,
            name_produto: name_prod,
            id_prod: cod_prod,
            qtd,
            preco,
            total
        }])
    } else {
        pedidos.set(cod_fornec.toString(), [{
            id: cod_fornec,
            name_fornec: name_fornec,
            name_produto: name_prod,
            id_prod: cod_prod,
            qtd,
            preco,
            total
        }])
    }
    $('#saveBtn').attr('disabled', true)
    clearFields()
    return false
}

function clearFields(){
    $('#id_produto').attr('disabled', false).val('')
    $('#descricao').val('')
    $('#valor').val('')
    $('#qtd').val('')
}

function deleteItem(context) {
    let cod = $('#cod_fornec').val()
    pedidos.get(cod.toString()).splice($(context).parent().parent().index(), 1)
    pedidos.set(cod.toString(), [...pedidos.get(cod.toString())])
    $('#dataTable').DataTable().row($(context).parent().parent()).remove().draw()
}

function showWarning() {
    $('#confirmPedido').modal('show')
}

function sendPedido() {
    console.log(pedidos)
    // if(pedidos.size > 0) {  
    //     $.ajax({
    //         url:'/compra/produtos',
    //         method:'POST',
    //         data: {cod:pedidos.keys().next().value,items:pedidos.get(pedidos.keys().next().value)},
    //         error: function ( err ) {
    //            $.snackbar({
    //                content:'erro no servidor',
    //                style:'toast',
    //                timeout: 3000
    //            })
    //         },
    //         success: function( result ) {
    //             $.snackbar({
    //                 content:'pedido cadastrado com sucesso',
    //                 style:'toast',
    //                 timeout:3000
    //             })
    //         }
    //     })
    // } else {
    //     $.snackbar({
    //         content:'Sem pedido na tabela',
    //         style:'toast',
    //         timeout:2000    
    //     })
    // }
}