<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">login</RouterLink>
  </nav>
  <router-view />
</template>

<style scoped>
a.router-link-active {
  color: rgb(56, 139, 139);
}
</style>
