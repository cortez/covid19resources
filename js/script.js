let totalCases = document.getElementById("totalCases");
let totalRecovered = document.getElementById("totalRecovered");
let totalDeaths = document.getElementById("totalDeaths");
let recoveryRate = document.getElementById("recoveryRate");
let fatalityRate = document.getElementById("fatalityRate");

// live worldwide covid-19 data

fetch("https://coronavirus-19-api.herokuapp.com/all", {
        "method": "GET",
    })
    .then(response => response.json().then(data => {

        // console.log(data);

        totalCases.innerHTML = Number(data.cases).toLocaleString();
        totalDeaths.innerHTML = Number(data.deaths).toLocaleString();
        totalRecovered.innerHTML = Number(data.recovered).toLocaleString();

        var recovery = (data.recovered / data.cases * 100).toFixed(2);
        var fatality = (data.deaths / data.cases * 100).toFixed(2);
        // recoveryRate.innerHTML = recovery;
        fatalityRate.innerHTML = fatality;

        // console.log("Recovery rate: " + recoveryRate + "%" + "\nFatality Rate: " + fatalityRate + "%");

    })).catch(err => {
        console.log(err);
    });

// news 

let title = document.getElementById("title");
let desc = document.getElementById("desc");

fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=covid%2019&pageNumber=1&pageSize=10&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "65b2db1918msh38c01baf6aedc72p154cd6jsn793ad199e779",
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
        }
    })
    .then(response => response.json().then(news => {
        console.log(news);

        var story = "";

        for (i = 0; i < 10; i++) {

            var a = document.createElement('a');
            var link = document.createTextNode("Read more");
            a.title = "Read more";
            a.href = news.value[i].url;
            document.body.append(a);

            story = story + "<a href='" + a + "'>" + "<h2>" + news.value[i].title + "</h2>" + "<p>" + news.value[i].description + "</p>" + "</a><br>";
        }
        document.getElementById('article').innerHTML = story;

    }))
    .catch(err => {
        console.error(err);
    });

// card script

function handleMouseover(e) {
    document.querySelector(".active").classList.remove("active");
    e.target.closest(".card").classList.add("active");
}

document.querySelectorAll(".card").forEach(card => card.addEventListener("mouseover", handleMouseover) );
