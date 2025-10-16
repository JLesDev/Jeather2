import init, { /*get_weather_name, get_url,*/ call_prog, show_line_ticks } from './pkg/hot_or_not_3.js';
await init();

// src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";

import * as root from './pkg/hot_or_not_3.js'

//const cors = require('cors');

//app.use(cors());

// myChart.destroy();
window.callbacks = root;
console.log("test");
console.log(window.callbacks);
window.mutate_chart_object = function (v) {
  if (v.id == ("bar")) {
    v.options.scales.y1.ticks = {
      callback:
        function (value, _index, _values) {
          return '$' + value.toFixed(2);
        }
    };
  }
  //v.destroy();
  return v
};

function cityText(city) {
  let parent = document.querySelector('#content2');
  switch (city) {
    case 0:
      parent.textContent = "Melbourne";
      break;
    case 1:
      parent.textContent = "Adelaide";
      break;
    case 2:
      parent.textContent = "Sydney";
      break;
    case 3:
      parent.textContent = "Brisbane";
      break;
  }

}

let miner = 999;
let maxer = -999;

async function getQuotes() {
  const baseURL = window.location.origin;
  //const requestURL = baseURL + "/Jeather2/quotes.json";
  // For local hosting: 
  const requestURL = "http://127.0.0.1:5500/quotes.json";
  const request = new Request(requestURL);
  const response = await fetch(request);
  let quotesJSON = await response.json();
  return quotesJSON["quotes"];
}

