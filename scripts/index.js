
'use strict'

//  Input placeholder logic  start. //
let placeholder = document.querySelectorAll('.placeholder');
let input = document.querySelectorAll('.inputs');

Array.from(input, el => el.addEventListener('focus', e => {
    e.target.previousElementSibling.style.display = "none";
}))
Array.from(input, el => el.addEventListener('blur', e => {
    if (e.target.value.length == 0) {
        e.target.previousElementSibling.style.display = "block";
    }
}))
//  Input placeholder logic  end. //

// Show/hide password start. //
let passwordInput = document.getElementById('sign-up-password');
let passStatus = document.getElementById('show-pass');
function viewPassword() {
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
        passStatus.classList.add('is-active');

    }
    else {
        passwordInput.type = 'password';
        passStatus.classList.remove('is-active');
    }
}
let passwordInputLogin = document.getElementById('log-in-password');
let passStatusLogin = document.getElementById('show-pass-login');
function viewPasswordLogin() {
    if (passwordInputLogin.type == 'password') {
        passwordInputLogin.type = 'text';
        passStatusLogin.classList.add('is-active');

    }
    else {
        passwordInputLogin.type = 'password';
        passStatusLogin.classList.remove('is-active');
    }
}

// Show/hide password end. //


let inputs = document.querySelectorAll('.inputs');
let formSubmit = document.getElementById('sign-up-submit-btn');
let firstName = document.getElementById("user-first-name");
let lastName = document.getElementById("user-last-name");
let email = document.getElementById('sign-up-email');
let password = document.getElementById('sign-up-password');

//Set the Session Storage
function storeData() {
    sessionStorage.setItem('firstName', firstName.value);
    sessionStorage.setItem('lastName', lastName.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('password', password.value);
    getLogInData();
    document.getElementById("sign-up-form").submit();
}


//   Sign up form validation & sumbit start . //
let signUpSection = document.querySelector('.sign-up-section');
if (signUpSection) {
    const form = document.getElementById("sign-up-form");
    function insertAfter(newNode, referenceNode) {
        this.insertBefore(newNode, referenceNode.nextElementSibling);
        return newNode;
    }
    class FieldValidator {
        constructor(field) {
            this._field = field;
            this._error = null;

            this._onInvalid = this._onInvalid.bind(this);
            this._onInput = this._onInput.bind(this);
            this._onBlur = this._onBlur.bind(this);

            this.bindEventListeners();
        }

        bindEventListeners() {
            this._field.addEventListener('invalid', this._onInvalid);
            this._field.addEventListener('input', this._onInput);
            this._field.addEventListener('blur', this._onBlur);
        }
        showError() {
            let errorNode;

            if (this._error !== null) {
                return this.updateError();
            }

            this._error = document.createElement('div');
            this._error.className = 'help-block';
            this._error.innerHTML = this._field.validationMessage;

            this._field.setAttribute('aria-invalid', 'true');
            this._field.closest('.input-wrapper').classList.add('has-error');

            insertAfter.call(this._field.parentNode, this._error, this._field);
        }

        updateError() {
            if (this._error === null) return;

            this._error.innerHTML = this._field.validationMessage;
        }

        hideError() {
            if (this._error !== null) {
                this._error.parentNode.removeChild(this._error);
                this._error = null;
            }

            this._field.removeAttribute('aria-invalid');
            this._field.closest('.input-wrapper').classList.remove('has-error');
        }

        _onInvalid(event) {
            event.preventDefault();
        }

        _onInput(event) {
            if (this._field.validity.valid) {
                this.hideError();
            } else {
                this.updateError();
            }
        }

        _onBlur(event) {
            if (!this._field.validity.valid) {
                this.showError();
            }
        }
    }

    Array.prototype.slice.call(form.elements).forEach((element) => {
        element._validator = new FieldValidator(element);
    });
    form.setAttribute('novalidate', true);

    form.addEventListener('invalid', (event) => {
        event.preventDefault();

        event.target._validator.showError();
    }, true);
    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();

            form.querySelectorAll(':invalid')[0].focus();
            return;
        }

        storeData();
        event.preventDefault();
    });
}
//   Sign up form validation & sumbit start . //




//   Log in form validation & sumbit start . //
let logInSection = document.querySelector('.log-in-section');
let loginBtn = document.getElementById('log-in-btn');
let userEmail = sessionStorage.getItem('email');
let userPass = sessionStorage.getItem('password');
let userFirstName = sessionStorage.getItem('firstName');
let userLastName = sessionStorage.getItem('lastName');
if (logInSection) {
    const form = document.getElementById("log-in-form");
    function logInValidate(e) {
        e.preventDefault();
        let loginEmail = document.getElementById('log-in-email');
        let loginPass = document.getElementById('log-in-password');
        let emailError = document.getElementById('email-error');
        let passError = document.getElementById('password-error');

        console.log(loginPass.value, userPass, '8888')
        if (loginEmail.value == userEmail && loginPass.value == userPass) {
            console.log('-----')
            form.submit();
        } else {
            if (loginEmail.value !== userEmail) {
                console.log(loginEmail.value, userEmail, '88')
                loginEmail.classList.add('not-valid');
                emailError.innerHTML = "User not found";
            } else {
                loginEmail.classList.remove('not-valid');
                emailError.innerHTML = "";
                if (loginPass.value !== userPass) {
                    loginPass.classList.add('not-valid');
                    passError.innerHTML = "Incorrect password";
                } else {
                    loginPass.classList.remove('not-valid');
                    passError.innerHTML = "";
                }
            }
        }
    }
    loginBtn.addEventListener('click', logInValidate);

}
//   Log in form validation & sumbit end . //


//  Main page data render start. //
let mainpage = document.getElementById('main-content');
if (mainpage) {
    mainpage.innerHTML = `<div class="content">  <h1> Welcome ${userFirstName} ${userLastName} !</h1></div> `;
}

//  Main page data render end. //

