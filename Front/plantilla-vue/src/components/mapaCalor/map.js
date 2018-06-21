export default{
	data(){
		return{
        dExcellent: [],
        dGood:[],
        dModerate:[],
        dPoor: []
	   	}
	},

	mounted:function(){
    
    this.getPointsExcellent();
    this.getPointsGood();
		this.initMap();
  },
  	methods:{
  		  initMap:function() {
          var map, heatmapExcellent, heatmapGood;

	        map = new google.maps.Map(document.getElementById("map"), {
	          zoom: 19,
            // center: {lat: -33.451978, lng:  -70.683062},
            mapTypeId: 'satellite',

	          center: {lat: -33.450183, lng:  -70.686587},
            streetViewControl: false,
            scrollwheel: false,
            mapTypeControl:false,
            rotateControl:false,
	        });

	        heatmapExcellent = new google.maps.visualization.HeatmapLayer({
	          data: this.dExcellent,
	          map: map,
            gradient: [ 'rgba(0, 255, 255, 0)', 
                        'rgba(0, 255, 255, 0)', 
                        'rgba(0, 191, 255, 0)', 
                        'rgba(0, 127, 255, 0)', 
                        'rgba(0, 63, 255, 0)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 0, 0, 1)'] 
	        });
          heatmapGood = new google.maps.visualization.HeatmapLayer({
            data: this.dGood,
            map: map,
            gradient: [ 'rgba(0, 255, 255, 0)', 
                        'rgba(0, 255, 255, 0)', 
                        'rgba(0, 191, 255, 0)', 
                        'rgba(0, 127, 255, 0)', 
                        'rgba(0, 63, 255, 0)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)', 
                        'rgba(63, 0, 100, 1)'] 
          });
      	},
      	toggleHeatmap:function() {
        	heatmap.setMap(heatmap.getMap() ? null : map);
      	},


      getPointsExcellent:function() {
        var i,linea, mapData;
        this.$http.get('http://206.189.184.79:8091/redes/signals/Excellent')
        .then(response=>{
          mapData = response.body;
          console.log("excellent", mapData);
          for (i = 0; i < mapData.length; i++) {
            linea = new google.maps.LatLng(mapData[i].latitud,mapData[i].longitud);
            this.dExcellent.push(linea);
          }
          console.log("texcellent", this.dExcellent);

        }, response=>{
           console.log('error cargando lista1 ');
        });
      },

      getPointsGood:function() {
        var i,linea, mapData;
        this.$http.get('http://206.189.184.79:8091/redes/signals/Good')
        .then(response=>{
          mapData = response.body;
          console.log("good", mapData);
          for (i = 0; i < mapData.length; i++) {
            linea = new google.maps.LatLng(mapData[i].latitud,mapData[i].longitud);
            this.dGood.push(linea);
          }
        }, response=>{
           console.log('error cargando lista2');
        });
      },
  	}
}
