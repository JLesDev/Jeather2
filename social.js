import init, { /*get_weather_name, get_url,*/ call_prog, show_line_ticks } from './pkg/hot_or_not_3.js';
await init();

import * as root from './pkg/hot_or_not_3.js'

window.callbacks = root;
// console.log("test");
// console.log(window.callbacks);
window.mutate_chart_object = function (v) {
  if (v.id == ("bar")) {
    v.options.scales.y1.ticks = {
      callback:
        function (value, _index, _values) {
          return '$' + value.toFixed(2);
        }
    };
  }
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

async function run() {
  const d = new Date();
  let time = d.getTime();

  let minutes = d.getUTCMinutes();
  let hours = d.getUTCHours();
  let day = d.getUTCDate();
  let month = d.getUTCMonth();

  await init();
  console.log('loaded');
  await getMessages(day);
  console.log('write')
  writeMessages();

  // let a = await call_prog();

}

let messages = []

async function sendMessage() {
  let name = document.getElementById('name').value

  document.getElementById('name').value = '';

  console.log(name)

  let message = document.getElementById('message').value

  document.getElementById('message').value = '';

  const d = new Date();
  let time = d.getTime();

  let minutes = d.getUTCMinutes();
  let hours = d.getUTCHours();
  let day = d.getUTCDate();
  let month = d.getUTCMonth();

  console.log(time)
  console.log(minutes)
  console.log(hours)
  console.log(day)
  console.log(month)

  await fetch(
    'https://script.google.com/macros/s/AKfycbzX0DmUX_b5BTwMkrV3BleUkUHqtIECeiaNXq46Orn5wUmZnPNqkUTaAs2qo8VfJs6eoA/exec',
    {
      method: 'POST',
      body: JSON.stringify({
        key: 'Melbourne' + day + ' chat',
        value: name + " says: " + message
      })
    }
  )
}

async function getMessages(day) {
  console.log('start get messages')
  console.log(day)
    await fetch(
      'https://script.google.com/macros/s/AKfycbzX0DmUX_b5BTwMkrV3BleUkUHqtIECeiaNXq46Orn5wUmZnPNqkUTaAs2qo8VfJs6eoA/exec?key=Melbourne' + day + ' chat'
    )
      .then(res => res.text())
      .then(value => {
        messages.push(value)
      })
    console.log('done get messages')
    console.log(messages)
}

async function writeMessages() {
  let content = document.getElementById('social-content')

  for (let i = 0; i < messages.length; i++) {
    console.log('in')
    let temp_message = document.createElement('p');

    console.log(temp_message)

    temp_message.textContent = messages[i]

    content.appendChild(temp_message)
  }
}

document.getElementById("send").addEventListener("click", function (e) {
  sendMessage();
});

document.getElementById("melb").addEventListener("click", function (e) {
  runner(0);
  window.location.href = "index.html";
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



function runner(city) {
  cityText(city);
  console.log("RUNNER");
  location.reload;
  run(city);
}

run(1);
window.run = run;