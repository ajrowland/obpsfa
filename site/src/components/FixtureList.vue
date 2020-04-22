<template>

    <div class="fixture-list">

      <fieldset class="fixture-list__filter">
        <legend class="fixture-list__filter-legend">Filter fixtures:</legend>
        <template class="fixture-list__filter-item" v-for="team in teamFilter">
          <span :key="team.id" class="fixture-list__filter-item">
            <input type="checkbox" :id="team.id" :value="team.id" :checked="filterList.includes(team.id)" :disabled="(filterList.length === 1 && filterList.includes(team.id))" v-model="filterList" /><label :for="team.id">{{team.name}}</label>
          </span>
        </template>
      </fieldset>

      <ul class="fixture-list__fixtures">
        <li class="fixture-list__fixture" v-for="(fixture, i) in filteredFixtures" :key="fixture.id">
          <time v-if="i === 0 || fixtures[i - 1].date !== fixture.date" class="fixture-list__date">{{formatDate(fixture.date)}}</time>
          <div class="fixture-list__teams" :style="'background-color: ' + ((fixture.teamHome.accentColor && fixture.teamHome.accentColor.hex) || (fixture.teamAway.accentColor && fixture.teamAway.accentColor.hex))">
            <div class="fixture-list__team">
              {{fixture.teamHome.name}}
              <div class="fixture-list__badge">
                <extended-image
                  :image="fixture.teamHome.badge"
                  :alt="fixture.teamHome.name"
                  width="30"
                  height="30"
                  cssClass="badge-image"
                />
              </div>
              <div class="fixture-list__score">
                <strong v-html="fixture.scoreHome !== undefined ? fixture.scoreHome : '-'" />
              </div>
            </div>
            <div class="fixture-list__team">
              {{fixture.teamAway.name}}
              <div class="fixture-list__badge">
                <extended-image
                  :image="fixture.teamAway.badge"
                  :alt="fixture.teamHome.name"
                  width="30"
                  height="30"
                  cssClass="badge-image"
                />
              </div>
              <div class="fixture-list__score">
                <strong v-html="fixture.scoreAway != undefined ? fixture.scoreAway : '-'" />
              </div>
            </div>
          </div>
        </li>
      </ul>

    </div>

</template>

<script>
export default {
  props: ['teamFilter', 'fixtures'],
  data() {
    return {
      filterList: this.teamFilter.map(t => t.id),
      fixtureList: this.fixtures
    }
  },
  computed: {
    filteredFixtures() {
      return this.fixtureList.filter(f => (this.filterList.includes(f.teamHome.id) || this.filterList.includes(f.teamAway.id)))
    }
  }
}
</script>

<style lang="scss">
.fixture-list {
  &__filter {
    background: #333;
    border: 0;
    color: #fff;
    padding: 10px;
    margin-bottom: $vertical-spacing;

    @include mq($from: tablet) {
      padding: 20px;
    }

    &-legend {
      float: left;
      font-weight: bold;
      text-transform: uppercase;
      width: 100%;
      margin-bottom: 10px;

      @include mq($from: tablet) {
        width: auto;
        margin-bottom: 0;
      }
    }

    &-item {
      padding: 5px 0;
      display: block;

      @include mq($from: tablet) {
        padding: 10px;
        display: inline;
      }
    }
  }

  &__fixtures {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  &__fixture {
    margin-bottom: 2px;

    &:nth-child(even) .fixture-list__teams {
      background: lighten($colour-red, 58%);
    }

    &:nth-child(odd) .fixture-list__teams {
      background: lighten($colour-blue, 25%);
    }
  }

  &__teams {
    padding: 5px 10px;

    @include mq($from: tablet) {
      padding: 5px $gutter;
      display: flex;
    }
  }

  &__team {
    text-transform: uppercase;
    font-weight: bold;
    display: flex;
    flex: 1 1 0;
    align-items: center;
    justify-content: space-between;
    margin: 1px 0;

    @include mq($from: tablet) {
      justify-content: flex-end;
      margin: 0;

      &:last-child {
        flex-direction: row-reverse;
      }
    }
  }

  &__date {
    display: block;
    font-size: 0.8rem;
    text-align: center;
    margin: 10px 0 4px 0;
  }

  &__score {
    font-size: 20px;
    font-weight: bold;
    padding: 5px 10px;
    color: #fff;
    margin: 5px 0 2px 0;
    background: $colour-red;

    @include mq($from: tablet) {
      padding: 10px 25px;
      transform: skew(-30deg);
      margin: 0 2px;
    }

    strong {
      display: inline-block;
      width: 20px;
      text-align: center;

      @include mq($from: tablet) {
        transform: skew(30deg);
        font-size: 1.5rem;
        line-height: 1;
      }
    }
  }

  &__badge {
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    background: #eee;
    border-radius: 30px;
    margin: 10px 20px;
    display: none;

    @include mq($from: tablet) {
      display: inline-block;
    }
  }
}

.badge-image__img  {
  border-radius: 15px;
}
</style>