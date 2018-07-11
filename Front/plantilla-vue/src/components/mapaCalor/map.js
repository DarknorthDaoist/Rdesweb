export default{
	data(){
		return{
        isActive: false,
        map:[],
        heatmapExcellent:[],
        heatmapGood:[],

        dExcellent: [],
        dGood:[],
        dModerate:[],
        dPoor: [],
        buttonActiveLunes: false,
        buttonActiveMartes: false,
        buttonActiveMiercoles: false,
        buttonActiveJueves: false,
        buttonActiveViernes: false,
        buttonActiveSabado: false,
        buttonActivePull: false,
	   	}
	},

	mounted:function(){
    
    this.getPointsExcellent();
    this.getPointsGood();
		this.initMap();
  },
  	methods:{
        collapseLey(){
          this.isActive = !this.isActive;
          // desde aqui hacer insercion de codigo en leyenda*
        },
        marcar(argument){
          if (argument == "lunes") {
               
                // heatmap.setMap(heatmap.getMap() ? null : map);
              this.buttonActiveLunes =! this.buttonActiveLunes;
            }
            else{if (argument == "martes") {
              this.buttonActiveMartes =! this.buttonActiveMartes;
            }
            else{if (argument == "miercoles") {

              this.buttonActiveMiercoles =! this.buttonActiveMiercoles;
            } 
            else{if (argument == "jueves") {
              
              this.buttonActiveJueves =! this.buttonActiveJueves;
            } 
            else{if (argument == "viernes") {
              
              this.buttonActiveViernes =! this.buttonActiveViernes;
            } 
            else{if (argument == "sabado") {
            
              this.buttonActiveSabado =! this.buttonActiveSabado;
              } 
        }}}}}},

  		  initMap:function() {
	        this.map = new google.maps.Map(document.getElementById("map"), {
	          zoom: 19,
            // center: {lat: -33.451978, lng:  -70.683062},
            mapTypeId: 'satellite',

	          center: {lat: -33.450183, lng:  -70.686587},
            streetViewControl: false,
            scrollwheel: false,
            mapTypeControl:false,
            rotateControl:false,
	        });

	        this.heatmapExcellent = new google.maps.visualization.HeatmapLayer({
	          data: this.dExcellent,
	          map: this.map,
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
          this.heatmapGood = new google.maps.visualization.HeatmapLayer({
            data: this.dGood,
            map: this.map,
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
          // console.log("excellent", mapData);
          for (i = 0; i < mapData.length; i++) {
            linea = new google.maps.LatLng(mapData[i].latitud,mapData[i].longitud);
            this.dExcellent.push(linea);
          }

        }, response=>{
           console.log('error cargando lista1 ');
        });
      },

      getPointsGood:function() {
        var i,linea, mapData;
        this.$http.get('http://206.189.184.79:8091/redes/signals/Good')
        .then(response=>{
          mapData = response.body;
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
