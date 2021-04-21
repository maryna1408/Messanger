let MESSAGES = []
async function getMessages(url) {
  const response = await fetch(url)
  MESSAGES = await response.json()
  renderMessages(MESSAGES, messageListEl)
}

getMessages('/data/senders.json')

// let MESSAGES = JSON.parse(DATA)
const renderBtnEl = document.getElementById('renderBtn')
const messagesNumEl = document.getElementById('messagesNum')
const notReadEl = document.getElementById('notRead')
const formSearchEl = document.getElementById('formSearch')
const messageListEl = document.getElementById('messageList')
const exampleModalEl = document.getElementById('exampleModal')





const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric'
})


renderBtnEl.addEventListener('click', () => {
  getMessages('/data/senders.json')
})

formSearchEl.addEventListener('submit', function (event) {
  event.preventDefault()
  const query = this.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
  const searchFields = ['name', 'phone', 'message']
  const filteredMessages = MESSAGES.filter(message => {
    return query.every(word => {
      return searchFields.some(field => {
        return `${message[field]}`.trim().toLowerCase().includes(word)
      })
    })
  })
  renderMessages(filteredMessages, messageListEl)
})

messageListEl.addEventListener('click', event => {
  const messageEl = event.target.closest('.message')

  if (messageEl) {
    const messageId = messageEl.dataset.id
    console.log(messageEl.dataset.id)
    MESSAGES.forEach((message) => {
      if (message.id == messageId) {
        message.seen = true
        openModal(message)
      }
    })
    renderMessages(MESSAGES, messageListEl)
  }
})





function renderMessages(data_array, node) {
  let html = ''

  messagesNumEl.textContent = data_array.length
  notReadEl.textContent = data_array.filter(message => !message.seen).length

  data_array.sort((a, b) => {
    return a.seen - b.seen || b.date - a.date
  })

  data_array.forEach(el => html += createMessageHTML(el));

  node.innerHTML = html
}

function createMessageHTML(message_data) {
  return `<div class="message row g-0 pb-4 px-3 d-flex align-items-center justify-content-between h-auto ${!message_data.seen ? 'not-read-bg fw-bold' : ''}" data-id="${message_data.id}" data-bs-target="#exampleModal" data-bs-toggle="modal"
    >
    <div class="col-4 sender d-flex justify-content-start align-items-center">
    <img class="avatar rounded-circle me-4" width="auto" height="90px" loading="lazy" src="${message_data.avatar}" alt="${message_data.name}">
    <div class="pers-info text-center">
        <div class="name mb-1">${message_data.name}</div>
        <div class="phone">${message_data.phone}</div>
    </div>
</div>
<div class="col-4 text">${message_data.message}</div>
<div class="col-4 date d-flex justify-content-end">
    <div class="date">${dateFormatter.format(message_data.date)} ${timeFormatter.format(message_data.date)}</div>
</div>
    </div>`
}


function openModal(message) {
  exampleModalEl.querySelector('.modal-body').innerHTML = createModalWindow(message)
}

function createModalWindow(message) {
  return `<div class="modal-header sender d-flex justify-content-start align-items-center">
    <img class="avatar me-1 rounded-circle" width="auto" height="90" loading="lazy" src="${message.avatar}" alt="${message.name}" />
    <div class="pers-info me-auto text-center">
      <div class="name mb-1">${message.name}</div>
      <div class="phone">${message.phone}</div>
    </div>
    <div class="date">${dateFormatter.format(message.date)}   ${timeFormatter.format(message.date)}</div>
  </div>
  <div class="modal-body">
        <p>${message.message}</p>
    </div>`
}

