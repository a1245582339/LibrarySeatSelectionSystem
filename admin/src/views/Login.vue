<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" @keydown.enter.native="login">
            <FormItem prop="login_name">
              <Input type="text" v-model="form.login_name" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="login" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
export default {
  data() {
    return {
      form: {
        login_name: "admin",
        password: "111111"
      }
    };
  },
  created() {},
  methods: {
    login() {
      const vm = this;
      this.$store.dispatch("LOGIN", {
          login_name: vm.form.login_name,
          password: vm.form.password
        }).then(res => {
            // console.log(res)
          if (res.data.code === 20000) {
            this.$Message.success("登录成功");
            vm.$router.push({
              path: "/"
            });
          } else {
            this.$Message.error("用户名或密码错误");
          }
        });
    }
  }
  // import {
  //     Component,
  //     Prop,
  //     Vue,
  // } from 'vue-property-decorator';

  // @Component
  // export default class Login extends Vue {
  //     form = {
  //         userName: 'ddd',
  //         password: 'aaaaaa'
  //     }
  //     rules = {
  //         userName: [{
  //             required: true,
  //             message: '账号不能为空',
  //             trigger: 'blur'
  //         }],
  //         password: {
  //             required: true,
  //             message: '密码不能为空',
  //             trigger: 'blur'
  //         }
  //     }
  //     login() {
  //         const vm = this;
  //         this.$store.dispatch('LOGIN', {
  //             name: vm.form.userName,
  //             password: md5(vm.form.password)
  //         }).then(res => {
  //             if (res.data.code == '20000') {
  //                 this.$Message.success('登录成功')
  //                 vm.$router.push({
  //                     path: '/'
  //                 })
  //             } else {
  //                 this.$Message.error('用户名或密码错误')
  //             }
  //         });
  //     };
  //     created() {

  //     }
  // }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url(../assets/images/login-bg.jpg);
  background-size: cover;
  background-position: center;
  position: relative;

  &-con {
    position: absolute;
    left: 50%;
    top: 20%;
    transform: translate(-50%, 0);
    width: 400px;

    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }

    .form-con {
      padding: 10px 0 0;
    }

    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>