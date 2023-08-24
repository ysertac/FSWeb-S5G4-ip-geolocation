//axios import buraya gelecek
import axios from "axios";

var benimIP;

// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
  await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  })
    .then(function (response) {
      return response.data;
    })
    .then(function (a) {
      benimIP = a;
    });
}
// ------------ değiştirmeyin --------------

/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	NOT: API'den gelen bayrak url'i çalışmazsa alternatif olarak: https://flagsapi.com/
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/

//kodlar buraya gelecek

console.log(ipAdresimiAl());
console.log(benimIP);
const cards = document.querySelector(".cards");
const myIpAddress = "178.241.158.13";
const url = `https://apis.ergineer.com/ipgeoapi/${myIpAddress}`;
const geoData = axios.get(url);
//const flagData = axios.get("https://restcountries.com/v3.1/name/turkey");

geoData.then((response) => {
  cards.append(cardMaker(response.data));
});

function cardMaker(data) {
  const card = document.createElement("div");
  card.classList = "card";

  const img = document.createElement("img");
  img.setAttribute("src", "https://flagcdn.com/w320/tr.png");
  card.append(img);

  const cardInfo = document.createElement("div");
  cardInfo.classList = "card-info";
  card.append(cardInfo);

  const cardHeader = document.createElement("h3");
  cardHeader.classList = "ip";
  cardHeader.textContent = myIpAddress;
  cardInfo.append(cardHeader);

  const ulke = document.createElement("p");
  ulke.classList = "ulke";
  ulke.textContent = `${data["ülke"]} (${data["ülkeKodu"]})`;
  cardInfo.append(ulke);

  const koordinat = document.createElement("p");
  koordinat.textContent = `Enlem: ${data.enlem} Boylem: ${data.boylam}`;
  cardInfo.append(koordinat);

  const sehir = document.createElement("p");
  sehir.textContent = `Şehir: ${data.şehir}`;
  cardInfo.append(sehir);

  const saat = document.createElement("p");
  saat.textContent = `Saat dilimi: ${data.saatdilimi}`;
  cardInfo.append(saat);

  const para = document.createElement("p");
  para.textContent = `Para birimi: ${data.parabirimi}`;
  cardInfo.append(para);

  const isp = document.createElement("p");
  isp.textContent = `ISP: ${data.isp}`;
  cardInfo.append(isp);

  return card;
}
