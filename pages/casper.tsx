import React from "react"
import { motion } from "framer-motion"
import Masonry from "react-responsive-masonry"
import Image from "next/image"
import { Main } from "grommet"
import { useInView } from "react-intersection-observer"
import { getImageCollage } from "lib/content/image-collage"
import styleSettings from "lib/style-settings"
import useMedia from "hooks/use-media"

const { spacerXs, spacerSm } = styleSettings

const variants = {
  out: ({ index }: { index: number }) => ({
    translateY: -16,
    opacity: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
  in: ({ index }: { index: number }) => ({
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1 * index,
    },
  }),
}

type TProps = {
  imageCollage: {
    images: {
      src: string
      width: number
      height: number
    }[]
  }
  isXxsUp: boolean
}

const Casper = ({ imageCollage = { images: [] }, isXxsUp }: TProps) => {
  const isMdUp = useMedia("md")
  const isSmUp = useMedia("sm")
  const [gridRef, gridInView] = useInView({ delay: 1000 })

  const { images } = imageCollage

  if (images.length === 0) {
    return null
  }
  return (
    <Main
      pad={{ horizontal: isXxsUp ? "xlarge" : "medium", vertical: "xlarge" }}
    >
      <div ref={gridRef}>
        <Masonry
          columnsCount={isMdUp ? 5 : isSmUp ? 3 : 2}
          gutter={isXxsUp ? spacerSm : spacerXs}
        >
          {images.map(({ src, width, height }, index) => (
            <motion.div
              key={src}
              animate={gridInView ? "in" : "out"}
              custom={{ index }}
              initial={gridInView ? "out" : false}
              variants={variants}
            >
              <Image
                layout="responsive"
                src={`https:${src}`}
                width={width}
                height={height}
                alt="Casper"
                style={{ width: "100%", display: "block" }}
              />
            </motion.div>
          ))}
        </Masonry>
      </div>
    </Main>
  )
}

export const getStaticProps = async () => {
  const imageCollage = await getImageCollage({ title: "Casper" })
  return {
    props: JSON.parse(
      JSON.stringify({
        imageCollage,
      })
    ),
  }
}

export default Casper
