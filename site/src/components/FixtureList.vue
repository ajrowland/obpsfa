<template>

    <div class="fixture-list">
      <h2>{{team.name}}</h2>

      <ul class="fixture-list__fixtures">
        <li class="fixture-list__fixture" v-for="fixture in fixtures" :key="fixture._key">
          <time class="fixture-list__date">{{formatDate(fixture.date)}}</time>
          <div class="fixture-list__teams">
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
                <strong v-html="fixture.scoreHome != undefined ? fixture.scoreHome : '-'" />
              </div>
            </div>
            <div class="fixture-list__team">
              {{fixture.teamAway.name}}
              <div class="fixture-list__badge">
                <extended-image
                  :image="fixture.teamAway.badge"
                  :alt="fixture.teamHome.away"
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
  props: ['team', 'fixtures']
}
</script>

<style lang="scss">
.fixture-list {
  display: flex;
  flex-direction: column;

  &__fixtures {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  &__fixture {
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