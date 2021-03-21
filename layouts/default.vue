<template lang="pug">
  #app
    Nuxt
</template>

<style lang="sass">
#app
  font-family: "Helvetica Neue", Helvetica, sans-serif

.--center
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text
  &-center
    text-align: center
  &-right
    text-align: right

.ma-auto
  margin: auto

.link
  color: #000
  text-decoration: none
  &:hover
    color: lighten(#000, 15)
    text-decoration: underline

img
  max-width: 100%
</style>
