"use strict";

// OPGAVE 1:
function initValidatie() {
  document.querySelector("#naam").addEventListener("blur", naamValidatie, false);
  document.querySelector("#rijksregister").addEventListener("blur", rijksregisterValidatie, false);
  document.querySelector("#gok").addEventListener("blur", gokValidatie, false);
  document.querySelector("#data").addEventListener("submit", formValidatie, false);
}

// OPGAVE 2:
function naamValidatie() {
  console.log("naamValidatie");
  const node = document.querySelector("#naamfout");
  const regExp = /^[A-Z][a-zA-Z ]+$/;
  if(regExp.test(document.querySelector("#naam").value)) {
    node.innerHTML = "";
    return true;
  } else {
    node.innerHTML = "Begin de naam met een hoofdletter!";
    return false;
  }
}

// OPGAVE 3:
function isGeldigRijksregister(rijksregister) {
  const regExp = /^[\d]{2}\.(([0][1-9])|([1][0-2])).(([0][1-9])|([1][0-9])|([2][0-9])|([3][0-1]))-\d{3}.\d{2}$/;
  if(regExp.test(rijksregister)) {
    return true;
  } else {
    return false;
  }
}

function rijksregisterValidatie() {
  console.log("rijksregisterValidatie");
  const node = document.querySelector("#rijksregisterfout");
  if(isGeldigRijksregister(document.querySelector("#rijksregister").value)) {
    node.innerHTML = "";
    return true;
  } else {
    node.innerHTML = "Gebruik correct formaat!";
    return false;
  }
}

// OPGAVE 4:
function gokValidatie() {
  console.log("gokValidatie");
  const node = document.querySelector("#gokfout");
  const regExp = /^[1-6]$/;
  if(regExp.test(document.querySelector("#gok").value)) {
    node.innerHTML = "";
    return true;
  } else {
    node.innerHTML = "Gok moet tussen 1 en 6 zijn!";
    return false;
  }
}

// OPGAVE 5:
function formValidatie(event) {
  console.log("formValidatie");
  event.preventDefault();
  if(naamValidatie() && rijksregisterValidatie() && gokValidatie()) {
    document.querySelector("#data").submit();
  } else {
    document.querySelector("#formulier").innerHTML = "Geen geldige invoer!";
  }
}

// --------------------------------------------------------------------------
// Voor de pagina verzonden.html
//---------------------------------------------------------------------------
let poging;

// OPGAVE 6:
function wijzigKopEnVerbergArtikels() {
  document.querySelector("header p:first-child").className = "kop";
  let nodes = document.querySelectorAll("section > article");
  for (let node of nodes) {
    node.style.display = "none";
  }
}

// OPGAVE 7:
class Beurt {
  constructor(naam, rijksregister, gok, doppelsteenworp) {
    this.naam = naam;
    this.rijksregister = rijksregister;
    this.gok = gok;
    this.doppelsteenworp = doppelsteenworp;
  }

  isGewonnen() {
    return (parseInt(this.gok) === parseInt(this.doppelsteenworp));
  }

  txtResultaat() {
    return (this.isGewonnen()) ? "Er werd juist gegokt" : `Er werd helaas verkeerd gegokt (de dobbelsteen toonde ${this.doppelsteenworp} ogen)`;
  }

  getLeeftijd() {
    let vandaag = new Date;
    let rijksregister = this.rijksregister.slice(0,8);
    rijksregister = rijksregister.split(".");
    if (rijksregister[0] > vandaag.getFullYear()-2000) {
      rijksregister[0] = parseInt(rijksregister[0]) + 1900;
    } else {
      rijksregister[0] = parseInt(rijksregister[0]) + 2000;
    }
    // new Date functie verwacht MM/DD/YYYY
    let geboortedatum = new Date(rijksregister[1] + "/" + rijksregister[2] + "/" + rijksregister[0])
    let leeftijd = vandaag.getFullYear() - geboortedatum.getFullYear();
    let maand = vandaag.getMonth() - geboortedatum.getMonth();
    if (maand < 0 || (maand === 0 && vandaag.getDate() < geboortedatum.getDate())) {
      --leeftijd;
    }
    return leeftijd;
  }

  toString() {
    if(this.isGewonnen()) {
      return `
          <p>${this.getLeeftijd()}-jarige ${this.naam} met rijksregisternr ${this.rijksregister} gokte ${this.gok} ogen.<br>
          Er werd juist gegokt!</p>
        `;
    } else {
      return `
          <p>${this.getLeeftijd()}-jarige ${this.naam} met rijksregisternr ${this.rijksregister} gokte ${this.gok} ogen.<br>
         Er werd helaas verkeerd gegokt (de dobbelsteen toonde ${this.doppelsteenworp} ogen)</p>
        `;
    }
  }
}

// OPGAVE 8:
function getParam(name) {
// Deze functie wordt gebruikt om parameters door te geven tussen pagina's
  let queryString = decodeURIComponent(location.search.replace(/\+/g, " "));
  let regex = new RegExp(name + "=([^&*]+)");
  let result = regex.exec(queryString);
  if (result) {
    return result[1];
  }
  return null;
}

// OPGAVE 9:
function initVerzonden() {
  wijzigKopEnVerbergArtikels();
  poging = new Beurt(getParam("naam"), getParam("rijksregister"), getParam("gok"), werpDobbelsteen());
  document.querySelector("body > section:nth-of-type(1) > h3").innerHTML = poging;
}

// OPGAVE 10:
function werpDobbelsteen() {
// laat onderstaande lijn als laatste lijn in deze functie staan
  let doppelsteenworp =  Math.floor(Math.random()*6)+1;
  let nodes = document.querySelectorAll("body > section:nth-of-type(2) > article");
  nodes[doppelsteenworp-1].style.display = "block";
  poging = new Beurt(getParam("naam"), getParam("rijksregister"), getParam("gok"), doppelsteenworp);
  (poging.isGewonnen()) ? document.querySelector("#jackpot").parentElement.style.display = "block" : document.querySelector("#verloren").parentElement.style.display = "block";
  return doppelsteenworp;
  console.log(poging.toString());
}
