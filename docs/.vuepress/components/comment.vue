<template>
    <div class="comment-wrap" v-if="show">
        <div id="commentEl"  class="comment"></div>
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
                this.show && new Valine({
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
<style scoped>
    .comment-wrap {
        padding-left: 20rem;
    }
    .comment {
        max-width: 740px;
        margin: 0 auto;
        padding: 0 2.5rem 4rem;
    }
    @media (max-width: 959px) {
        .comment-wrap {
            padding-left: 16.4rem;
        }
    }
    @media (max-width: 719px) {
        .comment-wrap {
            padding-left: 0;
        }
    }
    @media (max-width: 959px) {
        .comment {
            padding: 0 2rem 2rem;
        }
    }
    @media (max-width: 419px) {
        .comment {
            padding: 0 1.5rem 1.5rem;
        }
    }
</style>