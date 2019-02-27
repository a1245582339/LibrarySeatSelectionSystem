    import maxLogo from '@/assets/images/logo-min.jpg'
    import menu from './menu.json'
    export default {
        data() {
            return {
                activeName: this.$route.name,
                menu: menu,
                role: this.$store.getters.userInfo.role
            }
        },
        render() {
            const menujsx = this.renderMenu(this.menu)
            return (
                <Menu active-name={this.activeName} theme="dark" width="auto" open-names={['seat']}>
                    <div class="logo-con">
                        <img src={maxLogo} key="max-logo" />
                    </div>
                    {menujsx}
                </Menu>
            )
        },
        methods: {
            renderMenu(menu) {
                return menu.map(item => {
                    if (item.children && item.children.length) {
                        return (
                            <Submenu name={item.name}>
                                <template slot="title">
                                    <Icon type={item.icon} />
                                    {item.title}
                                </template>
                                {this.renderMenu(item.children)}
                            </Submenu>
                        )
                    } else {
                        if (this.role === 2 && item.auth) {
                            return
                        } else {
                            return (
                                <MenuItem name={item.name} to={{path: item.path}}>
                                    <Icon type={item.icon}></Icon>
                                    <span>{item.title}</span>
                                </MenuItem>
                            )
                        }
                    }
                })
            }
        },
        watch: {
            '$route'(to, from) {
                this.activeName = to.name
            }
        }
    }
