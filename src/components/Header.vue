<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link :to="{ name: 'home' }" class="nav-link active">
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link">
            Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'register' }" class="nav-link">
            Sign up
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
