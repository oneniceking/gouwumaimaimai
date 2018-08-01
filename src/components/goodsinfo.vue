<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions">

                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span @click="buynum==1?1:buynum--" role="button" class="el-input-number__decrease " :class="{'is-disabled':buynum==1}">
                                                        <i class="el-icon-minus"></i>
                                                    </span>
                                                    <span @click="buynum==goodsinfo.stock_quantity?goodsinfo.stock_quantity:buynum++" role="button" class="el-input-number__increase" :class="{'is-disabled':buynum==goodsinfo.stock_quantity}">
                                                        <i class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buynum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="isshow=true" href="javascript:;" :class="{selected:isshow}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="isshow=false" href="javascript:;" :class="{selected:!isshow}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display:isshow?'block':'none'}">

                            </div>
                            <div class="tab-content" :style="{display:!isshow?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" v-model="comcontent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="comMess" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalcount" placement='top' :page-size-opts="[5,10,15,20]" @on-change='comchange($event)' @on-page-size-change='comsizechange($event)' show-elevator show-sizer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(v, i) in hotgoodslist" :key="v.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+v.id">
                                                <img :src="v.img_url">
                                            </router-link>

                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+v.id">{{v.title}}</router-link>
                                            <span>{{v.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <img v-if="imglist.length!=0" style="display:none" :src="imglist[0].original_path" class="moveImg" alt="">
    </div>
</template>
<script>
import ProductZoomer from "vue-product-zoomer";
import $ from "jquery";
export default {
  data() {
    return {
      goodsinfo: {},
      hotgoodslist: [],
      imglist: [],
      isshow: true,
      buynum: 1,
      images: {
        normal_size: []
      },
      // 轮播图的配置
      zoomerOptions: {
        zoomFactor: 2,
        pane: "container-round",
        hoverDelay: 300,
        namespace: "inline-zoomer",
        move_by_click: true,
        scroll_items: 5,
        choosed_thumb_border_color: "#bbdefb"
      },
      //评论
      pageIndex: 1,
      pageSize: 5,
      totalcount: 0,
      commentlist: [],
      comcontent: ""
    };
  },
  methods: {
    getMeg() {
      this.buynum = 1;
      this.imglist = [];
      this.images.normal_size = [];
      this.axios
        .get(`/site/goods/getgoodsinfo/${this.$route.params.id}`)
        .then(response => {
          this.goodsinfo = response.data.message.goodsinfo;
          this.hotgoodslist = response.data.message.hotgoodslist;
          this.imglist = response.data.message.imglist;
          this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch(error => {
          //   console.log(error)
        });
    },
    getcom() {
      this.axios
        .get(
          `site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${
            this.pageIndex
          }&pageSize=${this.pageSize}`
        )
        .then(response => {
          this.totalcount = response.data.totalcount;
          this.commentlist = response.data.message;
          // console.log(response);
        })

        .catch(error => {
          //   console.log(error)
        });
    },
    //弹出框
    comMess() {
      if (this.comcontent == "") {
        this.$Message.error("不能为空,15字啊15字");
        return;
      }
      this.axios
        .post(`site/validate/comment/post/goods/${this.$route.params.id}`, {
          commenttxt: this.comcontent
        })
        .then(response => {
          if (response.data.status == 0) {
            this.comcontent = "";
            this.pageIndex = 1;
            this.getcom();
          }
          // console.log(response);
        })

        .catch(error => {
          //   console.log(error)
        });
    },
    comchange(page) {
      console.log(page);

      this.pageIndex = page;
      this.getcom();
    },
    comsizechange(Size) {
      this.pageSize = Size;
      this.getcom();
    },
    cartAdd() {
      let offset = $("#buyButton .add").offset();
    //   console.log(offset);
      
      let cartoffset = $(".icon-cart").offset();
      $(".moveImg").show().addClass('move').css(offset).animate(cartoffset,1000,()=>{
          $('.moveImg').removeClass('move').hide();
      });
      this.$store.commit('buyGood', {goodnum:this.buynum,goodid:this.$route.params.id})
    }
  },
  created() {
    this.getMeg();
    this.getcom();
  },
  watch: {
    $route(to, from) {
      this.getMeg();
      this.getcom();
    }
  },
  components: {
    ProductZoomer
  }
};
</script>

<style>
@import url("../../node_modules/font-awesome/css/font-awesome.min.css");
.inline-zoomer-zoomer-box {
  width: 368px;
}
.pic-box .control-box .thumb-list {
  display: flex;
}
.thumb-list img {
  height: 78px;
  width: 78px;
  margin: 5px;
}
.control i {
  text-align: center;
}
.moveImg {
  width: 40px;
  position: absolute;
  top: 0;
  right: 50px;
}
.moveImg.move{
    transform: scale(.5,.5) rotateZ(3600deg);
    opacity: .4;
    transition: transform 1s,opacity  1s;
}
</style>


