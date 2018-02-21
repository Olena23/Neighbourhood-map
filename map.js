//Error handling function
function errorHandling() {
  alert("Cannot load map!")
};

//Animates marker that corresponds to the clicked list item
function animatePoint(name) {
  for (let item in points){
    if (points[item].title == name) {
      points[item].setAnimation(google.maps.Animation.BOUNCE);
      showForsquareInfo(
        points[item].getPosition().lat(),
        points[item].getPosition().lng(),
        points[item].getTitle()
      );
      //Makes the marker bounce only once
      setTimeout(function(){ points[item].setAnimation(null); }, 700);
    }
  }
};

function updateMarkers(markers) {
  for (let i in points){
    let isVisible = false;
     for (let item in markers){
      if (points[i].title == markers[item][0]){
        isVisible = true;
      }
    }
    if (isVisible) {
      points[i].setMap(map);
    } else {
      points[i].setMap(null);
    }
  }
};


//Creates map with custom markers
function initMap() {
  const mapCenter = {lat: 50.017720, lng: 36.329984};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: mapCenter
  });

  function setMarkers(map) {
  //Empties point array
    points = [];
    // Adds markers to the map.
    for (let i = 0; i < realMarkers.length; i++) {
      let marker = realMarkers[i];
      let point = new google.maps.Marker({
        position: {lat: marker[1], lng: marker[2]},
        map: map,
        title: marker[0],
        animation: null
      });
      //Adds created markers to an empty array
      points.push(point);
      //Defines marker animation on click
      point.addListener('click', function () {
        if (point.getAnimation() !== null) {
          point.setAnimation(null);
        } else {
          //Adds animation
          point.setAnimation(google.maps.Animation.BOUNCE);
          showForsquareInfo(point.getPosition().lat(), point.getPosition().lng(), point.getTitle());
          //Makes the marker bounce only once
          setTimeout(function(){ point.setAnimation(null); }, 700);
        }
        //Adds marker objects to array
      });
      renderedMarkers.push(point);
    }
  }

  setMarkers(map);

}

let final = "55"
console.log()

/*var fileInterval = setInterval(function(){
  if (AppViewModel){
    // do something
    clearInterval(fileInterval); // clear interval
  }
},100);

var viewModel = new AppViewModel()*/
/*
ko.applyBindings(viewModel);*/
