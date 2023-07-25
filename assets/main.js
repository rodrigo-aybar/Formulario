const form = document.getElementById('form')
const nameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passInput = document.getElementById('password')
const phoneInput = document.getElementById('phone')

const checkUsername = () => {
    let valid = false;
    const min = 3;
    const max = 20;
    const username = nameInput.value.trim()
    if(isEmpty(username)){
        showError(nameInput, 'Debe completar un nombre de usuario');
    } else if (isBetween(username.length, min, max)){
        showError(nameInput, `El nombre debe tener entre ${min} y ${max} caracteres`);
    } else {
        showSuccess(nameInput); // Muestra mensaje de Exito
        valid = true;
    }

    return valid;
}

const checkEmail = () => {
    let valid = false;
    const email = emailInput.value.trim();
    if(isEmpty(email)){
        showError(emailInput, 'El email es obligatorio');
    } else if (!isEmailValid(email)){
        showError(emailInput, 'El email no es valido');
    } else {
        showSuccess(emailInput);
        valid = true;
    }

    return valid;
}

const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim()
    if(isEmpty(password)){
        showError(passInput, 'La contraseña es obligatoria')
    } else if(!isPassValid(password)){
        showError(passInput, 'La contraseña no es valida')
    } else {
        showSuccess(passInput);
        valid = true
    }

    return valid;
}

const checkPhone = () => {
    let valid = false;
    const phone = phoneInput.value.trim();
    if(!isPhoneValid(phone)){
        showError(phoneInput, 'El numero telefonico no es valido')
    } else {
        showSuccess(phoneInput);
        valid = true;
    }

    return valid;
}

const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    //const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return re.test(email)
}

const isPassValid = (pass) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    return re.test(pass)
}

const isPhoneValid = (phone) => {
    //const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    const re = /^\+?[1-9][0-9]{7,14}$/
    return re.test(phone)
}

const isEmpty = (value) => value === '';

const isBetween = (length, min, max) => {
    return length >= min && length <= max ? false : true;
}

//Realizar las class de Success u Error
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');
    const error = formField.querySelector('small');
    error.textContent = message;
}

const showSuccess = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('error');
    formField.classList.add('success');
    const error = formField.querySelector('small');
    error.textContent = '';
}
//Realizar las class de Success u Error

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let isUsernameValid = checkUsername();
    let isEmailValid = checkEmail();
    let isPasswordValid = checkPassword();
    let isPhoneValid = checkPhone();

    console.log('isUsernameValid =>>', isUsernameValid);
    console.log('isEmailValid =>>', isEmailValid);
    console.log('isPssswordValid =>>', isPasswordValid);
    console.log('isPhoneValid =>>', isPhoneValid);

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid

    if(isFormValid){
        form.submit();
    }
})

const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return(...args) => {

        if(timeoutId)clearTimeout(timeoutId);

        timeoutId = setTimeout(()=>{
            fn.apply(null, args);
        }, delay);
    };
};

form.addEventListener(
    'input',
    debounce((e)=>{
        switch(e.target.id){
            case 'username':
                checkUsername();
                break
            case 'email':
                checkEmail();
                break
            case 'password':
                checkPassword();
                break
            case 'phone':
                checkPhone();
                break
        }
    })
)