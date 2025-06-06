const apiUrl = "https://api.github.com/users/"
const form = document.getElementById("form")
const inputEl = document.getElementById("search")
const main = document.querySelector("#main")

async function getUser(userName) {
    const response = await fetch(apiUrl + userName)
    const data = await response.json()
    main.style.display = "block"
    const card = `
    <div class="card">
        <div class="image-section">
            <div class="image-container">
                <img class="avatar" src="${data.avatar_url}" alt="">
            </div>
        </div>
        <div class="user-info">
            <h2>${data.name}</h2>
            <p>${data.bio}</p>

            <ul class="info">
                <li>${data.followers} <strong>Followers</strong></li>
                <li>${data.following} <strong>Following</strong></li>
                <li>${data.public_repos} <strong>Repos</strong></li>
            </ul>

            <div class="repos"></div>
            
        </div>
    </div>`

    main.innerHTML = card
    getRepos(userName)
}

async function getRepos(userName) {
    const repos = document.querySelector(".repos")
    const response = await fetch(apiUrl + userName + "/repos")
    const data = await response.json()
    data.forEach(item => {
        const element = `<a class="repo" href="${item.html_url}" target="_blank">${item.name}</a>`
        repos.insertAdjacentHTML("beforeend", element)
    })   
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (inputEl.value.trim()) {
        getUser(inputEl.value.trim())
        inputEl.value = ""
    }
})