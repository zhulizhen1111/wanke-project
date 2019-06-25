<template>
    <div class='energy'>
        <p class='info'>能耗</p>
        <p class='my-time'>截至{{month}}月{{day}}日</p>
        <div id='pie'>
            <!-- cx，cy: 圆心点坐标（viewBox 440，则对应220）
          r: 园半径
          stroke-width：线条宽度
          stroke： 颜色
          stroke-dasharray：length1 length2  length1最长设圆周长，length2尽可能大
            transform-origin： 改变原点位置
            stroke-linecap="round": 圆边
            -->
            <svg width='270' height='270' viewBox='0 0 440 440'>
                <circle
                    cx='220'
                    cy='220'
                    r='170'
                    stroke-width='15'
                    stroke-linecap='round'
                    stroke='#FBF3E7'
                    fill='none'
                    stroke-dasharray='900 1069'
                    style='
            transform: rotate(118deg);
            transform-origin: 220px 220px;
        '
                ></circle>

                <circle
                    cx='220'
                    cy='220'
                    r='170'
                    stroke-width='15'
                    stroke-linecap='round'
                    stroke='#FABA53'
                    fill='none'
                    :stroke-dasharray='`${(consume.actualConsumption / 100) * 900} 1069`'
                    style='
            transform: rotate(118deg);
            transform-origin: 220px 220px;
        '
                ></circle>

                <circle
                    cx='220'
                    cy='220'
                    r='120'
                    stroke-width='15'
                    stroke-linecap='round'
                    stroke='#eaf0f8'
                    fill='none'
                    stroke-dasharray='630 1069'
                    style='
            transform: rotate(118deg);
            transform-origin: 220px 220px;
        '
                ></circle>

                <circle
                    cx='220'
                    cy='220'
                    r='120'
                    stroke-width='15'
                    stroke-linecap='round'
                    stroke='#4A9EF9'
                    fill='none'
                    :stroke-dasharray='`${(consume.planConsumption / 100) * 630} 1069`'
                    style='
            transform: rotate(118deg);
            transform-origin: 220px 220px;
        '
                ></circle>
            </svg>
            <div class='budget'>
                <p style='color: #62697B;'>年度能耗预算</p>
                <p style='font-family: ArialMT;font-size: 32px;color: #3B4254;'>{{consume.annualBudget}}</p>
                <p style='color: #62697B;'>万kWh</p>
            </div>
        </div>
        <table class='description'>
            <tr class='normal'>
                <td>
                    <i></i>
                </td>
                <td>计划消耗</td>
                <td>{{consume.planConsumption}}%</td>
            </tr>
            <tr class='repair'>
                <td>
                    <i></i>
                </td>
                <td>实际已消耗</td>
                <td>{{consume.actualConsumption}}%</td>
            </tr>
        </table>
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
            consume: {
                annualBudget: 0,
                planConsumption: 0,
                actualConsumption: 0
            },
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
        }
    },

    computed: {},

    mounted() {
        this.initData()
    },

    methods: {
        //能耗
        initData() {
            axios.get(`/info-mng-backend/isagy/index?projectId=${this.$store.state.projectId}`).then(({ data }) => {
                if (data.result === 'success') {
                    //  this.planConsumption = (data.data.planConsumption / data.data.annualBudget) * 630
                    this.consume = data.data
                }
            })
        }
    }
}
</script>

<style scoped lang="less" >
.energy {
    border: 1px solid #ebecf0;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    //font-size: 14px;
    .info {
        height: 50px;
        line-height: 50px;
        background: #f7f9fc;
        border: 0 solid #f2f2f2;
        padding-left: 20px;
        font-weight: bolder;
        font-size: 18px;
        color: #3b4254;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .my-time {
        padding-left: 20px;
        padding-top: 20px;
    }
    #pie {
        margin: 0 auto;
        margin: 50px 0 36px 0;
        text-align: center;
        position: relative;
        .my-circle {
            padding-top: 116px;
            width: 192px;
            height: 230px;
        }
    }
    .budget {
        position: absolute;
        top: 100px;
        left: 38%;
    }
    table.description {
        margin: 0 auto;
        margin-bottom: 30px;
        tr {
            td {
                padding: 10px 15px;
                i {
                    display: inline-block;
                    width: 16px;
                    height: 10px;
                    border: 2px solid#4A9EF9;
                    background: #4a9ef9;
                    border-radius: 6px;
                }
            }
            &:nth-child(2) {
                td {
                    i {
                        border-color: #faba53;
                        background: #faba53;
                    }
                }
            }
        }
    }
}
</style>
<style lang="less">
.enery {
    #main {
        .ivu-chart-circle {
            width: 100px;
        }
    }
}
</style>

