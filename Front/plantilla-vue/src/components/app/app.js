import sidebar from '../sidebar/sidebar.vue'

export default {
  data() {
    return {

    }
  },
  mounted() {
    // if(!this.authenticated) this.$router.replace({ name: "login" });
  },
  methods: {
    // setAuthenticated(status){
    //   this.authenticated = status;
    // },
    // logout(){
    //     this.authenticated = false;
    // }
  },
  components: {
    sidebar
  }
}
