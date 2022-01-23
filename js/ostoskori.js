'use strict';

if(document.readyState ==='loading'){     /* Aleksi - Tarkastetaan onko documentti ladattu*/
  document.addEventListener('DOMContentLoaded', ready)
}else {
  lopullinenSumma()
  ready()
}
  function ready(){
    const poistanappi = document.getElementsByClassName('poistonappi');
    for(let i = 0; i < poistanappi.length; i++){
      const button = poistanappi[i];                    /* Aleksi - Etsitään minkä tuotteen kohdalla klikattiin poista ostoskorista ja ajetaan poistatuote funktio*/
      button.addEventListener('click', poistaTuote)
      }
  const maaraInput = document.getElementsByClassName('ostoskori-quantity-input')
    for (let i = 0; i < maaraInput.length; i++) {
      const input = maaraInput[i]                      /* Aleksi - Etsitään minkä tuotteen inputin arvo muuttui ja ajetaan maaranMuutos funktio*/
      input.addEventListener('change', maaranMuutos)
    }
  const lisaakoriin = document.getElementsByClassName('lisaaostoskoriin')
    for (let i = 0; i < lisaakoriin.length; i++) {
      const button = lisaakoriin[i]                   /* Aleksi - Etsitään minkä tuotteen kohdalla klikattiin lisää ostoskoriin ja ajetaan haeKlikatunTiedot funktio*/
      button.addEventListener('click', haeKlikatunTiedot)
    }

}

function maaranMuutos(event){            /* Aleksi - Jos input muuttuu varmistetaan että se on vähintään 1*/
  const input = event.target
  if(isNaN(input.value) || input.value <= 0){
    input.value = 1;
  }
  lopullinenSumma()
}

function haeKlikatunTiedot(event){     /* Aleksi - Haetaan klikatun tuotteen nimi, hinta sekä kuva tuotteesta*/
  const nappiapainettu = event.target
  const tuote = nappiapainettu.parentElement.parentElement
  const tuotteenNimi = tuote.getElementsByClassName('nimi')[0].innerText
  const hinta = tuote.getElementsByClassName('price')[0].innerText
  const kuva = tuote.getElementsByClassName('kuva')[0].src
  lisaaTuoteOstoskoriin(tuotteenNimi, hinta, kuva)
  lopullinenSumma()
}

function lisaaTuoteOstoskoriin(tuotteenNimi, hinta, kuva){         /* Aleksi - Luodaan yksi uusi rivi tuotteelle ostoskoriin*/
  const uusirivi = document.createElement('div')
  const edellinenrivi = document.getElementsByClassName('ostoskorituotteet')[0]
  const joKorissa = edellinenrivi.getElementsByClassName('ostoskori-item-title')
  for (let i = 0; i < joKorissa.length; i++) {                     /* Aleksi - Tarkistetaan onko klikattu tuote jo ostoskorissa*/
    if(joKorissa[i].innerText === tuotteenNimi){
      alert('Tuote on jo ostoskorissa')
      return
    }
  }                                                             /* Aleksi - Luodaan yksi tyhjä rivi ostoskoriin ja sijoitetaan tuotteentieto muuttujat oikeille paikoille*/
  const tyhjarivi = `                                            
        <div class="ostoskoririvi">
                  <div class="ostoskori-item ostoskori-column">
                      <img class="ostoskori-item-image" src="${kuva}" width="160" height="160">
                      <span class="ostoskori-item-title">${tuotteenNimi}</span>
                  </div>
                  <span class="ostoskori-price ostoskori-column">${hinta}</span>
                  <div class="ostoskori-quantity ostoskori-column">
                      <input class="ostoskori-quantity-input" type="number" value="1">
      
                      <button class="poistonappi" type="button">Poista tuote ostoskorista</button>
                  </div>`
  uusirivi.innerHTML = tyhjarivi
  edellinenrivi.appendChild(uusirivi)
  uusirivi.getElementsByClassName('poistonappi')[0].addEventListener('click',poistaTuote)  /* Aleksi - Teimme poista tuote ostoskorista napilla eventlistenerin kun sivu latautui joten uudessa tuotteessa se ei toimi --> lisätään uudelle tuotteelle se*/
  uusirivi.getElementsByClassName('ostoskori-quantity-input')[0].addEventListener('change', maaranMuutos) /* Aleksi - Sama ongelma inputin kanssa uuden tuotteen määrä ei muuta summaa joten päivitetään se*/
}


function poistaTuote(event) {             /* Aleksi - Poistetaan tuote ostoskorista*/
  const nappiapainettu = event.target
  nappiapainettu.parentElement.parentElement.remove();
  lopullinenSumma();
}

function lopullinenSumma(){               /* Aleksi - Päivitetään ostoskorin summa kertomalla tuotteen hinta tuotteiden määrällä*/
  const kontainer = document.getElementsByClassName('ostoskorituotteet')[0]
  const tuotteet = kontainer.getElementsByClassName('ostoskoririvi');
  let viimeinensumma = 0;
  for (let i = 0; i < tuotteet.length; i++) {
    const tuote = tuotteet[i]
    const hinta = tuote.getElementsByClassName('ostoskori-price')[0]
    const maaraElementti = tuote.getElementsByClassName('ostoskori-quantity-input')[0]
    const lopullinensumma = parseFloat(hinta.innerText.replace('€', ''))
    const maara = maaraElementti.value
    viimeinensumma = viimeinensumma + (lopullinensumma * maara);
  }
  viimeinensumma = Math.round(viimeinensumma * 100) / 100
  document.getElementsByClassName('ostoskorilopullinen-price')[0].innerText = viimeinensumma + '€';
}

