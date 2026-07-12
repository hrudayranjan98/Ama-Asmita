document.addEventListener(
"DOMContentLoaded",
() =>
{

const token =
localStorage.getItem(
"token"
);

const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

const loginNavItem =
document.getElementById(
"loginNavItem"
);

const profileSection =
document.getElementById(
"userProfileSection"
);

if(token && user)
{
loginNavItem?.classList.add(
"d-none"
);

profileSection?.classList.remove(
"d-none"
);

document.getElementById(
"sidebarUserName"
).textContent =
user.name;

document.getElementById(
"sidebarEmail"
).textContent =
user.email;

if(
user.role ===
"Admin"
)
{
document.getElementById(
"profileHeading"
).textContent =
"Admin Profile";
}
}

const avatar =
document.getElementById(
"profileAvatar"
);

const sidebar =
document.getElementById(
"profileSidebar"
);

const overlay =
document.getElementById(
"sidebarOverlay"
);

avatar?.addEventListener(
"click",
() =>
{
sidebar.classList.add(
"active"
);

overlay.classList.add(
"active"
);
}
);

document.getElementById(
"closeSidebar"
)?.addEventListener(
"click",
() =>
{
sidebar.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);
}
);

overlay?.addEventListener(
"click",
() =>
{
sidebar.classList.remove(
"active"
);

overlay.classList.remove(
"active"
);
}
);

document.getElementById(
"logoutBtn"
)?.addEventListener(
"click",
() =>
{
localStorage.clear();

window.location.href =
"login.html";
}
);

});