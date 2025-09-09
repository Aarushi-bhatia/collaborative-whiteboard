import React, { useEffect, useRef } from "react"

export default function Video() {
  const videoRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play() // Auto-play when in view
          } else {
            videoRef.current.pause() // Pause when out of view
          }
        }
      }, // Adjust threshold for when video should start playing
      { threshold: 0.7 }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current)
    }
  }, [])

  return (
    <section id="video" className=" my-10 drop-shadow-sm ">
      <div className="  max-w-5xl max-h-4xl mx-auto  px-2">
        <div className=" relative overflow-hidden rounded-xl shadow-2xl bg-black  ">
          <video
            src="https://res.cloudinary.com/dv7ar9aca/video/upload/v1742505461/ExcaliSketch_wmwbha.mp4"
            loop
            muted
            ref={videoRef}
            playsInline
            className=" w-full h-full  object-cover  rounded-xl"
          >
            Demo Video not found
          </video>
        </div>
      </div>
    </section>
  )
}
