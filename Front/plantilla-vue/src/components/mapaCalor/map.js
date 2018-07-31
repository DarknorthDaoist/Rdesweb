import datepicker from "vuejs-datepicker"
export default {
  name: "mapDia",
  data() {
    return {
        isActive: false,
      map: [],
      heatmapExcellent: [],
      heatmapGood: [],

        dExcellent: [],
      dGood: [],
      dModerate: [],
        dPoor: [],
        buttonActiveLunes: false,
        buttonActiveMartes: false,
        buttonActiveMiercoles: false,
        buttonActiveJueves: false,
        buttonActiveViernes: false,
        buttonActiveSabado: false,
        buttonActivePull: false,
      fechaInicio: new Date(),
      fechaTermino: new Date(),
      horario:'',
        buttonActivePull: false
	   	}
  },
  components: { datepicker },

  mounted: function () {
    
    this.getPointsExcellent();
    this.getPointsGood();
		this.initMap();
  },
  methods: {
    collapseLey() {
          this.isActive = !this.isActive;
      this.buttonActivePull = !this.buttonActivePull;
          // desde aqui hacer insercion de codigo en leyenda*
        },
    marcar(argument) {
          if (argument == "lunes") {
               
                // heatmap.setMap(heatmap.getMap() ? null : map);
        this.buttonActiveLunes = !this.buttonActiveLunes;
            }
            else{if (argument == "martes") {
              this.buttonActiveMartes =! this.buttonActiveMartes;
            }
        else {
          if (argument == "miercoles") {

            this.buttonActiveMiercoles = !this.buttonActiveMiercoles;
            } 
          else {
            if (argument == "jueves") {
              
              this.buttonActiveJueves = !this.buttonActiveJueves;
            } 
            else {
              if (argument == "viernes") {
              
                this.buttonActiveViernes = !this.buttonActiveViernes;
            } 
              else {
                if (argument == "sabado") {
            
                  this.buttonActiveSabado = !this.buttonActiveSabado;
              } 
              }
            }
          }
        }
      }
    },

    initMap: function () {
	        this.map = new google.maps.Map(document.getElementById("map"), {
	          zoom: 19,
            // center: {lat: -33.451978, lng:  -70.683062},
            mapTypeId: 'satellite',

        center: { lat: -33.450183, lng: -70.686587 },
            streetViewControl: false,
            scrollwheel: false,
        mapTypeControl: false,
        rotateControl: false,

	        });

	        this.heatmapExcellent = new google.maps.visualization.HeatmapLayer({
	          data: this.dExcellent,
	          map: this.map,
        radius: 20,
        // gradient: [ 'rgba(0, 255, 255, 0)', 
        //             'rgba(0, 255, 255, 0)', 
        //             'rgba(0, 191, 255, 0)', 
        //             'rgba(0, 127, 255, 0)', 
        //             'rgba(0, 63, 255, 0)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)', 
        //             'rgba(255, 0, 0, 1)'] 
        gradient:[
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



	        });
          this.heatmapGood = new google.maps.visualization.HeatmapLayer({
            data: this.dGood,
            map: this.map,
        // gradient: [ 'rgba(0, 255, 255, 0)', 
        //             'rgba(0, 255, 255, 0)', 
        //             'rgba(0, 191, 255, 0)', 
        //             'rgba(0, 127, 255, 0)', 
        //             'rgba(0, 63, 255, 0)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)', 
        //             'rgba(63, 0, 100, 1)'] 
          });
      	},
    toggleHeatmap: function () {
        	heatmap.setMap(heatmap.getMap() ? null : map);
      	},


    getPointsExcellent: function () {
      console.log('funcionando');
      var i, linea, mapData;
        this.$http.get('http://206.189.184.79:8091/redes/signals/Excellent')
        .then(response => {
          mapData = response.body;
          // console.log("excellent", mapData);
          console.log(response)
          for (i = 0; i < mapData.length; i++) {


            linea = { location: new google.maps.LatLng(mapData[i].latitud, mapData[i].longitud), weight: mapData[i].weight }

            this.dExcellent.push(linea);
          }

        }, response => {
           console.log('error cargando lista1 ');
        });
      },

    getPointsGood: function () {
      var i, linea, mapData;
        this.$http.get('http://206.189.184.79:8091/redes/signals/Good')
        .then(response => {
          mapData = response.body;
          for (i = 0; i < mapData.length; i++) {
            linea = new google.maps.LatLng(mapData[i].latitud, mapData[i].longitud);
            this.dGood.push(linea);
          }
        }, response => {
           console.log('error cargando lista2');
        });
      },
    loadDataMap: function(){
      console.log('funcionando');
      var i, linea, mapData, intervalo;
      //se crear json con las fechas
      intervalo = {
        fechaInicio: this.fechaInicio.getFullYear()+"-0"+(this.fechaInicio.getMonth() + 1) + "-" +this.fechaInicio.getDate()  ,
        fechaTermino: this.fechaTermino.getFullYear()+"-0"+(this.fechaTermino.getMonth() + 1) + "-" +this.fechaTermino.getDate() 
      }
      // intervalo={
      //   fechaInicio:this.fechaInicio,
      //   fechaTermino: this.fechaTermino
      // }
      this.dExcellent= [];
      console.log(intervalo);
      console.log(this.horario)
      // se realiza peticion post al servidor para obtener los datos en el intervalo de fechas
      this.$http.post('http://206.189.184.79:8091/redes/signals/fechas', intervalo)
        .then(response => {
          //dependiendo se la opcion seleccionda se accede a uno de los 3 arreglos con las coordenadas
          this.horario=='mañana'?  mapData = response.body.mañana
          :this.horario=='tarde'?  mapData = response.body.tarde
          : mapData = response.body.noche;
         
          // console.log("excellent", mapData);
          console.log(response);
          //se agregan los datos al mapa
          for (i = 0; i < mapData.length; i++) {
            // se agregan latidu y logitud, asi como el peso
            // el peso define la calidad de la señal, mientras mas alto mejor (se ve mas rojo)
          
              linea = { location: new google.maps.LatLng(mapData[i].latitud, mapData[i].longitud), weight: mapData[i].weight }
           
            this.dExcellent.push(linea);
            this.initMap();
          }

        }, response => {
          console.log('error cargando lista1 ');
        });

    }
  	}
}
