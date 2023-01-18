import React, { useState, useRef } from "react";
import { useCurtainsEvent } from "react-curtains";
import SinglePlane from "../BasicPlane";

import "./index.css";

function MultiplePlanes() {
  const [nbPlanes, setNbPlanes] = useState(6);

  // keep track of the planes
  const [planes, setPlanes] = useState([]);

  const planesDeformations = useRef(0);

  useCurtainsEvent(
    "onRender",
    (curtains) => {
      // update our planes deformation
      // increase/decrease the effect
      planesDeformations.current = curtains.lerp(
        planesDeformations.current,
        0,
        0.075
      );

      // update planes deformations
      planes.forEach((plane) => {
        plane.uniforms.planeDeformation.value = planesDeformations.current;
      });
    },
    [planes]
  );

  useCurtainsEvent("onScroll", (curtains) => {
    // get scroll deltas to apply the effect on scroll
    const delta = curtains.getScrollDeltas();

    // invert value for the effect
    delta.y = -delta.y;

    // threshold
    if (delta.y > 60) {
      delta.y = 60;
    } else if (delta.y < -60) {
      delta.y = -60;
    }

    if (Math.abs(delta.y) > Math.abs(planesDeformations.current)) {
      planesDeformations.current = curtains.lerp(
        planesDeformations.current,
        delta.y,
        0.5
      );
    }
  });

  const onPlaneReady = (plane) => {
    setPlanes((planes) => [...planes, plane]);
  };

  const buildPlane = (index) => {
    return (
      <SinglePlane key={index} index={index} onPlaneReady={onPlaneReady} />
    );
  };

  const allPlanes = [];
  for (let i = 0; i < nbPlanes; i++) {
    allPlanes.push(buildPlane(i));
  }

  return (
    <div className="MultiplePlanes">
      <div className="MultiplePlanes-wrapper">
        {allPlanes.map((planeEl) => {
          return planeEl;
        })}
      </div>

    </div>
  );
}

export default MultiplePlanes;
