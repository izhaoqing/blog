小程序的`<video>`标签默认高度 225px ，虽然可以通过 css 设置宽高，但是容器的高度不会按视频资源的宽高比例自适应，通常会出现黑边的情况，将 `object-fit` 设置成 `cover`会被裁切，效果不好。

解决方法是获取容器的宽高，获取视频的原始宽高，计算后动态设置`<video>`标签的高度。如果计算后得到的值是一个小数，可能会出现1像素的偏差，可以使用一个高度更小的标签包裹 `<video>`标签，加上上下居中和超出隐藏的样式。或者使用4个与`<vedio>`平级的空标签定位在上下左右，挡住黑边。

用 uniapp 写一个 video 组件：

```vue
<template>
  <view>
    <video
      id="videoEl"
      :style="styleObj"
      :src="src"
      @loadedmetadata="loadFn"
    ></video>
  </view>
</template>

<script>
export default {
  name: 'VideoCom',
  props: ['src'],
  data() {
    return {
      // 视频容器的高度
      wrapHeight: 0
    }
  },
  computed: {
    styleObj() {
      const h = Math.ceil(this.wrapHeight);
      return h ? `height: ${h}px;` : '';
    }
  },
  mounted() {
    const query = uni.createSelectorQuery().in(this);
    query.select('#videoEl').boundingClientRect(data => {
      this.domW = data.width;
      if (this.vWidth && this.vHeight) this.setHeight();
    }).exec();
  },
  methods: {
    loadFn(data) {
      this.vWidth = data.detail.width;
      this.vHeight = data.detail.height;
      if (this.domW) this.setHeight();
    },
    setHeight() {
      this.wrapHeight = this.domW * this.vHeight / this.vWidth;
    }
  }
};
</script>

```



