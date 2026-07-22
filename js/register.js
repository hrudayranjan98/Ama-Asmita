/* ==========================================
   REGISTER.JS
   Ama Asmita
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () =>
{

    const registerForm =
        document.getElementById(
            "registerForm"
        );

    const fullName =
        document.getElementById(
            "fullName"
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

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        );

    const passwordRules =
        document.getElementById(
            "passwordRules"
        );

    const formAlert =
        document.getElementById(
            "formAlert"
        );

    const successModal =
        document.getElementById(
            "successModal"
        );

    const failedModal =
        document.getElementById(
            "failedModal"
        );

    /* ==========================
       PASSWORD TOGGLE
    ========================== */

    document
    .getElementById(
        "togglePassword"
    )
    .addEventListener(
        "click",
        () =>
    {

        const icon =
            document.getElementById(
                "passwordIcon"
            );

        if(
            password.type ===
            "password"
        )
        {

            password.type =
                "text";

            icon.classList.remove(
                "bi-eye-slash"
            );

            icon.classList.add(
                "bi-eye"
            );

        }
        else
        {

            password.type =
                "password";

            icon.classList.remove(
                "bi-eye"
            );

            icon.classList.add(
                "bi-eye-slash"
            );
        }

    });

    document
    .getElementById(
        "toggleConfirmPassword"
    )
    .addEventListener(
        "click",
        () =>
    {

        const icon =
            document.getElementById(
                "confirmPasswordIcon"
            );

        if(
            confirmPassword.type ===
            "password"
        )
        {

            confirmPassword.type =
                "text";

            icon.classList.remove(
                "bi-eye-slash"
            );

            icon.classList.add(
                "bi-eye"
            );

        }
        else
        {

            confirmPassword.type =
                "password";

            icon.classList.remove(
                "bi-eye"
            );

            icon.classList.add(
                "bi-eye-slash"
            );
        }

    });

    /* ==========================
       PASSWORD VALIDATION
    ========================== */

    function validatePassword(
        value
    )
    {

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        return passwordRegex.test(
            value
        );
    }

    password.addEventListener(
    "input",
    () =>
{

    const value =
        password.value;

    const hasLength =
        value.length >= 6;

    const hasUpper =
        /[A-Z]/.test(value);

    const hasLower =
        /[a-z]/.test(value);

    const hasNumber =
        /\d/.test(value);

    const hasSpecial =
        /[@$!%*?&]/.test(value);

    document.getElementById(
        "ruleLength"
    ).style.display =
        hasLength
            ? "none"
            : "block";

    document.getElementById(
        "ruleUpper"
    ).style.display =
        hasUpper
            ? "none"
            : "block";

    document.getElementById(
        "ruleLower"
    ).style.display =
        hasLower
            ? "none"
            : "block";

    document.getElementById(
        "ruleNumber"
    ).style.display =
        hasNumber
            ? "none"
            : "block";

    document.getElementById(
        "ruleSpecial"
    ).style.display =
        hasSpecial
            ? "none"
            : "block";

    const isValid =
        hasLength &&
        hasUpper &&
        hasLower &&
        hasNumber &&
        hasSpecial;

    if(isValid)
    {
        password.classList.remove(
            "password-invalid"
        );

        document.getElementById(
            "passwordRules"
        ).style.display =
            "none";
    }
    else
    {
        password.classList.add(
            "password-invalid"
        );

        document.getElementById(
            "passwordRules"
        ).style.display =
            "block";
    }

});

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
       ERROR FUNCTIONS
    ========================== */

    function clearErrors()
    {

        document
        .querySelectorAll(
            ".error-text"
        )
        .forEach(
            error =>
            error.textContent = ""
        );

        formAlert.style.display =
            "none";
    }

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

    /* ==========================
       FORM SUBMIT
    ========================== */

    registerForm.addEventListener(
        "submit",
        async (e) =>
    {

        e.preventDefault();

        clearErrors();

        let isValid = true;

        /* ======================
           NAME
        ====================== */

        if(
            !fullName.value.trim()
        )
        {

            setError(
                "nameError",
                "Full Name is required."
            );

            isValid = false;
        }

        /* ======================
           EMAIL
        ====================== */

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
                "Enter a valid email address."
            );

            isValid = false;
        }

        /* ======================
           USERNAME
        ====================== */

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

        /* ======================
           PASSWORD
        ====================== */

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
        else if(
            !validatePassword(
                password.value
            )
        )
        {

            setError(
                "passwordError",
                "Password does not meet required criteria."
            );

            isValid = false;
        }

        /* ======================
           CONFIRM PASSWORD
        ====================== */

        if(
            !confirmPassword.value.trim()
        )
        {

            setError(
                "confirmPasswordError",
                "Confirm Password is required."
            );

            isValid = false;
        }
        else if(
            password.value !==
            confirmPassword.value
        )
        {

            setError(
                "confirmPasswordError",
                "Passwords do not match."
            );

            isValid = false;
        }

        /* ======================
           ALERT
        ====================== */

        if(!isValid)
        {

            formAlert.style.display =
                "flex";

            return;
        }

        /* ======================
           FUTURE API
        ====================== */

        try
        {

        const response =
            await fetch(
                "http://localhost:5128/api/auth/register",
                {
                    method:"POST",

                    headers:
                    {
                        "Content-Type":
                        "application/json"
                    },

                    body:JSON.stringify(
                    {
                        name:
                            fullName.value.trim(),

                        email:
                            email.value.trim(),

                        userName:
                            username.value.trim(),

                        password:
                            password.value
                    })
                }
            );

        const data =
            await response.json();

        if(response.ok)
        {

            console.log(data);

            successModal.classList.add(
                "active"
            );
        }
        else
        {

            document.getElementById(
                "failedMessage"
            ).textContent =
                data.message ||
                "Registration Failed";

            failedModal.classList.add(
                "active"
            );
        }

    }
    catch(error)
    {

        console.error(error);

        document.getElementById(
            "failedMessage"
        ).textContent =
            "Unable to connect to server.";

        failedModal.classList.add(
            "active"
        );
    }

    });

        /* ==========================
        SUCCESS BUTTON
        ========================== */

        document
        .getElementById(
            "successOkBtn"
        )
        .addEventListener(
            "click",
            () =>
        {

            window.location.href =
                "login.html";

        });

        /* ==========================
        RETRY BUTTON
        ========================== */

        document
        .getElementById(
            "retryBtn"
        )
        .addEventListener(
            "click",
            () =>
        {

            failedModal.classList.remove(
                "active"
            );

        });

    });
