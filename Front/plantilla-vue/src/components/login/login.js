import Vue from 'vue'

export default {
	
	name: "login",
	data() {
		return {
			autentified: true,
			input: {
				username: "",
				password: ""
			},
			error: false,
			error2: false,
			destino: "/"
		}
	},
	mounted() {
		gapi.signin2.render('google-signin-button', {
		  onsuccess: this.onSignIn
		})
	  },
	components: { Vue },

	methods: {

		login() {
			if (this.input.username != "" && this.input.password != "") {
				this.autentified = true;
				let datos = {
					email: this.input.username,
					contraseña: this.input.password
				}
				this.$http.post('http://206.189.184.79:8091/redes/usuarios/auth', datos)
					.then(response => {
						console.log(response)
						if (response.body == "") {
							this.error2 = true;
						} else {

							this.$emit("authenticated", true);
							sessionStorage.setItem("auth", true);
							sessionStorage.setItem("user", JSON.stringify(response.body));
							this.$router.replace({ name: "dia" });
						}

					},
						reponse => {
							console.log("error")
							console.log(response)
							this.error2 = true;

						});
				//  if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {

				//  } else {

				//  }
			} else {
				this.error = true;
			}
		},
		onSignIn(googleUser) {
			
			console.log("adasdas")
			// Vue.googleAuth().directAccess()
			// const error=false;	
			// Vue.googleAuth().signIn(function (googleUser) {
			// 	error=true;
			// 	console.log("logeado")
			// 	// this.$emit("authenticated", true);
			// 	sessionStorage.setItem("auth", true);
			// 	sessionStorage.setItem("user",googleUser.access_token);
				
			//   }, function (error) {
			// 	console.log("adasdas2")
			// 	console.log(error)
			// 	error=false
				
			//   })
			// if(error){
			// 	this.$emit("authenticated", true);
			// 	this.$router.replace({ name: "dia" });
			// }else{
			// 	this.error2 = true;
			// }
			
		  }
		  
	

	}
}
