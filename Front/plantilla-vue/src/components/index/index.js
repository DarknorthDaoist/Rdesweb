export default{
	data(){
		return{

	   	}
	},
	mounted:function(){
		this.initMap();
	},
  	methods:{
  		initMap:function() {
			var map, heatmap;
	        map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 18,
	          center: {lat: -33.450183, lng:  -70.686587}
	        });
	        heatmap = new google.maps.visualization.HeatmapLayer({
	          data: getPoints(),
	          map: map
	        });
      	},

      	toggleHeatmap:function() {
        	heatmap.setMap(heatmap.getMap() ? null : map);
      	},

      	changeGradient:function() {
        var gradient = [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
        heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
      },

      changeRadius:function() {
        heatmap.set('radius', heatmap.get('radius') ? null : 20);
      },

      changeOpacity:function() {
        heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
      },

      getPoints:function() {
        return [
          new google.maps.LatLng(-33.450183,-70.686587)
        ];
      }



  	}
}
