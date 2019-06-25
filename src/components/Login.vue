<template>
  <div class="my-login"> 
      <div class="bg"></div>
        <div class="drag">
            <img class="login-img" src="/static/img/loginbg.jpg" alt="">
            <div class="my-form">
                <p class="login-title">登录</p>
                <div class="login-info">
                    <input class="username" type="text" v-model="username" autocomplete="new-username" placeholder="请输入用户名"  @keyup.enter='handleLogin'>
                    <i class="iconfont icon-zhanghao mark"></i>
                    <i class="iconfont icon-close close"></i>
                    </div>
                <div class="login-info">
                    <input class="password" type="password" v-model="password" autocomplete="new-password" placeholder="请输入密码"  @keyup.enter='handleLogin'>
                    <i class="iconfont icon-mima mark"></i>
                    <i class="iconfont icon-close close"></i>
                    </div>
                <p class="forget-password"><span class="msg">{{msg}}</span></p>
                <button class="login-btn" @click="handleLogin">登陆</button>
                <div class="login-bottom">@2018 Persagy.All right reserved.版权所有</div>
            </div>
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
         username:"",
         password:"",
         msg:""
    }
  },

  computed: {

  },

  mounted() {

  },

  methods: {
      handleLogin(){
          let _this = this
          if(this.username=='wanke'&&this.password=='123456'){
             this.$router.push({path:"/home/main?id=Pj4419000005"})
          } else if(this.username=='wanke1'&&this.password=='123456'){
                 this.$router.push({path:"/home/main?id=Pj4419000005&false"})
         }else if(this.username=='wanke2'&&this.password=='123456'){
            this.$router.push({path:"/home/main?id=Pj4419000003&false"})
          }else if(this.username=='wanke3'&&this.password=='123456'){
            this.$router.push({path:"/home/main?id=Pj4419000006&false"})
          }else if(this.username=='wanke4'&&this.password=='123456'){
            this.$router.push({path:"/home/main?id=Pj4419000007&false"})
          }else if(this.username=='wanke5'&&this.password=='123456'){
            this.$router.push({path:"/home/main?id=Pj4419000008&false"})
          } else if(this.username=='admin'&&this.password=='password'){
               this.$router.push({path:"/manager"})
          }else {
             this.msg='用户名或密码错误';
             setTimeout(function(){
                 _this.msg=""
             },2000)
          }
      }

  },

}
</script>

<style scoped lang="less" >
.my-login{
    width: 100%;
    height:100%;
    min-width: 1140px;
    position:fixed;
    .bg{
        width:100%;
        height:100%;
        background: url("/static/img/bg.jpg") no-repeat;
        padding:1px;
        box-sizing:border-box;
        z-index:1;
        background-size:cover;
        filter: blur(15px)
    }
    .drag{
        margin:220px auto;
        width:1120px;
        height:640px;
        background: #fff;
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -560px;
        margin-top:-320px;
        .login-img{
            width: 688px;
            height: 100%;
        }
        .my-form{
            display: inline-block;
            width: 432px;
            text-align: center;
            .login-title{
                font-weight: bold;
                font-size: 32px;
                color: #3B4254;
                letter-spacing: 1.71px;
                padding:132px 0 98px 0;
            }
            .login-info{
                width: 320px;
                height: 22px;
                margin:0 0  24px 58px;
                position: relative;
                >input{
                    width: 100%;
                    border: none;
                    //font-size: 16px;
                    outline: none;
                    border-bottom:1px solid #DBDDE4;
                    padding:5px 20px;
                    margin-left: 20px;
                    &:-webkit-autofill {
                        -webkit-box-shadow: inset 0 0 0px 9999px white;
                    }
                    &:focus{
                        border-bottom-color: #4A9EF9;
                    }
                    &:focus ~ i.mark{
                       color: #4A9EF9;
                    }
                    &:focus ~ i.close{
                       opacity: 1;
                    }
                }
                .mark {
                    position: absolute;
                    top: 3px;
                    left: 0;
                }
                .close {
                    position: absolute;
                    top:0;
                    right: 0;
                    opacity: 0;
                    cursor: pointer;
                    &:hover {
                        color: #000;
                    }
                }
                .my-img{
                    width: 20px;
                    height: 20px;
                    margin-right: 22px;
                }
                .my-close{
                    width:20px;
                    height: 20px;
                    margin-left: 50px;
                }
            }
            .forget-password{
                float: left;
                cursor: pointer;
                padding-left: 52px;
                color: #4A9EF9;
                letter-spacing: 0;
                display: flex;
                .msg{
                    padding-left: 100px;
                    color: #FF7B7B;
                    letter-spacing: 0;
                }
            }
            .login-btn{
                width: 320px;
                line-height: 44px;
                text-align: center;
                background: #4A9EF9;
                box-shadow: 0 2px 4px 0 rgba(39,110,227,0.20);
                border-radius: 3px;
                font-size: 18px;
                color: #FFFFFF;
                letter-spacing: 0.75px;
                font-weight: bold;
                margin-top:16px;
            }
            .login-bottom{
                margin-top:142px;
                opacity: 0.8;
                font-family: 'ArialMT';
                color: #B5B9C3;
                letter-spacing: 0.2px;
            }
        }
        
    }
    
    
}
</style>
