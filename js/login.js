/* ==========================================
   LOGIN.JS
   Ama Asmita
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () =>
{

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    const email =
        document.getElementById(
            "email"
        );

    const username =
        document.getElementById(
            "username"
        );

    const password =
        document.getElementById(
            "password"
        );

    const captchaInput =
        document.getElementById(
            "captchaInput"
        );

    const captchaCode =
        document.getElementById(
            "captchaCode"
        );

    const refreshCaptcha =
        document.getElementById(
            "refreshCaptcha"
        );

    const togglePassword =
        document.getElementById(
            "togglePassword"
        );

    const passwordIcon =
        document.getElementById(
            "passwordIcon"
        );

    const rememberPassword =
        document.getElementById(
            "rememberPassword"
        );

    const formAlert =
        document.getElementById(
            "formAlert"
        );
    
    const loginBtn =
    document.getElementById(
        "loginBtn"
    );

    const loginBtnContent =
        document.getElementById(
            "loginBtnContent"
        );

    const loginLoader =
        document.getElementById(
            "loginLoader"
        );

    const loginFailedModal =
        document.getElementById(
            "loginFailedModal"
        );

    const loginFailedMessage =
        document.getElementById(
            "loginFailedMessage"
        );

    const closeFailedModal =
        document.getElementById(
            "closeFailedModal"
        );

    /* ==========================
       CAPTCHA
    ========================== */

    let currentCaptcha = "";

    function generateCaptcha()
    {
        const chars =
            "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

        let captcha = "";

        for(let i = 0; i < 5; i++)
        {
            captcha +=
                chars.charAt(
                    Math.floor(
                        Math.random() *
                        chars.length
                    )
                );
        }

        currentCaptcha =
            captcha;

        captchaCode.textContent =
            captcha;
    }

    generateCaptcha();

    refreshCaptcha.addEventListener(
        "click",
        generateCaptcha
    );

    /* ==========================
       PASSWORD TOGGLE
    ========================== */

    togglePassword.addEventListener(
        "click",
        () =>
    {

        if(
            password.type ===
            "password"
        )
        {

            password.type =
                "text";

            passwordIcon.classList.remove(
                "bi-eye-slash"
            );

            passwordIcon.classList.add(
                "bi-eye"
            );

        }
        else
        {

            password.type =
                "password";

            passwordIcon.classList.remove(
                "bi-eye"
            );

            passwordIcon.classList.add(
                "bi-eye-slash"
            );
        }

    });

    /* ==========================
       REMEMBER PASSWORD
    ========================== */

    const savedEmail =
        localStorage.getItem(
            "savedEmail"
        );

    const savedPassword =
        localStorage.getItem(
            "savedPassword"
        );

    if(
        savedEmail &&
        savedPassword
    )
    {

        email.value =
            savedEmail;

        password.value =
            savedPassword;

        rememberPassword.checked =
            true;
    }

    /* ==========================
       ERROR FUNCTIONS
    ========================== */

    function setError(
        id,
        message
    )
    {

        document.getElementById(
            id
        ).textContent =
            message;
    }

    function clearErrors()
    {

        setError(
            "emailError",
            ""
        );

        setError(
            "usernameError",
            ""
        );

        setError(
            "passwordError",
            ""
        );

        setError(
            "captchaError",
            ""
        );

        formAlert.style.display =
            "none";
    }

    /* ==========================
       EMAIL VALIDATION
    ========================== */

    function isValidEmail(
        emailAddress
    )
    {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(
                emailAddress
            );
    }

    /* ==========================
       LOGIN FORM
    ========================== */

    loginForm.addEventListener(
        "submit",
        async (e) =>
    {

        e.preventDefault();

        clearErrors();

        let isValid = true;

        if(
            !email.value.trim()
        )
        {

            setError(
                "emailError",
                "Email is required."
            );

            isValid = false;
        }
        else if(
            !isValidEmail(
                email.value
            )
        )
        {

            setError(
                "emailError",
                "Invalid email address."
            );

            isValid = false;
        }

        if(
            !username.value.trim()
        )
        {

            setError(
                "usernameError",
                "Username is required."
            );

            isValid = false;
        }

        if(
            !password.value.trim()
        )
        {

            setError(
                "passwordError",
                "Password is required."
            );

            isValid = false;
        }

        if(
            !captchaInput.value.trim()
        )
        {

            setError(
                "captchaError",
                "Captcha is required."
            );

            isValid = false;
        }
        else if(
            captchaInput.value
            .toUpperCase()
            !==
            currentCaptcha
        )
        {

            setError(
                "captchaError",
                "Incorrect captcha."
            );

            isValid = false;
        }

        if(!isValid)
        {

            formAlert.style.display =
                "flex";

            return;
        }

        /* ==========================
           SAVE PASSWORD
        ========================== */

        if(
            rememberPassword.checked
        )
        {

            localStorage.setItem(
                "savedEmail",
                email.value
            );

            localStorage.setItem(
                "savedPassword",
                password.value
            );
        }
        else
        {

            localStorage.removeItem(
                "savedEmail"
            );

            localStorage.removeItem(
                "savedPassword"
            );
        }

/* ==========================
   ASP.NET CORE API LOGIN
========================== */

try
{

    loginBtn.disabled = true;

    loginBtnContent.classList.add(
        "d-none"
    );

    loginLoader.classList.remove(
        "d-none"
    );

    const response =
        await fetch(
            "http://localhost:5128/api/auth/login",
            {
                method:"POST",

                headers:
                {
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify(
                {
                    email:
                        email.value.trim(),

                    password:
                        password.value
                })
            }
        );

    const result =
        await response.json();

    if(!response.ok)
    {
        throw new Error(
            result.message ||
            "Login Failed"
        );
    }

    console.log(
        "Login Success",
        result
    );

    /* ======================
       SAVE JWT TOKEN
    ====================== */

    localStorage.setItem(
        "token",
        result.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(
            result.user
        )
    );

    localStorage.setItem(
        "userName",
        result.user.userName
    );

    localStorage.setItem(
        "role",
        result.user.role
    );

    /* ======================
       REDIRECT
    ====================== */

    window.location.href =
        "index.html";

}
catch(error)
{
    console.error(error);

    loginBtn.disabled = false;

    loginLoader.classList.add(
        "d-none"
    );

    loginBtnContent.classList.remove(
        "d-none"
    );

    loginFailedMessage.textContent =
        error.message ||
        "Login Failed. Please Try Again.";

    loginFailedModal.classList.add(
        "active"
    );
}

closeFailedModal?.addEventListener(
    "click",
    () =>
{
    loginFailedModal.classList.remove(
        "active"
    );
});

    });

});


