export default async function ({ store, redirect, route }) {
  const success = await store.dispatch('games/current', route.params.alias)

  if (!success) redirect('/')
}
