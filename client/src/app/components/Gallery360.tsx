"use client";
import {
  thumbnail,
  bigImageContainer,
  galleryContainer,
  thumbnails,
  bigImageContainerWrapper,
  bigImage,
  thumbnailContainer,
  leftButton,
  rightButton,
  fullscreenAndCloseButtons,
  fullscreenButton,
  closeButton,
  leftButtonWrapper,
  rightButtonWrapper,
  selected,
  thumbnailsContainer,
  dialogContent,
  leftChevronIcon as leftChevronIconClass,
  rightChevronIcon as rightChevronIconClass,
  fullscreenIcon as fullscreenIconClass,
  closeIcon as closeIconClass,
  sceneName,
} from "./Gallery360.module.css";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import closeIcon from "../Rooms/assets/close.svg";
import fullscreenIcon from "../Rooms/assets/fullscreen.svg";
import leftChevronIcon from "../Rooms/assets/leftChevron.svg";
import rightChevronIcon from "../Rooms/assets/rightChevron.svg";

const data = {
  scenes: [
    {
      id: "0-room",
      name: "Room",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 1344,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 0.8965007154012525,
          pitch: 0.20599316490679342,
          rotation: 7.853981633974483,
          target: "1-bathroom",
        },
      ],
      infoHotspots: [],
    },
    {
      id: "1-bathroom",
      name: "Bathroom",
      levels: [
        {
          tileSize: 256,
          size: 256,
          fallbackOnly: true,
        },
        {
          tileSize: 512,
          size: 512,
        },
        {
          tileSize: 512,
          size: 1024,
        },
        {
          tileSize: 512,
          size: 2048,
        },
      ],
      faceSize: 1344,
      initialViewParameters: {
        pitch: 0,
        yaw: 0,
        fov: 1.5707963267948966,
      },
      linkHotspots: [
        {
          yaw: 3.0805294638739538,
          pitch: 0.3251749078409034,
          rotation: 4.71238898038469,
          target: "0-room",
        },
        {
          yaw: -0.23134779116279702,
          pitch: 0.16871341392751127,
          rotation: 12.566370614359176,
          target: "0-room",
        },
      ],
      infoHotspots: [],
    },
  ],
  name: "Regular double room",
  settings: {
    mouseViewMode: "drag",
    autorotateEnabled: false,
    fullscreenButton: false,
    viewControlButtons: false,
  },
};

// Prevent touch and scroll events from reaching the parent element.
const stopTouchAndScrollEventPropagation = (element) => {
  const eventList = [
    "touchstart",
    "touchmove",
    "touchend",
    "touchcancel",
    "wheel",
    "mousewheel",
  ];

  const stopPropagation = (event) => event.stopPropagation();

  for (let i = 0; i < eventList.length; i++) {
    element.addEventListener(eventList[i], stopPropagation);
  }
};

