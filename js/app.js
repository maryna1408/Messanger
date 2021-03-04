let MESSAGES = JSON.parse(DATA)
const cardListEl = document.getElementById('cardList')
const renderBtnEl = document.getElementById('renderBtn')
const messagesNumEl = document.getElementById('messagesNum')
const notReadEl = document.getElementById('notRead')
const formSearchEl = document.getElementById('formSearch')

const dateFormatter = new Intl.DateTimeFormat()
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric'
})

// {
//     "id": 1,
//     "phone": "+63 (924) 979-2252",
//     "name": "Guss Marvelley",
//     "message": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//     "avatar": "https://robohash.org/repellendusimpeditnisi.png?size=50x50&set=set1",
//     "date": 1609595510000,
//     "seen": false
//   }



cardListEl.addEventListener('click', event => {
    const messageEl = event.target.closest('.message')
    if (messageEl) {
        const messageId = messageEl.dataset.id
        MESSAGES.forEach((message, i, array) => {
            if (message.id == messageId) {
                if (message.seen) {
                    array.splice(i,1)
                } else {
                    message.seen = true
                }
            }
        })
        RenderCards(MESSAGES, cardListEl)
    }
})



formSearchEl.addEventListener('submit', function (event) {
    event.preventDefault()
    const query = this.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
    const searchFields = ['name', 'phone', 'message']
    MESSAGES = JSON.parse(DATA).filter(message => {
      return query.every(word => {
        return searchFields.some(field => {
          return `${message[field]}`.trim().toLowerCase().includes(word)
        })
      })
    })
    RenderCards(MESSAGES, cardListEl)
  })



renderBtnEl.addEventListener('click', () => {
    MESSAGES = JSON.parse(DATA)
    RenderCards(MESSAGES, cardListEl)
})


RenderCards(MESSAGES, cardListEl)

function RenderCards(data_array, node) {
    let html = ''

    messagesNumEl.textContent = data_array.length
    notReadEl.textContent = data_array.filter(message => !message.seen).length

    data_array.sort((a,b) => {
        return a.seen - b.seen || b.date - a.date
    })

    data_array.forEach(el => html += CreateCardHTML(el));

    node.innerHTML = html
}

function CreateCardHTML(card_data) {

    return `<div class="message row g-0 pb-4 px-3 d-flex align-items-center h-auto ${!card_data.seen ? 'not-read-bg fw-bold' : ''}" data-id="${card_data.id}">
    <div class="col-4 sender d-flex justify-content-start align-items-center">
    <img class="avatar" width="1" height="1" loading="lazy" src="${card_data.avatar}" alt="${card_data.name}">
    <div class="pers-info text-center">
        <div class="name mb-1">${card_data.name}</div>
        <div class="phone">${card_data.phone}</div>
    </div>
</div>
<div class="col-4 text">${card_data.message}</div>
<div class="col-4 date d-flex justify-content-end">
    <div class="date">${dateFormatter.format(card_data.date)} ${timeFormatter.format(card_data.date)}</div>
</div>
    </div>`
} 





let arr = [{price: 100},{price: 2000},{price:50 },{price: 150},{price: 500}]

arr.sort((a,b) => {
    return a.price - b.price
})

console.log(arr);


const user = {
    name: 'Marina',
    age: 16
}

console.log(user.age);

