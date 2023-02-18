const required_fields = document.querySelectorAll('.required-fields');
const emailFields = document.querySelectorAll('.email-input');
const passwordField = document.querySelector('.has-password');
const confirmedPasswordField = document.querySelector('.confirmed-pass');
const form = document.querySelector('#form');

const submitBtn = document.querySelector('#register_btn')

// Valid Formats
const validEmailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const validPasswordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

let isCorrect = false

document.addEventListener('DOMContentLoaded', () => {
    // calling functions after the document is fully loaded
    // Loop through email fields
    emailFields.forEach(field => {
        field.addEventListener('input', () => {
            validateEmail(field);
        });
    });

    passwordField.addEventListener('input', () => {
        validatePassword(passwordField);
    });
    confirmedPasswordField.addEventListener('input', () => {
        checkPasswordMatched(confirmedPasswordField);
    });
})


function checkEmptyFields() {
    let empty = false
    required_fields.forEach(field => {
        // Check if fields are empty
        if(field.value == ''){
            field.nextElementSibling.innerText = 'Fields cannot be empty!';
            field.nextElementSibling.classList.add('text-red-600');
            empty = true;
        }
    })

    return empty;
}
function alertMsg(alertType, msg, inputElement){
    if(alertType == 'success'){
        inputElement.nextElementSibling.nextElementSibling.innerText = `${msg}`
        inputElement.nextElementSibling.nextElementSibling.classList.add('text-green-600')
        // Empty value for error message
        inputElement.nextElementSibling.innerText = ''
        isCorrect = true
    }else{
        inputElement.nextElementSibling.innerText = `${msg}`
        inputElement.nextElementSibling.classList.add('text-red-600')
        // Empty value for success message
        inputElement.nextElementSibling.nextElementSibling.innerText = ''

        // submitBtn.preventDefault();
        isCorrect = false
    }
}   
function validateEmail(field){
    if(field.value.match(validEmailFormat)){
        alertMsg('success', 'Email is valid.', field);
    }else{
        alertMsg('error', 'Invalid Email.', field);
    }
}

function validatePassword(field){
    if(field.value.match(validPasswordFormat)){
        alertMsg('success', 'Password is valid.', field);
    }else{
        alertMsg('error', 'Password must contain at least 1 Uppercase letter, 1 number and 8 characters.', field);
    }
}

function checkPasswordMatched(field){
    if(field.value == passwordField.value){
        alertMsg('success', 'Password is matched!.', field);
    }else{
        alertMsg('error', 'Password not matched!.', field);
    }
    
}

submitBtn.addEventListener('click', (e) => {
    if(checkEmptyFields()){
        e.preventDefault();
    }
    else{
        
        if(isCorrect == true){
            // Trigger submit form
            e.target.parentElement.submit();
        }else{return false}
    }
})