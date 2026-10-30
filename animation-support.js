// Surface hotspots follow the skinned GLB directly in model-viewer.
const viewer = document.querySelector('#dragon');
const controls = [document.querySelector('#animation'), document.querySelector('#replay')];
controls.forEach(button => button.disabled = true);
customElements.whenDefined('model-viewer').then(() => {
  const narrow = matchMedia('(max-width: 480px)');
  const frameModel = () => viewer.fieldOfView = narrow.matches ? '40deg' : '30deg';
  narrow.addEventListener('change', frameModel);
  frameModel();
  const ready = () => controls.forEach(button => button.disabled = !viewer.availableAnimations.includes('Пробуждение древнего дракона'));
  viewer.addEventListener('load', ready);
  viewer.addEventListener('error', () => controls.forEach(button => button.disabled = true));
  if (viewer.loaded) ready();
  setInterval(() => {
    if (!viewer.loaded) return;
    viewer.dataset.animationTime = viewer.currentTime.toFixed(3);
    viewer.dataset.animationPaused = String(viewer.paused);
    viewer.dataset.animationDuration = String(viewer.duration);
    viewer.dataset.hotspotPositions = JSON.stringify(['hotspot-2', 'hotspot-3', 'hotspot-4'].map(name => {
      const point = viewer.queryHotspot(name);
      return point ? {name, position: point.position, canvas: point.canvasPosition} : {name};
    }));
  }, 150);
});
