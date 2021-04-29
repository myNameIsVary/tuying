<template>
  <div class="index" v-show="isShow">
    <div class="top">
      <div class="title">
        <p>实时景区人数</p>
        <p class="content">{{ ScenicSpotNumbers }}</p>
      </div>
      <div class="title">
        <p>实时车辆总数</p>
        <p class="content">{{ carNumbers }}</p>
      </div>
    </div>
    <div class="center">
      <div class="title">
        <p>实时住宿游客数</p>
        <p>{{ stayNumbers }}</p>
      </div>
      <div class="title">
        <p>实时预定房间数</p>
        <p>{{ roomsNumber }}</p>
      </div>
      <div class="title">
        <p>实时路面车辆数</p>
        <p>{{ roadCarNumbers }}</p>
      </div>
      <div class="title">
        <p>实时道路拥堵指数</p>
        <p v-if="roadInfo == 1" style="color:#1C8113">非常畅通</p>
        <p v-else-if="roadInfo == 2" style="color:#21E076">畅通</p>
        <p v-else-if="roadInfo == 3" style="color:#FFED4C">缓行</p>
        <p v-else style="color:#E02621">拥堵</p>
      </div>

    </div>
    <div class="tables">
      <van-tabs v-model="activeName">
        <van-tab title="酒店负载" name="hotel">
          <div class="hotel-list">
            <p>酒店名称</p>
            <p>负载率</p>
            <p>总房间数</p>
            <p>剩余房间数</p>
            <p>入住人数</p>

            <div v-for="(item, index) in hotelList" :key="index">
              <p><img src="../assets/green.png" style="padding-top: 10px"></p>
              <p>{{ item.hotel }}</p>
              <p>{{ item.occupiedtonightpre }}%</p>
              <p>{{ item.sumroom }}</p>
              <p>{{ item.restroom }}</p>
              <p>{{ item.occupiedtonightrooms }}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="停车场负载" name="park">
          <div class="park-list">
            <p>停车场名称</p>
            <p>负载率</p>
            <p>总车位</p>
            <p>剩余车位</p>

            <div v-for="(item, index) in parkList" :key="index">
              <p><img src="../assets/green.png">{{ item.parkingname }}</p>
              <p>{{ item.fuzailv }}</p>
              <p>{{ item.zcw }}</p>
              <p>{{ item.sycw }}</p>
            </div>
          </div>
        </van-tab>
        <van-tab title="景点负载" name="attractions" class="attractions">
          <div class="attractions-list">
            <p>景点名称</p>
            <p>当前时段客流</p>
            <p>全天客流</p>

            <div v-for="(item, index) in attractionsList" :key="index">
              <!--              <img src="../assets/green.png">-->
              <p>{{ item.jqmc }}</p>
              <p>{{ item.rsbhl }}</p>
              <p>{{ item.sumtoday }}</p>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="video">
      <h3>视频监控</h3>
      <div class="video-project">

        <div class="video-item" v-for="(item, index)  in videoItem" :key="index" @click="videoJump(index)">
          <img src="../assets/videoImg.png">
          <p>{{ item.name }}</p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Index',
  props: {},
  data() {
    return {
      isShow: false,
      ScenicSpotNumbers: 0, /*实时景区人数*/
      carNumbers: 0, /*实时车辆总数*/
      stayNumbers: 0, /*实时住宿游客数*/
      roomsNumber: 0, /*实时预定房间数*/
      roadCarNumbers: 0, /* 路面车辆数*/
      roadInfo: 1, /*实时预定房间数*/
      activeName: 'attractions', /*首个页签*/
      hotelList: [], /*酒店数据*/
      parkList: [], /*停车数据*/
      attractionsList: [], /*停车数据*/

      videoImg: './assets/logo.png',
      videoItem: [
        {
          name: '龙之梦欢乐酒店高空球',
          url: 'http://221.12.135.165:7086/live/cameraid/1000565%240/substream/1.m3u8'
        },
        {
          name: '太湖古镇客流',
          url: 'http://221.12.135.165:7086/live/cameraid/1000566%240/substream/1.m3u8'
        },
        {
          name: '太湖古镇客流2',
          url: 'http://221.12.135.165:7086/live/cameraid/1000567%240/substream/1.m3u8'
        },
        {
          name: '动物世界大酒店全景',
          url: 'http://221.12.135.165:7086/live/cameraid/1000568%240/substream/1.m3u8'
        },

        {
          name: '动物园全景',
          url: 'http://221.12.135.165:7086/live/cameraid/1000569%240/substream/1.m3u8'
        }
      ]
    }
  },
  created() {
    let that = this
    axios.get('http://39.172.58.29:9090/api/ScenicSpotCensus').then(res => {
      that.ScenicSpotNumbers = res.data.jqzrs
      that.carNumbers = res.data.clzs
      that.stayNumbers = res.data.zzyks
      that.roomsNumber = res.data.ydfjs
      that.roadCarNumbers = res.data.lmcls
      that.roadInfo = res.data.roadInfo /*道路指数*/
      that.isShow = true /*道路指数*/
    })
    this.getHotelLoad()
    this.getParkLoad()
    this.getAttractionsLoad()
  },
  methods: {
    /**
     * 监控视频
     */
    videoJump(key) {
      window.location.href = this.videoItem[key].url.toString()
    },
    /**
     * 获取酒店负载
     */
    getHotelLoad() {
      let that = this;
      axios.get('http://39.172.58.29:9090/api/HotelLoad').then(res => {
        that.hotelList = res.data
        console.log(res.data)
      })

    },
    /**
     * 获取停车场负载
     */
    getParkLoad() {
      let that = this;
      axios.get('http://39.172.58.29:9090/api/ParkingLoad').then(res => {
        that.parkList = res.data
      })
    },
    /**
     * 获取景点负载
     */
    getAttractionsLoad() {
      let that = this;
      axios.get('http://39.172.58.29:9090/api/ScenicLoad').then(res => {
        that.attractionsList = res.data
        console.log(res.data)
      })
    }
  }
}
</script>

<style scoped>

.index {
  background:url("../assets/background.png");
  /*height: 230px;*/
  width: 100%;
}

.top .title {
  width: 50%;
  float: left;
  text-align: center;
  font-size: .8em;
}

.top .content {
  text-align: center;
  font-size: 2.9em;
  margin-top: -10px;
}

.center .title {
  width: 50%;
  float: left;
  text-align: center;
  font-size: 1.2em;
}

.hotel-list p {
  text-align: center;
  width: 20%;
  display: inline-block;
  font-size: .3em;
}

.park-list p {
  text-align: center;
  width: 25%;
  display: inline-block;
  font-size: .3em;
}

.attractions-list p {
  text-align: center;
  width: 33%;
  display: inline-block;
  font-size: .3em;
}

.video-item {
  width: 50%;
  display: inline-block;
  text-align: center;
  overflow: hidden;
  /*background-color: aqua;*/
}

.video-item img {
  width: 35px;

}


</style>
