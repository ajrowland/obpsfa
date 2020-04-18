<template>

    <div class="fixture-list">
      <h2>{{team.name}}</h2>

      <ul class="fixture-list__fixtures" v-for="fixture in fixtures" :key="fixture._key">
        <li class="fixture-list__fixture">
          <div class="fixture-list__team">
            <time class="fixture-list__date">{{fixture.date}}</time>
            <div class="fixture-list__badge">
              <g-image
                v-if="fixture.teamHome.badge"
                :alt="fixture.teamHome.name"
                :src="$urlForImage(fixture.teamHome.badge, $page.metadata.sanityOptions).height(20).width(20).auto('format').url()"
                class="fixture-list__image"
              />
            </div>
            <i class="fixture-list__score">{{fixture.scoreAway}}</i>
            {{fixture.teamHome.name}}
          </div>
          <div class="fixture-list__team">
            <div class="fixture-list__badge">
              <g-image
                v-if="fixture.teamAway.badge"
                :alt="fixture.teamHome.name"
                :src="$urlForImage(fixture.teamAway.badge, $page.metadata.sanityOptions).height(20).width(20).auto('format').url()"
                class="fixture-list__image"
              />
            </div>
            <i class="fixture-list__score">{{fixture.scoreAway}}</i>
            {{fixture.teamAway.name}}
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

  }

  &__date {
    font-weight: bold;
    display: block;
  }

  &__score {
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
  }

  &__badge {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    background: #eee;
    border-radius: 30px;
    vertical-align: middle;
    margin: 10px;
    padding: 5px;
  }

  &__image {
    border-radius: 20px;
  }
}
</style>