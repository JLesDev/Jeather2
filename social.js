import init, {
  call_prog,
  show_line_ticks
} from './pkg/hot_or_not_3.js'
await init()

import * as root from './pkg/hot_or_not_3.js'

window.callbacks = root
window.mutate_chart_object = function (v) {
  if (v.id == 'bar') {
    v.options.scales.y1.ticks = {
      callback: function (value, _index, _values) {
        return '$' + value.toFixed(2)
      }
    }
  }
  return v
}

function cityText(city) {
  let parent = document.querySelector('#content2')
  switch (city) {
    case 0:
      parent.textContent = 'Melbourne'
      break
    case 1:
      parent.textContent = 'Adelaide'
      break
    case 2:
      parent.textContent = 'Sydney'
      break
    case 3:
      parent.textContent = 'Brisbane'
      break
  }
}

let miner = 999
let maxer = -999

async function run() {
  const d = new Date()
  let time = d.getTime()

  let minutes = d.getUTCMinutes()
  let hours = d.getUTCHours()
  let day = d.getUTCDate()
  let month = d.getUTCMonth()

  await init()
  await loading()
  // console.log('loaded')
  await getMessages(day)
  // console.log('write')
  writeMessages()

   if (message_count == 0 || isNaN(message_count) == true) {
    // console.log('yes, there are no messages')

    let content = document.getElementById('social-content')

    content.innerHTML = ''

    let p = document.createElement('p')

    p.innerText = 'No messages posted today, be the first!';

    content.appendChild(p);
  }

  // let a = await call_prog();
}

let messages = []

const d = new Date()
let time = d.getTime()

let minutes = d.getUTCMinutes()
let hours = d.getUTCHours()
let day = d.getUTCDate()
let month = d.getUTCMonth()

let message_count = 0;

function formatMonth() {
  switch (month) {
    case 1:
      return 'Jan'
    case 2:
      return 'Feb'
    case 3:
      return 'Mar'
    case 4:
      return 'Apr'
    case 5:
      return 'May'
    case 6:
      return 'Jun'
    case 7:
      return 'Jul'
    case 8:
      return 'Aug'
    case 9:
      return 'Sep'
    case 10:
      return 'Oct'
    case 11:
      return 'Nov'
    case 12:
      return 'Dec'
  }
}

async function loading() {
  let content = document.getElementById('social-content')

  content.innerHTML = ''

  // console.log('loading content')

  let temp_message = document.createElement('p')

  temp_message.textContent = "Loading messages..."

  content.appendChild(temp_message);
}

async function getMessageCount() {
  await fetch(
    'https://script.google.com/macros/s/AKfycbzX0DmUX_b5BTwMkrV3BleUkUHqtIECeiaNXq46Orn5wUmZnPNqkUTaAs2qo8VfJs6eoA/exec?key=Melbourne' +
    day +
    ' count'
  )
    .then(res => res.text())
    .then(value => {
      let num_messages = Number(value)
      message_count = Number(value)
      // console.log(num_messages)
      return num_messages
    })
}

async function sendMessage() {
  let name = document.getElementById('name').value

  await getMessageCount()

  let num_messages = message_count
  // console.log(num_messages)

  document.getElementById('name').value = ''

  // console.log(name)

  let message = document.getElementById('message').value

  document.getElementById('message').value = ''

  // console.log(time)
  // console.log(minutes)
  // console.log(hours)
  // console.log(day)
  // console.log(month)

  await fetch(
    'https://script.google.com/macros/s/AKfycbzX0DmUX_b5BTwMkrV3BleUkUHqtIECeiaNXq46Orn5wUmZnPNqkUTaAs2qo8VfJs6eoA/exec',
    {
      method: 'POST',
      body: JSON.stringify({
        key: 'Melbourne' + day + ' chat ' + message_count,
        value: name + ' says: ' + message
      })
    }
  )
  if (num_messages == undefined) {
    num_messages = 0
  }
  await fetch(
    'https://script.google.com/macros/s/AKfycbzX0DmUX_b5BTwMkrV3BleUkUHqtIECeiaNXq46Orn5wUmZnPNqkUTaAs2qo8VfJs6eoA/exec',
    {
      method: 'POST',
      body: JSON.stringify({
        key: 'Melbourne' + day + ' count',
        value: message_count + 1
      })
    }
  )
  // console.log('posted')
  document.getElementById('send').style.backgroundColor = "##23b364";
  document.getElementById('send').innerText = "Send"
}

async function getMessages(day, num_messages) {
  // console.log('Starting to retrieve messages')
  // console.log('It is the day: ' + day)
  await getMessageCount()
  // console.log('Message count = ' + message_count)
    if (message_count == 0 || isNaN(message_count) == true) {

    // console.log('yes, there are no messages')

    let content = document.getElementById('social-content')

    content.innerHTML = ''

    let p = document.createElement('p')

    p.innerText = 'No messages posted today, be the first!';

    content.appendChild(p);
  }
  for (let i = 0; i < message_count; i++) {
    await fetch(
      'https://script.google.com/macros/s/AKfycbzX0DmUX_b5BTwMkrV3BleUkUHqtIECeiaNXq46Orn5wUmZnPNqkUTaAs2qo8VfJs6eoA/exec?key=Melbourne' +
      day +
      ' chat ' + i
    )
      .then(res => res.text())
      .then(value => {
        // console.log('this is the value of message ' + i + ": " + value)
        let content = document.getElementById('social-content')

        content.innerHTML = ''

        let p = document.createElement('p')

        p.innerText = 'Loading messages... ' + i + '/' + message_count;

        content.appendChild(p);

        messages.push(value)
      })
  }

  // console.log('finished getting messages')
}

async function writeMessages() {
  let content = document.getElementById('social-content')
  content.innerHTML = ''

  for (let i = message_count; i > 0; i--) {
    // console.log('in')
    let temp_message = document.createElement('p')

    // console.log(temp_message)

    temp_message.textContent = messages[i]

    content.appendChild(temp_message)
  }
}

document.getElementById('send').addEventListener('click', function (e) {
  document.getElementById('send').style.backgroundColor = "#364fcc";
  document.getElementById('send').innerText = "LOADING"
  sendMessage()
})

document.getElementById('melb').addEventListener('click', function (e) {
  window.location.href = 'index.html'
})

document.getElementById('adel').addEventListener('click', function (e) {
  window.location.href = 'adelaide.html'
})

document.getElementById('sydn').addEventListener('click', function (e) {
  window.location.href = 'sydney.html'
})

document.getElementById('bris').addEventListener('click', function (e) {
  window.location.href = 'brisbane.html'
})

document.getElementById('more').addEventListener('click', function (e) {
  window.location.href = 'more.html'
})

function runner(city) {
  cityText(city)
  location.reload
  run(city)
}

run(1)
window.run = run
