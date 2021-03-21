<template lang="pug">
div
  el-breadcrumb(separator="/")
    el-breadcrumb-item(:to="{ path: '/' }") Главная
    el-breadcrumb-item {{game.game.title}}
  h2 {{game.game.title}}
  img(:src="game.game.photoUrl")
  p(v-html="game.game.description")
  el-divider
  div
    el-row(type="flex" justify="space-between")
      el-col
        h4 Комментарии:
      el-col.text-right
        el-button(@click="commentModal = true") Добавить
    el-timeline
      el-timeline-item(v-for="comment in comments" :key="comment.id" :timestamp="comment.formattedDate" placement="top")
        el-card
          p {{comment.comment}}
  el-dialog(
    title="Добавьте комментарий"
    :visible.sync="commentModal"
    :before-close="closeCommentModal"
    width="80%"
  )
    el-input(type="textarea" v-model="commentText")
    span.dialog-footer(slot="footer")
      el-button(@click="closeCommentModal") Отменить
      el-button(type="primary" @click="addComment") Добавить

</template>

<script>
import {
  defineComponent,
  computed,
  useStore,
  onBeforeUnmount,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: ['game-prefetch'],
  setup() {
    const store = useStore()

    const game = computed(() => store.getters['games/current'])

    const comments = computed(() =>
      store.getters['comments/get'](game.value.game.teseraId)
    )
    const commentModal = ref(false)
    const commentText = ref('')
    const closeCommentModal = () => {
      commentModal.value = false
      commentText.value = ''
    }
    const addComment = () => {
      store.dispatch('comments/add', {
        gameId: game.value.game.teseraId,
        commentText: commentText.value,
      })
      closeCommentModal()
    }

    onMounted(() => {
      store.dispatch('comments/fetch', game.value.game.teseraId)
    })

    onBeforeUnmount(() => {
      store.commit('games/clearCurrentGame')
    })

    return {
      game,
      comments,
      commentModal,
      commentText,
      closeCommentModal,
      addComment,
    }
  },
})
</script>

<style lang="scss"></style>
