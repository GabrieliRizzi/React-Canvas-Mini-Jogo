import React, { useRef, useEffect } from 'react'

export default function App() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w = canvas.width = 800
    let h = canvas.height = 500

    const player = { x: 40, y: h/2 - 20, w: 40, h: 40 }
    const bullets = []
    const keys = {}

    function spawnBullet() {
      bullets.push({ x: player.x + player.w, y: player.y + player.h/2 - 4, vx: 6 })
    }

    window.addEventListener('keydown', e => {
      keys[e.key] = true
      if (e.key === ' ') spawnBullet()
    })
    window.addEventListener('keyup', e => { keys[e.key] = false })

    let raf
    function loop() {
      if (keys.ArrowUp) player.y -= 4
      if (keys.ArrowDown) player.y += 4
      player.y = Math.max(0, Math.min(h - player.h, player.y))

      bullets.forEach(b => b.x += b.vx)
      for (let i = bullets.length -1; i >=0; i--)
        if (bullets[i].x > w) bullets.splice(i,1)

      ctx.clearRect(0,0,w,h)
      ctx.fillStyle = '#00aaff'
      ctx.fillRect(player.x, player.y, player.w, player.h)

      ctx.fillStyle = '#ffd700'
      bullets.forEach(b => ctx.fillRect(b.x, b.y, 12, 8))

      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div>
      <h1>React + Canvas — Jogo simples</h1>
      <p>Use ↑ ↓ para mover e [espaço] para atirar</p>
      <canvas ref={canvasRef} />
    </div>
  )
}
