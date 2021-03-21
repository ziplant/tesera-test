export const state = () => ({
  games: [],
  pagination: {
    limit: 10,
    offset: 0,
  },
  currentGame: {},
})

export const mutations = {
  pushGames(state, games) {
    state.games.splice(
      state.pagination.offset,
      state.pagination.limit,
      ...games
    )
  },

  nextPage(state) {
    state.pagination.offset += state.pagination.limit
  },

  prevPage(state) {
    state.pagination.offset -= state.pagination.limit

    if (state.pagination.offset < 0) {
      state.pagination.offset = 0
    }
  },

  setCurrentGame(state, game) {
    state.currentGame = game
  },

  clearCurrentGame(state) {
    state.currentGame = {}
  },
}

export const actions = {
  async fetch({ commit, getters }) {
    const { limit, offset } = getters.pagination

    if (getters.get.length) {
      return getters.get
    } else {
      return await this.$axios
        .get(`https://api.tesera.ru/games?limit=${limit}&offset=${offset}`)
        .then((res) => {
          commit('pushGames', res.data)
          return res.data
        })
    }
  },

  async next({ commit, dispatch }) {
    commit('nextPage')
    const data = await dispatch('fetch')
    if (data.length) {
      commit('pushGames', data)
      return true
    }
  },

  prev({ commit }) {
    commit('prevPage')
  },

  async current({ commit }, alias) {
    return await this.$axios
      .get(`https://api.tesera.ru/games/${alias}`)
      .then((res) => {
        commit('setCurrentGame', res.data)
        return res.data
      })
      .catch(() => {
        return false
      })
  },
}

export const getters = {
  get({ games, pagination }) {
    return games.filter(
      (el, index) =>
        index >= pagination.offset &&
        index < pagination.offset + pagination.limit
    )
  },

  pagination({ pagination }) {
    return pagination
  },

  current({ currentGame }) {
    return currentGame
  },
}
