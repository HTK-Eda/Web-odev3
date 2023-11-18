import "./App.css";
import React from 'react';



//arama kutucuğunun bileşenini oluşturduk
function Arama({aramaMetni, onSearch, }){
 
  function handleChange(event){
    setAramaMetni(event.target.value)
    
     props.onSearch(event);
     localStorage.setItem("aranan", event.target.value);  //ekranda ne yazasrsan onu yerel depolama birimine yaz diyoer
  }
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni); 
  },[aramaMetni]);

    return(
    <div>     
      <label htmlFor="arama">Ara: </label>
      <input id="arama" type="text" onChange={onSearch} value={aramaMetni}   />  
      <p>
        
      </p>
      </div>
  )
}

function Yazi({id, url, baslik, yazar, yorum_sayisi, puan, sure}){
  return(
    <li key={id}>
          <span>
            <a href={url}>{baslik}</a>, 
          </span>
          <span><b>Yazar:</b> {yazar}, </span>
          <span><b>Yorum Sayısı:</b> {yorum_sayisi}, </span>
          <span><b>Puan:</b> {puan}, </span>
          <span><b>Süre (saat):</b> {sure}</span>
        </li>
  )
}


//ilk baştakinden farkı yok ekran olarak. Daha esnek bir yapı ile oluşturduk
function Liste(props) {    //bu function bir bileşen, javadaki class gibi düşün. Liste isminde bir bileşen
  return(
  <ul>
   {props.yazilar.map(function (yazi){
    return (
    
    <Yazi key={yazi.id} {...yazi}/>
    );
   })}

  </ul>

  )                     
}

function App() {
  const [aramaMetni, setAramaMetni] = React.useState(localStorage.getItem("aranan") ||  "React");


  const yaziListesi = [
    {  
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
      sure: 1,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
      sure: 2,
    },

    {
      baslik: "Javascript Temelleri",
      url: "wwww.google.com.tr",
      yazar: "Zeynep Can",
      yorum_sayisi: 9,
      puan: 7.2,
      id: 2,
      sure: 1,
    },

    {
      baslik: "Yapay Zeka İçin Python Programlama",
      url: "wwww.google.com.tr",
      yazar: "Ege Sırma",
      yorum_sayisi: 2,
      puan: 3.7,
      id: 3,
      sure:3,
    },

    {
      baslik: "SQL İle Veri Tabanı Eğitimi",
      url: "wwww.google.com.tr",
      yazar: "Ahmet Ozan",
      yorum_sayisi: 8,
      puan: 6.7,
      id: 4,
      sure:2,
    },
  ];

   const arananYazilar=yaziListesi.filter((item) => 
   item.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
   item.yazar.toLowerCase().includes(aramaMetni.toLowerCase())
   );

//1. asama :callback metodu olusturma
  function handleSearch(event){
   setAramaMetni(event.target.value);
  }

  return (
    <div>
      <h1>Yazılar</h1>
      <Arama aramaMetni={aramaMetni}  onSearch = {handleSearch} />  
      <strong>{aramaMetni} araniyor...</strong>
      <hr />
      <Liste yazilar={arananYazilar}/>
    </div>
  );
  //props tanımlamışım listede. props konusu önemli
}
export default App;