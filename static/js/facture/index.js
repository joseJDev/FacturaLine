$(document).ready(function (){
    $('.js-example-basic-single').select2({
        with: "50%"
    });
    
    viewButtons(false)
});


function getInfoUser(){
    
    clearValuesInput()
    
    let value = $('#searchClient').val()
    $.ajax({
        data: {
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/facture-get-client/?document='+value,
        type: 'GET',
        success: function (response){
            setValuesInput(response.data[0]);
            viewError("", false);
        },
        error: function(error){
            viewError(error.responseJSON['message'], true)
            // Limpiar los campos
            // Mostrar los errores en el modal
        }
    });
}

function generateQuotes(){
    $.ajax({
        data: {
            'client': $('#idClient').val(),
            'product': $('#product').val(),
            'quota': $('#quote').val(),
            'payment': $('#payment').val(),
            'discount': $('#discount').val(),
            'csrfmiddlewaretoken': $("[name='csrfmiddlewaretoken']").val()
        },
        url: '/facture-gen-quotes/',
        type: 'POST',
        success: function (response){
            url = response['url'];
            let win =  window.open(url, '_blank');
            win.focus();

            // Limpiar inputs
            clearValuesInput();
        },
        error: function(error){
            viewError(error.responseJSON['message'], true)
            // Limpiar los campos
            // Mostrar los errores en el modal
        }
    });
}

function setValuesInput(data){
    $('#idClient').val(data['pk']);
    $('#typeDoc').val(data['fields']['type_document']);
    $('#completeName').val(data['fields']['first_name']);
    $('#nameConsultory').val(data['fields']['name_consultory']);
    $('#email').val(data['fields']['email']);
    $('#phone').val(data['fields']['phone']);
    $('#addres').val(data['fields']['direction']);
}

function clearValuesInput(){
    $('#typeDoc').val("");
    $('#completeName').val("");
    $('#nameConsultory').val("");
    $('#email').val("");
    $('#phone').val("");    
    $('#addres').val("");
    $('#idClient').val("");
    $('#product').val(null).trigger('change');
    $('#quote').val(null).trigger('change');
    $('#payment').val("");
    $('#discount').val("");
}

function viewError(message, view){
    $('#errorClient p').remove();
    viewButtons(false)
    if(view == true){
        let element = `
            <p class="text-danger mt-2 text-center">${message}</p>
        `
        $('#errorClient').append(element);
        viewButtons(false)
    }else{
        viewButtons(true)
        $('#errorClient p').remove();
    }
}

function viewButtons(view){
    if(view == true){
        $('.generate-facture').show();
    }else{
        $('.generate-facture').hide();
    }
}