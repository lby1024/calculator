<template>
  <div id="app">
    <div class="screen">
      <p class="text">
        {{result}}
      </p>
    </div>
    <div class="keys">
      <div class="btns-row">
        <div @click="onclick" :id="id1" class="btn gray">清除</div>
        <div @click="onclick" :id="id2" class="btn gray">回退</div>
        <div @click="onclick" :id="id3" class="btn gray">?</div>
        <div @click="onclick" :id="id4" class="btn orange">÷</div>
      </div>
      <div class="btns-row">
        <div @click="onclick" :id="id5" class="btn">7</div>
        <div @click="onclick" :id="id6" class="btn">8</div>
        <div @click="onclick" :id="id7" class="btn">9</div>
        <div @click="onclick" :id="id8" class="btn orange">×</div>
      </div>
      <div class="btns-row">
        <div@click="onclick"  :id="id9" class="btn">4</div>
        <div @click="onclick" :id="id10" class="btn">5</div>
        <div @click="onclick" :id="id11" class="btn">6</div>
        <div @click="onclick" :id="id12" class="btn orange">-</div>
      </div>
      <div class="btns-row">
        <div @click="onclick" :id="id13" class="btn">1</div>
        <div @click="onclick" :id="id14" class="btn">2</div>
        <div @click="onclick" :id="id15" class="btn">3</div>
        <div @click="onclick" :id="id16" class="btn orange">+</div>
      </div>
      <div class="btns-row">
        <div @click="onclick" :id="id17" class="btn zero">0</div>
        <div @click="onclick" :id="id18" class="btn">.</div>
        <div @click="equal" :id="id19" class="btn orange">=</div>
      </div>
    </div>
  </div>
</template>

<script>
import {calculate} from './utils/calculate.js'

export default {
  name: 'app',
  data () {
    return {
      id1: "clear",//清除
      id2: "back",//回退
      id3: "history",
      id4: "div",//除号
      id5: "num_7",
      id6: "num_8",
      id7: "num_9",
      id8: "mul",//乘号
      id9: "num_4",
      id10: "num_5",
      id11: "num_6",
      id12: "sub",//减号
      id13: "num_1",
      id14: "num_2",
      id15: "num_3",
      id16: "add",
      id17: "num_0",
      id18: "dot",//小于号
      id19: "equals",//等于号
      
      result: "0",
      dotSign: false,//是否加小数点标志
    }
  },
  methods: {
    onclick (e) {
      let id = e.target.id
      if(id.match('num_')){
      // 如果点击==>>数字按钮↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        let num = id.split('_')[1]
        // 如果result=='0'==>>点击的9按钮==>>result=='9'
        // 如果result=='342'==>>点击的是9==>>result=='3429'
        if(this.result=='0'){
          this.result = num
        }else {
          this.result += num
        }
      }else if (id=='dot') {
      // 如果点击==>>小数点按钮↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        if(!this.dotSign){
        // 如果小数点不存在↑↑↑↑↑↑↑↑↑
          this.dotSign = true
          this.result += '.'
        }
      }else if(id=='clear') {
      // 如果点击==>>清除按钮↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
        this.result = '0'
        this.dotSign = false
      }else if(id=='back') {
      // 如果点击==>>后退按钮↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        // 如果result=='7'==>>result=='0'
        // 如果resul==''231'==>>result=='23'
        if(this.result.length==1){
          this.result = '0'
        }else{
          this.result = this.result.substr(0,this.result.length-1)
          // 如果result=='23423'==>>是否有小数点==>>dotSign==false
          // 如果result=='4234.4242'==>>是否有小数点==>>dotSign==true
          if(this.result.match(/\./)){
            this.dotSign = true
          }else{
            this.dotSign = false
          }
        }
      }else if (
        id=='add'||
        id=='sub'||
        id=='mul'||
        id=='div'
      ) {
      // 如果点击==>>加减乘除↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

        if(
          this.result.substr(this.result.length-1)!='.'&&
          this.result.substr(this.result.length-1)!='+'&&
          this.result.substr(this.result.length-1)!='-'&&
          this.result.substr(this.result.length-1)!='×'&&
          this.result.substr(this.result.length-1)!='÷'
        ){
        // this.result==>>不能为:
        // ==>>'4234+'
        // ==>>'4242-'
        // ==>'42342x'
        // ==>>'34234÷'
        // ==>>'4234.'
          let sign
          switch(id){
            case 'add':
                sign = '+'
              break;
            case 'sub':
                sign = '-'
              break;
            case 'div':
                sign = '÷'
              break;
            case 'mul':
                sign = '×'
              break;
          }
          this.result += sign
          this.dotSign = false
        }
      }
    },
    equal () {
      let answer
      if(
          // this.result==>>不能是以下情况
          // ==>>'4234+'
          // ==>>'4242-'
          // ==>'42342x'
          // ==>>'34234÷'
          // ==>>'4234.'
          this.result.substr(this.result.length-1)!='.'&&
          this.result.substr(this.result.length-1)!='+'&&
          this.result.substr(this.result.length-1)!='-'&&
          this.result.substr(this.result.length-1)!='×'&&
          this.result.substr(this.result.length-1)!='÷'
        ){
          // 如果this.result=='1+2=3+3'==>那么将其变为==>>'3+3'
          if(this.result.match('=')){
            this.result = this.result.split('=')[1]
          }
          // 如果result为==>>'1+2-3'或者'1*2/3'
          // 如果为为    ==>> '1+2-3*4/5'
          if(
            this.result.match(/[\+\-]/g)==null||
            this.result.match(/[\×\÷]/g)==null
          ){
            // 提取==>>'1+2-3'==>>['1' ,'2' ,'3']
            let list_number = this.result.split(/[\+\-\×\÷]/)
            // 提取==>>'1+2-3'==>>['+', '-']
            let list_sign = this.result.match(/[\+\-\×\÷]/g)
            answer = calculate(list_number,list_sign)
          }else {
            // 将'1*2+3/5-3*2'提取为==>>['1*2', '3/5', '3*2'] 和 ['+', '-']
            let list_match = this.result.split(/[\+\-]/)
            let list_sign = this.result.match(/[\+\-]/g)
            console.log(list_match)
            console.log(list_sign)
            // 将['1*2', '15/5', '3*2']==>>变成==>>[2, 3, 6]
            let list_num = list_match.map(item=> {
              if(item.match(/[\×\÷]/g)){
                let list_mumber = item.split(/[\+\-\×\÷]/)
                let list_sign = item.match(/[\+\-\×\÷]/g)
                return calculate(list_mumber,list_sign)
              }else{
                return item
              }
            })
            answer = calculate(list_num, list_sign)
          }
          this.result = this.result+ '=' +answer.toFixed(2)
        }
    }
  },
  mounted () {
    let size = window.innerWidth/18
    document.documentElement.style.fontSize = size+'px'
      window.onresize = ()=> {
        size = window.innerWidth/18
        document.documentElement.style.fontSize = size+'px'
      }
  }
}
</script>
<style lang="stylus" scoped>

  #app
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color red
    display flex
    flex-flow column nowrap
    .keys
      .btns-row
        display flex
        .btn
          line-height 3rem
          width 4.5rem
          text-align center
          background-color #e6e6e6
          border 1px solid black 
          &.orange
            background-color orange 
          &.gray
            background-color gray 
          &:active
            background-color yellow 
          &.zero
            width 9.1rem
    .screen
      flex auto
      background-color black
      font-size 2.5rem
      color white
      padding 9px;
      overflow scroll
      .text
        word-wrap break-word
        margin 0
        padding 0
</style>

