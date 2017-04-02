https://docs.google.com/spreadsheets/d/1vvwgg3KVj0LGL86dqyW1Ey-G7bcXheGIVIDMzA8LMus/edit?usp=sharing




 var dataUrl = "https://spreadsheets.google.com/feeds/list/1vvwgg3KVj0LGL86dqyW1Ey-G7bcXheGIVIDMzA8LMus/od6/public/values?alt=json"




fetch(dataUrl).then( (res) => {
    res.json().then( (data) => {
        console.log(data)

        window.ingredients = data.feed.entry.map( (entry) => {
          return {
            id: entry["gsx$id"]["$t"],
            name: entry["gsx$name"]["$t"],
            months: entry["gsx$months"]["$t"],
            image_url: entry["gsx$imageurl"]["$t"]
          }
        })
    })
})
