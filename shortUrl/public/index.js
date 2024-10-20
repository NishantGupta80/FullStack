const longUrl = document.getElementById("long-url");
const shortUrlBtn = document.getElementById("short-url-btn");
const shortUrlResponse = document.getElementById("short-url-response");

shortUrlBtn.addEventListener("click", async function () {
  const response = await fetch("/short-url", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl: longUrl.value }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    shortUrlResponse.innerHTML = `<a href="${data.shortUrl}" target="_blank">${data.shortUrl}</a>`;
  }
});
