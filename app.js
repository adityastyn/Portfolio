/* ===== EDIT THIS BLOCK ===== */
const C={github:"YOUR_GITHUB_USERNAME",email:"you@example.com",linkedin:"https://linkedin.com/in/YOUR_HANDLE",
featured:[] /* e.g. ["ClaimLens","kani"] to pin and order */};
/* =========================== */
const pages=[["index.html","Index"],["projects.html","Work"],["experience.html","Experience"],["about.html","About"],["contact.html","Contact"]];
const cur=location.pathname.split("/").pop()||"index.html";
document.body.insertAdjacentHTML("afterbegin",`<header><a class="logo" href="index.html">Adi<sup>®</sup></a><nav>${pages.map(([h,n],i)=>`<a href="${h}" class="${h===cur?"on":""}"><em>0${i}</em>${n}</a>`).join("")}</nav></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><span>© ${new Date().getFullYear()} Adi</span><span><a href="https://github.com/${C.github}">GitHub</a> · <a href="${C.linkedin}">LinkedIn</a></span></footer>`);
document.querySelectorAll("[data-mail]").forEach(e=>{e.href="mailto:"+C.email;if(e.dataset.mail)e.textContent=C.email});
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
async function gh(p){const k="gh:"+p,c=JSON.parse(sessionStorage.getItem(k)||"null");if(c&&Date.now()-c.t<6e5)return c.d;
const r=await fetch("https://api.github.com"+p);if(!r.ok)throw 0;const d=await r.json();try{sessionStorage.setItem(k,JSON.stringify({t:Date.now(),d}))}catch(e){}return d}
const box=document.getElementById("repos"),st=document.getElementById("stats");
if(box||st)(async()=>{try{
const [u,all]=await Promise.all([gh("/users/"+C.github),gh(`/users/${C.github}/repos?per_page=100&sort=updated`)]);
const own=all.filter(r=>!r.fork);
if(st)st.innerHTML=[[u.public_repos,"Public repositories"],[own.reduce((a,r)=>a+r.stargazers_count,0),"Stars earned"],[u.followers,"Followers"],["9.3","CGPA, B.Tech CSE"]].map(([v,l])=>`<div><b>${v}</b>${l}</div>`).join("");
if(box){const lim=+box.dataset.limit||99;
const list=C.featured.length?C.featured.map(n=>own.find(r=>r.name.toLowerCase()===n.toLowerCase())).filter(Boolean):own.sort((a,b)=>b.stargazers_count-a.stargazers_count||new Date(b.pushed_at)-new Date(a.pushed_at));
box.innerHTML=list.slice(0,lim).map((r,i)=>`<a class="row" href="${esc(r.homepage||r.html_url)}" target="_blank" rel="noopener"><span class="n">${String(i+1).padStart(2,"0")}</span><span class="t">${esc(r.name)}</span><span class="d">${esc(r.description||"Add a one-line description on GitHub.")}</span><span class="m">${esc(r.language||"—")} · ★${r.stargazers_count} · ${new Date(r.pushed_at).getFullYear()}</span><span class="ar">↗</span></a>`).join("")||"<p>No public repositories yet.</p>"}
}catch(e){if(box)box.innerHTML="<p>Could not load GitHub data. Check C.github in app.js.</p>"}})();
