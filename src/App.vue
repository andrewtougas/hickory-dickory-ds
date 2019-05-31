<template>
  <div id="app" class="app">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">[POBA] Potential Barneys</a>
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
        <section
          class="tab-pane fade show active"
          id="schedule"
          role="tabpanel"
          aria-labelledby="schedule-tab"
        >
          <div class="row my-4 jumbotron">
            <div class="col-sm-4">
              <p class="h5 text-muted">Record</p>
              <p class="display-4">{{ getRecord() }}</p>
            </div>
            <div class="col-sm-4">
              <p class="h5 text-muted">Goals For</p>
              <p class="display-4">{{ getGoalsFor() }}</p>
            </div>
            <div class="col-sm-4">
              <p class="h5 text-muted">Goals Against</p>
              <p class="display-4">{{ getGoalsAgainst() }}</p>
            </div>
          </div>
          <div class="row my-4">
            <div class="col">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th>Date</th>
                    <th>Result</th>
                    <th class="text-right">XP</th>
                    <th class="text-right">Goals</th>
                    <th class="text-right">SOG</th>
                    <th class="text-right">%</th>
                    <th class="text-right">Assists</th>
                    <th class="text-right">Saves</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="game.id" v-for="game in filteredStats">
                    <td>{{ game.id }}</td>
                    <td>{{ game.date }}</td>
                    <td>
                      <span v-html="formatGameResult(game)"></span>
                    </td>
                    <td class="text-right">{{ game.players.andrew.score + game.players.kyle.score }}</td>
                    <td class="text-right">{{ game.players.andrew.goals + game.players.kyle.goals }}</td>
                    <td class="text-right">{{ game.players.andrew.shots + game.players.kyle.shots }}</td>
                    <td
                      class="text-right"
                    >{{ getShootingPerc((game.players.andrew.goals + game.players.kyle.goals), (game.players.andrew.shots + game.players.kyle.shots)) }}%</td>
                    <td
                      class="text-right"
                    >{{ game.players.andrew.assists + game.players.kyle.assists }}</td>
                    <td class="text-right">{{ game.players.andrew.saves + game.players.kyle.saves }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="tab-pane fade" id="players" role="tabpanel" aria-labelledby="players-tab">
          <div class="row my-4">
            <div class="col-xl-6 col-md-12">
              <p class="h2">Kyle Morgan</p>
              <div class="row my-4">
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Goals</p>
                  <p class="h1">{{ getPlayerGoals('kyle') }}</p>
                </div>
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Shots</p>
                  <p class="h1">{{ getPlayerShots('kyle') }}</p>
                </div>
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Assists</p>
                  <p class="h1">{{ getPlayerAssists('kyle') }}</p>
                </div>
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Saves</p>
                  <p class="h1">{{ getPlayerSaves('kyle') }}</p>
                </div>
              </div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th class="text-right">Goals</th>
                    <th class="text-right">SOG</th>
                    <th class="text-right">%</th>
                    <th class="text-right">Assists</th>
                    <th class="text-right">Saves</th>
                    <th class="text-right">XP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="game.id" v-for="game in filteredStats">
                    <td>{{ game.id }}</td>
                    <td class="text-right">{{ game.players.kyle.goals }}</td>
                    <td class="text-right">{{ game.players.kyle.shots }}</td>
                    <td
                      class="text-right"
                    >{{ getShootingPerc(game.players.kyle.goals, game.players.kyle.shots) }}%</td>
                    <td class="text-right">{{ game.players.kyle.assists }}</td>
                    <td class="text-right">{{ game.players.kyle.saves }}</td>
                    <td class="text-right">{{ game.players.kyle.score }}</td>
                  </tr>
                </tbody>
                <tfoot class="thead-dark">
                  <tr>
                    <th></th>
                    <th class="text-right">{{ getPlayerGoals('kyle') }}</th>
                    <th class="text-right">{{ getPlayerShots('kyle') }}</th>
                    <th class="text-right">{{ getShootingPerc(getPlayerGoals('kyle'), getPlayerShots('kyle')) }}%</th>
                    <th class="text-right">{{ getPlayerAssists('kyle') }}</th>
                    <th class="text-right">{{ getPlayerSaves('kyle') }}</th>
                    <th class="text-right">{{ getPlayerXP('kyle') }}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="col-xl-6 col-md-12">
              <p class="h2">Andrew Tougas</p>
              <div class="row my-4">
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Goals</p>
                  <p class="h1">{{ getPlayerGoals('andrew') }}</p>
                </div>
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Shots</p>
                  <p class="h1">{{ getPlayerShots('andrew') }}</p>
                </div>
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Assists</p>
                  <p class="h1">{{ getPlayerAssists('andrew') }}</p>
                </div>
                <div class="col-6 col-sm-3">
                  <p class="h5 text-muted">Saves</p>
                  <p class="h1">{{ getPlayerSaves('andrew') }}</p>
                </div>
              </div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Game</th>
                    <th class="text-right">Goals</th>
                    <th class="text-right">SOG</th>
                    <th class="text-right">%</th>
                    <th class="text-right">Assists</th>
                    <th class="text-right">Saves</th>
                    <th class="text-right">XP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr :key="game.id" v-for="game in filteredStats">
                    <td>{{ game.id }}</td>
                    <td class="text-right">{{ game.players.andrew.goals }}</td>
                    <td class="text-right">{{ game.players.andrew.shots }}</td>
                    <td
                      class="text-right"
                    >{{ getShootingPerc(game.players.andrew.goals, game.players.andrew.shots) }}%</td>
                    <td class="text-right">{{ game.players.andrew.assists }}</td>
                    <td class="text-right">{{ game.players.andrew.saves }}</td>
                    <td class="text-right">{{ game.players.andrew.score }}</td>
                  </tr>
                </tbody>
                <tfoot class="thead-dark">
                  <tr>
                    <th></th>
                    <th class="text-right">{{ getPlayerGoals('andrew') }}</th>
                    <th class="text-right">{{ getPlayerShots('andrew') }}</th>
                    <th class="text-right">{{ getShootingPerc(getPlayerGoals('andrew'), getPlayerShots('andrew')) }}%</th>
                    <th class="text-right">{{ getPlayerAssists('andrew') }}</th>
                    <th class="text-right">{{ getPlayerSaves('andrew') }}</th>
                    <th class="text-right">{{ getPlayerXP('andrew') }}</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- .container -->
  </div>
</template>

<script>
import stats from '@/data/stats.json'

export default {
  name: 'app',
  data () {
    return {
      stats: stats,
      dateFilter: 'Overall'
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
  },
  methods: {
    formatGameResult (game) {
      let resultClass = game.result === 'win' ? 'text-success' : 'text-danger'
      let otStatus = game.overtime ? '(F/OT)' : ''
      return `<span class="app__result ${resultClass}">${game.result[0].toUpperCase()}</span> ${
        game.goalsFor
      }-${game.goalsAgainst} ${otStatus}`
    },
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
    },
    getRecord () {
      const totalWins = this.filteredStats.filter(game => game.result === 'win').length
      const totalLosses = this.filteredStats.filter(game => game.result === 'loss')
        .length
      return `${totalWins}-${totalLosses}`
    },
    getGoalsFor () {
      return this.filteredStats.reduce((acc, cur) => acc + cur.goalsFor, 0)
    },
    getGoalsAgainst () {
      return this.filteredStats.reduce((acc, cur) => acc + cur.goalsAgainst, 0)
    },
    getPlayerGoals (player) {
      return this.filteredStats.reduce(
        (acc, cur) => acc + cur.players[player].goals,
        0
      )
    },
    getPlayerShots (player) {
      return this.filteredStats.reduce(
        (acc, cur) => acc + cur.players[player].shots,
        0
      )
    },
    getPlayerAssists (player) {
      return this.filteredStats.reduce(
        (acc, cur) => acc + cur.players[player].assists,
        0
      )
    },
    getPlayerSaves (player) {
      return this.filteredStats.reduce(
        (acc, cur) => acc + cur.players[player].saves,
        0
      )
    },
    getPlayerXP (player) {
      return this.filteredStats.reduce(
        (acc, cur) => acc + cur.players[player].score,
        0
      )
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
