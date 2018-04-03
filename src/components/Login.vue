<template>
  <div>
    <transition name="fade">
      <Loading v-if="isLoading"/>
    </transition>
    <div class="login-page">
      <header class="header">
        <router-link to="/mine" class="close-btn">
          <img src="../assets/image/batch_download_close.png">
        </router-link>
        <router-link to="/register" class="register-btn">注册</router-link>
      </header>
      <main class="main">
        <h2>登录</h2>
        <div class="form">
          <div class="input-box">
            <input type="text" placeholder="请输入账号" v-model="username">
          </div>
          <div class="input-box">
            <input type="password" placeholder="请输入密码" v-model="password">
          </div>
        </div>
        <p class="tips">
          {{tips}}
        </p>
        <div class="btn-box">
          <button @click="login" :disabled="loginBtn">登录</button>
          <small>问题帮助</small>
        </div>
      </main>
      <footer class="footer">
        登录注册表示同意xxxx协议
      </footer>
    </div>
  </div>
</template>
<script>
  import md5 from 'blueimp-md5'
  import {login} from '@/api'
  import {validatUsername, validatPassword} from '@/assets/js/validat'

  export default {
    name: 'login',
    computed: {
      loginBtn() {
        return !validatPassword(this.password).valida || !validatUsername(this.username).valida
      }
    },
    data() {
      return {
        username: '',
        password: '',
        tips: '',
        isLoading: false
      }
    },
    methods: {
      login(e) {
        this.isLoading = true;
        login(this.username, md5(this.password, '1403'))
          .then(res => {
            this.isLoading = false;
            let msg = ''
            switch (res.code) {
              case 401:
                return this.$router.push('/mine')
              case 402:
                msg = '用户名未注册';
                break;
              case 400:
                msg = '用户名或密码错误!';
                break;
              case 200:
                return this.$router.push('/mine')
              default:
                msg = '未知错误'
                break;
            }
            this.tips = msg
          }).catch(e => {
          this.isLoading = false;
          this.tips = '未知错误!'
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "../assets/css/login_register.styl";
</style>