const create360 = async (viewerRef, storeViewer) => {
  const Marzipano = (await import("marzipano")).default;

  // Grab elements from DOM.
  const panoElement = viewerRef.current;

  // Detect desktop or mobile mode.
  if (window.matchMedia) {
    const setMode = () => {
      if (mql.matches) {
        document.body.classList.remove("desktop");
        document.body.classList.add("mobile");
      } else {
        document.body.classList.remove("mobile");
        document.body.classList.add("desktop");
      }
    };
    const mql = matchMedia("(max-width: 500px), (max-height: 500px)");
    setMode();
    mql.addEventListener("change", setMode);
  } else {
    document.body.classList.add("desktop");
  }

  const onTouchStart = () => {
    document.body.classList.remove("no-touch");
    document.body.classList.add("touch");
  };

  // Detect whether we are on a touch device.
  document.body.classList.add("no-touch");
  window.addEventListener("touchstart", onTouchStart);

  // Viewer options.
  const viewerOpts = {
    controls: {
      mouseViewMode: data.settings.mouseViewMode,
    },
  };

  // Initialize viewer.
  const viewer = new Marzipano.Viewer(panoElement, viewerOpts);

  const stopAutorotate = () => {
    viewer.stopMovement();
    viewer.setIdleMovement(Infinity);
  };

  const switchScene = (scene) => {
    stopAutorotate();
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
  };

  const findSceneDataById = (id) => {
    for (let i = 0; i < data.scenes.length; i++) {
      if (data.scenes[i].id === id) {
        return data.scenes[i];
      }
    }
    return null;
  };

  // Create scenes.
  const scenes = data.scenes.map((data) => {
    const urlPrefix = "/360/doubleRegular/tiles";
    const source = Marzipano.ImageUrlSource.fromString(
      urlPrefix + "/" + data.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: urlPrefix + "/" + data.id + "/preview.jpg" },
    );
    const geometry = new Marzipano.CubeGeometry(data.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(
      data.faceSize,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180,
    );
    const view = new Marzipano.RectilinearView(
      data.initialViewParameters,
      limiter,
    );

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    const findSceneById = (id) => {
      for (let i = 0; i < scenes.length; i++) {
        if (scenes[i].data.id === id) {
          return scenes[i];
        }
      }
      return null;
    };

    const createLinkHotspotElement = (hotspot) => {
      // Create wrapper element to hold icon and tooltip.
      const wrapper = document.createElement("div");
      wrapper.classList.add("hotspot");
      wrapper.classList.add("link-hotspot");

      // Create image element.
      const icon = document.createElement("img");
      icon.src = "/icons/link.png";
      icon.classList.add("link-hotspot-icon");

      // Set rotation transform.
      const transformProperties = [
        "-ms-transform",
        "-webkit-transform",
        "transform",
      ];
      for (let i = 0; i < transformProperties.length; i++) {
        const property = transformProperties[i];
        icon.style[property] = "rotate(" + hotspot.rotation + "rad)";
      }

      const clickEventHandler = () =>
        switchScene(findSceneById(hotspot.target));

      // Add click event handler.
      wrapper.addEventListener("click", clickEventHandler);

      // Prevent touch and scroll events from reaching the parent element.
      // This prevents the view control logic from interfering with the hotspot.
      stopTouchAndScrollEventPropagation(wrapper);

      // Create tooltip element.
      const tooltip = document.createElement("div");
      tooltip.classList.add("hotspot-tooltip");
      tooltip.classList.add("link-hotspot-tooltip");
      tooltip.innerHTML = findSceneDataById(hotspot.target).name;

      wrapper.appendChild(icon);
      wrapper.appendChild(tooltip);

      return wrapper;
    };

    // Create link hotspots.
    data.linkHotspots.forEach((hotspot) => {
      const element = createLinkHotspotElement(hotspot);
      scene
        .hotspotContainer()
        .createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    });

    return {
      data: data,
      scene: scene,
      view: view,
    };
  });

  // Display the initial scene.
  switchScene(scenes[0]);

  storeViewer(viewer);

  return { scenes, switchScene };
};

export const Gallery360 = ({ images, modalRef, viewerRef, open, setOpen }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const closeModal = () => {
    setOpen(false);
    if (document.fullscreenElement) document.exitFullscreen();
  };

  const thumbnailsListRef = useRef<HTMLUListElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setSelectedImage((prevState) =>
      prevState + 1 > images.length - 1 ? 0 : prevState + 1,
    );
  };

  const prevImage = () => {
    setSelectedImage((prevState) =>
      prevState - 1 < 0 ? images.length - 1 : prevState - 1,
    );
  };

  const changeImage = (event) => {
    setSelectedImage(+event.currentTarget.dataset.index);
  };

  const ViewerRef = useRef();

  const updateViewerRef = (viewer) => {
    ViewerRef.current = viewer;
  };

  const switchSceneRef = useRef();
  const scenesRef = useRef();

  useEffect(() => {
    if (switchSceneRef.current && scenesRef.current)
      switchSceneRef.current(scenesRef.current[selectedImage]);
  }, [selectedImage]);

  useEffect(() => {
    if (open) {
      modalRef.current.showModal();
      create360(viewerRef, updateViewerRef).then(({ switchScene, scenes }) => {
        switchSceneRef.current = switchScene;
        scenesRef.current = scenes;
      });
    } else {
      modalRef.current.close();
      if (ViewerRef.current) ViewerRef.current.destroy();
    }
  }, [modalRef, open, viewerRef]);

  const handleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else dialogContentRef.current?.requestFullscreen();
  };

  return (
    <dialog className={galleryContainer} ref={modalRef}>
      <div className={dialogContent} ref={dialogContentRef}>
        <div className={bigImageContainerWrapper}>
          <div className={bigImageContainer} ref={viewerRef}></div>
          <div className={fullscreenAndCloseButtons}>
            <button className={fullscreenButton} onClick={handleFullscreen}>
              <Image
                className={fullscreenIconClass}
                src={fullscreenIcon}
                alt=""
              />
            </button>
            <button className={closeButton} onClick={closeModal}>
              <Image className={closeIconClass} src={closeIcon} alt="" />
            </button>
          </div>
        </div>
        <div className={thumbnailsContainer}>
          <ul className={thumbnails} ref={thumbnailsListRef}>
            {images.map((image, index) => (
              <li
                className={`${thumbnailContainer} ${
                  index === selectedImage ? selected : ""
                }`}
                key={image.src}
                data-index={index}
                style={{ aspectRatio: 2 }}
                onClick={changeImage}
              >
                <Image src={image} alt="" fill sizes="10vw" />
                <div className={sceneName}>{data.scenes[index].name}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </dialog>
  );
};
