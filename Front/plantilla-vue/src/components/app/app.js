export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    collapse(){
      this.isActive = !this.isActive;
    }
  }
}
