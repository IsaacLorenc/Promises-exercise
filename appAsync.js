let favNum = 13;
let url = "http://numbersapi.com"
async function getFavNum() {
    let numData = await $.getJSON(`${url}/${favNum}?json`);
    console.log(numData)
}
getFavNum();

let favNums =  [13, 42, 7];
async function getFavNums() {
let data = await  $.getJSON(`${url}/${favNums}?json`);
console.log(data)
}
getFavNums();

async function multiFacts() {
    Promise.all (Array.from({length: 4}, () => $.getJSON(`${url}/${favNum}?json`)
)).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
  })}
multiFacts();

$(function() {
let baseUrl = 'https://deckofcardsapi.com/api/deck';
async function getCard() {
    let data = await $.getJSON(`${baseUrl}/new/draw/`);
    let {suit, value} = data.card[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
async function mutiCards() {
    let firstCard = await  $.getJSON(`${baseUrl}/new/draw/`);
    let deckId =  firstCard.deck_id;
    let secondCard = await  $.getJSON(`${baseUrl}/${deckId}/draw/`);
    [firstCard, secondCard].forEach(card => {
        let {suit, value} = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    } )
}

async function setup() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deckData = await $.getJSON(`${baseUrl}/new/shuffle/`);
    $btn.show().on('click', async function() {
      let cardData = await $.getJSON(`${baseUrl}/${deckData.deck_id}/draw/`);
      let cardSrc = cardData.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (cardData.remaining === 0) $btn.remove();
    });
  }
  setup();
});
