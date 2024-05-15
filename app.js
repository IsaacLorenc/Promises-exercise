let url = "http://numbersapi.com";
let favNumber = 13;

$.getJSON(`${url}/${favNumber}?json`)
  .then(fact => {
    console.log(fact);
  })

 let favNumbers = [13, 21, 34];
 
$.getJSON(`${url}/${favNumbers}?json`)
  .then(facts => {
    console.log(facts);
   })

Promise.all(Array.from({length: 4}, () => {
    return $.getJSON(`${url}/${favNumber}?json`);  
}))
.then(facts => {
    facts.forEach(data => $('body').append(`<p>${data.text}</p>`));
});

