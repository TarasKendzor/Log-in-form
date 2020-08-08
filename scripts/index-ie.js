if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // Свойство length метода from равно 1.
        return function from(arrayLike/*, mapFn, thisArg */) {
            // 1. Положим C равным значению this.
            var C = this;

            // 2. Положим items равным ToObject(arrayLike).
            var items = Object(arrayLike);

            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError('Array.from requires an array-like object - not null or undefined');
            }

            // 4. Если mapfn равен undefined, положим mapping равным false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. иначе
                // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }

                // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }

            // 10. Положим lenValue равным Get(items, "length").
            // 11. Положим len равным ToLength(lenValue).
            var len = toLength(items.length);

            // 13. Если IsConstructor(C) равен true, то
            // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
            //     объекта C со списком аргументов, содержащим единственный элемент len.
            // 14. a. Иначе, положим A равным ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);

            // 16. Положим k равным 0.
            var k = 0;
            // 17. Пока k < len, будем повторять... (шаги с a по h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                } else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Положим putStatus равным Put(A, "length", len, true).
            A.length = len;
            // 20. Вернём A.
            return A;
        };
    }());
}
//  Input placeholder logic  start. //
var placeholder = document.querySelectorAll('.placeholder');
var input = document.querySelectorAll('.inputs');

Array.from(input, function (el) {
    el.addEventListener('focus', function (e) {
        e.target.previousElementSibling.style.display = "none";
    })
})
Array.from(input, function (el) {
    el.addEventListener('blur', function (e) {
        if (e.target.value.length == 0) {
            e.target.previousElementSibling.style.display = "block";
        }
    })
})

//  Input placeholder logic  end. //


// Show/hide password start. //
var passwordInput = document.getElementById('sign-up-password');
var passStatus = document.getElementById('show-pass');
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
var passwordInputLogin = document.getElementById('log-in-password');
var passStatusLogin = document.getElementById('show-pass-login');
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

// Show/hide password end. //


var inputs = document.querySelectorAll('.inputs');
var formSubmit = document.getElementById('sign-up-submit-btn');
var firstName = document.getElementById("user-first-name");
var lastName = document.getElementById("user-last-name");
var email = document.getElementById('sign-up-email');
var password = document.getElementById('sign-up-password');

//Set the Session Storage
function storeData() {
    sessionStorage.setItem('firstName', firstName.value);
    sessionStorage.setItem('lastName', lastName.value);
    sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('password', password.value);

    document.getElementById("sign-up-form").submit();
}


//   Sign up form validation & sumbit start . //
var signUpSection = document.querySelector('.sign-up-section');
if (signUpSection) {
    var form = document.getElementById("sign-up-form");

    form.addEventListener('submit', function (e) {
        storeData();
        e.preventDefault();
    });
}
//   Sign up form validation & sumbit end . //


//   Log in form validation & sumbit start . //
var logInSection = document.querySelector('.log-in-section');
var loginBtn = document.getElementById('log-in-btn');
var userEmail = sessionStorage.getItem('email');
var userPass = sessionStorage.getItem('password');
var userFirstName = sessionStorage.getItem('firstName');
var userLastName = sessionStorage.getItem('lastName');
if (logInSection) {
    var form = document.getElementById("log-in-form");
    function logInValidate(e) {
        e.preventDefault();
        var loginEmail = document.getElementById('log-in-email');
        var loginPass = document.getElementById('log-in-password');
        var emailError = document.getElementById('email-error');
        var passError = document.getElementById('password-error');

        if (loginEmail.value == userEmail && loginPass.value == userPass) {
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

var mainpage = document.getElementById('main-content');
if (mainpage) {
    mainpage.innerHTML = '<div class="content">  <h1> Welcome ' + userFirstName + ' ' + userLastName + ' !</h1></div> ';
}

//  Main page data render end. //