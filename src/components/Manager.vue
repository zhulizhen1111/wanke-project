<template>
  <div class="manager">
    <p class="ma-title"> 慧云盈管理后台</p>
    <div class="ma-bottom">
      <div class="left">
        <i-Col span="8">
          <Menu>
            <Submenu name="1">
                      <template slot="title">
                          <Icon type="ios-paper" />
                          后台管理
                      </template>
                      <MenuItem name="1-1">账号管理</MenuItem>
                  </Submenu>
          </Menu>
        </i-Col>
      </div>
      <div class="right">
        <div class="right-top">
            <p> &nbsp;&nbsp;&nbsp;&nbsp;当前位置:<span>  后台管理 > 账号管理</span></p>
        </div>
        <div class="right-bottom">
           <p class="right-bottom-select">
              <Button type="primary" @click="pompBlock">新增</Button> 
              <Input v-model="keyword" search placeholder="请输入关键字" clearable style="width: 200px" />
           </p>
            <i-Table stripe  :columns="columns1" :data="userLists" size="large"></i-Table>
        </div>
      </div>
    </div>
     <div class="mask-bg"></div>
    <div id="messageBox">
         <p class="box-title"><Icon type="md-close" class='close-btn' @click="closeMask"/></p>
         
    </div>
  </div>
</template>

<script>
export default {
  components: {

  },

  mixins: [],

  props: {

  },

  data () {
    return {
      keyword:null,
      columns1: [
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "电话",
          key: "telephone"
        },
        {
          title: "身份证号码",
          key: "card"
        },
        {
          title: "邮箱",
          key: "email"
        },
        {
          title: "创建时间",
          key: "ctime",
          sortable: true
        },
        {
          title: "操作",
          key: "operation",
          className: "table-btn-column",
          render: (h, params) => {
            return h(
              "a",
              {
                props: {                                                                    
                  type: "text",
                  size: "large",
                },
              }, "编辑"
            );
          }
        }
      ],
      userLists:[]
    }
  },

  computed: {

  },

  mounted() {

  },

  methods: {
    pompBlock(){
      document.querySelector('.mask-bg').style.display = 'block'
      document.querySelector('#messageBox').style.display = 'block'
    },
    closeMask () {
      document.querySelector('.mask-bg').style.display = 'none'
      document.querySelector('#messageBox').style.display = 'none'
    }
  },

}
</script>

<style scoped lang="less" >
.manager{
  width: 100%;
  height: 100%;
  .ma-title{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: bolder;
    font-size: 18px;
    border: 1px solid #ccc;
    text-align: center;
  }
  .ma-bottom{
    display: flex;
    .left{
      width: 240px;
      height: 1000px;
      border-right: 1px solid #ccc;
    }
    .right{
      width: 100%;
      .right-top{
        height: 60px;
        line-height: 60px;
        font-weight: bolder;
        font-size: 18px;
        border-bottom: 1px solid #ccc;
        
      }
      .right-bottom{
        padding: 20px;
        .right-bottom-select{
          height: 80px;
          line-height: 80px;
        }
      }
    }
  }
  .mask-bg {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999;
      background:rgba(0, 0, 0, .6);
      display: none;
    }
    #messageBox{
      width: 747px;
      height: 630px;
      background: #fff;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.12);
      border-radius: 4px;
      z-index: 9999;
      position: fixed;
      top: 70px;
      left: 50%;
      margin-left: -360px;
      display: none;
      .box-title{
        height:60px;
        line-height:60px;
        border-bottom: 1px solid #ccc;
        .close-btn{
            float: right;
            margin-top: 20px;
            margin-right: 14px;
            cursor: pointer;
        }
      }
    }
}
</style>