async function quoteList() {
  // let quotes = await getQuotes();
  // return quotes;
  const res = await fetch("quotes.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  console.log(text);
  const data = JSON.parse(text);
  return text;
}

let quotes = [
  "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on. Sheryl Sandberg"
  ,

  "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end. Aristotle"
  ,

  "If the wind will not serve, take to the oars. Latin Proverb"
  ,

  "You can’t fall if you don’t climb.  But there’s no joy in living your whole life on the ground. Unknown"
  ,

  "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained. Marie Curie"
  ,

  "Too many of us are not living our dreams because we are living our fears. Les Brown"
  ,

  "Challenges are what make life interesting and overcoming them is what makes life meaningful. Joshua J. Marine"
  ,

  "If you want to lift yourself up, lift up someone else. Booker T. Washington"
  ,

  "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do. Leonardo da Vinci"
  ,

  "Limitations live only in our minds.  But if we use our imaginations, our possibilities become limitless. Jamie Paolinetti"
  ,

  "You take your life in your own hands, and what happens? A terrible thing, no one to blame. Erica Jong"
  ,

  "What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do. Bob Dylan"
  ,

  "I didn’t fail the test. I just found 100 ways to do it wrong. Benjamin Franklin"
  ,

  "In order to succeed, your desire for success should be greater than your fear of failure. Bill Cosby"
  ,

  "A person who never made a mistake never tried anything new.  Albert Einstein"
  ,

  "The person who says it cannot be done should not interrupt the person who is doing it. Chinese Proverb"
  ,

  "There are no traffic jams along the extra mile. Roger Staubach"
  ,

  "It is never too late to be what you might have been. George Eliot"
  ,

  "You become what you believe. Oprah Winfrey"
  ,

  "I would rather die of passion than of boredom. Vincent van Gogh"
  ,

  "A truly rich man is one whose children run into his arms when his hands are empty. Unknown"
  ,

  "It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings. Ann Landers"
  ,

  "If you want your children to turn out well, spend twice as much time with them, and half as much money. Abigail Van Buren"
  ,

  "Build your own dreams, or someone else will hire you to build theirs. Farrah Gray"
  ,

  "The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at. Jesse Owens"
  ,

  "Education costs money.  But then so does ignorance. Sir Claus Moser"
  ,

  "I have learned over the years that when one’s mind is made up, this diminishes fear. Rosa Parks"
  ,

  "It does not matter how slowly you go as long as you do not stop. Confucius"
  ,

  "If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough. Oprah Winfrey"
  ,

  "Remember that not getting what you want is sometimes a wonderful stroke of luck. Dalai Lama"
  ,

  "You can’t use up creativity.  The more you use, the more you have. Maya Angelou"
  ,

  "Dream big and dare to fail. Norman Vaughan"
  ,

  "Our lives begin to end the day we become silent about things that matter. Martin Luther King Jr."
  ,

  "Do what you can, where you are, with what you have. Teddy Roosevelt"
  ,

  "If you do what you’ve always done, you’ll get what you’ve always gotten. Tony Robbins"
  ,

  "Dreaming, after all, is a form of planning. Gloria Steinem"
  ,

  "It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live. Mae Jemison"
  ,

  "You may be disappointed if you fail, but you are doomed if you don’t try. Beverly Sills"
  ,

  "Remember no one can make you feel inferior without your consent. Eleanor Roosevelt"
  ,

  "Life is what we make it, always has been, always will be. Grandma Moses"
  ,

  "The question isn’t who is going to let me; it’s who is going to stop me. Ayn Rand"
  ,

  "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it. Henry Ford"
  ,

  "It’s not the years in your life that count. It’s the life in your years. Abraham Lincoln"
  ,

  "Change your thoughts and you change your world. Norman Vincent Peale"
  ,

  "Either write something worth reading or do something worth writing. Benjamin Franklin"
  ,

  "Nothing is impossible, the word itself says, “I’m possible!” –Audrey Hepburn"
  ,

  "The only way to do great work is to love what you do. Steve Jobs"
  ,

  "If you can dream it, you can achieve it. Zig Ziglar"
];

function randomQuote() {
  let parent2 = document.getElementById('bot-box');
  let randomInt = Math.floor(Math.random() * 47);
  console.log(quotes[randomInt]);
  let actual = document.createElement('p');
  actual.textContent = quotes[randomInt];
  parent2.appendChild(actual);
}

// async function appendQuote() {
//   let parent2 = document.getElementById('bot-box');
//   let quotes = await getQuotes();
//   //let quotes2 = quoteList().await;
//   let randomInt = Math.floor(Math.random() * 20);
//   console.log(quotes);
//   let actual = document.createElement('p');
//   actual.textContent = quotes[randomInt].quote;
//   parent2.appendChild(actual);
// }

async function run(city) {
  //location.reload();
  await init();
  randomQuote();
  doSomething();
  let a = await call_prog();
  console.log(a);
  //test("https://reg.bom.gov.au/fwo/IDV60901/IDV60901.95936.json");
  const url = "https://api.weather.bom.gov.au/v1/locations/r1r143/forecasts/hourly";
  const urls = [
    "https://api.weather.bom.gov.au/v1/locations/r1r143/forecasts/hourly",
    "https://api.weather.bom.gov.au/v1/locations/r1f966/forecasts/hourly",
    "http://www.bom.gov.au/fwo/IDV60901/IDV60901.94854.json"
  ];
  const url2 = "https://api.weather.bom.gov.au/v1/locations/r1r143/forecasts/hourly";
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
  }

  const response = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(urls[city]),
  };

  const responses = {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify(url2),
  };

  //document.body.textContent = "hi";

  console.log(response);

  const xValues = [];
  const yValues = [];
  const xValues2 = [];
  const yValues2 = [];



  await fetch(String(urls[0])) //1
    .then((response) => response.json()) //2
    .then((observations) => {
      console.log(observations);
      console.log(observations.data[0].temp);
      console.log(observations.notice);
      console.log("test");

      let ci = observations.data[0].temp; //3
      let ci2 = observations.data[0].temp_feels_like;
      let parent = document.querySelector('#content2');
      const barColors = ["red", "green", "blue", "orange", "brown"];

      console.log("jo test" + window.callbacks.show_line_ticks);

      for (let i = 0; i < 1; i++) {
        let ci = observations.data[i].temp;

        let p = document.createElement('p');
        let timer = new Date();
        let realtimer = new Date(observations.data[i].time);
        console.log(realtimer);
        let now = new Date();
        let currentTime = realtimer.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        console.log(currentTime.getHours);
        console.log(`Current Time: ${currentTime}`);
        let nozero = realtimer.getHours().toString();
        let nonzero = nozero.replace(/^0+/, '');
        console.log(nonzero + ":" + realtimer.getMinutes());
        let formatTime = nozero;
        console.log("nozerotime = " + nozero.toString());
        let date = new Date();
        let dateform = date.toLocaleDateString();
        switch (nozero.toString()) {
          case "0": formatTime = dateform;
            break;
          case "1": formatTime = "1am";
            break;
          case "2": formatTime = "2am";
            break;
          case "3": formatTime = "3am";
            break;
          case "4": formatTime = "4am";
            break;
          case "5": formatTime = "5am";
            break;
          case "6": formatTime = "6am";
            break;
          case "7": formatTime = "7am";
            break;
          case "8": formatTime = "8am";
            break;
          case "9": formatTime = "9am";
            break;
          case "10": formatTime = "10am";
            break;
          case "11": formatTime = "11am";
            break;
          case "12": formatTime = "12pm";
            break;
          case "13": formatTime = "1pm";
            break;
          case "14": formatTime = "2pm";
            break;
          case "15": formatTime = "3pm";
            break;
          case "16": formatTime = "4pm";
            break;
          case "17": formatTime = "5pm";
            break;
          case "18": formatTime = "6pm";
            break;
          case "19": formatTime = "7pm";
            break;
          case "20": formatTime = "8pm";
            break;
          case "21": formatTime = "9pm";
            break;
          case "22": formatTime = "10pm";
            break;
          case "23": formatTime = "11pm";
            break;
            defualt: "Unknown time!";
            break;
        }
        console.log("formatTime = " + formatTime);
        p.textContent = formatTime + ". Temp: " + observations.data[i].temp + "°C. Jonty's Temp: " + (observations.data[i].temp_feels_like + 3) + "°C.";
        parent.appendChild(p);
        let q = document.createElement('p');
        q.textContent = "UV: " + observations.data[i].uv + "."
        let uv = document.createElement('p');
        uv.textContent = "Humidity: " + (observations.data[i].relative_humidity) + "%.";
        let wind_dir = "South";
        // switch ((observations.data[i].wind.direction)){
        //   "S"
        // }
        let wind = document.createElement('p');
        wind.textContent = "Wind: " + (observations.data[i].wind.speed_kilometre) + "km/h " + (observations.data[i].wind.direction);
        let rain = document.createElement('p');
        rain.textContent = "Rain: " + ((observations.data[i].rain.amount.min + observations.data[i].rain.amount.max) / 2) + "mm";
        parent.appendChild(q);
        parent.appendChild(uv);
        parent.appendChild(wind);
        parent.appendChild(rain);

        // console.log(observations.data[i])
      }

      for (let i = 24; i > -1; i--) {
        let ci = observations.data[i].temp;
        if (ci < miner) {
          miner = ci;
        }
        if (ci > maxer) {
          maxer = ci;
        }
        console.log(ci);
        let p = document.createElement('p');
        //let timer = new Date(observations.data[i].time);
        let timer = new Date();
        let realtimer = new Date(observations.data[i].time);
        console.log(realtimer);
        let now = new Date();
        let currentTime = realtimer.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        console.log(currentTime.getHours);
        console.log(`Current Time: ${currentTime}`);
        let nozero = realtimer.getHours().toString();
        let nonzero = nozero.replace(/^0+/, '');
        console.log(nonzero + ":" + realtimer.getMinutes());
        //p.textContent = currentTime + ". Temp: " + observations.data[i].temp + "°C. Jonty's Temp: " + observations.data[i].temp_feels_like;

        yValues[i] = observations.data[i].temp;

        let formatdate = new Date();
        let nextdate = formatdate.toLocaleDateString();

        if (observations.data[i].time === "undefined") {
          xValues[i] = "Not found";
        }
        else {
          let formatTime = nozero;
          switch (nozero.toString()) {
            case "0": formatTime = nextdate;
              break;
            case "1": formatTime = "1am";
              break;
            case "2": formatTime = "2am";
              break;
            case "3": formatTime = "3am";
              break;
            case "4": formatTime = "4am";
              break;
            case "5": formatTime = "5am";
              break;
            case "6": formatTime = "6am";
              break;
            case "7": formatTime = "7am";
              break;
            case "8": formatTime = "8am";
              break;
            case "9": formatTime = "9am";
              break;
            case "10": formatTime = "10am";
              break;
            case "11": formatTime = "11am";
              break;
            case "12": formatTime = "12pm";
              break;
            case "13": formatTime = "1pm";
              break;
            case "14": formatTime = "2pm";
              break;
            case "15": formatTime = "3pm";
              break;
            case "16": formatTime = "4pm";
              break;
            case "17": formatTime = "5pm";
              break;
            case "18": formatTime = "6pm";
              break;
            case "19": formatTime = "7pm";
              break;
            case "20": formatTime = "8pm";
              break;
            case "21": formatTime = "9pm";
              break;
            case "22": formatTime = "10pm";
              break;
            case "23": formatTime = "11pm";
              break;
              defualt: "Unknown time!";
              break;
          };
          xValues[i] = formatTime;
        }

        parent.appendChild(p);
      }


    }


    )
    .then((temp) => {

    }
    );



  await fetch(String(urls[0])) //1
    .then((response) => response.json()) //2
    .then((observations) => {
      console.log(observations);
      console.log(observations.data[0].temp);
      console.log(observations.notice);
      console.log("test");

      let ci = observations.data[0].temp; //3
      let ci2 = observations.data[0].temp_feels_like;
      let parent = document.querySelector('#content2');
      const barColors = ["red", "green", "blue", "orange", "brown"];

      console.log("jo test" + window.callbacks.show_line_ticks);


      for (let i = 0; i < 1; i++) {



        let ci = observations.data[i].temp;

        let p = document.createElement('p');
        let timer = new Date();
        let realtimer = new Date(observations.data[i].time);
        console.log(realtimer);
        let now = new Date();
        let currentTime = realtimer.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        console.log(currentTime.getHours);
        console.log(`Current Time: ${currentTime}`);
        let nozero = realtimer.getHours().toString();
        let nonzero = nozero.replace(/^0+/, '');
        console.log(nonzero + ":" + realtimer.getMinutes());
        let formatTime = nozero;
        console.log("nozerotime = " + nozero.toString());
        let date = new Date();
        //let nextdate = 
        let dateform = date.toLocaleDateString();
        switch (nozero.toString()) {
          case "0": formatTime = dateform;
            break;
          case "1": formatTime = "1am";
            break;
          case "2": formatTime = "2am";
            break;
          case "3": formatTime = "3am";
            break;
          case "4": formatTime = "4am";
            break;
          case "5": formatTime = "5am";
            break;
          case "6": formatTime = "6am";
            break;
          case "7": formatTime = "7am";
            break;
          case "8": formatTime = "8am";
            break;
          case "9": formatTime = "9am";
            break;
          case "10": formatTime = "10am";
            break;
          case "11": formatTime = "11am";
            break;
          case "12": formatTime = "12pm";
            break;
          case "13": formatTime = "1pm";
            break;
          case "14": formatTime = "2pm";
            break;
          case "15": formatTime = "3pm";
            break;
          case "16": formatTime = "4pm";
            break;
          case "17": formatTime = "5pm";
            break;
          case "18": formatTime = "6pm";
            break;
          case "19": formatTime = "7pm";
            break;
          case "20": formatTime = "8pm";
            break;
          case "21": formatTime = "9pm";
            break;
          case "22": formatTime = "10pm";
            break;
          case "23": formatTime = "11pm";
            break;
            defualt: "Unknown time!";
            break;
        }
        console.log("formatTime = " + formatTime);
        //p.textContent = formatTime + ". Temp: " + observations.data[i].temp + "°C. Jonty's Temp: " + observations.data[i].temp_feels_like+"°C.";
        parent.appendChild(p);
      }

      for (let i = 24; i > -1; i--) {
        let ci = observations.data[i].temp;

        console.log(ci);
        let p = document.createElement('p');
        let realtimer = new Date(observations.data[i].time);
        console.log(realtimer);
        let now = new Date();
        let currentTime = realtimer.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        console.log(currentTime.getHours);
        console.log(`Current Time: ${currentTime}`);
        let nozero = realtimer.getHours().toString();
        let nonzero = nozero.replace(/^0+/, '');
        console.log(nonzero + ":" + realtimer.getMinutes());
        //p.textContent = currentTime + ". Temp: " + observations.data[i].temp + "°C. Jonty's Temp: " + observations.data[i].temp_feels_like;

        yValues2[i] = observations.data[i].temp;
        let formatdate = new Date();
        //let nextdate = new Date();
        //nextdate = setDate(formatdate.getDate() + 1);
        let nextdate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        console.log(nextdate);
        var options = { day: 'numeric', month: 'long' };
        let noyear = (nextdate.toLocaleDateString('en-US', options)).toString();
        console.log(formatdate.toLocaleDateString('en-US', options));

        if (observations.data[i].time === "undefined") {
          xValues[i] = "Not found";
        }
        else {
          let formatTime = nozero;
          switch (nozero.toString()) {
            case "0": formatTime = noyear;
              break;
            case "1": formatTime = "1am";
              break;
            case "2": formatTime = "2am";
              break;
            case "3": formatTime = "3am";
              break;
            case "4": formatTime = "4am";
              break;
            case "5": formatTime = "5am";
              break;
            case "6": formatTime = "6am";
              break;
            case "7": formatTime = "7am";
              break;
            case "8": formatTime = "8am";
              break;
            case "9": formatTime = "9am";
              break;
            case "10": formatTime = "10am";
              break;
            case "11": formatTime = "11am";
              break;
            case "12": formatTime = "12pm";
              break;
            case "13": formatTime = "1pm";
              break;
            case "14": formatTime = "2pm";
              break;
            case "15": formatTime = "3pm";
              break;
            case "16": formatTime = "4pm";
              break;
            case "17": formatTime = "5pm";
              break;
            case "18": formatTime = "6pm";
              break;
            case "19": formatTime = "7pm";
              break;
            case "20": formatTime = "8pm";
              break;
            case "21": formatTime = "9pm";
              break;
            case "22": formatTime = "10pm";
              break;
            case "23": formatTime = "11pm";
              break;
              defualt: "Unknown time!";
              break;
          };
          xValues[i] = formatTime;
        }

        parent.appendChild(p);
      }


    }


    )
    .then((temp) => {

    }
    );

  const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = options.color || '#99ffff';
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    }
  };

  new Chart("myChart", {
    type: "line",
    //title: "hi",
    data: {
      labels: xValues,
      datasets: [{
        label: '',
        pointRadius: 0,
        //color: "white",
        borderColor: "pink",       // Line color
        //backgroundColor: "black",   // Point color
        //pointBackgroundColor: "black",
        //pointBorderColor: "black",
        fill: true,
        backgroundColor: 'rgba(85, 85, 85, 1)',
        data: yValues
      }
        // {
        //   label: "",
        //   //color: "white",
        //   borderColor: "lightGrey",       // Line color
        //   //backgroundColor: "black",   // Point color
        //   //pointBackgroundColor: "black",
        //   //pointBorderColor: "black",
        //   fill: true,
        //   backgroundColor: 'rgba(85, 85, 85, 1)',
        //   data: yValues2
        // }

      ]
    },
    options: {
      label: {
        display: false
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },

      //backgroundColor: 'black',
      plugins: {
        // maintainAspectRatio: false,
        customCanvasBackgroundColor: {
          color: '#121213',
        },
        legend: {
          display: false
        },
      },
      datalabels: {
        display: false
      },
      title: {
        display: false,
        fontColor: 'white',
        text: "yessir",
        //text: observations.data[0].name + " temperature for " + observations.data[0].time,
        //text: "WEATHER"
      },
      scales: {
        x: {

          title: false,
          ticks: {
            color: 'rgba(190, 190, 190, 1)'
          }
        },
        y: {
          max: maxer + 2,
          min: miner - 2,
          ticks: {
            //labels: yValues + "cdcd",
            //display: false,
            color: 'rgba(190, 190, 190, 1)'
          }
        },
      },
    },

    plugins: [plugin],
  });
  //Chart.defaults.global.defautFontColor = 'white';

  //removeData(myChart);
  // myChart.destroy();
  // addData(myChart, yValues, xValues);


  var z = document.createElement("h2");
  z.setAttribute("id", "placeholder");
  document.body.appendChild(z);

  // var feels = document.createElement("h2");
  // feels.setAttribute("id", "feels");
  // document.getElementById("feels-div").appendChild(feels);
  // document.getElementById("feels").textContent = "Feels like";




  async function doSomething() {
    // let result = await get_weather_name("London");
    // console.log(result);
    // return result;
  }

  // const address = get_weather_name("London")
  //   .then((response) => get_weather_name("London"))
  //   .then((user) => {
  //     return user.name;
  //   });

  // const printAddress = async () => {
  //   const a = await address;
  //   console.log(a);
  // };

  function readMore() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Display more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Display less";
      moreText.style.display = "inline";
    }
  }

  // printAddress();

}


function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}


document.getElementById("melb").addEventListener("click", function (e) {
  runner(0);
  window.location.href = "index.html";
  // removeData("myChart");
});

document.getElementById("adel").addEventListener("click", function (e) {
  runner(1);
  window.location.href = "adelaide.html";
});

document.getElementById("sydn").addEventListener("click", function (e) {
  runner(2);
  window.location.href = "sydney.html";
});

document.getElementById("bris").addEventListener("click", function (e) {
  runner(3);
  window.location.href = "brisbane.html";
});

document.getElementById("more").addEventListener("click", function (e) {
  runner(3);
  window.location.href = "more.html";
});

// document.getElementById("back").addEventListener("click", function (e) {
//   runner(0);
//   window.location.href = "index.html";
// });


function runner(city) {
  cityText(city);
  console.log("RUNNER");
  location.reload;
  run(city);
}

run(1);
window.run = run;
// location.reload();