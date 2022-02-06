// Create DOM elements from IDs and Class 
var hotCryptos = document.querySelector(".hot-cryptos")
var crytposHere = document.querySelector(".cryptos-here")
var tbl = document.querySelector(".table")
var cryptoNews = document.querySelector(".crypto-news")

// set up variables for functions.
var crypto;
var id;
// set up API key as variable...API key can not go in URL string or
// browser will say there is a security issue


var getCrypto = function (){
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coinlore.net/api/tickers/",
        "method": "GET",
        "headers": {
           
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);

        console.log(response.data[0].csupply)

       


        for (var i = 0; i < 100; i++){

           ///div holder to hold everything
            var hotCryptoDivHolder = document.createElement("div")
            hotCryptoDivHolder.classList = "crypto-div";

            // div header holder
            var hotCryptoHeader = document.createElement("div")
            hotCryptoHeader.classList = "row ";         
            
            var crytpoName = document.createElement('h2')
            crytpoName.classList = "cryptoheader row";
            crytpoName.textContent = response.data[i].name;

            var rank = document.createElement('p')
            rank.classList = "row";
            rank.textContent = "Rank: " + response.data[i].rank


            hotCryptoHeader.append(crytpoName, rank)


            var hotCryptoElementsHolder = document.createElement('div')
            hotCryptoElementsHolder.classList = "row";

            var holderOne = document.createElement('div')
            holderOne.classList = "holderone";
            


            var cryptoId = document.createElement('p')
            cryptoId.classList = "";
            cryptoId.textContent = "ID: " + response.data[i].id
            var id = response.data[i].id
            holderOne.append(cryptoId)
            
            
            var holderTwo = document.createElement('div')
            holderTwo.classList = "holdertwo";




            var cryptoSupply = document.createElement('p')
           cryptoSupply.classList = "";
           var cryptoSupplyInt;
           cryptoSupplyInt = response.data[i].csupply;
            cryptoSupply.textContent = "Current Mined Supply " +  parseInt(response.data[i].csupply).toLocaleString("en-US");
           // console.log(cryptoSupplyInt)
           

           holderTwo.append(cryptoSupply)

           var holderThree = document.createElement('div')
           holderThree.classList = "holderThree";
          
            var cryptoTotalSupply = document.createElement('p')
             var totalSupplyInt;
          cryptoTotalSupply.classList = "";
          totalSupplyInt = response.data[i].msupply
            cryptoTotalSupply.textContent = "Total Supply " +  parseInt(response.data[i].msupply).toLocaleString("en-US");
       
            holderThree.append(cryptoTotalSupply)
       
            //  console.log(totalSupplyInt)

            var holderFour = document.createElement('div')
            holderFour.classList = "holderFour";

          var cryptoPrice = document.createElement('p')
            cryptoPrice.classList = "";
            cryptoPrice.textContent = "Price: " + "$"+ response.data[i].price_usd

            holderFour.append(cryptoPrice)

        
            var holderFive = document.createElement('div')
            holderFive.classList = "holderFive";

            var percentMined = document.createElement('p')
            percentMined.classList = "";
            percentMined.textContent = "Percent Mined: " + parseInt((cryptoSupplyInt /  totalSupplyInt)*100)+ "%";
           
            holderFive.append(percentMined)

            var holderSix = document.createElement('div')
            holderSix.classList = "holderSix";

            var cryptoButton = document.createElement('button')
            cryptoButton.classList = "button";
            cryptoButton.innerText = "Social Stats";

            holderSix.append(cryptoButton)

            hotCryptoElementsHolder.append( holderTwo,  holderThree, holderFour, holderFive, holderSix)
           
            hotCryptoDivHolder.append(hotCryptoHeader, hotCryptoElementsHolder )
            crytposHere.append(hotCryptoDivHolder)
 
        }
        
 
          



    const feed = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.coinlore.net/api/coin/social_stats/?=" + id,
        "method": "GET",
        "headers": {
           
        }
        
    };

 $.ajax(feed).done(function (response) {

    console.log(response)
    // var cryptoList = response.reddit.avg_active_users
    // console.log(cryptoList)

    for (var i = 0; i < response.length; i++) {
            var cryptoList = id[i].reddit.avg_active_users
            console.log(cryptoList)




            
    }
    });
  

});

const investingNews = {
	"async": true,
	"crossDomain": true,
	"url": "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news?pair_ID=1057391&page=1&time_utc_offset=28800&lang_ID=1",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "investing-cryptocurrency-markets.p.rapidapi.com",
		"x-rapidapi-key": "ace563b49cmshf51f6b2f277eccfp1bc75djsn9f362115f89a"
	}
};

$.ajax(investingNews).done(function (response) {
    console.log(response)
	for (var i = 0; i < 10; i++) {

        var cryptoHeadline = document.createElement('h5')
        cryptoHeadline.classList = "";
        cryptoHeadline.textContent = response.data[0].screen_data.news[i].HEADLINE


        var cryptoImageLink = document.createElement('img')
        cryptoImageLink.src = response.data[0].screen_data.news[i].related_image;
        console.log(cryptoImageLink)
     

        var provider = document.createElement('p')
        provider.classList = "";
        provider.textContent = response.data[0].screen_data.news[i].news_provider_name

        cryptoNews.append(cryptoHeadline, cryptoImageLink, provider)

        
        //console.log(cryptoNews)
    }
});


}








    







  

// start screen by running cityList to show previous storage cities
getCrypto();
