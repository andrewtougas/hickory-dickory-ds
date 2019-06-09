<template>
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
            <tr :key="game.id" v-for="game in filteredGames">
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
</template>

<script>
import mixin from '@/mixins/mixin.js'

export default {
  name: 'schedule',
  mixins: [mixin],
  props: ['filteredGames'],
  methods: {
    formatGameResult (game) {
      let resultClass = game.result === 'win' ? 'text-success' : 'text-danger'
      let otStatus = game.overtime ? '(F/OT)' : ''
      let forfeitStatus = game.forfeit ? '<abbr title="Opponent Forfeit" class="initialism">*</abbr>' : ''
      return `<span class="app__result ${resultClass}">${game.result[0].toUpperCase()}</span> 
        ${game.goalsFor}-${game.goalsAgainst} 
        ${otStatus} ${forfeitStatus}`
    },
    getRecord () {
      const totalWins = this.filteredGames.filter(game => game.result === 'win').length
      const totalLosses = this.filteredGames.filter(game => game.result === 'loss')
        .length
      return `${totalWins}-${totalLosses}`
    },
    getGoalsFor () {
      return this.filteredGames.reduce((acc, cur) => acc + cur.goalsFor, 0)
    },
    getGoalsAgainst () {
      return this.filteredGames.reduce((acc, cur) => acc + cur.goalsAgainst, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.app {
  &__result {
    display: inline-block;
    width: 15px;
  }
}
</style>
