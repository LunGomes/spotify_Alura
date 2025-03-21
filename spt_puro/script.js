import { useState, useEffect } from "react";

function Script() {
  const [searchTerm, setSearchTerm] = useState("");
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setArtist(null);
      return;
    }

    fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setArtist(data[0]); // Pegamos apenas o primeiro resultado
        } else {
          setArtist(null);
        }
      })
      .catch((error) => console.error("Erro ao buscar artista:", error));
  }, [searchTerm]); // Executa toda vez que o usuário digitar algo

  return (
    <div>
      {/* Input Controlado */}
      <input
        type="text"
        placeholder="Digite o nome do artista"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {/* Exibir Resultados */}
      {artist ? (
        <div id="result-artist">
          <h2>{artist.name}</h2>
          <img src={artist.urlImg} alt={artist.name} width="200" />
        </div>
      ) : (
        <p>Nenhum artista encontrado</p>
      )}
    </div>
  );
}

export default Script;