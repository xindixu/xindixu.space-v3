import React from "react";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { Box, Grommet } from "grommet";
import Navbar from "components/navbar";
import Header from "components/header";
import Footer from "components/footer";

const Common = ({ children }) => {
  const [ref, isHeaderInView] = useInView();

  return (
    <>
      <Navbar isHeaderInView={isHeaderInView} />
      <Header ref={ref} />
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        scelerisque justo eu tristique pellentesque. Donec placerat tellus sit
        amet vulputate laoreet. Vivamus porta mollis elit, ac dignissim turpis
        dictum eget. Aenean mollis, turpis at condimentum fringilla, nibh justo
        malesuada arcu, sit amet malesuada erat ante euismod massa. Quisque
        convallis justo vel est lobortis vulputate. Vestibulum mollis est ac
        nisi cursus, quis ultrices enim finibus. Fusce dictum finibus
        vestibulum. Praesent vitae dapibus eros, non laoreet nunc. Sed nec
        sapien lectus. Donec ut sem in enim aliquam tempor vitae vitae massa.
        Donec risus velit, aliquet ac dignissim vitae, ornare sed ligula. Fusce
        gravida molestie varius. In at metus ac purus lacinia feugiat nec ac
        dolor. Aliquam sodales at justo et blandit. Sed non sodales tellus.
        Nulla porta mollis venenatis. Maecenas at placerat tellus, a dapibus mi.
        Mauris eget orci lacinia, aliquet augue eu, fringilla ante. Mauris
        dignissim ligula a mauris accumsan suscipit. Praesent eu felis
        consectetur, hendrerit velit et, sodales metus. Vivamus non diam ut
        risus volutpat consequat at eget orci. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Donec ullamcorper egestas felis sit amet
        cursus. Donec at cursus sem. Suspendisse scelerisque velit ac ex
        porttitor, in sodales sapien hendrerit. Morbi fermentum commodo lorem,
        nec interdum purus imperdiet tincidunt. Phasellus non felis at nibh
        laoreet volutpat. Donec non lorem ut nunc pellentesque feugiat. Nullam
        sed lorem luctus, congue ex id, tempus justo. Ut mattis convallis nisi
        ac hendrerit. Suspendisse consequat mi sit amet est pharetra accumsan.
        Nulla a dapibus felis. In mollis ultricies velit. In nulla nibh,
        ultricies ac nunc non, placerat ultrices felis. Aenean erat sem, pretium
        et cursus sed, malesuada ac dolor. Ut faucibus auctor sem quis luctus.
        Praesent sed nisi eu leo consectetur ultricies. Ut eu velit quis nulla
        tristique faucibus sit amet et ligula. Quisque dapibus lacus ut risus
        placerat, nec dapibus enim pretium. Fusce in neque dolor. Sed vel lacus
        mauris. Fusce est nulla, sollicitudin quis quam quis, lacinia malesuada
        sapien. Nulla blandit vulputate orci, at scelerisque mauris dapibus
        quis. Phasellus eu malesuada tortor. Curabitur iaculis accumsan
        convallis. In porta, purus non ultrices blandit
      </h3>
      <h3>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        scelerisque justo eu tristique pellentesque. Donec placerat tellus sit
        amet vulputate laoreet. Vivamus porta mollis elit, ac dignissim turpis
        dictum eget. Aenean mollis, turpis at condimentum fringilla, nibh justo
        malesuada arcu, sit amet malesuada erat ante euismod massa. Quisque
        convallis justo vel est lobortis vulputate. Vestibulum mollis est ac
        nisi cursus, quis ultrices enim finibus. Fusce dictum finibus
        vestibulum. Praesent vitae dapibus eros, non laoreet nunc. Sed nec
        sapien lectus. Donec ut sem in enim aliquam tempor vitae vitae massa.
        Donec risus velit, aliquet ac dignissim vitae, ornare sed ligula. Fusce
        gravida molestie varius. In at metus ac purus lacinia feugiat nec ac
        dolor. Aliquam sodales at justo et blandit. Sed non sodales tellus.
        Nulla porta mollis venenatis. Maecenas at placerat tellus, a dapibus mi.
        Mauris eget orci lacinia, aliquet augue eu, fringilla ante. Mauris
        dignissim ligula a mauris accumsan suscipit. Praesent eu felis
        consectetur, hendrerit velit et, sodales metus. Vivamus non diam ut
        risus volutpat consequat at eget orci. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Donec ullamcorper egestas felis sit amet
        cursus. Donec at cursus sem. Suspendisse scelerisque velit ac ex
        porttitor, in sodales sapien hendrerit. Morbi fermentum commodo lorem,
        nec interdum purus imperdiet tincidunt. Phasellus non felis at nibh
        laoreet volutpat. Donec non lorem ut nunc pellentesque feugiat. Nullam
        sed lorem luctus, congue ex id, tempus justo. Ut mattis convallis nisi
        ac hendrerit. Suspendisse consequat mi sit amet est pharetra accumsan.
        Nulla a dapibus felis. In mollis ultricies velit. In nulla nibh,
        ultricies ac nunc non, placerat ultrices felis. Aenean erat sem, pretium
        et cursus sed, malesuada ac dolor. Ut faucibus auctor sem quis luctus.
        Praesent sed nisi eu leo consectetur ultricies. Ut eu velit quis nulla
        tristique faucibus sit amet et ligula. Quisque dapibus lacus ut risus
        placerat, nec dapibus enim pretium. Fusce in neque dolor. Sed vel lacus
        mauris. Fusce est nulla, sollicitudin quis quam quis, lacinia malesuada
        sapien. Nulla blandit vulputate orci, at scelerisque mauris dapibus
        quis. Phasellus eu malesuada tortor. Curabitur iaculis accumsan
        convallis. In porta, purus non ultrices blandit
      </h3>
      {children}
      <Footer />
    </>
  );
};

Common.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Common;
