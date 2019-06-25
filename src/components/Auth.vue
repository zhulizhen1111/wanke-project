<template>
    <div>
        <h4>请稍候...</h4>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
// import authutils from '@/utils/authutils'
export default {
    name: 'index',
    props: [],
    components: {},
    data() {
        return {}
    },
    created() {
        let token = this.$route.query.token
        if(token) {
            this.$store.dispatch('loadUserInfo', {token})
        } 
    },
    mounted() {}

}
</script>
