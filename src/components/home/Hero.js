"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as THREE from "three";
import gsap from "gsap";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cardsGroupRef = useRef(null);
  const cardsRef = useRef([]);
  const timelineRef = useRef(null);

  const carouselItems = [
    { id: 1, color: "#00c7fe", name: "Blue" },
    { id: 2, color: "#ff3e6c", name: "Pink" },
    { id: 3, color: "#70c050", name: "Green" },
    { id: 4, color: "#ffa500", name: "Orange" },
    { id: 5, color: "#9c27b0", name: "Purple" },
    { id: 6, color: "#4caf50", name: "Lime" },
  ];

  useEffect(() => {
    console.log("Creating initial scene");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 480;
    const height = canvas.clientHeight || 384;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 60, 300);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    const platformGeometry = new THREE.CircleGeometry(120, 64);
    const platformMaterial = new THREE.MeshBasicMaterial({
      color: 0x111122,
      transparent: true,
      opacity: 0.4,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.rotation.x = -Math.PI / 2;
    platform.position.y = -50;
    scene.add(platform);

    const ringGeometry = new THREE.RingGeometry(115, 120, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x00c7fe,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -49.5;
    scene.add(ring);

    const markers = [];
    for (let i = 0; i < carouselItems.length; i++) {
      const angle = (i / carouselItems.length) * Math.PI * 2;
      const markerGeometry = new THREE.CircleGeometry(3, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: i === currentSlide ? 0x00c7fe : 0x333333,
        transparent: true,
        opacity: i === currentSlide ? 0.9 : 0.7,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.rotation.x = -Math.PI / 2;
      marker.position.set(Math.sin(angle) * 90, -49, Math.cos(angle) * 90);
      scene.add(marker);
      markers.push(marker);
    }

    const cardsGroup = new THREE.Group();
    scene.add(cardsGroup);
    cardsGroupRef.current = cardsGroup;

    const totalCards = carouselItems.length;
    const anglePerCard = (Math.PI * 2) / totalCards;

    carouselItems.forEach((item, index) => {
      const angle = index * anglePerCard;
      const isCurrentSlide = index === currentSlide;

      const cardContainer = new THREE.Group();
      cardContainer.position.set(Math.sin(angle) * 90, 0, Math.cos(angle) * 90);
      cardContainer.userData = {
        originalPosition: new THREE.Vector3(
          Math.sin(angle) * 90,
          0,
          Math.cos(angle) * 90
        ),
        index: index,
        angle: angle,
      };

      const cardObject = new THREE.Group();

      const cardGeometry = new THREE.BoxGeometry(48, 64, 4);
      const cardMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(item.color),
        specular: 0x444444,
        shininess: 30,
      });
      const card = new THREE.Mesh(cardGeometry, cardMaterial);

      const borderGeometry = new THREE.BoxGeometry(54, 70, 2);
      const borderMaterial = new THREE.MeshPhongMaterial({
        color: isCurrentSlide ? 0xffffff : 0x333333,
        specular: 0x222222,
        shininess: 20,
      });
      const border = new THREE.Mesh(borderGeometry, borderMaterial);
      border.position.z = -1;

      const circleGeometry = new THREE.CircleGeometry(7, 32);
      const circleMaterial = new THREE.MeshPhongMaterial({
        color: isCurrentSlide ? 0xffffff : 0x333333,
      });
      const circle = new THREE.Mesh(circleGeometry, circleMaterial);
      circle.position.set(-18, 26, 3);

      cardObject.add(border);
      cardObject.add(card);
      cardObject.add(circle);

      cardsRef.current.push({
        container: cardContainer,
        object: cardObject,
        border: border,
        circle: circle,
        card: card,
        isActive: isCurrentSlide,
      });

      if (isCurrentSlide) {
        cardObject.position.y = 15;

        cardObject.scale.set(1.2, 1.2, 1.2);

        const glowGeometry = new THREE.PlaneGeometry(70, 90);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0x00c7fe,
          transparent: true,
          opacity: 0.3,
          side: THREE.DoubleSide,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.z = -5;
        glow.userData.isGlow = true;
        cardObject.add(glow);

        const spotLight = new THREE.SpotLight(0x00c7fe, 2);
        spotLight.position.set(0, 100, 50);
        spotLight.angle = 0.3;
        spotLight.penumbra = 0.8;
        spotLight.distance = 200;
        spotLight.target = card;
        spotLight.userData.isSpotlight = true;
        cardObject.add(spotLight);
      }

      cardContainer.add(cardObject);
      cardsGroup.add(cardContainer);
    });

    cardsGroup.rotation.y =
      -cardsRef.current[currentSlide].container.userData.angle;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 100, 100);
    scene.add(dirLight);

    const frontLight = new THREE.PointLight(0xffffff, 0.5);
    frontLight.position.set(0, 50, 250);
    scene.add(frontLight);

    const groundLight = new THREE.DirectionalLight(0x8888ff, 0.15);
    groundLight.position.set(0, -50, 0);
    scene.add(groundLight);

    function animate() {
      requestAnimationFrame(animate);

      cardsRef.current.forEach((cardData, index) => {
        const cardWorldPos = new THREE.Vector3();
        cardData.container.getWorldPosition(cardWorldPos);

        const cameraWorldPos = new THREE.Vector3();
        camera.getWorldPosition(cameraWorldPos);

        const toCamera = new THREE.Vector3(
          cameraWorldPos.x - cardWorldPos.x,
          0,
          cameraWorldPos.z - cardWorldPos.z
        ).normalize();

        const worldAngle = Math.atan2(toCamera.x, toCamera.z);

        const groupRotation = cardsGroupRef.current.rotation.y;
        let localAngle = worldAngle - groupRotation;

        cardData.object.rotation.y = localAngle + Math.PI;

        cardData.object.rotation.x = 0;
        cardData.object.rotation.z = 0;

        const isActiveCard = index === currentSlide;
        if (!isActiveCard) {
          cardData.object.position.y = 0;
          cardData.object.rotation.z = 0;
        }
      });

      const activeCardData = cardsRef.current[currentSlide];
      if (activeCardData) {
        activeCardData.object.position.y =
          15 + Math.sin(Date.now() * 0.002) * 3;

        const wobble = Math.sin(Date.now() * 0.001) * 0.02;
        activeCardData.object.rotation.z = wobble;
      }

      renderer.render(scene, camera);
    }

    animate();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function handleClick(event) {
      if (animating) return;

      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let clickedCardIndex = -1;

        for (let i = 0; i < cardsRef.current.length; i++) {
          const cardData = cardsRef.current[i];
          const isChildOf = (child, parent) => {
            if (!child || !parent) return false;
            if (child === parent) return true;
            return isChildOf(child.parent, parent);
          };

          if (
            isChildOf(intersects[0].object, cardData.container) ||
            intersects[0].object === cardData.card ||
            intersects[0].object === cardData.border ||
            intersects[0].object === cardData.circle
          ) {
            clickedCardIndex = i;
            break;
          }
        }

        if (clickedCardIndex !== -1 && clickedCardIndex !== currentSlide) {
          selectItem(clickedCardIndex);
        }
      }
    }

    canvas.addEventListener("click", handleClick);

    function handleResize() {
      if (!canvas) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("click", handleClick);

      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      scene.clear();
    };
  }, []);

  useEffect(() => {
    if (!cardsGroupRef.current || cardsRef.current.length === 0) return;

    console.log("Animating to slide:", currentSlide);
    setAnimating(true);

    const targetAngle =
      -cardsRef.current[currentSlide].container.userData.angle;
    const currentAngle = cardsGroupRef.current.rotation.y;

    let angleDiff = targetAngle - currentAngle;

    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    if (timelineRef.current) timelineRef.current.kill();

    const timeline = gsap.timeline({
      onComplete: () => setAnimating(false),
      defaults: { duration: 0.7, ease: "power2.inOut" },
    });

    timelineRef.current = timeline;

    timeline.to(cardsGroupRef.current.rotation, {
      y: targetAngle,
      duration: 0.8,
    });

    cardsRef.current.forEach((cardData, index) => {
      const isActive = index === currentSlide;

      timeline.to(
        cardData.border.material.color,
        {
          r: isActive ? 1 : 0.2,
          g: isActive ? 1 : 0.2,
          b: isActive ? 1 : 0.2,
          duration: 0.4,
        },
        "<"
      );

      timeline.to(
        cardData.circle.material.color,
        {
          r: isActive ? 1 : 0.2,
          g: isActive ? 1 : 0.2,
          b: isActive ? 1 : 0.2,
          duration: 0.4,
        },
        "<"
      );

      if (isActive) {
        timeline.to(
          cardData.object.scale,
          {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.5,
          },
          "<0.1"
        );

        const existingGlow = cardData.object.children.find(
          (c) => c.userData.isGlow
        );
        if (!existingGlow) {
          const glowGeometry = new THREE.PlaneGeometry(70, 90);
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00c7fe,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
          });

          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          glow.position.z = -5;
          glow.userData.isGlow = true;
          cardData.object.add(glow);

          timeline.to(
            glowMaterial,
            {
              opacity: 0.3,
              duration: 0.5,
            },
            "<0.2"
          );
        }

        const existingSpotlight = cardData.object.children.find(
          (c) => c.userData.isSpotlight
        );
        if (!existingSpotlight) {
          const spotLight = new THREE.SpotLight(0x00c7fe, 0);
          spotLight.position.set(0, 100, 50);
          spotLight.angle = 0.3;
          spotLight.penumbra = 0.8;
          spotLight.distance = 200;
          spotLight.target = cardData.card;
          spotLight.userData.isSpotlight = true;
          cardData.object.add(spotLight);

          timeline.to(
            spotLight,
            {
              intensity: 2,
              duration: 0.5,
            },
            "<"
          );
        }
      } else {
        timeline.to(
          cardData.object.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "<0.1"
        );

        const glow = cardData.object.children.find((c) => c.userData.isGlow);
        if (glow) {
          timeline.to(
            glow.material,
            {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                cardData.object.remove(glow);
                glow.material.dispose();
                glow.geometry.dispose();
              },
            },
            "<"
          );
        }

        const spotlight = cardData.object.children.find(
          (c) => c.userData.isSpotlight
        );
        if (spotlight) {
          timeline.to(
            spotlight,
            {
              intensity: 0,
              duration: 0.3,
              onComplete: () => {
                cardData.object.remove(spotlight);
              },
            },
            "<"
          );
        }
      }
    });

    if (sceneRef.current) {
      const markers = sceneRef.current.children.filter(
        (child) =>
          child.geometry &&
          child.geometry.type === "CircleGeometry" &&
          child.position.y === -49
      );

      markers.forEach((marker, i) => {
        if (marker.material) {
          timeline.to(
            marker.material.color,
            {
              r: i === currentSlide ? 0 : 0.2,
              g: i === currentSlide ? 0.78 : 0.2,
              b: i === currentSlide ? 0.99 : 0.2,
              duration: 0.4,
            },
            "<0.1"
          );

          timeline.to(
            marker.material,
            {
              opacity: i === currentSlide ? 0.9 : 0.7,
              duration: 0.4,
            },
            "<"
          );
        }
      });
    }

    timeline.play();
  }, [currentSlide]);

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);

    const prevSlide =
      currentSlide === 0 ? carouselItems.length - 1 : currentSlide - 1;
    setCurrentSlide(prevSlide);

    const targetAngle = -cardsRef.current[prevSlide].container.userData.angle;
    let currentAngle = cardsGroupRef.current.rotation.y;

    let angleDiff = targetAngle - currentAngle;

    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    if (currentSlide === 0 && prevSlide === carouselItems.length - 1) {
      angleDiff = -Math.PI * 2 + angleDiff;
    }

    if (timelineRef.current) timelineRef.current.kill();

    const timeline = gsap.timeline({
      onComplete: () => setAnimating(false),
      defaults: { duration: 0.7, ease: "power2.inOut" },
    });

    timelineRef.current = timeline;

    timeline.to(cardsGroupRef.current.rotation, {
      y: targetAngle,
      duration: 0.8,
    });

    updateCardStyles(timeline, prevSlide);
  };

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);

    const nextSlide =
      currentSlide === carouselItems.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);

    const targetAngle = -cardsRef.current[nextSlide].container.userData.angle;
    let currentAngle = cardsGroupRef.current.rotation.y;

    let angleDiff = targetAngle - currentAngle;

    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    if (currentSlide === carouselItems.length - 1 && nextSlide === 0) {
      angleDiff = Math.PI * 2 + angleDiff;
    }

    if (timelineRef.current) timelineRef.current.kill();

    const timeline = gsap.timeline({
      onComplete: () => setAnimating(false),
      defaults: { duration: 0.7, ease: "power2.inOut" },
    });

    timelineRef.current = timeline;

    timeline.to(cardsGroupRef.current.rotation, {
      y: targetAngle,
      duration: 0.8,
    });

    updateCardStyles(timeline, nextSlide);
  };

  const selectItem = (index) => {
    if (animating || index === currentSlide) return;
    setAnimating(true);

    const totalCards = carouselItems.length;
    const clockwiseDistance = (index - currentSlide + totalCards) % totalCards;
    const counterclockwiseDistance =
      (currentSlide - index + totalCards) % totalCards;

    const targetAngle = -cardsRef.current[index].container.userData.angle;
    let currentAngle = cardsGroupRef.current.rotation.y;

    let angleDiff = targetAngle - currentAngle;

    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    if (clockwiseDistance > totalCards / 2) {
      angleDiff = Math.PI * 2 + angleDiff;
    } else if (counterclockwiseDistance > totalCards / 2) {
      angleDiff = -Math.PI * 2 + angleDiff;
    }

    if (timelineRef.current) timelineRef.current.kill();

    setCurrentSlide(index);

    const timeline = gsap.timeline({
      onComplete: () => setAnimating(false),
      defaults: { duration: 0.7, ease: "power2.inOut" },
    });

    timelineRef.current = timeline;

    timeline.to(cardsGroupRef.current.rotation, {
      y: targetAngle,
      duration: 0.8,
    });

    updateCardStyles(timeline, index);
  };

  const updateCardStyles = (timeline, activeIndex) => {
    cardsRef.current.forEach((cardData, index) => {
      const isActive = index === activeIndex;

      timeline.to(
        cardData.border.material.color,
        {
          r: isActive ? 1 : 0.2,
          g: isActive ? 1 : 0.2,
          b: isActive ? 1 : 0.2,
          duration: 0.4,
        },
        "<"
      );

      timeline.to(
        cardData.circle.material.color,
        {
          r: isActive ? 1 : 0.2,
          g: isActive ? 1 : 0.2,
          b: isActive ? 1 : 0.2,
          duration: 0.4,
        },
        "<"
      );

      if (isActive) {
        timeline.to(
          cardData.object.scale,
          {
            x: 1.2,
            y: 1.2,
            z: 1.2,
            duration: 0.5,
          },
          "<0.1"
        );

        const existingGlow = cardData.object.children.find(
          (c) => c.userData.isGlow
        );
        if (!existingGlow) {
          const glowGeometry = new THREE.PlaneGeometry(70, 90);
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0x00c7fe,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
          });

          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          glow.position.z = -5;
          glow.userData.isGlow = true;
          cardData.object.add(glow);

          timeline.to(
            glowMaterial,
            {
              opacity: 0.3,
              duration: 0.5,
            },
            "<0.2"
          );
        }

        const existingSpotlight = cardData.object.children.find(
          (c) => c.userData.isSpotlight
        );
        if (!existingSpotlight) {
          const spotLight = new THREE.SpotLight(0x00c7fe, 0);
          spotLight.position.set(0, 100, 50);
          spotLight.angle = 0.3;
          spotLight.penumbra = 0.8;
          spotLight.distance = 200;
          spotLight.target = cardData.card;
          spotLight.userData.isSpotlight = true;
          cardData.object.add(spotLight);

          timeline.to(
            spotLight,
            {
              intensity: 2,
              duration: 0.5,
            },
            "<"
          );
        }
      } else {
        timeline.to(
          cardData.object.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.4,
          },
          "<0.1"
        );

        const glow = cardData.object.children.find((c) => c.userData.isGlow);
        if (glow) {
          timeline.to(
            glow.material,
            {
              opacity: 0,
              duration: 0.3,
              onComplete: () => {
                cardData.object.remove(glow);
                glow.material.dispose();
                glow.geometry.dispose();
              },
            },
            "<"
          );
        }

        const spotlight = cardData.object.children.find(
          (c) => c.userData.isSpotlight
        );
        if (spotlight) {
          timeline.to(
            spotlight,
            {
              intensity: 0,
              duration: 0.3,
              onComplete: () => {
                cardData.object.remove(spotlight);
              },
            },
            "<"
          );
        }
      }
    });

    if (sceneRef.current) {
      const markers = sceneRef.current.children.filter(
        (child) =>
          child.geometry &&
          child.geometry.type === "CircleGeometry" &&
          child.position.y === -49
      );

      markers.forEach((marker, i) => {
        if (marker.material) {
          timeline.to(
            marker.material.color,
            {
              r: i === activeIndex ? 0 : 0.2,
              g: i === activeIndex ? 0.78 : 0.2,
              b: i === activeIndex ? 0.99 : 0.2,
              duration: 0.4,
            },
            "<0.1"
          );

          timeline.to(
            marker.material,
            {
              opacity: i === activeIndex ? 0.9 : 0.7,
              duration: 0.4,
            },
            "<"
          );
        }
      });
    }
  };

  return (
    <div className="w-[95%] max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6">
          <p className="text-xl md:text-2xl text-gray-300 font-poppins font-medium">
            Welcome to
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-white">
            SIJA <span className="text-[#00c7fe]">BRIGHT</span> Official Website
          </h1>
          <p className="text-lg font-poppins text-gray-300 leading-relaxed">
            Tempat di mana coding, networking, dan kreativitas menyatu. Explore
            project keren, tutorial, dan fitur seru. We&apos;ve got it all.
            Let&apos;s build, learn, and vibe together!
          </p>
          <p className="text-sm font-poppins font-bold text-white pt-2">
            SIJA B&apos;27 - SMK Negeri 2 Depok (STEMBAYO)
          </p>
        </div>

        <div className="md:w-1/2 relative">
          <div className="relative h-96 w-[480px] mx-auto">
            <canvas ref={canvasRef} className="w-full h-full rounded-xl" />

            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className="text-white font-poppins font-bold text-2xl text-center">
                {carouselItems[currentSlide]?.name}
              </div>
              <div className="text-[#00c7fe] font-poppins text-sm text-center mt-1">
                Click to select
              </div>
            </div>

            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full">
              <div className="flex items-center gap-2">
                {carouselItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectItem(index)}
                    disabled={animating}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-[#00c7fe] scale-125 shadow-[0_0_5px_rgba(0,199,254,0.6)]"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Select character ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-16 gap-12">
            <button
              onClick={handlePrev}
              disabled={animating}
              className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 hover:text-[#00c7fe] transition-all disabled:opacity-50 transform hover:-translate-x-1 active:scale-95"
              aria-label="Previous character"
              type="button"
            >
              <ArrowLeft size={28} />
            </button>

            <button
              onClick={handleNext}
              disabled={animating}
              className="bg-black/50 backdrop-blur-sm rounded-full p-3 text-white hover:bg-black/70 hover:text-[#00c7fe] transition-all disabled:opacity-50 transform hover:translate-x-1 active:scale-95"
              aria-label="Next character"
              type="button"
            >
              <ArrowRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
