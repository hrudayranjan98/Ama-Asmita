/* ==========================================
EDIT PROFILE.JS
========================================== */

document.addEventListener(
"DOMContentLoaded",
async () =>
{
await loadProfile();

 
    setupImageUpload();

    setupFormChangeDetection();
}
 

);

/* ==========================================
ORIGINAL FORM DATA
========================================== */

let originalData = {};

/* ==========================================
LOAD PROFILE
========================================== */

async function loadProfile()
{
try
{
const token =
localStorage.getItem(
"token"
);

 
    const response =
        await fetch(
            "http://localhost:5128/api/profile/me",
            {
                headers:
                {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    document.getElementById(
        "name"
    ).value =
        data.name || "";

    document.getElementById(
        "userName"
    ).value =
        data.userName || "";

    document.getElementById(
        "email"
    ).value =
        data.email || "";

    document.getElementById(
        "bio"
    ).value =
        data.bio || "";

    document.getElementById(
        "address"
    ).value =
        data.address || "";

    document.getElementById(
        "facebook"
    ).value =
        data.facebookLink || "";

    document.getElementById(
        "instagram"
    ).value =
        data.instagramLink || "";

    document.getElementById(
        "linkedin"
    ).value =
        data.linkedInLink || "";

    originalData =
    {
        name:
            data.name || "",

        userName:
            data.userName || "",

        bio:
            data.bio || "",

        address:
            data.address || "",

        facebook:
            data.facebookLink || "",

        instagram:
            data.instagramLink || "",

        linkedin:
            data.linkedInLink || ""
    };

    loadProfileImage();
}
catch(error)
{
    console.error(
        "Profile Load Error:",
        error
    );
}
 

}

/* ==========================================
IMAGE UPLOAD
========================================== */

function setupImageUpload()
{
const imageInput =
document.getElementById(
"profileImage"
);

 
const imagePreview =
    document.getElementById(
        "profilePreview"
    );

imageInput.addEventListener(
    "change",
    event =>
    {
        const file =
            event.target.files[0];

        if(!file)
        {
            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function(e)
            {
                imagePreview.src =
                    e.target.result;

                localStorage.setItem(
                    "profileImage",
                    e.target.result
                );

                window.dispatchEvent(
                    new Event("profileImageUpdated")
                );

                enableSaveButton();
            };

        reader.readAsDataURL(
            file
        );
    }
);
 

}

function loadProfileImage()
{
const savedImage =
localStorage.getItem(
"profileImage"
);

 
if(savedImage)
{
    document.getElementById(
        "profilePreview"
    ).src =
        savedImage;
}
 

}

/* ==========================================
FORM CHANGE DETECTION
========================================== */

function setupFormChangeDetection()
{
const fields =
document.querySelectorAll(
"input, textarea"
);

 
fields.forEach(field =>
{
    field.addEventListener(
        "input",
        checkForChanges
    );
});

document.getElementById(
    "saveBtn"
).addEventListener(
    "click",
    saveProfile
);
 

}

function checkForChanges()
{
const changed =
document.getElementById("name").value !== originalData.name ||

 
    document.getElementById("userName").value !== originalData.userName ||

    document.getElementById("bio").value !== originalData.bio ||

    document.getElementById("address").value !== originalData.address ||

    document.getElementById("facebook").value !== originalData.facebook ||

    document.getElementById("instagram").value !== originalData.instagram ||

    document.getElementById("linkedin").value !== originalData.linkedin;

document.getElementById(
    "saveBtn"
).disabled =
    !changed;
 

}

function enableSaveButton()
{
document.getElementById(
"saveBtn"
).disabled =
false;
}

/* ==========================================
SAVE PROFILE
========================================== */

async function saveProfile()
{
try
{
const saveBtn =
document.getElementById(
"saveBtn"
);

 
    saveBtn.disabled =
        true;

    saveBtn.innerHTML =
        `
        <span
            class="spinner-border spinner-border-sm me-2">
        </span>

        Saving...
        `;

    const token =
        localStorage.getItem(
            "token"
        );

    const payload =
    {
        name:
            document.getElementById(
                "name"
            ).value,

        userName:
            document.getElementById(
                "userName"
            ).value,

        bio:
            document.getElementById(
                "bio"
            ).value,

        address:
            document.getElementById(
                "address"
            ).value,

        facebookLink:
            document.getElementById(
                "facebook"
            ).value,

        instagramLink:
            document.getElementById(
                "instagram"
            ).value,

        linkedInLink:
            document.getElementById(
                "linkedin"
            ).value
    };

    const response =
        await fetch(
            "http://localhost:5128/api/profile/update",
            {
                method: "PUT",

                headers:
                {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${token}`
                },

                body:
                    JSON.stringify(
                        payload
                    )
            }
        );

    if(!response.ok)
    {
        throw new Error(
            "Update failed"
        );
    }

    saveBtn.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            Saved Successfully
        `;

    showSuccessModal(
        "Profile Updated",
        "Your profile has been updated successfully."
    );

    originalData =
    {
        name:
            payload.name,

        userName:
            payload.userName,

        bio:
            payload.bio,

        address:
            payload.address,

        facebook:
            payload.facebookLink,

        instagram:
            payload.instagramLink,

        linkedin:
            payload.linkedInLink
    };

    saveBtn.innerHTML =
        `
        <i class="bi bi-check-circle-fill"></i>
        Save Changes
        `;

    saveBtn.disabled =
        true;
}
catch(error)
{
    console.error(
        "Update Error:",
        error
    );

    alert(
        "Failed to update profile."
    );
}
 

}

/* ==========================================
SUCCESS MODAL
========================================== */

function showSuccessModal(
title,
message
)
{
const modal =
document.getElementById(
"successModal"
);

 
document.getElementById(
    "successTitle"
).textContent =
    title;

document.getElementById(
    "successMessage"
).textContent =
    message;

modal.classList.add(
    "show"
);

document.getElementById(
    "successCloseBtn"
).onclick = () =>
{
    modal.classList.remove(
        "show"
    );

    const saveBtn =
        document.getElementById(
            "saveBtn"
        );

    saveBtn.innerHTML =
        "Save Changes";

    saveBtn.disabled =
        true;
};
}
