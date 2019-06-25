<template>
    <div class='online-people-detail' :style='`width: ${maskWidth}`'>
        <p class='particular'>
            人员详情 ——
            <span>{{everyPeople.name}}</span>
            <Icon type='md-close' class='close-btn' @click='close'/>
        </p>
        <span class='remark-icon'></span>
        <p class='my-title'>基本信息</p>
        <div class='base-info'>
            <img
                class='base-img'
                :src='everyPeople.headPortrait?`http://api.sagacloud.cn/dp-auxiliary/image-service/common/file_get?systemId=dataPlatform&key=${everyPeople.headPortrait}`:`/static/img/noimg.png`'
                alt='员工头像'
            >
            <div class='each-grade'>
                <p class='people-grade'>个人绩效</p>
                <p class='grade'>{{everyPeople.performance}}</p>
            </div>
        </div>
        <div class='repair-order'>
            <p>
                本月工单总量： {{orderStat.currentMonthWoConut}}个
                <span class='completion'>完成率：{{orderStat.woFinishRate}}</span>
            </p>
            <div class='tt-echarts'>
                <div id='detail_bill' style=' width: 200px;height: 200px;'></div>
                <div class='tt-legend'>
                    <div v-for='(item1,index1) in orderStat.woTypeCountInfo' :key='index1'>
                        <div class='square' :style='`border:1px solid ${borderColor[item1.typeName]}`'></div>
                        {{item1.typeName}}
                        <span class='num'>{{item1.woCount}}</span>
                        <span class='rat'>{{item1.rate}}</span>
                    </div>
                </div>
            </div>
        </div>
        <span class='remark-icon'></span>
        <p class='my-title'>个人详情</p>
        <table>
            <tr>
                <td>姓名：</td>
                <td>{{everyPeople.name}}</td>
            </tr>
            <tr>
                <td>职位：</td>
                <td>{{everyPeople.personNum}}</td>
            </tr>
            <tr>
                <td>专业：</td>
                <td style='width:200px'>{{everyPeople.specialtyName}}</td>
            </tr>
            <tr>
                <td>手机号：</td>
                <td>{{everyPeople.phoneNum}}</td>
            </tr>
            <!-- <tr>
        <td>是否在岗：</td>
        <td>{{everyPeople.onWorkingStatus}}</td>
            </tr>-->
            <tr>
                <td>工作评分：</td>
                <td>
                    <Rate allowHalf disabled v-model='everyPeople.averageWorkScore'/>
                </td>
            </tr>
            <tr>
                <td>工单总数：</td>
                <td>{{orderStat.currentMonthWoConut}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
var echarts = require('echarts')
export default {
    components: {},

    mixins: [],
    props: {
        maskWidth: {
            type: String,
            default: '0px'
        },
        everyPeople: {},
        orderStat: {}
    },

    data() {
        return {
            borderColor: {
                维保类工单: '#73DA99',
                巡检类工单: '#4A9EF9',
                运行类工单: '#6ECAF7',
                维修类工单: '#FABA53'
            }
        }
    },

    computed: {},

    mounted() {
        this.draw()
    },

    methods: {
        getData() {},
        close() {
            this.$emit('closePeopleDetail')
        },
        draw() {
            let myChart = echarts.init(document.getElementById('detail_bill'))
            var scaleData = this.orderStat.woTypeCountInfo || []
            console.log(scaleData)
            var placeHolderStyle = {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                }
            }
            var data = []

            var color = ['#73DA99', '#FABA53', '#4A9EF9', '#6ECAF7', '#F3E171']
            for (var i = 0; i < scaleData.length; i++) {
                data.push(
                    {
                        value: scaleData[i].woConut,
                        name: scaleData[i].typeName,
                        itemStyle: {
                            normal: {
                                borderWidth: 15,
                                borderColor: color[i]
                            }
                        }
                    },
                    {
                        value: 5,
                        name: '',
                        itemStyle: placeHolderStyle
                    }
                )
            }

            var seriesObj = [
                {
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    radius: [50, 50],
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'center',
                                color: '#3B4254',
                                fontSize: 0,
                                formatter: function(params) {
                                    return '\n\n\n\n\n\n\n'
                                }
                            }
                        }
                    },
                    data: data
                }
            ]

            myChart.setOption({
                tooltip: {
                    show: false
                },
                legend: {
                    show: false
                },
                toolbox: {
                    show: true
                },
                series: seriesObj
            })
        }
    }
}
</script>

<style scoped lang="less" >
.online-people-detail {
    position: fixed;
    z-index: 999;
    top: 50px;
    right: 0;
    bottom: 0;
    background: #ffffff;
    box-shadow: 0 7px 15px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease-in-out;
    overflow-y: scroll;
    .particular {
        height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #dbdde4;
        //font-size: 16px;
        color: #3b4254;
        padding-left: 24px;
        .close-btn {
            float: right;
            padding: 10px;
            padding: 18px;
            cursor: pointer;
        }
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
    .base-info {
        margin-left: 30px;
        box-shadow: 0 1px 5px 0 rgba(59, 66, 84, 0.12);
        border-radius: 2px;
        width: 140px;
        height: 198px;
        > img {
            width: 100%;
            height: 140px;
        }
        .each-grade {
            text-align: center;
            .people-grade {
                // font-size: 14px;
                color: #3b4254;
            }
            .grade {
                font-size: 20px;
                color: #57a4f7;
            }
        }
    }
    .repair-order {
        margin: 30px 0 30px 30px;
        .completion {
            margin-left: 40px;
        }
    }
    .tt-echarts {
        display: flex;
        #detail_bill {
            margin-top: 30px;
        }
        .tt-legend {
            margin-top: 61px;
            > div {
                height: 30px;
            }
            .square {
                width: 8px;
                height: 8px;
                background: #fff;
                //border: 1px solid #4a9ef9;
                border-radius: 50px;
                display: inline-block;
                margin-right: 10px;
            }
            .num {
                margin-left: 15px;
            }
            .rat {
                margin-left: 15px;
            }
        }
    }
    table {
        td {
            width: 98px;
            height: 30px;
        }
        td:first-child {
            text-align: right;
        }
        td:nth-child(2) {
            text-align: left;
            padding-left: 20px;
        }
    }
}
</style>
<style lang="less">
.online-people-detail {
    .ivu-rate-star {
        margin-right: -1px;
    }
}
</style>
