$(function(){
    $('#closeOptions').on('click', changeNameBtn)
    $('#dataTableClin').DataTable()
})

function changeNameBtn() {
    $('.btnInformation').each((index, element)=>{
        if($(element).text() === 'Abrir') {
            $(element).html('<i class="fa fa-plus" aria-hidden="true"></i>')
        } else {
            $(element).text('Abrir')
        }
    })
}

function moreInformation(context){
    $('#table_items').DataTable().clear().draw()
    let data = $('#dataTableClin').DataTable().row($(context).parent().parent()).data()
    if(data.length > 0) {
        let id = data[6]
        $.ajax({
            url:'/approve/sales/items',
            method: 'POST',
            data: {id},
            error: function ( err ) {
                $.snackbar({
                    content:'Falha ao receber dados',
                    timeout:3000
                })
            },
            success: function ( items ) {
                $('#all_items').modal('show')
                if(items && items.length > 0) {
                    items.map(item=>{
                        $('#table_items').DataTable().row.add([
                            item.COD,
                            item.NOME,
                            item.PRECO.toFixed(2),
                            item.QTD,
                            item.DESCR,
                            item.SALDO
                        ]).draw()
                    })
                }
            }
        })
    }
}