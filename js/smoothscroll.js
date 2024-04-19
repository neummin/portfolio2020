$(function(){
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

   const smoothMouseWheelScrolling = target => {
      let animating = false
      let maxScrollHeight = target.scrollHeight + $(window).height();
      let distance, currentPos
    
      window.addEventListener('resize', () => {
        maxScrollHeight =target.scrollHeigh = $(window).height();
      })
    
      //wheel smooth
      const wheelDistance = e => {
        const w = e.wheelDelta
        const d = e.detail
        if (d) {
          if (w) return w / d / 20 * d > 0 ? 1 : -1
          else return -d / 3
        } else return w / 120
      }
    
      const animate = () => {
        currentPos += (distance - currentPos) / 25
    
        if (Math.round(currentPos) === distance) {
          animating = false
          return
        }
    
        target.scrollTop = currentPos
    
        animating = true
        requestAnimationFrame(animate)
      }
    
      target.addEventListener('wheel', e => {
        // e.preventDefault();
    
        if (!animating) {
          distance = currentPos = target.scrollTop
    
          requestAnimationFrame(animate)
        }
    
        distance += -wheelDistance(e) * 120
        distance = Math.max(0, distance)
        distance = Math.min(maxScrollHeight, distance)
      })
      
    }
    
    smoothMouseWheelScrolling(
      document.querySelector('html')  
    )

});