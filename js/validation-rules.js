$(document).ready(function(){

//Regex for email number validation
    $.validator.addMethod("emailRegex", function(value, element) {
    return this.optional(element) || /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/.test(value);
    }, "");

    $("#bbfae4f3-94ab-44f3-b9e4-6599219982d7").validate({
         rules:{
            firstName:{
                 required: true
            },
            lastName:{
                 required: true
            },
            email:{
                 required: true,
                 emailRegex: true
            },
            companyName:{
                required: true
            }
        },
        errorPlacement: function(error, element) {
            if(element.attr('name') === 'firstName'){
            error.appendTo( element.prop('placeholder', "Please enter your first name.") );
            }else if(element.attr('name') === 'lastName'){
            error.appendTo( element.prop('placeholder', "Please enter your last name.") );
            }else if(element.attr('name') === 'email'){
            error.appendTo( element.prop('placeholder', "Please enter a valid email address.") );
            }else if(element.attr('name') === 'companyName'){
            error.appendTo( element.prop('placeholder', "Please enter a company name.") );
            }
        }
    });

});
