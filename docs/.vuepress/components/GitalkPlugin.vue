<template>
    <div v-if="show" class="gitalk-plugin">
        <div ref="commentEl" class="gitalk"></div>
    </div>
</template>

<script>
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';

export default {
    name: "GitalkPlugin",
    data() {
        return {
            show: false
        }
    },
    mounted() {
        // import('valine').then(module => {
        //     window.Valine = module.default;
        //     this.fetchComment();
        // })
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
                clientID: '7409ea9a776d385529be',
                clientSecret: '80513c8c974030183d29369724133e64d707c5b8',
                repo: 'blog',
                owner: 'chingchao',
                admin: ['chingchao'],
                id: this.$page.key,
                distractionFreeMode: false  // Facebook-like distraction free mode
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
