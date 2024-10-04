import { FC, useEffect, useRef, useState } from "react"
import sakuraImg from '../../../assets/img/sakura-Photoroom.png'
import violetImg from '../../../assets/img/violet2.png'
import blueImg from '../../../assets/img/blue.png'
import redImg from '../../../assets/img/red.png'
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
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
  update: (status: number) => void;
}
const Bg: FC = () => {
  let { theme } = useSelector((state: RootState) => state.main)
  let sakuraFlower = new Image()
  sakuraFlower.src = sakuraImg
  let violetFlower = new Image()
  violetFlower.src = violetImg
  let blueFlower = new Image()
  blueFlower.src = blueImg
  let redFlower = new Image()
  redFlower.src = redImg
  let FlowersImg = {
    1: theme == 'dark' ? [violetFlower ,'rgb(255, 182, 193)'] : [blueFlower,'rgb(175, 238, 238)'],
    2: theme == 'dark' ? [redFlower ,'rgb(255, 0, 0)'] : [blueFlower,'rgb(175, 238, 238)'],
  }

  let canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  let allSakura: ISakura[] = []
  useEffect(() => {
    let canvas = canvasRef.current
    if (!canvas) return
    canvas && (canvas.width = window.innerWidth)
    canvas && (canvas.height = window.innerHeight)
    let c = canvas.getContext('2d')
    if (!c) return
    c?.clearRect(0, 0, innerWidth, innerHeight) // нужно для того что бы очищать канвас после запуска или перезапуска useeffect
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
      update: (status: number) => void;
      flowerId: number
      constructor(x: number, y: number, dx: number, dy: number, rgb: string, radius: number, direction: number, angle: number, flowerId: number) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.rgb = rgb
        this.radius = radius
        this.direction = direction
        this.angle = angle
        this.flowerId = flowerId
        this.draw = () => {
          if (c) {
            let img = FlowersImg[this.flowerId][0]
            c.save()
            c.shadowColor = FlowersImg[this.flowerId][1]
            c.shadowOffsetX = 1
            c.shadowOffsetY = 1
            c.shadowBlur = 10;
            c.translate(this.x + this.radius / 2, this.y + this.radius / 2);
            c.rotate(this.angle);
            c.drawImage(img, -this.radius / 2, -this.radius / 2, this.radius, this.radius);
            c.restore()
            
          }
        }
        this.update = (deltaTime) => {
          this.draw()
          const speedFactor = deltaTime / 16.67
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
            this.x = this.x + this.dx * speedFactor
          }
          else if (this.direction > 80 && this.direction < 90) {
            
          }
          else {
            this.x = this.x - this.dx * speedFactor
          }
          this.y = this.y + this.dy * speedFactor
          this.angle = this.angle + 0.005 * speedFactor
        }
      }
    }
    
    function getSakura(i: number) {
      for (i; i < 25; i++) {
        let flowerId = Math.floor(Math.random() * (3 - 1) + 1)
        let radius = Math.random() * (15 - 10) + 10
        let x = Math.random() * innerWidth
        let y = -(Math.random() * innerHeight)
        let dx = 0.9
        let dy = Math.random() * (3 - 1) + 1
        let angle = 0.01
        let direction = Math.floor(Math.random() * 100)
        let rgb = `rgb(${Math.floor(Math.random() * (255 - 128) + 128)},${Math.floor(Math.random() * (255 - 128) + 128)},${Math.floor(Math.random() * (255 - 128) + 128)})`;
        allSakura.push(new Circle(x, y, dx, dy, rgb, radius, direction, angle, flowerId))
      }
    }
    let lastTime = 0; // Изначально 0, т.к. нет предыдущего кадра
    function animate(currentTime: number) {

      const deltaTime = currentTime - lastTime; // Время между текущим и предыдущим кадром
      lastTime = currentTime; // Обновляем lastTime для следующего кадра
      requestAnimationFrame(animate)
      c?.clearRect(0, 0, innerWidth, innerHeight)
      allSakura.forEach((item) => {
        item.update(deltaTime)
      })
    }
    getSakura(0)
    animate(0)
    // Обработчик изменения размеров окна
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowSize,theme])

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