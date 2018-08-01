<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/index">首页</router-link>&gt;
                <router-link to="/buyCar">购物车</router-link>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 空的时候显示 -->
                                <tr v-if="message&&message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有数据的时候显示 -->
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected"  active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number v-model="item.buycount" @change="countchange($event,index)" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="delIndex=index; showModal=true" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额{{totalPrice}}（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">0</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <router-link to="/payOrder">
                            <button class="submit" >立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <Modal v-model="showModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>警告</span>
            </p>
            <div style="text-align:center">
                <p>你确定要删掉他</p>
            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                    <Button type="success" size="large" long @click="showModal=false">取消</Button>
                    </Col>
                    <Col span="12">
                    <Button type="error" size="large" long @click="del">删除</Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
  name: "buyCar",
  data: function() {
    return {
      message: undefined,
      showModal:false,
      delIndex:0,
    };
  },
  // 获取数据
  created() {
    // 获取 数据 拼接为 id1,id2,id3....
    // console.log(this.$store.state.buyList);
    let buylist = this.$store.state.buylist;
    let ids = "";
    for (const key in buylist) {
      ids += key;
      ids += ",";
    }
    if(ids=='') return
    // 最后多了一个 ,
    ids = ids.slice(0, -1);
    // console.log(ids);
    // 购物车的数据 id:num
    this.axios
      .get(`site/comment/getshopcargoods/${ids}`)
      .then(response => {
        // console.log(response);
        // 自己把购买的数量匹配到 返回的数据中
        // console.log(this.message);
        
        response.data.message.forEach((v,i)=>{
            // 通过id 获取购物车数据中的 加入购物车的数量
            v.buycount = buylist[v.id];
            v.isSelected=true;
            
        })
            this.message = response.data.message;
            // console.log(this.message);
            
      })
      .catch(err => {
          // console.log(err);
      });
  },
  // 计算属性
  computed:{
      selectCount(){
          let totalCount = 0;
          if(this.message==undefined) return totalCount;
          this.message.forEach(v=>{
              if(v.isSelected) totalCount+=v.buycount;
          })
          return totalCount;
      },
      totalPrice(){
            let price= 0;
            if(this.message==undefined) return price;
          this.message.forEach(v=>{
              if(v.isSelected) price+=v.buycount*v.sell_price;
          })
          return price;

      }
  },
  methods:{
      countchange(value,index){
        //   console.log(value,index);
        //   changeCount
          this.$store.commit('changeCount',{
              goodid:this.message[index].id,
              goodnum:value,
          })
      },
      del(){
          this.$store.commit('del',this.message[this.delIndex].id)
          this.message.splice(this.delIndex,1);
          this.showModal=false;
      }
  }
};
</script>
<style scoped>
</style>

