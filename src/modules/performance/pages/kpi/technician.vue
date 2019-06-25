<template>
    <div class='per-tech'>
        <div class='kpi-top'>
            <img style='width:34px;margin-right:4px;' src='/static/img/backIcon.jpg' alt @click='back'>
            <DatePicker
                type='month'
                size='large'
                placeholder
                style='width: 270px'
                v-model='date'
                @on-change='getData'
                format='yyyy-MM'
                :clearable='false'
            ></DatePicker>
        </div>
        <div class='kpi-bottom'>
            <div class='card-total'>
                <div class='card'>
                    <div class='grade'>
                        <strong>{{data.performanceScore.toFixed(0) || 0}}</strong>
                        <p>绩效得分</p>
                    </div>
                    <p class='name'>{{data.staffName}}</p>
                </div>

                <span class='line'></span>

                <div class='manager'>
                    <div class='card'>
                        <div class='grade'>
                            <strong>{{data.daily2.toFixed(0) || 0}}</strong>
                            <p>总分：60</p>
                        </div>
                        <p class='name'>日常综合事务</p>
                    </div>
                    <span class='signal'>=</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>每日工作回顾：</p>
                                <p>每月日报数量22-24条，5分；</p>
                                <p>每月日报数量20-21条，4分；</p>
                                <p>每月日报数量15-19条，3分；</p>
                                <p>每月日报数量10-14条，2分；</p>
                                <p>每月日报数量5-9条，1分；</p>
                                <p>每月日报数量0-4条，0分；</p>
                            </div>
                            <strong>{{data.daily2_manage.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>日常管理事务</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>技术工作：</p>
                                <p>根据FM系统工单完成质量，要求对每条工单进行评分；</p>
                                <p>巡检占10分、运行、维修、保养各占5分；</p>
                                <p>每类工单按5星制评分； 巡检、运行工单无异常、漏检5颗星，异常4颗星，漏检3颗星，异常+漏检0颗星；</p>
                                <p>维修、维保工单由主管审核工单时评星；</p>
                                <p>各类工单平均得分5星为满分，4.8-4.9星为4分，4.5-4.7星为3分，4.3-4.4星为2分，4.0-4.2星为1分，低于4星为0分；（巡检得分X2）</p>
                                <p>系统应用：</p>
                                <p>维修工单公式：上线工单/总工单（总工单从日报里面技术员填的每日维修工单数量计算）；</p>
                                <p>上线率95~100%得5分；工单数量>50条得5分；</p>
                                <p>上线率90~94%得4分；工单数量45~49条得4分；</p>
                                <p>上线率80~90%得3分；工单数量40~44条得3分；</p>
                                <p>上线率60~79%得2分；工单数量30~39条得2分；</p>
                                <p>上线率小于60%得1分；工单数量小于30条得1分；</p>
                            </div>
                            <strong>{{data.daily2_workFinish.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>日常工作完成品质</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>工作饱和度：</p>
                                <p>计算公式：实际工时/打卡工时；</p>
                                <p>饱和度>50%得5分；</p>
                                <p>饱和度40~49%得4分；</p>
                                <p>饱和度30~39%得3分；</p>
                                <p>饱和度20~29%得2分；</p>
                                <p>饱和度小于20%得1分；</p>
                            </div>
                            <strong>{{data.daily2_workSaturation.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>工作饱和度</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>工作时效：</p>
                                <p>统计（紧急程度）高、中、低等级工单接单时长（时间=抢单时间-工单发出时间）；</p>
                                <p>要求高等级5分钟之内接单，中等级30分钟接单，低等级1小时内接单；</p>
                                <p>高中低三类工单基础分100分，出现1次-5分；</p>
                                <p>该项得分=每月总得分/300*5为本项得分；</p>
                                <p>工单完成效率：</p>
                                <p>满分5分，超时完成、异常中止工单，每单-1分；</p>
                            </div>
                            <strong>{{data.daily2_taskEfficiency.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>任务执行完成效率</p>
                    </div>
                </div>
            </div>
            <div class='long-line'></div>
            <div class='card-total'>
                <div class='blank'></div>
                <span class='relative-line1'></span>
                <span class='line'></span>
                <div class='manager'>
                    <div class='card'>
                        <div class='grade'>
                            <strong>{{data.synthetical2.toFixed(0) || 0}}</strong>
                            <p>总分：20</p>
                        </div>
                        <p class='name'>综合职业素质</p>
                    </div>
                    <span class='signal'>=</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>是不是具备责任心，安排的工作是否可以完成；</p>
                                <p>积极性，是否具备主人翁精神；</p>
                                <p>该项评分每月由项目领班打分；</p>
                            </div>
                            <strong>{{data.synthetical2_workAttitude.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>工作态度</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>接到任务后，是否有清晰的人力资源规划（角色分工、任务拆分）；</p>
                                <p>是否能引导组织内部人员更高效的工作，模范带头人（积极主动、带头作用）；</p>
                                <p>团队配合良好，无争吵、动手；</p>
                                <p>该项评分每月由项目领班打分；出现争吵、打闹该项为0分；</p>
                            </div>
                            <strong>{{data.synthetical2_teamwork.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>团队协作</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>是否具备良好的服务意识、在商场服务场合注重仪表；</p>
                                <p>该项评分每月由项目领班打分；</p>
                            </div>
                            <strong>{{data.synthetical2_service.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>服务意识</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>综合技能专项总结能力；</p>
                                <p>将专项总结共享培训给同事等能力（共享方式不限）；</p>
                                <p>该项评分每月由项目领班打分，每分享一次加1分；</p>
                            </div>
                            <strong>{{data.synthetical2_train.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>培训能力</p>
                    </div>
                </div>
            </div>
            <div class='card-total'>
                <div class='blank'></div>
                <span class='relative-line2'></span>
                <span class='line'></span>
                <div class='manager'>
                    <div class='card'>
                        <div class='grade'>
                            <strong>{{data.technology2.toFixed(0) || 0}}</strong>
                            <p>总分：20</p>
                        </div>
                        <p class='name'>技术能力</p>
                    </div>
                    <span class='signal'>=</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>综合维修技能（电气与机电技术、IT信息化技术、暖通空调技术）；</p>
                                <p>设备节能运行调节执行操作能力；</p>
                                <p>该项评分每月由项目领班打分；</p>
                            </div>
                            <strong>{{data.technology2_major.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>专业能力</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>与客户沟通文明礼貌；</p>
                                <p>基该项评分每月由项目领班打分，础分5分，出现1次与客户沟通问题则为0分，不注重仪表每次-1分；</p>
                            </div>
                            <strong>{{data.technology2_communicate.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>沟通能力</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { formatTime } from '@/tools/formatTime.js'
export default {
    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            date: new Date(),
            staffId: '',
            time: '',
            data: {
                performanceScore: 0,
                staffName: '张三',
                daily2: 0,
                daily2_manage: 0,
                daily2_workFinish: 0,
                daily2_workSaturation: 0,
                daily2_taskEfficiency: 0,
                synthetical2: 0,
                synthetical2_workAttitude: 0,
                synthetical2_teamwork: 0,
                synthetical2_service: 0,
                synthetical2_train: 0,
                technology2: 0,
                technology2_major: 0,
                technology2_communicate: 0
            }
        }
    },

    computed: {},

    mounted() {
        this.staffId = this.$route.query.staffId
        this.time = this.$route.query.time
        this.date = this.time.slice(0, 4) + '-' + this.time.slice(4, 6)
        console.log(this.date)
        this.getData()
    },

    methods: {
        getData(val) {
            console.log(val)
            let time
            if (!val) {
                time = this.time
            } else {
                time = formatTime(new Date(this.date).toLocaleDateString())
            }
            axios
                .get(
                    `/info-mng-backend/achievements/query?projectId=${
                        this.$store.state.projectId
                    }&date=${time}&staffId=${this.staffId}&positionId=2`
                )
                .then(res => {
                    if (res.data.result == 'success') {
                        if (res.data.data.length != 0) {
                            this.data = res.data.data[0]
                        } else {
                            this.data = {
                                performanceScore: 0,
                                staffName: '',
                                daily2: 0,
                                daily2_manage: 0,
                                daily2_workFinish: 0,
                                daily2_workSaturation: 0,
                                daily2_taskEfficiency: 0,
                                synthetical2: 0,
                                synthetical2_workAttitude: 0,
                                synthetical2_teamwork: 0,
                                synthetical2_service: 0,
                                synthetical2_train: 0,
                                technology2: 0,
                                technology2_major: 0,
                                technology2_communicate: 0
                            }
                        }
                    }
                })
        },
        back() {
            this.$router.history.go(-1)
        }
    }
}
</script>

<style scoped lang="less" >
.per-tech {
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    height: 900px;
    .kpi-top {
        display: flex;
        margin-bottom: 40px;
        // margin-left: 35px;
    }
    .kpi-bottom {
        .card-total {
            display: flex;
            .card {
                display: inline-block;
                width: 140px;
                height: 156px;
                text-align: center;
                opacity: 1;
                background: rgba(255, 255, 255, 1);
                border-radius: 1px 1px 1px 1px;
                box-shadow: 0px 1px 5px 0px rgba(59, 66, 84, 0.1);
                margin-bottom: 50px;
                .grade {
                    height: 116px;
                    padding-top: 20px;
                    position: relative;
                    i {
                        position: absolute;
                        font-size: 14px;
                        color: rgba(182, 188, 203, 1);
                        left: 118px;
                        top: 4px;
                    }
                    .tooltip {
                        position: absolute;
                        top: 10px;
                        left: 138px;
                        width: 368px;
                        opacity: 0.9;
                        background: rgba(255, 255, 255, 1);
                        border-radius: 1.5px 1.5px 1.5px 1.5px;
                        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                        text-align: left;
                        padding: 10px;
                        font-size: 12px;
                        z-index: 999;
                        display: none;
                    }
                    i:hover + .tooltip {
                        display: block;
                    }
                    strong {
                        font-size: 40px;
                        color: #4a9ef9;
                    }
                }
                .name {
                    height: 40px;
                    line-height: 40px;
                    background: rgba(246, 248, 251, 1);
                }
            }
            .line {
                display: inline-block;
                width: 98px;
                height: 1px;
                background: rgba(219, 221, 228, 1);
                margin-top: 80px;
            }
            .relative-line1 {
                height: 1px;
                width: 130px;
                position: absolute;
                background: rgba(219, 221, 228, 1);
                bottom: 537px;
                left: 186px;
            }
            .relative-line2 {
                height: 1px;
                width: 130px;
                position: absolute;
                background: rgba(219, 221, 228, 1);
                bottom: 331px;
                left: 186px;
            }
            .signal {
                display: inline-block;
                width: 60px;
                text-align: center;
                height: 156px;
                line-height: 156px;
                font-size: 40px;
                font-weight: bold;
                color: rgba(140, 148, 169, 1);
                position: relative;
                top: -50px;
            }
            .manager {
                display: inline-block;
            }
            .total-num {
                display: inline-block;
            }
            .blank {
                width: 140px;
            }
        }
        .long-line {
            position: absolute;
            top: 325px;
            width: 1px;
            height: 334px;
            background: rgba(219, 221, 228, 1);
            left: 185px;
        }
    }
}
</style>
