import { FC, useEffect, useRef, useState } from "react"
import lorem from '../../../assets/img/sakura-Photoroom.png'
interface ISakura {
  x: number;
  y: number;
  dx: number;
  dy: number;
  rgb: string;
  radius: number;
  direction: number;
  angle: number;
  draw: () => void;
  update: () => void;
}
const Bg: FC = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null)
  let allSakura: ISakura[] = []
  let img = new Image()
  img.src = lorem

  useEffect(() => {
    let canvas = canvasRef.current
    if (!canvas) return
    canvas && (canvas.width = window.innerWidth)
    canvas && (canvas.height = window.innerHeight)
    let c = canvas.getContext('2d')
    if (!c) return
    class Circle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      rgb: string;
      radius: number;
      direction: number;
      angle: number;
      draw: () => void;
      update: () => void;
      constructor(x: number, y: number, dx: number, dy: number, rgb: string, radius: number, direction: number, angle: number) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rgb = rgb
        this.radius = radius
        this.direction = direction
        this.angle = angle
        this.draw = () => {
          if (c) {
            c.save()
            c.shadowColor = 'pink'
            c.shadowOffsetX = 1
            c.shadowOffsetY = 1
            c.shadowBlur = 10;
            c.translate(this.x + this.radius / 2, this.y + this.radius / 2);
            c.rotate(this.angle);
            c.drawImage(img, -this.radius / 2, -this.radius / 2, this.radius, this.radius);
            c.restore()
            img.onerror = function (err) {
              console.log("err", err);
            };
          }
        }
        this.update = () => {
          this.draw()
          if (this.x - this.radius > innerWidth || this.x + this.radius < 0) {
            let newArray = allSakura.filter((item) => item.x != this.x)
            allSakura = [...newArray]
            getSakura(allSakura.length)
          }
          if (this.y - this.radius > innerHeight) {
            let newArray = allSakura.filter((item) => item.y != this.y)
            allSakura = [...newArray]
            getSakura(allSakura.length)
          }
          if (this.direction < 80) {
            this.x = this.x + this.dx
          }
          else if (this.direction > 80 && this.direction < 90) {

          }
          else {
            this.x = this.x - this.dx
          }
          this.y = this.y + this.dy
          this.angle = this.angle + 0.02
        }
      }
    }

    function getSakura(i: number) {
      for (i; i < 25; i++) {
        let radius = Math.random() * (15 - 5) + 5
        let x = Math.random() * innerWidth
        let y = -(Math.random() * innerHeight)
        let dx = 0.9
        let dy = Math.random() * (3 - 1) + 1
        let angle = 0.01
        let direction = Math.floor(Math.random() * 100)
        let rgb = `rgb(${Math.floor(Math.random() * (255 - 128) + 128)},${Math.floor(Math.random() * (255 - 128) + 128)},${Math.floor(Math.random() * (255 - 128) + 128)})`;
        allSakura.push(new Circle(x, y, dx, dy, rgb, radius, direction, angle))
      }
    }
    function animate() {
      requestAnimationFrame(animate)
      c?.clearRect(0, 0, innerWidth, innerHeight)
      allSakura.forEach((item, i) => {
        item.update()
      })
    }
    getSakura(0)
    animate()
  }, [])

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  )
}

export default Bg




// useEffect(() => {
//   let canvas = lorem.current
//   if (!canvas) return;
//   let c = canvas.getContext('2d')
//   if (!c) return;
//   c.fillStyle = 'blue';
//   c.fillRect(50, 50, 150, 100);
// }, [])