<template>
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
            <tr :key="game.id" v-for="game in filteredGames">
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
            <tr :key="game.id" v-for="game in filteredGames">
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
</template>

<script>
import mixin from '@/mixins/mixin.js'

export default {
  name: 'players',
  mixins: [mixin],
  props: ['filteredGames'],
  methods: {
    getPlayerGoals (player) {
      return this.filteredGames.reduce(
        (acc, cur) => acc + cur.players[player].goals,
        0
      )
    },
    getPlayerShots (player) {
      return this.filteredGames.reduce(
        (acc, cur) => acc + cur.players[player].shots,
        0
      )
    },
    getPlayerAssists (player) {
      return this.filteredGames.reduce(
        (acc, cur) => acc + cur.players[player].assists,
        0
      )
    },
    getPlayerSaves (player) {
      return this.filteredGames.reduce(
        (acc, cur) => acc + cur.players[player].saves,
        0
      )
    },
    getPlayerXP (player) {
      return this.filteredGames.reduce(
        (acc, cur) => acc + cur.players[player].score,
        0
      )
    }
  }
}
</script>
