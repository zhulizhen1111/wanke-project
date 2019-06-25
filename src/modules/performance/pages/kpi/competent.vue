<template>
    <div class='per-competent'>
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
                    <p class='name'>{{data.staffName }}</p>
                </div>

                <span class='line'></span>

                <div class='manager'>
                    <div class='card'>
                        <div class='grade'>
                            <strong>{{data.project1.toFixed(0) || 0}}</strong>
                            <p>总分：50</p>
                        </div>
                        <p class='name'>项目管理</p>
                    </div>
                    <span class='signal'>=</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>制定月计划、周计划：</p>
                                <p>每月由协管员打分月计划2分、周计划8分，少一项扣2分；</p>
                                <p>项目周会开展：</p>
                                <p>FM工单筛选功能增加一项项目周会，工单内容包括会议内容、照片及参加人员该工单未执行扣10分；</p>
                                <p>每周工程、维修工作进度汇总：</p>
                                <p>利用日报功能，把该工单推送在公众号中，每周向业主反馈，该日报未执行扣5分，执行即得5分；</p>
                            </div>
                            <strong>{{data.project1_plan.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>工作计划性</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>内部（员工间）外部（商管）沟通、协作；</p>
                                <p>该项评分每月由协管员打分；</p>
                            </div>
                            <strong>{{data.project1_Communicate.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>沟通能力</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>信息化系统问题反馈：</p>
                                <p>每月统计问题反馈；</p>
                                <p>每月由协管员打分；</p>
                                <p>工单检查、审批：</p>
                                <p>默认10分满分；</p>
                                <p>协管员检查发现问题工单每单扣5分；</p>
                            </div>
                            <strong>{{data.project1_informationSystem.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>信息化系统使用</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>设备巡检、运行、维修、保养等工作：</p>
                                <p>根据FM系统工单完成质量，要求对每条工单进行评分；</p>
                                <p>巡检占10分、运行、维修、保养各占5分；</p>
                                <p>每类工单按5星制评分； 巡检、运行工单无异常、漏检5颗星，异常4颗星，漏检3颗星，异常+漏检0颗星；</p>
                                <p>维修、维保工单由主管审核工单时评星；</p>
                                <p>各类工单平均得分5星为满分，4.8-4.9星为4分，4.5-4.7星为3分，4.3-4.4星为2分，4.0-4.2星为1分，低于4星为0分；（巡检得分X2）；</p>
                            </div>
                            <strong>{{data.project1_daily.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>日常工作</p>
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
                            <strong>{{data.synthetical1.toFixed(0) || 0}}</strong>
                            <p>总分：30</p>
                        </div>
                        <p class='name'>综合职业素质</p>
                    </div>
                    <span class='signal'>=</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>综合技能专项总结能力；</p>
                                <p>将专项总结共享培训给同事等能力（共享方式不限）；</p>
                                <p>每月由协管员打分；</p>
                            </div>
                            <strong>{{data.synthetical1_train.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>培训能力</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>为信息化产品提出合理化建议（信息化产品功能应用、友好操作、业务逻辑等）；</p>
                                <p>为新型物业现场工作机制方面提出自己的创新观点（工作标准化、工作流、交互机制等）；</p>
                                <p>每月由协管员打分；</p>
                            </div>
                            <strong>{{data.synthetical1_innovate.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>创新</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>是否具备良好的服务意识；</p>
                                <p>是否注重仪表；</p>
                                <p>每月由协管员打分；</p>
                            </div>
                            <strong>{{data.synthetical1_service.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>服务意识</p>
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
                            <strong>{{data.technology1.toFixed(0) || 0}}</strong>
                            <p>总分：20</p>
                        </div>
                        <p class='name'>技术能力</p>
                    </div>
                    <span class='signal'>=</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>综合维修技能（电气与机电技术、IT信息化技术、暖通空调技术；</p>
                                <p>每月由协管员打分；</p>
                            </div>
                            <strong>{{data.technology1_technology.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>技术能力</p>
                    </div>
                    <span class='signal'>+</span>
                    <div class='card'>
                        <div class='grade'>
                            <i class='iconfont icon-shuoming'></i>
                            <div class='tooltip'>
                                <p>设备节能运行调节执行操作能力；</p>
                                <p>每月由协管员打分；</p>
                            </div>
                            <strong>{{data.technology1_energy.toFixed(0) || 0}}</strong>
                        </div>
                        <p class='name'>节能运行</p>
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
            date: '',
            time: '',
            staffId: '',
            data: {
                performanceScore: 0,
                staffName: '',
                project1: 0,
                project1_plan: 0,
                project1_Communicate: 0,
                project1_informationSystem: 0,
                project1_daily: 0,
                synthetical1: 0,
                synthetical1_innovate: 0,
                synthetical1_train: 0,
                synthetical1_service: 0,
                technology1: 0,
                technology1_technology: 0,
                technology1_energy: 0
            }
        }
    },

    computed: {},

    mounted() {
        this.staffId = this.$route.query.staffId
        this.time = this.$route.query.time
        console.log(this.time)
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
                    }&date=${time}&staffId=${this.staffId}&positionId=1`
                )
                .then(res => {
                    console.log(res)
                    if (res.data.result == 'success') {
                        if (res.data.data.length != 0) {
                            this.data = res.data.data[0]
                        } else {
                            this.data = {
                                performanceScore: 0,
                                staffName: '',
                                project1: 0,
                                project1_plan: 0,
                                project1_Communicate: 0,
                                project1_informationSystem: 0,
                                project1_daily: 0,
                                synthetical1: 0,
                                synthetical1_innovate: 0,
                                synthetical1_train: 0,
                                synthetical1_service: 0,
                                technology1: 0,
                                technology1_technology: 0,
                                technology1_energy: 0
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
.per-competent {
    padding: 20px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 2px;
    height: 900px;
    .kpi-top {
        margin-bottom: 40px;
        display: flex;
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
