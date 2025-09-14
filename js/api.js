import { renderSearchMusic, renderSongs } from "./ui.js";

//* Inputa girilen veriye göre aratacağımız api key
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "0b19c5db70msheb4a8ca87f61195p1c2505jsn2b26156d11ab",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};
const optionsTop = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "0b19c5db70msheb4a8ca87f61195p1c2505jsn2b26156d11ab",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  constructor() {
    this.songs = [];
  }
  //* searchMusic metoduna dışardan query parametresi gönderdik
  async searchMusic(query) {
    try {
      //* dışardan gönderilen değere göre apiye istek attık
      const res = await fetch(
        `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR&limit=5`,
        options
      );
      //* gelen cevabı jsona çevirdik
      const data = await res.json();
      let newData = data.tracks.hits;

      newData = newData.map((song) => ({ ...song.track }));
      this.songs = newData;

      renderSearchMusic(this.songs);
    } catch (error) {
      //* hata olursa yakalar
      console.log(error);
    }
  }

 async searchMusic(query) {
  try {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=tr-TR&limit=5`,
      options
    );
    const data = await res.json();

    if (!data.tracks || !data.tracks.hits) {
      console.warn("Veri eksik veya API limiti dolmuş:", data);
      renderSearchMusic([]);
      return;
    }

    let newData = data.tracks.hits.map((song) => ({ ...song.track }));
    this.songs = newData;
    renderSearchMusic(this.songs);
  } catch (error) {
    console.error("API Hatası:", error);
    renderSearchMusic([]);
  }
}

}

