export default{
  name:"mapCalidad",
	data(){
		return{
        isActive: false,
        map:[],
        heatmapExcellent:[],
        heatmapGood:[],
        heatmapModerate:[],
        heatmapPoor:[],
        heatmapUnknow:[],
        dExcellent: [],
        dGood:[],
        dModerate:[],
        dPoor: [],
        dUnknow:[],
        bActiveE: false,
        bActiveB: false,
        bActiveM: false,
        bActiveMa: false,
        bActiveD: false,
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
        if (argument == "exelente") { 
            // heatmapExcellent.setMap(heatmapExcellent.getMap() ? null : map);
            this.bActiveE =! this.bActiveE;
          }
          else{if (argument == "bueno") {
            // heatmapExcellent.setMap(heatmapExcellent.getMap() ? null : map); 
            this.bActiveB =! this.bActiveB;
          }
          else{if (argument == "moderado") {
            
            this.bActiveM =! this.bActiveM;
          } 
          else{if (argument == "malo") {
            
            this.bActiveMa =! this.bActiveMa;
          } 
          else{if (argument == "desconocido") {
            
            this.bActiveD =! this.bActiveD;
          } 
          else{if (argument == "sabado") {
            this.buttonActivePull =! this.buttonActivePull;
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
        this.heatmapModerate = new google.maps.visualization.HeatmapLayer({
          data: this.dModerate,
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
        this.heatmapPoor = new google.maps.visualization.HeatmapLayer({
          data: this.dPoor,
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
        this.heatmapUnknow = new google.maps.visualization.HeatmapLayer({
          data: this.dUnknow,
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
           console.log('error cargando lista Excellente');
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
           console.log('error cargando lista Buena');
        });
      },
  	}
}
