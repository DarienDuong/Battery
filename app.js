$(document).ready(function(){
  
  // Function generates the HTML for one battery
  function generateRow(battery){
    return `<tr><td>${battery.id}</td><td class='date'>${battery.last_seen}</td><td>${battery.battery}</td><td>${battery.file_size}</td><td>${battery.params}</td></tr>`
  }

  // API Call to get list of batteries and append to the DOM
  function getBatteries(){
    $.ajax({
        url: "https://spry-code-test.s3.amazonaws.com/devices.json",
        type: 'GET',
        jsonp: "callback",
        dataType: "json"
    }).then(function(data) {
        data = data
        // Have to sort the data by date last seen first and then battery status 
        // This is not a perfect sort. Might have to look into Moment.js
        data.sort((a, b) => {
          
          var aDate = new Date(a.last_seen)
          var bDate = new Date(b.last_seen)

          if(aDate == bDate){
            return a.battery - b.battery
          }

          return aDate - bDate
        })


        data.forEach(function(battery){
          var newRow = generateRow(battery)
          
          // Append to the DOM
          $('tbody').append(newRow)
        })
    })
    .catch(function(err){
      console.log('error', err)
    }) 
  }

  getBatteries()

  $('.toggleButton').on('click', function(e){
    $text = $('.toggleButton').text()

    if($text === "Show devices active in last 20 days"){
      var start = new Date()
      $('.toggleButton').text('See all')
      
      $date = $('tr').find('.date').text()

      console.log($date)

      // data.forEach(battery => {
      //   var newDate = new Date(battery.last_seen)
      //   console.log(start - newDate)
      // })
    } else {
      $('.toggleButton').text('Show devices active in last 20 days')
    }
  })

});
