/* =========================================================
   EDIT YOUR PROJECTS HERE
   title : project name
   url   : link to the website
   tags  : short labels (optional)
   image : your own screenshot, e.g. "images/acadlink.png" (optional).
           Use this for sites that can't be shown in the preview.
   ========================================================= */
const PROJECTS = [
  { title: "AcadLink", url: "http://www.acadlink.online/", tags: ["Web App"] },
  {
    title: "My Personal Website",
    url: "https://example.com",
    tags: ["HTML", "CSS", "JS"],
  },
  {
    title: "Landing Page",
    url: "https://developer.mozilla.org",
    tags: ["Responsive", "UI"],
  },
  {
    title: "CSE Reviewer",
    url: "https://jeremiah110102.github.io/CSE_Game/",
    tags: ["Responsive", "UI"],
  },
  {
    title: "Delevieres Report",
    url: "https://jeremiah110102.github.io/LGMC-Deleviries/",
    tags: ["Responsive", "UI"],
  },
  {
    title: "School Information System",
    url: "https://acadlink.wuaze.com/",
    tags: ["Responsive", "UI"],
  },
  {
    title: "Face Book Page Monitoring System",
    url: "https://pagemonitoringsystem.site.je/",
    tags: ["Responsive", "UI"],
  },
];

/*   https://acadlink.wuaze.com/=========================================================
   EDIT YOUR AI TOOLS HERE
   level : 0 to 100
   uses  : what you use it for
   ========================================================= */
const AI_TOOLS = [
  { name: "Claude", level: 90, uses: "Coding, writing, debugging" },
  { name: "ChatGPT", level: 85, uses: "Brainstorming, research, content" },
  { name: "Gemini", level: 75, uses: "Research, summaries" },
  { name: "Manus", level: 65, uses: "AI agents, automation" },
];

/* Free hosts that block previews inside other websites */
const BLOCKED_HOSTS = [
  "wuaze.com",
  "rf.gd",
  "epizy.com",
  "infinityfreeapp.com",
  "great-site.net",
  "free.nf",
  "gt.tc",
  "42web.io",
  "ct.ws",
  "kesug.com",
  "lovestoblog.com",
];

/* ========================================================= */

function getHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return url;
  }
}

function isBlocked(url) {
  const host = getHost(url);
  return BLOCKED_HOSTS.some((d) => host === d || host.endsWith("." + d));
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();

/* Mobile menu */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }),
);

/* AI tools */
document.getElementById("aiList").innerHTML = AI_TOOLS.map((tool) => {
  const level = Math.max(0, Math.min(100, tool.level));
  return `
    <li class="ai-row">
      <div class="ai-row-top">
        <div>
          <span class="ai-name">${escapeHtml(tool.name)}</span>
          <span class="ai-uses"> &middot; ${escapeHtml(tool.uses)}</span>
        </div>
        <span class="ai-percent">${level}%</span>
      </div>
      <div class="ai-bar" role="meter" aria-valuemin="0" aria-valuemax="100"
           aria-valuenow="${level}" aria-label="${escapeHtml(tool.name)} proficiency">
        <span style="width:${level}%"></span>
      </div>
    </li>`;
}).join("");

/* Projects */
const grid = document.getElementById("projectGrid");
grid.innerHTML = PROJECTS.map(
  (p, i) => `
  <button class="project-card" type="button" data-index="${i}">
    <h3>${escapeHtml(p.title)}</h3>
    <p class="domain">${escapeHtml(getHost(p.url))}</p>
    <ul class="tags">${(p.tags || []).map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
  </button>`,
).join("");

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".project-card");
  if (card) showProject(Number(card.dataset.index));
});

/* Preview */
const frame = document.getElementById("previewFrame");
const image = document.getElementById("previewImg");
const message = document.getElementById("previewMessage");

function showProject(index) {
  const project = PROJECTS[index];
  if (!project) return;

  grid
    .querySelectorAll(".project-card")
    .forEach((card, i) => card.classList.toggle("active", i === index));

  document.getElementById("previewUrl").textContent = project.url;
  document.getElementById("previewOpen").href = project.url;
  document.getElementById("previewMsgLink").href = project.url;

  frame.hidden = true;
  image.hidden = true;
  message.hidden = true;

  if (project.image) {
    // Your own screenshot
    image.src = project.image;
    image.alt = "Screenshot of " + project.title;
    image.hidden = false;
  } else if (isBlocked(project.url)) {
    frame.src = "about:blank";
    document.getElementById("previewNote").textContent =
      getHost(project.url) +
      " is on a host that doesn't allow previews inside other pages.";
    message.hidden = false;
  } else {
    frame.src = project.url;
    frame.hidden = false;
  }
}

if (PROJECTS.length) showProject(0);
