const apiUrl = "https://api.github.com/users/"
const form = document.getElementById("form")
const inputEl = document.getElementById("search")
const main = document.getElementById("main")

async function getProfile(userName) {
    const [userResponse, reposResponse] = await Promise.all([
        fetch(apiUrl + userName),
        fetch(apiUrl + userName + "/repos")
    ])

     if (!userResponse.ok) {
        main.innerHTML = `<p id="user-not-found">User not found</p>`
        main.onclick = null
        main.style.cursor = "default"
        return
    }

    const userData = await userResponse.json()
    const reposData = await reposResponse.json()

    main.style.display = "block"
    const card = `
        <div class="card">
            <div class="image-section">
                <div class="image-container">
                    <img class="avatar" src="${userData.avatar_url}" alt="${userData.name}">
                </div>
            </div>
            <div class="user-info">
                <h2>${userData.name}</h2>
                <p>${userData.bio}</p>

                <ul class="info">
                    <li>${userData.followers} <strong>Followers</strong></li>
                    <li>${userData.following} <strong>Following</strong></li>
                    <li>${userData.public_repos} <strong>Repos</strong></li>
                </ul>

                <div class="repos"></div>
                
            </div>
        </div>`

    main.innerHTML = card
    main.style.cursor = "pointer"
    main.onclick = () => {
        window.open(userData.html_url, "_blank")
    }
        
    const repos = document.querySelector(".repos")
    reposData.forEach(item => {
        const repoElement = document.createElement("a")
        repoElement.className = "repo"
        repoElement.href = item.html_url
        repoElement.target = "_blank"
        repoElement.textContent = item.name
        
        repoElement.addEventListener("click", (e) => {
            e.stopPropagation()
        })
        
        repos.appendChild(repoElement)
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (inputEl.value.trim()) {
        getProfile(inputEl.value.trim())
    }
})