/* ==========================================
   NAVBAR.JS
   Ama Asmita
========================================== */
console.log("Navbar JS Loaded");

console.log(
    "Token Value:",
    localStorage.getItem("token")
);

    const token =
        localStorage.getItem(
            "token"
        );

    let user = {};

try
{
    user =
    JSON.parse(
        localStorage.getItem(
            "user"
        ) || "{}"
    );

    console.log(
        "User Object:",
        user
    );
}
catch(error)
{
    console.error(
        "User Parse Error:",
        error
    );
}

    const role =
        localStorage.getItem(
            "role"
        );

    const loginNavItem =
        document.getElementById(
            "loginNavItem"
        );

    const userProfileSection =
        document.getElementById(
            "userProfileSection"
        );


    const profileAvatar =
        document.getElementById(
            "profileAvatar"
        );

    const sidebarProfileAvatar =
        document.getElementById(
            "sidebarProfileAvatar"
        );

    const profileSidebar =
        document.getElementById(
            "profileSidebar"
        );

    const profileSidebarOverlay =
        document.getElementById(
            "profileSidebarOverlay"
        );

    const closeProfileSidebar =
        document.getElementById(
            "closeProfileSidebar"
        );

    const notificationBtn =
        document.getElementById(
            "notificationBtn"
        );

    const notificationSidebar =
        document.getElementById(
            "notificationSidebar"
        );

    const notificationSidebarOverlay =
        document.getElementById(
            "notificationSidebarOverlay"
        );

    const closeNotificationSidebar =
        document.getElementById(
            "closeNotificationSidebar"
        );

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    /* ==========================================
       LOGIN / LOGOUT UI
    ========================================== */

    console.log(
    "Reached IF Block"
);

    if(token)
{
    console.log("User Logged In");

    loginNavItem?.classList.add(
        "d-none"
    );

    userProfileSection?.classList.remove(
        "d-none"
    );

    const sidebarUserName =
        document.getElementById(
            "sidebarUserName"
        );

    if(sidebarUserName)
    {
        sidebarUserName.textContent =
            user.name ||
            user.userName ||
            "User";
    }

    const sidebarUserEmail =
        document.getElementById(
            "sidebarUserEmail"
        );

    if(sidebarUserEmail)
    {
        sidebarUserEmail.textContent =
            user.email ||
            "-";
    }

    const profilePanelTitle =
        document.getElementById(
            "profilePanelTitle"
        );

    if(profilePanelTitle)
    {
        profilePanelTitle.textContent =
            role === "Admin"
            ? "Admin Profile"
            : "User Profile";
    }

    console.log(
        "Profile Section Activated"
    );
}
else
{
    console.log("User Not Logged In");

    loginNavItem?.classList.remove(
        "d-none"
    );

    userProfileSection?.classList.add(
        "d-none"
    );
}
    
    /* ==========================================
       PROFILE SIDEBAR
    ========================================== */

    profileAvatar?.addEventListener(
        "click",
        () =>
    {

        profileSidebar.classList.add(
            "active"
        );

        profileSidebarOverlay.classList.add(
            "active"
        );

    });

    closeProfileSidebar?.addEventListener(
        "click",
        closeProfilePanel
    );

    profileSidebarOverlay?.addEventListener(
        "click",
        closeProfilePanel
    );

    function closeProfilePanel()
    {

        profileSidebar.classList.remove(
            "active"
        );

        profileSidebarOverlay.classList.remove(
            "active"
        );

    }

    /* ==========================================
       NOTIFICATION SIDEBAR
    ========================================== */

    notificationBtn?.addEventListener(
        "click",
        () =>
    {

        notificationSidebar.classList.add(
            "active"
        );

        notificationSidebarOverlay.classList.add(
            "active"
        );

        clearNotificationCount();

    });

    closeNotificationSidebar?.addEventListener(
        "click",
        closeNotificationPanel
    );

    notificationSidebarOverlay?.addEventListener(
        "click",
        closeNotificationPanel
    );

    function closeNotificationPanel()
    {

        notificationSidebar.classList.remove(
            "active"
        );

        notificationSidebarOverlay.classList.remove(
            "active"
        );

    }

    /* ==========================================
       NOTIFICATIONS
    ========================================== */

    function loadNotifications()
    {

        const notifications =
            JSON.parse(
                localStorage.getItem(
                    "notifications"
                ) || "[]"
            );

        const notificationList =
            document.getElementById(
                "notificationList"
            );

        const badge =
            document.getElementById(
                "notificationCount"
            );

        const sidebarBadge =
            document.getElementById(
                "sidebarNotificationCount"
            );

        if(
            notifications.length === 0
        )
        {

            notificationList.innerHTML =
            `
            <div class="notification-empty">
                No Notifications Available
            </div>
            `;

            badge.textContent = "0";

            sidebarBadge.textContent =
                "0";

            return;
        }

        notificationList.innerHTML =
            notifications
            .map(
                notification =>
                `
                <div class="notification-item">
                    <div class="notification-message">
                        ${notification.message}
                    </div>

                    <div class="notification-time">
                        ${notification.time}
                    </div>
                </div>
                `
            )
            .join("");

        badge.textContent =
            notifications.length;

        sidebarBadge.textContent =
            notifications.length;
    }

    function clearNotificationCount()
    {

        document.getElementById(
            "notificationCount"
        ).textContent = "0";

        document.getElementById(
            "sidebarNotificationCount"
        ).textContent = "0";
    }

    loadNotifications();

    /* ==========================================
   LOGOUT
========================================== */

logoutBtn?.addEventListener(
    "click",
    () =>
{

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "user"
    );

    localStorage.removeItem(
        "role"
    );

    localStorage.removeItem(
        "userName"
    );

    window.location.href =
        "login.html";

});