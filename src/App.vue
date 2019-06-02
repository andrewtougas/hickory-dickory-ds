<template>
  <div id="app" class="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">{{ `${teamAbbr} ${teamName}` }}</a>
      </div>
    </nav>

    <div class="container">
      <div class="row my-4">
        <div class="col-8">
          <nav>
            <div class="nav nav-pills" id="rlTab" role="tablist">
              <a
                class="nav-item nav-link active"
                id="schedule-tab"
                data-toggle="tab"
                href="#schedule"
                role="tab"
                aria-controls="schedule"
                aria-selected="true"
              >Schedule</a>
              <a
                class="nav-item nav-link"
                id="players-tab"
                data-toggle="tab"
                href="#players"
                role="tab"
                aria-controls="players"
                aria-selected="false"
              >Players</a>
            </div>
          </nav>
        </div>
        <div class="col-4">
          <div class="form-inline float-right">
            <select class="form-control" v-model="dateFilter">
              <option :key="dateFilter" v-for="dateFilter in dateFilters" :value="dateFilter">{{ dateFilter }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="tab-content" id="myTabContent">
        <Schedule :filteredGames="filteredStats" />
        <Players :filteredGames="filteredStats" />
      </div>
    </div>
    <!-- .container -->
  </div>
</template>

<script>
import Schedule from '@/components/Schedule.vue'
import Players from '@/components/Players.vue'
import stats from '@/data/stats.json'

export default {
  name: 'app',
  components: {
    Schedule,
    Players
  },
  data () {
    return {
      stats: stats,
      dateFilter: 'Overall',
      teamAbbr: process.env.VUE_APP_TEAM_ABBR,
      teamName: process.env.VUE_APP_TEAM_NAME
    }
  },
  computed: {
    filteredStats () {
      return (this.dateFilter === 'Overall')
        ? this.stats
        : this.stats.filter(game => game.date === this.dateFilter)
    },
    dateFilters () {
      const allDates = this.stats.map(game => game.date)
      const uniqueDates = allDates.filter((date, index) => allDates.indexOf(date) >= index)
      return ['Overall', ...uniqueDates]
    }
  }
}
</script>

<style lang="scss">
body {
  padding-top: 5.5rem;
}
.app {
  &__result {
    display: inline-block;
    width: 15px;
  }
}
</style>
