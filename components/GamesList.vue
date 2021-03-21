<template lang="pug">
div
  h2.text-center Список игр
  div.text-center
    el-button(@click="prevPage")
      i.el-icon-back
    el-button(@click="nextPage")
      i.el-icon-right
  div(
    v-loading="loading"
    element-loading-text="Загрузка..."
    element-loading-spinner="el-icon-loading"
    :style="{minHeight: '100px'}"
  )
    .item(
      v-for="game in games" 
      :key="game.teseraId" 
      :style="{ marginTop: '10px' }"
    )
      el-card
        el-row(type="flex" :style="{flexWrap: 'wrap'}")
          el-image.--center(
            :src="game.photoUrl" 
            :style="{maxWidth: '200px', marginRight: '16px'}")
            .image-slot(slot="error")
              i.el-icon-picture-outline(:style="{fontSize: '46px'}")
          el-col(:sm="18")
            div
              h3
                nuxt-link.link(:to="`/game/${game.alias}`") {{ game.title }}
              div {{ game.descriptionShort || 'Описание отсутствует' }}

</template>

<script>
import {
  defineComponent,
  ref,
  computed,
  useStore,
  useFetch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()

    const games = computed(() => {
      return store.getters['games/get']
    })

    const loading = ref(false)

    const { fetch } = useFetch(async () => {
      await store.dispatch('games/fetch')
    })

    fetch()

    const nextPage = async () => {
      loading.value = true
      await store.dispatch('games/next')
      loading.value = false
    }

    const prevPage = async () => {
      await store.dispatch('games/prev')
    }

    return {
      games,
      loading,
      nextPage,
      prevPage,
    }
  },
})
</script>

<style lang="sass"></style>
