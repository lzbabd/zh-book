<template>

</template>

<script>
  import Arrows from '../base/Arrows'
  import {getChapter,getReadContent} from "../api"
    export default {
       data(){
         return{
           tit:"",
           chapters: [],
           jup:''
         }
       },
      components:{Arrows},
      async created() {
        let {id}=this.$route.params;
        let {mixToc} = await getChapter(id);
        this.jup = mixToc.chapters[0].link;

        console.log(this.chapters);
        console.log(this.chapters);
        console.log(this.jup);

      },
    }
</script>

<style scoped lang="stylus">




</style>
