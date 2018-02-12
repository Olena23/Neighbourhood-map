//Holds default or rendered (when filter is used) markers
let real_markers = [
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
      let search = self.searchField().toLowerCase();
      if (search.length == 0) {
        if(typeof google != 'undefined'){
          //Displays original markers
          real_markers = ko.unwrap(self.markers);
          initMap();
        }
        return ko.unwrap(self.markers);
      }

      //Filtered markers
        new_markers = ko.utils.arrayFilter(ko.unwrap(self.markers), function (marker) {
          real_markers = ko.unwrap(self.markers);
          return marker[0].toLowerCase().indexOf(search) >= 0;
        });
        real_markers = new_markers;
        //Re-initializes the map to show only filtered markers
        initMap();
        return new_markers;
    });


}

// Activates knockout.js
ko.applyBindings(new AppViewModel());