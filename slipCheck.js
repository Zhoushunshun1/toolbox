export function SlipCheck(id, imgId, event, imgUrl = 'http://qin8rsxdv.hn-bkt.clouddn.com/qrCodeBg.png') {
  this.id = id
  this.imgId = imgId
  this.imgUrl = imgUrl
  this.mainDom = {}
  this.bg = {}
  this.width = 400
  this.height = 0
  this.blockDom = ''
  this.reslut = false
  this.block = ''
  this.img = {}
  this.slider = { mx: 0, bx: 0 }
  this.event = event

  SlipCheck.prototype.init = function() {
    //生成指定区间的随机数
    const random = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
    //x: 254, y: 109
    const mx = random(250, this.width - 10),
      bx = random(20, 100),
      y = random(10, 99)
    this.slider = { mx, bx }
    this.draw(mx, bx, y)
  }

  // 绘制
  SlipCheck.prototype.draw = function(mx = 200, bx = 20, y = 50) {
    this.mainDom = document.querySelector('#codeImg')
    this.bg = this.mainDom.getContext('2d')
    this.width = this.mainDom.width
    this.height = this.mainDom.height
    this.mainDom.height = this.height
    this.blockDom = document.querySelector('#sliderBlock')
    const mousedownEvent = function(e) {
      this.drag(e)
    }
    const touchstartEvent = function(e) {
      this.drag(e,1)
    }
    this.blockDom.addEventListener('mousedown', mousedownEvent.bind(this))
    this.blockDom.addEventListener('touchstart', touchstartEvent.bind(this))
    this.blockDom.style.position = 'absolute'
    this.blockDom.style.zIndex = 4000
    this.blockDom.style.left = 0
    this.block = this.blockDom.getContext('2d')
    // this.block.clearRect(0, 0, w, h)
    this.blockDom.height = this.height
    //重新赋值，让canvas进行重新绘制
    this.blockDom.height = this.mainDom.height
    this.img = document.createElement('img')
    this.img.style.objectFit = 'scale-down'
    this.img.src = this.imgUrl
    const imgLoadEvent = function() {
      this.bg.drawImage(this.img, 0, 0, this.width, this.height)
      this.block.drawImage(this.img, 0, 0, this.width, this.height)
    }
    this.img.onload = imgLoadEvent.bind(this)
    const mainxy = { x: mx, y: y, r: 9 }
    const blockxy = { x: bx, y: y, r: 9 }
    this.drawBlock(this.bg, mainxy, 'fill')
    this.drawBlock(this.block, blockxy, 'clip')
  }
  SlipCheck.prototype.drawBlock = function(ctx, xy = { x: 150, y: 80, r: 9 }, type) {
    const x = xy.x,
      y = xy.y,
      r = xy.r,
      w = 40
    const PI = Math.PI
    //绘制
    ctx.beginPath()
    //left
    ctx.moveTo(x, y)
    //top
    ctx.arc(x + (w + 5) / 2, y, r, -PI, 0, true)
    ctx.lineTo(x + w + 5, y)
    //right
    ctx.arc(x + w + 5, y + w / 2, r, 1.5 * PI, 0.5 * PI, false)
    ctx.lineTo(x + w + 5, y + w)
    //bottom
    ctx.arc(x + (w + 5) / 2, y + w, r, 0, PI, false)
    ctx.lineTo(x, y + w)
    ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true)
    ctx.lineTo(x, y)
    //修饰，没有会看不出效果
    ctx.lineWidth = 1
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.stroke()
    ctx[type]()
    ctx.globalCompositeOperation = 'xor'
  }
  //鼠标按下
 SlipCheck.prototype.drag = function(e,type = 0) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    if (!this.reslut) {
      const dom = e.target //dom元素
      const downCoordinate = { x: e.x, y: e.y }
      //正确的滑块数据
      const checkx = Number(this.slider.mx) - Number(this.slider.bx)
      //x轴数据
      let x = 0
      const move = function(moveEV) {
        x = moveEV.x - downCoordinate.x
        if (x >= that.width - that.slider.bx - 40 || x <= 0) return false
        dom.style.left = x + 'px'
      }

      const up = function() {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        document.removeEventListener('touchmove', move)
        document.removeEventListener('touchend', up)
        // dom.style.left = ''`
        const max = checkx + 10
        const min = checkx - 10
        //允许正负误差1
        x -= 15
        if ((max >= x && x >= min) || x === checkx) {
          that.checkStatus(1)
          setTimeout(function() {
            that.event()
          }, 500)
        } else {
          that.checkStatus()
        }
        that.blockDom.addEventListener('mousedown', function() {
          that.reslut = true
        })
        that.blockDom.addEventListener('touchend', function() {
          that.reslut = true
        })
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
      document.addEventListener('touchmove', move)
      document.addEventListener('touchend', up)
    }
  }
  SlipCheck.prototype.checkStatus = function(type = 0) {
    if (!this.reslut) {
      this.bg.fillStyle = 'rgba(255, 255, 255, 0.7)'
      this.bg.fillRect(0, 0, this.width, this.height)
      this.bg.font = '26px Arial'
      this.bg.fillStyle = '#000'
      this.bg.fillText(type ? '验证成功' : '验证失败', Math.floor(this.width / 2) - 52, this.height - 10)
      this.bg.textAlign = 'center'
      this.block.fillRect(0, 0, this.width, this.height)
      this.block.fillStyle = 'rgba(255, 255, 255, 0.7)'
    }
  }
}
