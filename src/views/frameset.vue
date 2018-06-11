<template>
	<div class="wrapper">
		<div class="left-content":style="{width: open?'60px':'200px', overflow: open ? 'visible' : 'auto'}">
			<scroll-bar ref="scrollBar">
				<div class="logo-con">
					<img class="img-logo" v-show="!open"  src="../assets/logo.png" key="max-logo" />
				</div>
				<Menu ref="sideMenu" accordion :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
					<template v-for="item in menulist">
						<MenuItem v-if="item.children.length<=1 &&item.meta.show" :name="item.children[0].name" :key="'menuitem' + item.name">
			                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
			                <span class="layout-text" :key="'title' + item.name">{{ item.children[0].meta.title }}</span>
			            </MenuItem>

			            <Submenu v-if="item.children.length > 1" :name="item.name" :key="item.name">
			                <template slot="title">
			                    <Icon :type="item.icon" :size="iconSize"></Icon>
			                    <span class="layout-text">{{ item.meta.title }}</span>
			                </template>
			                <template v-for="child in item.children">
			                    <MenuItem v-if="child.meta.show" :name="child.name" :key="'menuitem' + child.name">
			                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
			                        <span class="layout-text" :key="'title' + child.name">{{ child.meta.title }}</span>
			                    </MenuItem>
			                </template>
			            </Submenu>
					</template>
				</Menu>
			</scroll-bar>
		</div>
		<m-header :open="open"></m-header>
		<div class="main" :style="{left: open?'60px':'200px'}">
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
	import '@/assets/css/common.css'
	import mHeader from '@/components/Header'
	import ScrollBar from '@/components/ScrollBar'
	import {MainRouter} from '@/router/router'
	export default {
		components: {
			mHeader,
			ScrollBar
		},
		name: 'FrameSet',
		data() {
			return {
				open: false,
				menuTheme: 'dark',
				openNames: ['operation'],
				iconSize: 16
			}
		},
		methods: {
			changeMenu(name) {
				this.$router.push({
                    name: name
                });
			},
			scrollBarResize() {
				this.$refs.scrollBar.resize();
			}
		},
		computed: {
			menulist() {
				return MainRouter
			}
		},
		mounted() {
			window.addEventListener('resize', this.scrollBarResize);
		},
		dispatch () {
            window.removeEventListener('resize', this.scrollBarResize);
        }
	}
</script>
<style>
.wrapper {
	position: absolute;
    width: 100%;
    height: 100%;
}
.logo-con {
	padding: 8px;
    text-align: center;
}
.img-logo {
	width: 90px;
	height: 44px;
}
.left-content {
	height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 21;
    transition: width .3s;
    background: #495060;
}
.main {
	position: absolute;
    top: 100px;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: #F0F0F0;
    z-index: 1;
    transition: left .3s;
}
</style>