<template>
    <div>
        <nav class="blue darken-3">
            <div class="nav-wrapper">
                <router-link to="/" class="brand-logo">Tasks</router-link>
                <ul class="right hide-on-med-and-down">
                    <li>
                        <router-link exact active-class="active" to="/">
                            Create
                        </router-link>
                    </li>
                    <li>
                        <router-link active-class="active" to="/list">
                            List
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'NavBar'
    }
</script>

<style lang="scss" scoped>
nav {
    padding: 0 30px;
}
</style>