<template>
    <div class='worker'>
        <div class='wk-info' v-for='(item,index) in statffInfo' :key='index'>
            <div v-for='(item1,index1) in item' :key='index1'>
                <div class='wk-w'>
                    <img
                        class='wk-img'
                        :src='item1.headPortrait?`http://api.sagacloud.cn/dp-auxiliary/image-service/common/file_get?systemId=dataPlatform&key=${item1.headPortrait}`:`/static/img/noimg.png`'
                        alt='人员图片'
                    >
                    <div class='wk-state'>{{item1.personStatus}}</div>
                </div>
                <p>姓名：{{item1.name}}</p>
                <p>电话：{{item1.phoneNum}}</p>
                <p class='wk-break'>专业：{{item1.specialtyName}}</p>
            </div>
        </div>
        <div class='wk-charts'>
            <span class='remark-icon'></span>
            <p class='my-title'>近48小时出勤情况</p>
            <div id='mySimple' style='width:100%;height:338px'></div>
            <p class='legend'>
                <img src='/static/img/icon1.jpg' alt>
                <span>计划出勤人数</span>
                <img src='/static/img/icon2.jpg' alt>
                <span>实际出勤人数</span>
            </p>
        </div>
    </div>
</template>

<script>
var echarts = require('echarts')
import axios from 'axios'
export default {
    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            statffInfo: []
        }
    },

    computed: {},

    mounted() {
        this.getPersonInfo()
        this.drawSimple()
    },

    methods: {
        drawSimple() {
            let mySimpleChart = echarts.init(document.getElementById('mySimple'))
            var hours = new Date().getHours()
            var data = [
                3,
                4,
                3,
                3,
                5,
                4,
                4,
                3,
                4,
                3,
                3,
                5,
                4,
                4,
                3,
                3,
                4,
                3,
                3,
                5,
                4,
                4,
                3,
                4,
                3,
                3,
                5,
                4,
                4,
                3,
                5,
                3,
                4,
                5,
                4,
                5,
                3,
                4,
                5,
                3,
                4,
                5,
                4,
                5,
                4,
                5,
                3,
                4
            ]
            var data1 = [
                5,
                5,
                5,
                5,
                5,
                5,
                4,
                3,
                4,
                5,
                5,
                5,
                4,
                4,
                5,
                5,
                4,
                5,
                5,
                5,
                4,
                4,
                5,
                4,
                5,
                5,
                5,
                4,
                4,
                5,
                5,
                5,
                4,
                5,
                4,
                5,
                5,
                4,
                5,
                5,
                4,
                5,
                5,
                5,
                5,
                5,
                5,
                5
            ]
            var realData = data.splice(data.length - (24 - hours) + 1)
            mySimpleChart.setOption({
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        interval: 2
                    },
                    boundaryGap: false,
                    data: [
                        '昨天00:00',
                        '01:00',
                        '02:00',
                        '03:00',
                        '04:00',
                        '05:00',
                        '06:00',
                        '07:00',
                        '08:00',
                        '09:00',
                        '10:00',
                        '11:00',
                        '12:00',
                        '13:00',
                        '14:00',
                        '15:00',
                        '16:00',
                        '17:00',
                        '18:00',
                        '19:00',
                        '20:00',
                        '21:00',
                        '22:00',
                        '23:00',
                        '今天00：00',
                        '01:00',
                        '02:00',
                        '03:00',
                        '04:00',
                        '05:00',
                        '06:00',
                        '07:00',
                        '08:00',
                        '09:00',
                        '10:00',
                        '11:00',
                        '12:00',
                        '13:00',
                        '14:00',
                        '15:00',
                        '16:00',
                        '17:00',
                        '18:00',
                        '19:00',
                        '20:00',
                        '21:00',
                        '22:00',
                        '23:00'
                    ]
                },
                yAxis: {
                    type: 'value'
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: '#fff',
                    borderColor: '#D9D9D9',
                    textStyle: {
                        color: ' #8C94A9',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    },
                    formatter: function(params, ticket, callback) {
                        var res = params[0].name
                        var name = ''
                        for (var i = 0, l = params.length; i < l; i++) {
                            if (i == 0) {
                                name = '计划出勤人数'
                            } else {
                                name = '实际出勤人数'
                            }
                            res += '<br>' + name + ' : ' + params[i].value + '人'
                        }

                        return res
                    }
                },
                series: [
                    {
                        data: data1,
                        type: 'line',
                        lineStyle: {
                            color: '#4A9EF9'
                        },
                        showSymbol: false
                    },
                    {
                        data: data,
                        type: 'line',
                        lineStyle: {
                            color: '#FABA53'
                        },
                        showSymbol: false
                    }
                ]
            })
        },
        getPersonInfo() {
            axios
                .get(`/info-mng-backend/saas/queryPlanAttendancePersonList?projectId=${this.$store.state.projectId}`)
                .then(res => {
                    if (res.data.result == 'success') {
                        this.statffInfo.push(res.data.data)
                    }
                })
        }
    }
}
</script>

<style scoped lang="less" >
.worker {
    .ev-png {
        width: 100%;
    }
    .wk-info {
        display: flex;
        padding: 20px;
        > div {
            display: inline-block;
            padding: 20px;
            .wk-w {
                box-shadow: 0 1px 5px 0 rgba(59, 66, 84, 0.12);
                border-radius: 2px;
                width: 140px;
                margin-bottom: 10px;
                .wk-img {
                    width: 140px;
                    height: 140px;
                }
                .wk-state {
                    height: 20px;
                    text-align: center;
                }
            }
            > p {
                line-height: 22px;
            }
            .wk-break {
                width: 155px;
                word-wrap: break-word;
                word-break: normal;
            }
        }
    }
    .wk-charts {
        margin-top: 40px;
        border: 1px solid #dbdde4;
        border-radius: 1px;
        position: relative;
        .ev-jpg {
            width: 100%;
        }
        .my-title {
            height: 40px;
            font-size: 18px;
            font-weight: bold;
            display: inline-block;
        }
        .remark-icon {
            padding: 7px 3px;
            display: inline-block;
            background: #4a9ef9;
            margin: 20px 10px 0 20px;
        }
        .legend {
            position: absolute;
            top: 48px;
            right: 150px;
        }
    }
}
</style>
