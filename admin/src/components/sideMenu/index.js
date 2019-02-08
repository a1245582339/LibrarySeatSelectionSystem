    import maxLogo from '@/assets/images/logo.jpg'
    import menu from './menu.json'
    export default {
        data() {
            return {
                activeName: this.$route.name,
                menu: menu
            }
        },
        render() {
            const menujsx = this.renderMenu(this.menu)
            return (
                <Menu active-name={this.activeName} theme="dark" width="auto">
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
                        return (
                            <MenuItem name={item.name} to={{path: item.path}}>
                                <Icon type={item.icon}></Icon>
                                <span>{item.title}</span>
                            </MenuItem>
                        )
                    }
                })
            }
        },
        watch: {
            '$route'(to, from) {
                this.activeName = to.name
                console.log(to.name)
            }
        }
    }
