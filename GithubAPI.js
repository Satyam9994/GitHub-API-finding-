let input = document.querySelector("input");
let button = document.querySelector("button");
let profileDiv = document.querySelector(".detail-container")

button.addEventListener("click", async () => {
    let username = input.value;
    if (!username) {
        profileDiv.innerHTML = "Enter username";
        return;
    }
    
    profileDiv.innerHTML = "Loading..."
    
    try {
        const res = await fetch(`https://api.github.com/users/${username}`)
        if(!res.ok) {
            throw new Error("User not found!")
        }
        
        const data = await res.json()
        
        profileDiv.innerHTML = `<h2>${data.name || "No name available"}</h2>
      <p><strong>Username:</strong> ${data.login}</p>
      <p><strong>Bio:</strong> ${data.bio || "No bio"}</p>
      <p><strong>Followers:</strong> ${data.followers} | <strong>Following:</strong> ${data.following}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>`;
    }
    catch (error) {
        profileDiv.innerHTML = "Error";
    }
});