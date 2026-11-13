const tracks = [
  {
    title: "Delbarat Khande Kone",
    artist: "REMIX BASS0",
    category: "ریمیکس",
    file: "assets/Delbarat Khande Kone (1).mp3"
  }
];

const songsEl = document.getElementById("songs");
const searchEl = document.getElementById("search");
const countEl = document.getElementById("songCount");
const emptyEl = document.getElementById("empty");

const gate = document.getElementById("gate");
const closeGate = document.getElementById("closeGate");
const continueDownload = document.getElementById("continueDownload");

let activeFilter = "همه";
let selectedTrack = null;

function renderSongs() {
  const query = searchEl.value.trim().toLowerCase();

  const filtered = tracks.filter(track => {
    const matchesFilter =
      activeFilter === "همه" ||
      track.category === activeFilter;

    const matchesSearch =
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  songsEl.innerHTML = "";

  countEl.textContent =
    `${filtered.length.toLocaleString("fa-IR")} آهنگ`;

  emptyEl.style.display =
    filtered.length ? "none" : "block";

  filtered.forEach(track => {
    const card = document.createElement("div");
    card.className = "song";

    const cover = document.createElement("div");
    cover.className = "cover";
    cover.textContent = "♫";

    const info = document.createElement("div");
    info.className = "song-info";

    const title = document.createElement("strong");
    title.textContent = track.title;

    const artist = document.createElement("small");
    artist.textContent = track.artist;

    const player = document.createElement("audio");
player.controls = true;
player.preload = "metadata";
player.src = track.file;
player.style.width = "100%";

info.append(title, artist, player);

    const button = document.createElement("button");
    button.className = "download";
    button.textContent = "دانلود آهنگ";

    button.addEventListener("click", () => {
      selectedTrack = track;
      gate.classList.add("show");
      gate.setAttribute("aria-hidden", "false");
    });

    card.append(cover, info, button);
    songsEl.appendChild(card);
  });
}

searchEl.addEventListener("input", renderSongs);

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(item => {
      item.classList.remove("active");
    });

    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderSongs();
  });
});

function closeDownloadGate() {
  gate.classList.remove("show");
  gate.setAttribute("aria-hidden", "true");
}

closeGate.addEventListener("click", closeDownloadGate);

continueDownload.addEventListener("click", () => {
  if (!selectedTrack) return;

  const link = document.createElement("a");
  link.href = selectedTrack.file;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();

  closeDownloadGate();
});

renderSongs();
    
