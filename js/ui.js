import { elements } from "./helpers.js";

export const renderSearchMusic = (songs) => {
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    //* Döndüğümüz her bir veri için bir tane div oluştur
    const div = document.createElement("div");

    //* kart divine data özellikler ekleme
    div.dataset.url = song.hub.actions.pop().uri;
    div.dataset.title = song.title;
    div.dataset.img = song.images.coverart;
    div.className = "card";

    div.innerHTML = `
        <figure>
            <img
                src="${song.images.coverart}"
                alt=""
            />
            <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
            </div>
            <h4>${song.subtitle}</h4>
            <h4>${song.title}</h4>
        </figure>
    
    `;
    //* Her döndüğümüz şarkı için div oluştur ve list kapsayıcısına ekle
    elements.list.appendChild(div);
  });
};
//* Başlığı aldığı parametreye günceller
export const updateTitle = (message) => {
  elements.title.textContent = message;
};

export const renderSongs = (songs = []) => {
  elements.list.innerHTML = "";

  if (!Array.isArray(songs)) {
    console.warn("Geçersiz şarkı listesi:", songs);
    return;
  }

  songs.forEach((song) => {
    if (
      !song.preview_url ||
      !song.name ||
      !song.album ||
      !song.album.images ||
      !song.album.images[1] ||
      !song.album.artists ||
      !song.album.artists[0]
    ) {
      console.warn("Eksik veri atlandı:", song);
      return;
    }

    const div = document.createElement("div");

    div.dataset.url = song.preview_url;
    div.dataset.title = song.name;
    div.dataset.img = song.album.images[1].url;
    div.className = "card";

    div.innerHTML = `
        <figure>
            <img src="${song.album.images[1].url}" alt="" />
            <div class="play">
                <i class="bi bi-play-fill" id="play-btn"></i>
            </div>
            <h4>${song.album.artists[0].name}</h4>
            <h4>${song.name.slice(0, 15)}...</h4>
        </figure>
    `;

    elements.list.appendChild(div);
  });
};

//* dataset üzerinden gelen resmi ve namei info kısmına ekle
export const renderPlayingInfo = (song) => {
  console.log(song);
  elements.playingInfo.innerHTML = `
    <img
       src="${song.img}"
       alt=""
    />
    <div>
        <p>Şu an oynatılıyor...</p>
        <h3>${song.title}</h3>
    </div>
  
  `;
};