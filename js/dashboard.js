/* ==========================================
            DASHBOARD.JS
========================================== */

document.addEventListener("DOMContentLoaded", async () =>
{
    const token =
        localStorage.getItem("token");

    if(!token)
    {
        window.location.href =
            "login.html";

        return;
    }

    const activityBtn =
        document.getElementById(
            "activityBtn"
        );

    const contributionBtn =
        document.getElementById(
            "contributionBtn"
        );

    const savedBtn =
        document.getElementById(
            "savedBtn"
        );

    const activitySection =
        document.getElementById(
            "activitySection"
        );

    const contributionSection =
        document.getElementById(
            "contributionSection"
        );

    const savedSection =
        document.getElementById(
            "savedSection"
        );

    /* ==========================================
        TAB SWITCHING
    ========================================== */

    function showSection(section)
    {
        activitySection.style.display =
            "none";

        contributionSection.style.display =
            "none";

        savedSection.style.display =
            "none";

        activityBtn.classList.remove(
            "active"
        );

        contributionBtn.classList.remove(
            "active"
        );

        savedBtn.classList.remove(
            "active"
        );

        section.style.display =
            "block";
    }

    activityBtn.addEventListener(
        "click",
        () =>
        {
            showSection(
                activitySection
            );

            activityBtn.classList.add(
                "active"
            );
        }
    );

    contributionBtn.addEventListener(
        "click",
        () =>
        {
            showSection(
                contributionSection
            );

            contributionBtn.classList.add(
                "active"
            );
        }
    );

    savedBtn.addEventListener(
        "click",
        () =>
        {
            showSection(
                savedSection
            );

            savedBtn.classList.add(
                "active"
            );
        }
    );

    /* ==========================================
        DEFAULT OPEN
    ========================================== */

    showSection(
        activitySection
    );

    activityBtn.classList.add(
        "active"
    );

    /* ==========================================
        LOAD PROFILE
    ========================================== */

    await loadProfile();

    /* ==========================================
        LOAD DASHBOARD DATA
    ========================================== */

    await loadActivityData();
    await loadContributions();
    await loadSavedContents();
});

/* ==========================================
        PROFILE
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
                "http://localhost:5128/api/auth/me",
                {
                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const user =
            await response.json();

        console.log("User Data:", user);

        document.getElementById(
            "userName"
        ).textContent =
            user.name;

        document.getElementById(
            "userEmail"
        ).textContent =
            user.email;
    }
    catch(error)
    {
        console.error(error);
    }
}

document.getElementById(
    "touristCount"
).classList.add(
    "loading"
);

document.getElementById(
    "foodCount"
).classList.add(
    "loading"
);

document.getElementById(
    "legendCount"
).classList.add(
    "loading"
);

/* ==========================================
        MY ACTIVITY
========================================== */

async function loadActivityData()
{
    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                "http://localhost:5128/api/dashboard/activity",
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

            [
                "touristCount",
                "foodCount",
                "legendCount"
            ].forEach(id =>
            {
                document
                    .getElementById(id)
                    .classList.remove(
                        "loading"
                    );
            });

        animateCount(
            "touristCount",
            data.touristCount
        );

        animateCount(
            "foodCount",
            data.foodCount
        );

        animateCount(
            "legendCount",
            data.legendCount
        );
    }
    catch(error)
    {
        console.error(error);
    }
}

function animateCount(
    id,
    target
)
{
    const element =
        document.getElementById(
            id
        );

    let current = 0;

    const timer =
        setInterval(() =>
        {
            current++;

            element.textContent =
                current;

            if(current >= target)
            {
                clearInterval(
                    timer
                );
            }
        }, 40);
}

/* ==========================================
        CONTRIBUTIONS
========================================== */

async function loadContributions()
{
    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                "http://localhost:5128/api/contribution/my",
                {
                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const contributions =
            await response.json();

        const tbody =
            document.getElementById(
                "contributionTableBody"
            );

        tbody.innerHTML = "";

        contributions.forEach(item =>
        {
            tbody.insertAdjacentHTML(
                "beforeend",

                `
                <tr>

                    <td>
                        ${item.title}
                    </td>

                    <td>
                        ${item.category}
                    </td>

                    <td>
                        ${new Date(item.submittedOn)
                        .toLocaleDateString()}
                    </td>

                    <td>

                        <span class="status-${item.status.toLowerCase()}">

                            ${item.status}

                        </span>

                    </td>

                    <td>

                        <button
                            class="action-btn view-btn"
                            onclick="viewContribution('${item.id}')">

                            View

                        </button>

                        <button
                            class="action-btn remove-btn"
                            onclick="withdrawContribution('${item.id}')">

                            Withdraw

                        </button>

                    </td>

                </tr>
                `
            );
        });
    }
    catch(error)
    {
        console.error(error);
    }
}

/* ==========================================
        SAVED CONTENTS
========================================== */

