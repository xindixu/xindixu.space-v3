import React, { useEffect } from "react"
import { Box, Card, CardFooter, Grid, Text } from "grommet"
import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import useMedia from "hooks/use-media"
import { TParsedProject } from "lib/content/types"

const cardAnimation = {
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

const cardHoverAnimation = {
  translateY: -16,
  transition: {
    duration: 0.2,
  },
}

type TProps = {
  loadMore: () => void
  projects: TParsedProject[]
  showLoadMore: boolean
}

const ProjectGrid = ({ projects, loadMore, showLoadMore }: TProps) => {
  const [gridFef, gridInView] = useInView({ delay: 1000 })
  const [loadMoreRef, loadMoreInView] = useInView()

  const isMdUp = useMedia("md")

  useEffect(() => {
    if (loadMoreInView) {
      loadMore()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMoreInView])

  return (
    <Grid
      gap="medium"
      columns={{
        count: "fill",
        size: isMdUp ? "medium" : "100%",
      }}
      ref={gridFef}
    >
      {projects.map(
        ({ name, slug, devices: { src, width, height } }, index) => (
          <div key={slug}>
            <motion.div
              initial={gridInView ? "out" : false}
              animate={gridInView ? "in" : "out"}
              variants={cardAnimation}
              custom={{ index }}
            >
              <motion.div whileHover={cardHoverAnimation}>
                <Link href={`/projects/${slug}`}>
                  <Card>
                    <Box fill>
                      <Image
                        layout="responsive"
                        src={`https:${src}`}
                        width={width}
                        height={height}
                        alt={`devices showing different screenshots of project ${name}`}
                        placeholder="blur"
                        blurDataURL={`/img/project-thumbnails/${slug}.png`}
                      />
                    </Box>
                    <CardFooter
                      pad={{ horizontal: "medium", vertical: "small" }}
                    >
                      <Text>{name}</Text>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        )
      )}
      {showLoadMore && <div ref={loadMoreRef} />}
    </Grid>
  )
}

export default ProjectGrid
