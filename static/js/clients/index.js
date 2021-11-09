// Modales

function openCreateClient(url){
    $('#createClient').load(url,function(){
        $(this).modal('show'); 
    });
}

function openEditClient(url){
    $('#editClient').load(url,function(){
        $(this).modal('show'); 
    });
}

function openDeleteClient(url){
    $('#deleteClient').load(url,function(){
        $(this).modal('show'); 
    });
}

function closeModalCreate(){
    $('#createClient').modal('hide');
}
function closeModalEdit(){
    $('#editClient').modal('hide');
}
function closeModalDelete(){
    $('#deleteClient').modal('hide');
}

// METODOS
function listClients(){
    console.log('Ready')
    $.ajax({
        url: '/client-list/',
        type: 'GET',
        success: function (response){
            console.log(response.data[0]['pk'])
            $('#clientTable tbody').html("");
            for (let i = 0; i < response.data.length; i++) {
                let row = '<tr>';
                row += '<td>' + response.data[i]['pk'] +'</td>'
                row += '<td>' + response.data[i]['fields']['type_document'] + '</td>'
                row += '<td>' + response.data[i]['fields']['num_doc'] +'</td>'
                row += 
                    '<td>' +
                        response.data[i]['fields']['first_name'] +
                        ' ' +
                        response.data[i]['fields']['last_name'] +
                    '</td>'
                
                row += '<td>'+ response.data[i]['fields']['name_consultory']+ '</td>'
                row += '<td>'+ response.data[i]['fields']['email']+ '</td>'
                row += '<td>'+ response.data[i]['fields']['direction']+ '</td>'
                row += '<td>'+ response.data[i]['fields']['phone']+ '</td>'
                row += 
                    '<td>'+
                    `<button 
                        class="btn btn-primary btn-sm"
                        onclick="openEditClient('/client-update/${response.data[i]['pk']}')"
                    >
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                        
                    <button 
                        class="btn btn-danger btn-sm"
                        onclick="openDeleteClient('/client-update/${response.data[i]['pk']}')"
                    >
                        <i class="far fa-times-circle"></i>
                    </button>`
                    '</td>'
                
                row += '</tr>'
                $('#clientTable tbody').append(row);
            }
        }, 
        error: function (error){
            console.log(error)
        }
    });
}

function createClient(){
    $.ajax({
        data: $('#formClient').serialize(),
        url: '/client-create/',
        type: 'POST',
        success: function (response){
            closeModalCreate();
            listClients();
        },
        error: function(error){
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
        }
    });
}

function updateClient(pk){
    $.ajax({
        data: $('#formClient').serialize(),
        url: '/client-update/'+pk,
        type: 'POST',
        success: function (response){
            closeModalEdit();
            listClients();
        },
        error: function(error){
            console.log(error)
            // Verificar validaciones
            // Mostrar los errores en el modal
        }
    });
}


$(document).ready(function (){
    listClients();
});