export default{
	name:"login",
	data(){
		return{
			autentified:false,
			input: {
				username: "",
				password: ""
			},
			error:false,
			error2:false,
			destino:"/"
		}
	},
  	methods:{
		login() {
			if(this.input.username != "" && this.input.password != "") {
				this.autentified=true;
				
				// if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
				// 	this.$emit("authenticated", true);
				// 	this.$router.replace({ name: "secure" });
				// } else {
				// 	this.error2 = true;
				// }
			} else {
				this.error = true;
			}
		}
  	}
}
