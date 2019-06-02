export default {
  methods: {
    getShootingPerc (goals, shots) {
      let shootingPerc = 0
      if (goals === 0) {
        shootingPerc = 0
      } else if (shots === 0) {
        shootingPerc = 100
      } else {
        shootingPerc = (goals / shots) * 100
      }
      return shootingPerc.toFixed(1)
    }
  }
}
