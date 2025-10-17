document.getElementById("loadBtn").addEventListener("click", async () => {
  const repo = document.getElementById("repoInput").value.trim();
  if (!repo) {
    alert("Please enter a repository name, e.g. Bingwa-Sokoni-Automation-Toolkit/releases");
    return;
  }

  const container = document.getElementById("releasesContainer");
  container.innerHTML = "<p>Loading...</p>";

  try {
    // Fetch GitHub releases using the API
    const response = await fetch(`https://api.github.com/repos/${repo}/releases`);
    if (!response.ok) throw new Error("Repository not found or no releases available.");

    const data = await response.json();

    // If there are no releases
    if (data.length === 0) {
      container.innerHTML = "<p>No releases found for this repository.</p>";
      return;
    }

    // Display each release
    container.innerHTML = data.map(release => `
      <div class="release">
        <h2>${release.name || release.tag_name}</h2>
        <p>${release.body ? release.body.substring(0, 200) + "..." : "No description available."}</p>
        <a href="${release.html_url}" target="_blank">🔗 View on GitHub</a>
      </div>
    `).join("");

  } catch (error) {
    container.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
});
