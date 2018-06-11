<template>
	<div class="page">
		<Card>
			<Row>
				<Col span="20">
					<Form ref="formInline" :model="form" inline :label-width="80">
						<FormItem label="标题">
				            <Input v-model="form.title" placeholder="请输入标题" style="width: 200px;"></Input>
				        </FormItem>
				        <FormItem label="分类">
				        	<Select v-model="form.type" style="width: 100px;">
						        <Option v-for="item in typelist" :value="item.value" :key="item.value">{{ item.label }}</Option>
						    </Select>
				        </FormItem>
				        <FormItem label="发布时间">
				        	<DatePicker :options="timeOptions" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="请选择" style="width: 240px" @on-change="timeChange"></DatePicker>
				        </FormItem>
					</Form>
				</Col>
				<Col span="4">
					  <Button type="primary" icon="ios-search" @click="query">查询</Button>
				</Col>
			</Row>
			<Table :loading="loading" :columns="theadData" :data="list"></Table>
			<div class="pager">
				<Page :total="total" :current="currentPage" :page-size="pageSize" show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
			</div>
		</Card>
	</div>
</template>
<script>
	export default {
		name: 'ContentList',
		data() {
			return {
				form: { // 查询表单
					title: '', // 标题
					type: '', // 分类
					startTime: '', // 开始时间
					endTime: '' // 结束时间
				},
				typelist: [ // 分类列表数据
					{
						value: 1,
						label: '分类1'
					}, {
						value: 2,
						label: '分类2'
					}
				],
				timeOptions: { // 时间选择器配置项，用于过滤今日之后的数据不可选
					disabledDate (date) {
                        return date && date.valueOf() > Date.now();
                    }
				},
				loading: true, // 表格加载中效果
				theadData: [{ // 表头数据
					title: '标题',
					key: 'title',
					align: 'center'
				},{
					title: '分类',
					key: 'type',
					align: 'center'
				},{
					title: '发布时间',
					key: 'time',
					align: 'center'
				}, {
					title: '操作',
					key: 'oper',
					align: 'center',
					render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.row)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
				}],
				list: [], // 列表数据
				total: 100, // 总记录树
				currentPage: 1, // 当前页码
				pageSize: 10 // 每页显示多少条记录
			}
		},
		methods: {
			/**
			 * 发布时间确认后的回调
			 * @param  {[type]} date [description]
			 * @param  {[type]} type [description]
			 * @return {[type]}      [description]
			 */
			timeChange(date, type) {
				this.$set(this.form, 'startTime', date[0])
				this.$set(this.form, 'endTime', date[1])
			},
			show() {

			},
			/**
			 * 删除记录
			 * @param  {[type]} obj [description]
			 * @return {[type]}     [description]
			 */
			remove(obj) {
				this.$Modal.confirm({
                    title: '温馨提示',
                    content: '是否删除该记录？',
                    closable: true,
                    loading: true,
                    onOk: () => {
                        setTimeout(() => {
                            this.$Modal.remove()
                            this.$Message.success('删除成功')
                            this.getList()
                        }, 2000)

                    }
                });
			},
			/**
			 * 查询
			 * @return {[type]} [description]
			 */
			query() {
				this.currentPage = 1
				this.getList()
			},
			/**
			 * 页码改变
			 * @param  {[type]} page [description]
			 * @return {[type]}      [description]
			 */
			pageChange(page) {
				this.currentPage = page
				this.getList()
			},
			/**
			 * 每页记录数改变
			 * @param  {[type]} pageSize [description]
			 * @return {[type]}          [description]
			 */
			pageSizeChange(pageSize) {
				this.pageSize = pageSize
				this.getList()
			},
			/**
			 * 获取内容列表
			 * @return {[type]} [description]
			 */
			getList() {
				this.loading = true
				setTimeout(()=> {
					this.loading = false
					this.list = [{
						id: 1,
						title: '标题1',
						type: '分类1',
						time: '2018-06-08 12:00'
					},{
						id: 2,
						title: '标题2',
						type: '分类2',
						time: '2018-06-08 12:00'
					},{
						id: 3,
						title: '标题3',
						type: '分类3',
						time: '2018-06-08 12:00'
					}]
				}, 2000);
			}
		},
		mounted() {
			this.getList()
		}
	}
</script>