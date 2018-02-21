//Initializing global variables
let id = '';
let photoUrl = '';
let info = '';
let renderedMarkers = [];
let map = {};
//Created markers on the map
let points = [];


//Holds default or rendered (when filter is used) markers
let realMarkers = [
  ['Studentska', 50.017720, 36.329984],
  ['Skovoroda Kharkiv National Pedagogical University', 50.019857, 36.317853],
  ['Radmir Expohall', 50.010050, 36.317890],
  ['Akademika Pavlova', 50.009767, 36.318748],
  ['Pulse Gym', 50.020492, 36.320252],
  ['Heroiv Pratsi Station', 50.023982, 36.335148]
];

//Knockout.js viewmodel
function AppViewModel() {
  var self = this;
  self.searchField = ko.observable("");
  self.placeCard = ko.observable("");
  self.finalText = ko.observable("");
  self.markers = ko.observableArray([
    ['Studentska', 50.017720, 36.329984],
    ['Skovoroda Kharkiv National Pedagogical University', 50.019857, 36.317853],
    ['Radmir Expohall', 50.010050, 36.317890],
    ['Akademika Pavlova', 50.009767, 36.318748],
    ['Pulse Gym', 50.020492, 36.320252],
    ['Heroiv Pratsi Station', 50.023982, 36.335148]
  ]);

  //Filters markers according to the text in the search field
  self.filterMarkers = ko.computed(
    function () {
      let hiddenMarkers = [];
      let search = self.searchField().toLowerCase();
      if (search.length == 0) {
        if(typeof google != 'undefined'){
          //Displays original markers
          realMarkers = ko.unwrap(self.markers);
          console.log(ko.unwrap(self.markers))
          updateMarkers(realMarkers)
        }
        return ko.unwrap(self.markers);
      }

      //Filtered markers
      hiddenMarkers = ko.utils.arrayFilter(ko.unwrap(self.markers), function (marker) {
          realMarkers = ko.unwrap(self.markers);
          return marker[0].toLowerCase().indexOf(search) >= 0;
        });
        //Re-initializes the map to show only filtered markers

      /*  initMap();*/
        /*return newMarkers;*/
      newMarkers = hiddenMarkers;
      updateMarkers(hiddenMarkers)
      return newMarkers;
    });

  self.placeCard = ko.computed(function() {
    return info;

  });




  //Observables for venue infrormation fields
  self.venueName = ko.observable("");
  self.venueNameText = ko.observable("");
  self.venueAddress = ko.observable("");
  self.venueAddressText = ko.observable("");
  self.venuePhone = ko.observable("");
  self.venuePhoneNumber = ko.observable("");
  self.venuePhoto = ko.observable("");
  self.venuePhotoImg = ko.observable("");

}


// Activates knockout.js
let viewModel = new AppViewModel();
ko.applyBindings(viewModel);




/*

var viewModel = {
  textField: ko.observable(),
};

viewModel.textField(info);

ko.applyBindings(viewModel);*/
