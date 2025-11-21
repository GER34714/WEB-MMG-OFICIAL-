// ================= ARTISTAS ==================
fetch("artistas.json")
  .then(res => res.json())
  .then(lista => {
    const cont = document.getElementById("contenedor-artistas");

    cont.innerHTML = lista.map(art => `
      <div class="card-artista">
        <img src="${art.img || 'https://iili.io/H59TYva.png'}">
        <h3>${art.nombre}</h3>
        <p>${art.descripcion}</p>
        <a class="btn-contratar" 
           href="https://wa.me/1157343551?text=Quiero contratar a ${encodeURIComponent(art.nombre)}">
          Contratar Artista
        </a>
      </div>
    `).join("");
  });

// ================= GALERÍA ==================
fetch("galeria.json")
  .then(res => res.json())
  .then(fotos => {

    const preview = fotos.slice(0, 12); 
    const completa = fotos;

    document.getElementById("galeria-preview").innerHTML =
      preview.map(f => `<img src="${f}" loading="lazy">`).join("");

    document.getElementById("galeria-completa").innerHTML =
      completa.map(f => `<img src="${f}" loading="lazy">`).join("");

    document.getElementById("btnVerMas").addEventListener("click", () => {
      document.getElementById("galeria-completa").style.display = "grid";
      document.getElementById("btnVerMas").style.display = "none";
    });

  });
