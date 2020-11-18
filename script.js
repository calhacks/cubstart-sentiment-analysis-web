const result = document.getElementById('result')
const input = document.getElementById('input')
const button = document.getElementById('button')

const db = firebase.firestore();

button.addEventListener('click', async () => {
  const sentence = input.value
  const id = Date.now().toString()

  const res = await fetch(`http://58bb46a41a1d.ngrok.io/api/analyze_sentiment/${id}?sentence=${sentence}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })

  // const data = await res.json()
  // result.textContent = `Sentiment: ${data.sentiment}`
  db.collection("sentiment-data").doc(id)
    .onSnapshot(function (doc) {
      console.log(doc.data())
      result.textContent = `Sentiment (from firestore): ${doc.data().sentiment}`
    });
})
