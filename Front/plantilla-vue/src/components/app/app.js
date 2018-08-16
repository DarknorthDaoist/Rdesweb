import sidebar from '../sidebar/sidebar.vue';

export default {
  data() {
    return {
      authenticated:false
    }
  },
  created(){

    
  },
  mounted() {
      if(sessionStorage.getItem('auth') != null) {
        this.authenticated=true;
        this.$router.replace({ name: "inicio" })
      }
      else{
        this.$router.replace({ name: "login" })
      }
  },
  methods: {
    setAuthenticated(status){
      console.log("llegue acaaaa")
      this.authenticated = status;
    },
    // logout(){
    //     this.authenticated = false;
    // }
  },
  components: {
    sidebar,
    
  }
}
