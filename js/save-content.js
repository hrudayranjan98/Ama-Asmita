document.addEventListener(
    "click",
    async (e) =>
{

    const button =
        e.target.closest(
            ".save-btn"
        );

    if(!button) return;

    const token =
        localStorage.getItem(
            "token"
        );

    if(!token)
    {
        alert(
            "Please Login First"
        );

        return;
    }

    const payload =
    {
        contentId:
            button.dataset.id,

        contentType:
            button.dataset.type,

        contentName:
            button.dataset.name,

        imageUrl:
            button.dataset.image,

        location:
            button.dataset.location
    };

    try
    {
        const response =
            await fetch(
                "http://localhost:5128/api/savedcontent",
                {
                    method: "POST",

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

        if(response.ok)
        {
            button.innerHTML =
                `<i class="bi bi-star-fill"></i>`;
        }
    }
    catch(error)
    {
        console.error(error);
    }

});