async function loadSavedContents()
{
    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                "http://localhost:5128/api/savedcontent/my",
                {
                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const savedItems =
            await response.json();

        const container =
            document.getElementById(
                "savedContentContainer"
            );

        container.innerHTML = "";

        savedItems.forEach(item =>
        {
            container.insertAdjacentHTML(
                "beforeend",

                `
                <div class="col-lg-4 col-md-6">

                    <div class="saved-card">

                        <img src="${item.imageUrl}" alt="${item.contentName}">
                        <h5>${item.contentName}</h5>
                        <p>${item.location || ""}</p>

                            <button
                                class="action-btn view-btn"
                                onclick="viewSavedContent
                                (
                                    '${item.contentType}', '${item.contentId}'
                                )"
                            >

                                View

                            </button>

                            <button
                                class="action-btn remove-btn"
                                onclick="removeSaved(

                                    '${item.contentId}',
                                    '${item.contentType}'
                                )">

                                Remove

                            </button>

                        </div>

                    </div>

                </div>
                `
            );
        });
    }
    catch(error)
    {
        console.error(error);
    }
}


function viewSavedContent(
    contentType,
    contentId
)
{
    let url = "";

    switch(contentType)
    {
        case "Tourist":
            url =
                `tourist-details.html?id=${contentId}`;
            break;

        case "Food":
            url =
                `food-details.html?id=${contentId}`;
            break;

        case "Legend":
            url =
                `history-details.html?id=${contentId}`;
            break;

        default:
            return;
    }

    window.open(
        url,
        "_blank"
    );
}

/* ==========================================
CUSTOM CONFIRM MODAL
========================================== */

function showConfirmModal(
    title,
    message,
    confirmText
)
{
    return new Promise(resolve =>
    {
        const modal =
            document.getElementById(
                "confirmModal"
            );

        const titleEl =
            document.getElementById(
                "modalTitle"
            );

        const messageEl =
            document.getElementById(
                "modalMessage"
            );

        const confirmBtn =
            document.getElementById(
                "modalConfirmBtn"
            );

        const cancelBtn =
            document.getElementById(
                "modalCancelBtn"
            );
        
        document.querySelector(
            ".modal-icon i"
        ).className =
            "bi bi-exclamation-triangle-fill";

        confirmBtn.style.display =
            "inline-block";

        confirmBtn.disabled =
            false;

        confirmBtn.textContent =
            confirmText;

        cancelBtn.textContent =
            "Cancel";

        titleEl.textContent =
            title;

        messageEl.textContent =
            message;

        confirmBtn.textContent =
            confirmText;

        modal.classList.add(
            "show"
        );

        confirmBtn.onclick = () =>
        {
            confirmBtn.disabled = true;

            confirmBtn.innerHTML = `
                <span class="spinner-border spinner-border-sm me-2"></span>
                Processing...
            `;

            modal.classList.remove(
                "show"
            );

            resolve(true);
        };

        cancelBtn.onclick = () =>
        {
            modal.classList.remove(
                "show"
            );

            resolve(false);
        };
    });
}


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

        location.reload();
    };
}

/* ==========================================
        WITHDRAW CONTRIBUTION
========================================== */

async function withdrawContribution(id)
{
    const confirmed =
        await showConfirmModal(
            "Are You Sure ?",
            "Do you want to withdraw your contribution?",
            "Withdraw"
        );

    if(!confirmed)
    {
        return;
    }

    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        await fetch(
            `http://localhost:5128/api/contribution/${id}`,
            {
                method: "DELETE",

                headers:
                {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        showSuccessModal(
            "Contribution Withdrawn",
            "Your contribution has been removed successfully.");

        loadContributions();
    }
    catch(error)
    {
        console.error(error);
    }
}

/* ==========================================
        REMOVE SAVED CONTENT
========================================== */

async function removeSaved(
    contentId,
    contentType
)
{
    const confirmed =
        await showConfirmModal(
            "Are You Sure ?",
            "Do you want to remove your content from your saved list?",
            "Remove"
        );

    if(!confirmed)
    {
        return;
    }

    try
    {
        const token =
            localStorage.getItem(
                "token"
            );

        const response =
            await fetch(
                `http://localhost:5128/api/savedcontent?contentId=${contentId}&contentType=${contentType}`,
                {
                    method: "DELETE",

                    headers:
                    {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        if(response.ok)
        {
            showSuccessModal(
                "Removed Successfully",
                "Content removed from your saved list."
            );

            loadSavedContents();
        }
    }
    catch(error)
    {
        console.error(error);
    }
}
/* ==========================================
        VIEW CONTRIBUTION
========================================== */

function viewContribution(id)
{
    window.location.href =
        `contribution-details.html?id=${id}`;
}

/* ==========================================
PAGE LOADER
========================================== */

window.addEventListener(
    "load",
    () =>
    {
        const loader =
            document.getElementById(
                "page-loader"
            );

        setTimeout(() =>
        {
            loader?.classList.add(
                "hide"
            );
        }, 200);
    }
);