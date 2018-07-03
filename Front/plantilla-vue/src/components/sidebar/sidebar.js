export default {
  data() {
    return {
      isActive: true,
    }
  },
  methods: {
    collapse(){
      this.isActive = !this.isActive;
    }
  },
  
}
