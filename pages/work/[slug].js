import React from "react"
import PropTypes from "prop-types"
import { format, parseISO } from "date-fns"
import { Main } from "grommet"

import { getWork, getAllWorkSlugs } from "lib/contentful/work"
import Header from "components/header"

const Work = ({ setHeaderRef, slug, work = {} }) => {
  const { name, thumbnail } = work

  return (
    <>
      <Header ref={setHeaderRef} name={name} background={{ url: thumbnail }} full={false} />
      <Main pad="xlarge">
        <div>Work page {slug}</div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis eget neque fringilla
          aliquet. Pellentesque rhoncus feugiat nibh nec semper. Morbi sit amet ligula orci. Proin
          facilisis, enim id dictum hendrerit, sapien velit placerat turpis, et porta ante ligula et
          lorem. Donec hendrerit feugiat mi, vitae pretium magna pretium a. Integer eu tempus risus.
          Sed volutpat facilisis diam interdum molestie. Integer vitae mattis eros. Praesent posuere
          non neque eu eleifend. Quisque a nunc odio. Curabitur mollis pharetra dapibus. Etiam
          bibendum dui odio, quis ultricies ligula tempor vitae. Nulla in feugiat neque. Donec id
          facilisis lorem, id accumsan risus. Nulla sagittis molestie quam, sit amet feugiat purus
          maximus non. Etiam quis suscipit leo. Nam elit ligula, fermentum mollis commodo rutrum,
          dapibus eu mauris. In facilisis tellus eu tortor maximus, et varius dolor iaculis. Nullam
          lobortis, nunc in varius facilisis, est risus dictum nulla, a aliquam lacus tellus ac
          diam. Praesent blandit libero in sem luctus porttitor. Phasellus pulvinar neque metus, eu
          sagittis nibh cursus venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam commodo mauris erat, id viverra felis malesuada sit amet. Nullam pulvinar dolor
          massa, quis tincidunt nisl imperdiet in. Morbi vitae imperdiet nisl, eget porttitor massa.
          In at dui et arcu efficitur efficitur et ac ex. Mauris sed diam mauris. Etiam ac eros
          finibus, finibus lacus id, lacinia est. Sed purus nisl, rhoncus eget dignissim sit amet,
          euismod vitae leo. Vivamus feugiat, felis sit amet pretium fringilla, enim lorem feugiat
          lacus, vitae lobortis erat ipsum sed ipsum. Sed non pharetra turpis, ut elementum lacus.
          In porttitor varius mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Praesent tincidunt tellus eget mollis placerat. Nam porttitor gravida risus, a lacinia ex
          dapibus vitae. Duis nulla turpis, porttitor sit amet ante sed, scelerisque blandit arcu.
          Phasellus sit amet felis eget libero laoreet sollicitudin ut eget urna. Quisque vitae
          pharetra dui. Praesent nec commodo massa, in blandit nunc. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Integer congue lorem a dui luctus, non efficitur dolor
          pretium. Phasellus facilisis ultricies est, eget accumsan lacus tempor sit amet. Sed quis
          fermentum dui, tincidunt feugiat risus. Duis purus eros, pulvinar eu fermentum ac,
          sagittis vitae nunc. Donec condimentum, diam at mattis auctor, nunc augue convallis erat,
          porttitor porttitor arcu leo in nulla. Donec in erat suscipit, gravida ligula ac,
          ullamcorper est. Morbi sit amet dolor tincidunt, cursus massa eu, varius sapien. Nam
          blandit tellus ante, vel facilisis elit feugiat feugiat. Praesent viverra odio eget ex
          vulputate facilisis. Maecenas suscipit ex vitae tellus efficitur malesuada. Nulla egestas
          erat enim, vel aliquam purus consectetur nec. Nam ac dui a metus varius porta eget vitae
          leo. Phasellus id vestibulum nibh, et blandit eros. Vestibulum placerat pretium volutpat.
          Nullam fermentum pretium urna, id elementum nunc pulvinar eget. Orci varius natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin suscipit mauris
          felis, in commodo diam mollis eu. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Integer luctus accumsan purus, a imperdiet ante
          euismod eu. Sed eleifend arcu ac velit pellentesque, in scelerisque nibh gravida.
          Pellentesque ut turpis neque. Nunc vel porttitor orci. Nulla pretium est felis, id
          placerat mauris dictum sit amet. In hac habitasse platea dictumst. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Nam convallis lectus ante, iaculis dignissim dui
          rutrum eu. Proin luctus erat elit, nec dictum turpis elementum eu. Donec a metus pharetra,
          ornare nisl a, rhoncus dolor.
        </p>
      </Main>
    </>
  )
}

export async function getStaticProps({ params: { slug } }) {
  const work = await getWork({ slug })
  return {
    props: JSON.parse(
      JSON.stringify({
        work,
        slug,
      })
    ),
  }
}

export async function getStaticPaths() {
  const paths = await getAllWorkSlugs()

  return {
    paths: paths.map((slug) => `/work/${slug}`),
    fallback: true,
  }
}

Work.propTypes = {}

export default Work
