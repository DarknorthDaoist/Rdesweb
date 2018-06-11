export default{
	data(){
		return{
        datos: [],
        mapData: []
	   	}
	},
	mounted:function(){
    console.log('Cargando datos mapa');
    this.$http.get('http://localhost:3000/problems')
    .then(response=>{
      this.mapData = response.body;
      this.getPoints(this.mapData);
		  this.initMap();
    }, response=>{
       console.log('error cargando lista');
    })
	},
  	methods:{
  		  initMap:function() {
          var map, heatmap, heatmap2;
	        map = new google.maps.Map(document.getElementById('map'), {
	          zoom: 19,
	          center: {lat: -33.450183, lng:  -70.686587}
	        });
	        heatmap = new google.maps.visualization.HeatmapLayer({
	          data: this.datos,
	          map: map
	        });
          heatmap2 = new google.maps.visualization.HeatmapLayer({
            data: [ new google.maps.LatLng(-33.450123,-70.686587),
                    new google.maps.LatLng(-33.450113,-70.686587),
                    new google.maps.LatLng(-33.450183,-70.686577),
                    new google.maps.LatLng(-33.450103,-70.686597),
                    new google.maps.LatLng(-33.450183,-70.687587)],
            map: map,
            gradient: [ 'rgba(0, 255, 255, 0)',
                        'rgba(0, 255, 255, 0)',
                        'rgba(0, 191, 255, 0)',
                        'rgba(0, 127, 255, 0)',
                        'rgba(0, 63, 255, 0)',
                        'rgba(0, 0, 255, 1)',
                        'rgba(0, 0, 223, 1)',
                        'rgba(0, 0, 191, 1)',
                        'rgba(0, 0, 159, 1)',
                        'rgba(0, 0, 127, 1)',
                        'rgba(63, 0, 91, 1)',
                        'rgba(127, 0, 63, 1)',
                        'rgba(191, 0, 31, 1)',
                        'rgba(255, 0, 0, 1)']
          });
      	},
      	toggleHeatmap:function() {
        	heatmap.setMap(heatmap.getMap() ? null : map);
      	},


      getPoints:function(data) {
        var i;
        var linea;
        for (i = 0; i < data.length; i++) {
          linea = new google.maps.LatLng(this.mapData[i].lat,this.mapData[i].long);
          this.datos.push(  linea );
        }
        return;
      },
  	}
}
