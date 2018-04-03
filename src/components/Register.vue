<template>
  <div>
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <Tips :show="dielog" :msg="msg"/>
    <div class="register-page">
      <header class="header">
        <router-link to="/mine" class="close-btn">
          <img src="../assets/image/batch_download_close.png">
        </router-link>
        <router-link to="/login" class="register-btn">登录</router-link>
      </header>
      <main class="main">
        <h2>注册</h2>
        <div class="form">
          <div class="input-box">
            <input type="text" placeholder="请输入账号" v-model.trim="username">
          </div>
          <div class="input-box">
            <input type="password" placeholder="请输入密码" v-model.trim="password">
            <button class="code" :disabled="codeBtn" @click="countdown">{{codeValue}}</button>
          </div>
        </div>
        <p class="tips">
          {{tips}}
        </p>
        <div class="btn-box">
          <button :disabled="registerBtn" @click="register">立即注册</button>
          <small>问题帮助</small>
        </div>
      </main>
      <footer class="footer" @click="dielog = !dielog">
        注册表示同意xxxx协议
      </footer>
    </div>
  </div>
</template>
<script>
  import md5 from 'blueimp-md5'
  import {register} from '@/api'
  import {validatPassword, validatUsername} from '@/assets/js/validat'

  export default {
    name: 'register',
    computed: {
      registerBtn() {
        return !validatPassword(this.password).valida || !validatUsername(this.username).valida
      }
    },
    data() {
      return {
        username: '',
        password: '',
        tips: '',
        isLoading: false,
        dielog: false,
        msg: '无提示',
        codeBtn: false,
        codeValue: '获取验证码'
      }
    },
    methods: {
      register(e) {
        this.isLoading = true;
        register(this.username, md5(this.password, '1403'))
          .then(res => {
            this.isLoading = false;
            let msg = ''
            switch (res.code) {
              case 400:
                msg = '用户名已存在!';
                break;
              case 200:
                this.msg = '注册成功'
                this.dielog = true
                setTimeout(() => {
                  this.dielog = false
                  this.$router.push('/login')
                },1500);
                return
              default:
                msg = '未知错误'
                break;
            }
            this.tips = msg
          }).catch(e => {
          this.isLoading = false;
          this.tips = '未知错误!'
        })
      },
      countdown(){
        this.codeValue = '30s';
        this.codeBtn = true;
        this.timer = setInterval(() => {
          if(this.codeValue === '0s'){
            clearInterval(this.timer)
            this.codeValue = '获取验证码';
            return this.codeBtn = false;
          }
          this.codeValue = parseInt(this.codeValue) - 1 + 's'
        },1000);
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/login_register.styl";
</style>
