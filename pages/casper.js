import React from "react"
import PropTypes from "prop-types"
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
  out: ({ index }) => ({
    translateY: -16,
    opacity: 0,
    transition: {
      delay: 0.1 * index,
    },
  }),
  in: ({ index }) => ({
    translateY: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.1 * index,
    },
  }),
}
const Casper = ({ imageCollage, isXxsUp }) => {
  const { images } = imageCollage
  const isMdUp = useMedia("md")
  const isSmUp = useMedia("sm")
  const [gridFef, gridInView] = useInView({ delay: 1000 })

  return (
    <Main
      pad={{ horizontal: isXxsUp ? "xlarge" : "medium", vertical: "xlarge" }}
    >
      <div ref={gridFef}>
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

Casper.propTypes = {
  imageCollage: PropTypes.shape({
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
}

export async function getStaticProps() {
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
