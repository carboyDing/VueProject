<template>
	<header class="header" :style="{paddingLeft: open?'60px':'200px'}">
		<div class="main-header">
			
		</div>
		<div class="tags-con">
			
		</div>
	</header>
</template>
<script>
	export default {
		name: 'Header',
		props:{
			open: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {

			}
		},
		mounted() {

		}
	}
</script>
<style>
	.header {
		box-sizing: border-box;
	    position: fixed;
	    display: block;
	    padding-left: 200px;
	    width: 100%;
	    height: 100px;
	    z-index: 20;
	    box-shadow: 0 2px 1px 1px rgba(100, 100, 100, 0.1);
	    transition: padding .3s;
	}
</style>