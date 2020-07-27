<template>
    <div class="custome-plugin-wrap" v-if="show">
        <div id="commentEl"  class="custome-plugin">123</div>
    </div>
</template>

<script>
let valineConfig = require('../../../valineConfig');

export default {
    name: 'Comment',
    data() {
        return {
            show: false
        }
    },
    mounted() {
        import('valine').then(module => {
            window.Valine = module.default;
            this.fetchComment();
        })
    },
    methods: {
        fetchComment() {
            // 未匹配到任何路由，404页面
            if (!this.$route.name) return;
            // 目录页面不显示评论
            this.show = /.html$/.test(this.$route.path);
            this.$nextTick(() => {
                false && this.show && new Valine({
                    el: '#commentEl',
                    path: this.$page.key,
                    ...valineConfig
                })
            })
        }
    },
    watch: {
        '$route': function(route) {
            this.fetchComment();
        }
    }
}
</script>
<style scoped></style>