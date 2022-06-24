const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show Error
function showError(item,message) {
    const formControl = item.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}

//Show Success
function showSuccess(item) {
    const formControl = item.parentElement;
    formControl.className = "form-control success"
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
}

//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(item) {
        console.log(item.value)
        if(item.value.trim() === ''){
            showError(item,`${getFieldName(item)} is required`);
        }else {
            showSuccess(item);
        }
    })
}

//checkLength
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input,`${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max){
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
          );
    }else{
        showSuccess(input)
    }
}

//Check password match
function checkPasswordMatch(input1,input2){
    if(input1.value !== input2.value){
        showError(input2, "Password do not match")
    }
}

//Get fields name
function getFieldName(item){
    return item.id[0].toUpperCase() + item.id.slice(1);
}

//Event listeners
form.addEventListener('submit', function(e) {
    console.log(e);
    e.preventDefault();

    checkRequired([username,email,password,password2]);
    checkLength(username,6,15);
    checkLength(password,8,25);
    checkEmail(email);
    checkPasswordMatch(password,password2);

})