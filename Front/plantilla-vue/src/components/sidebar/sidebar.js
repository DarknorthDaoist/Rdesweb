export default {
  data() {
    return {
      isActive: true,
    }
  },
  methods: {
    collapseSide(){
      this.isActive = !this.isActive;
    }
  },
  
}
