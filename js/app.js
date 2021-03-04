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
    const messageEl = event.target.closest('.massage')
    if (messageEl) {
        
    }
})




countAllMessages(MESSAGES, messagesNumEl)

function countAllMessages(data_array, num) {
    let sum = ''
    sum = data_array.length
    num.insertAdjacentHTML('beforeend', sum)
}



countNotReadMessages(MESSAGES, notReadEl)

function countNotReadMessages(data_array, num) {
    let NotReadMessage = []
    
    MESSAGES.forEach(input => {
        if (!input.seen) {
            NotReadMessage.push(input.id)
        }
    })

    num.insertAdjacentHTML('beforeend', NotReadMessage.length)
}



// formSearchEl.addEventListener('submit', function (event) {
//     event.preventDefault()
//     const query = this.search.value.trim().toLowerCase().split(' ').filter(word => !!word)
//     const searchFields = ['name', 'phone']
//     MESSAGES = JSON.parse(DATA).filter(message => {
//       return query.every(word => {
//         return searchFields.some(field => {
//           return `${message[field]}`.trim().toLowerCase().includes(word)
//         })
//       })
//     })
//     renderCards(MESSAGES, cardListEl)
//   })



renderBtnEl.addEventListener('click', () => {
    RenderCards(MESSAGES, cardListEl)
})


RenderCards(MESSAGES, cardListEl)

function RenderCards(data_array, node) {
    let html = ''

    data_array.forEach(el => html += CreateCardHTML(el));

    node.innerHTML = html
}

function CreateCardHTML(card_data) {

    return `<div class="message row g-0 pb-4 px-3 d-flex align-items-center h-auto ${!card_data.seen ? 'not-read-bg fw-bold' : ''}">
    <div class="col-4 sender d-flex justify-content-start align-items-center">
    <img class="avatar" width="1" height="1" loading="lazy" src="${card_data.avatar}" alt="${card_data.name}">
    <div class="pers-info text-center">
        <div class="name mb-1">${card_data.name}</div>
        <div class="phone">${card_data.phone}</div>
    </div>
</div>
<div class="col-4 message">${card_data.message}</div>
<div class="col-4 date d-flex justify-content-end">
    <div class="date">${dateFormatter.format(card_data.date)} ${timeFormatter.format(card_data.date)}</div>
</div>
    </div>`
} 



