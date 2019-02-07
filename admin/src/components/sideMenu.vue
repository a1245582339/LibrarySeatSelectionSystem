<template>
    <Menu :active-name="activeName" theme="dark" width="auto" :open-names="['1']">
        <slot></slot>
        <MenuItem name="Me" :to="{name: 'Me'}">
            <Icon type="md-person"></Icon>
            <span>个人信息</span>
        </MenuItem>
        <MenuItem name="Room" :to="{name: 'Room'}">
            <Icon type="ios-home" />
            <span>房间管理</span>
        </MenuItem>
        <Submenu name="User">
            <template slot="title">
                <Icon type="ios-people" />
                用户管理
            </template>
            <MenuItem name="HomeOwner" :to="{name: 'HomeOwner'}"><Icon type="md-contact" /><span>业主管理</span></MenuItem>
            <MenuItem name="HomeUser" :to="{name: 'HomeUser'}"><Icon type="md-contacts" /><span>家庭成员管理</span></MenuItem>
        </Submenu>
        <MenuItem name="Repair" :to="{name: 'Repair'}">
            <Icon type="md-construct" />
            <span>报修管理</span>
        </MenuItem>
        <Submenu name="Part">
            <template slot="title">
                <Icon type="md-build" />
                零件管理
            </template>
            <MenuItem name="PartType" :to="{name: 'PartType'}"><Icon type="ios-briefcase" /><span>零件类型管理</span></MenuItem>
            <MenuItem name="Part" :to="{name: 'Part'}"><Icon type="ios-build" /><span>零件管理</span></MenuItem>
            <MenuItem name="Order" :to="{name: 'Order'}"><Icon type="ios-build" /><span>出库管理</span></MenuItem>
        </Submenu>
        <MenuItem v-if="$store.state.user.role == 1" name="Admin" :to="{name: 'Admin'}">
            <Icon type="logo-octocat" />
            <span>管理员管理</span>
        </MenuItem>
    </Menu>
</template>
<script>
    export default {
        data() {
             return {
                 activeName: this.$route.name
             }
        },
        watch: {
            '$route'(to, from){
                this.activeName = to.name
                console.log(to.name)
            }
            
        }
        
    }
</script>
<style lang="sass" scoped>

</style>