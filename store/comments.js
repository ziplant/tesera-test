export const state = () => ({
  comments: {},
})

export const mutations = {
  setComments(state, data) {
    state.comments = { ...state.comments, ...data }
  },
  addComment(state, { game, comment }) {
    state.comments[game].unshift(comment)
  },
}

export const actions = {
  async fetch({ commit, getters }, gameId) {
    if (!getters.get(gameId).length) {
      await this.$axios
        .get('https://private-9c71eb-teseratest.apiary-mock.com/opinions')
        .then((res) => {
          commit('setComments', {
            [gameId]: res.data,
          })
        })
    }
  },

  add({ commit }, { gameId, commentText }) {
    commit('addComment', {
      game: gameId,
      comment: {
        id: Date.now(),
        published_at: new Date(),
        comment: commentText,
      },
    })
  },
}

export const getters = {
  get: ({ comments }) => (gameId) => {
    return comments[gameId]
      ? comments[gameId].map((el) => {
          el.formattedDate = new Date(el.published_at).toLocaleString('ru-RU', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })

          return el
        })
      : []
  },
}
