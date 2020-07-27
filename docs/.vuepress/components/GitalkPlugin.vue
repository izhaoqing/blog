<template>
    <div v-if="show" class="gitalk-plugin">
        <div :key="$page.key" ref="commentEl" class="gitalk"></div>
    </div>
</template>

<script>
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
const valineConfig = require('../../../valineConfig');

export default {
    name: "GitalkPlugin",
    data() {
        return {
            show: false
        }
    },
    mounted() {
        this.fetchComment();
    },
    methods: {
        async fetchComment() {
            // 未匹配到任何路由，404页面
            if (!this.$route.name) return;
            // 目录页面不显示评论
            this.show = /.html$/.test(this.$route.path);
            if (!this.show) return;
            await new Promise(res => setTimeout(res, 1000));
            const gitalk = new Gitalk({
                ...valineConfig,
                id: this.$page.key,
                distractionFreeMode: false
            });
            gitalk.render(this.$refs.commentEl);
        }
    },
    watch: {
        '$route': function(route) {
            this.fetchComment();
        }
    }
};
</script>

<style scoped>
.gitalk-plugin {
    padding-left: 20rem;
}
.gitalk {
    max-width: 740px;
    margin: 0 auto;
    padding: 0 2.5rem 4rem;
}
@media (max-width: 959px) {
    .gitalk-plugin {
        padding-left: 16.4rem;
    }
}
@media (max-width: 719px) {
    .gitalk-plugin {
        padding-left: 0;
    }
}
@media (max-width: 959px) {
    .gitalk {
        padding: 0 2rem 2rem;
    }
}
@media (max-width: 419px) {
    .gitalk {
        padding: 0 1.5rem 1.5rem;
    }
}
</style>
