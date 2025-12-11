import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';

import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/plan-plugin/index.css';
import { locationGroups, SceneConfig } from './data/tour-config';
import './style.css';
import './loader.css';

// Extend window for sharing scene configs with plugin callbacks
declare global {
  interface Window {
    __currentSceneConfigs?: SceneConfig[];
  }
}

const container = document.querySelector('#viewer') as HTMLElement;

const viewer = new Viewer({
  container: container,
  // loadingImg: '/loader.gif', // Removed because file is missing
  touchmoveTwoFingers: false,
  mousewheelCtrlKey: true,
  defaultYaw: '0deg',
  defaultZoomLvl: 0, // Most zoomed out (widest FOV)
  navbar: false,
  mousewheel: false,
  lang: {
    loading: 'Загрузка...',
  },
  plugins: [
    [VirtualTourPlugin, {
      positionMode: 'manual',
      renderMode: '2d',
      arrowStyle: {
        element: (link: any) => {
          const div = document.createElement('div');
          div.className = 'transition-marker';
          // Find scene name from current configs
          const scene = window.__currentSceneConfigs?.find((s: any) => s.id === link.nodeId);
          div.textContent = scene?.name || link.nodeId;
          return div;
        },
      },
      transitionOptions: (toNode: any) => {
        // Find config for the target node
        const sceneConfig = currentSceneConfigs.find(s => s.id === toNode.id);
        if (sceneConfig && (sceneConfig.defaultYaw || sceneConfig.defaultPitch)) {
          return {
            rotateTo: {
              yaw: sceneConfig.defaultYaw,
              pitch: sceneConfig.defaultPitch,
            },
            speed: '10rpm', // Smooth transition speed
          };
        }
        return {};
      },
    }],
    [MarkersPlugin, {
      defaultHoverScale: false,
    }],
  ],
  // adapter: [EquirectangularTilesAdapter, {
  //   // Configuration for the adapter
  //   // For now we use default settings, but this enables the functionality
  //   // The 'panorama' property in nodes will need to match the adapter's expected format
  //   // if we want to use tiling.
  //   // If a simple string is passed as panorama, the adapter might fallback or we might need
  //   // to handle it.
  //   // Actually, EquirectangularTilesAdapter expects an object with width, cols, rows etc.
  //   // If we want to support BOTH simple images and tiles, we might need logic.
  //   // But usually for a tour, we stick to one format.
  //   // Let's assume for now we use the adapter, but the mock data uses simple images.
  //   // The adapter might throw if fed a string.
  //   // Let's check if we can conditionally use it or if it supports strings.
  //   // It usually replaces the default EquirectangularAdapter.
  //   // So if we use it, we MUST provide the tiled configuration object.
  //   // Since we don't have tiles yet, I will comment it out but leave the import
  //   // so the user sees it's ready.
  // }],
});

const virtualTour = viewer.getPlugin(VirtualTourPlugin) as VirtualTourPlugin;
const markersPlugin = viewer.getPlugin(MarkersPlugin) as MarkersPlugin;

// Info Panel Logic
const infoPanel = document.getElementById('info-panel');
const infoClose = document.getElementById('info-close');

if (infoClose && infoPanel) {
  infoClose.addEventListener('click', () => {
    infoPanel.classList.add('hidden');
  });
}

markersPlugin.addEventListener('select-marker', (e: any) => {
  if (e.marker.id.startsWith('info-')) {
    if (infoPanel) {
      const image = infoPanel.querySelector('#info-image') as HTMLImageElement;
      
      // Update Image
      if (image) {
        if (e.marker.data && e.marker.data.image) {
          image.src = e.marker.data.image;
        } else {
           image.src = ''; // Clear or handle no image case
        }
      }

      infoPanel.classList.remove('hidden');
    }
  }
});

// Note: Initial nodes are loaded by the location navigation system at the bottom of this file

// Event listeners for iframe communication
window.addEventListener('message', () => {
  // Handle messages from parent
  // console.log('Received message:', event.data);
});

// Notify parent that viewer is ready and hide loader
// Notify parent that viewer is ready
viewer.addEventListener('ready', () => {
  window.parent.postMessage({ type: 'tourLoaded' }, '*');
});

// Hide loader only when the first panorama is actually loaded to prevent black screen
viewer.addEventListener('panorama-loaded', () => {
  const loader = document.querySelector('#loader-container');
  if (loader) {
    loader.classList.add('hidden');
  }
}, { once: true });

viewer.addEventListener('load-progress', (e: any) => {
    const loaderPercentage = document.querySelector('#loader-percentage');
    if (loaderPercentage) {
        loaderPercentage.textContent = `${e.progress}%`;
    }
});

viewer.addEventListener('panorama-error', (e) => {
    console.error('Viewer Error:', e);
    alert('Viewer Error: ' + (e.error.message || e.error));
});

viewer.addEventListener('position-updated', () => {
    // Optional: Stream position updates if needed
});

// Store scene configs for lookup (also on window for plugin callbacks)
let currentSceneConfigs: SceneConfig[] = [];
window.__currentSceneConfigs = currentSceneConfigs;

// Scene Controls Logic
const btnAudio = document.getElementById('btn-audio');
const btnVideo = document.getElementById('btn-video');
const btnGallery = document.getElementById('btn-gallery');

const audioEl = document.getElementById('scene-audio') as HTMLAudioElement;
const videoModal = document.getElementById('video-modal');
const videoEl = document.getElementById('scene-video') as HTMLVideoElement;
const videoClose = document.getElementById('video-close');
const galleryContainer = document.getElementById('gallery-container');

// Initial state - hide all controls
if (btnAudio) btnAudio.style.display = 'none';
if (btnVideo) btnVideo.style.display = 'none';
if (btnGallery) btnGallery.style.display = 'none';

// State
let isAudioPlaying = false;

// Helper to update controls based on current scene
const updateSceneControls = (nodeId: string) => {
  const sceneConfig = currentSceneConfigs.find(s => s.id === nodeId);
  
  // Reset states
  isAudioPlaying = false;
  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
  }
  if (btnAudio) btnAudio.classList.remove('active');
  
  // Close overlays
  if (videoModal) videoModal.classList.add('hidden');
  if (videoEl) {
      videoEl.pause();
      videoEl.currentTime = 0;
  }
  if (galleryContainer) galleryContainer.classList.add('hidden');
  // Info panel is closed by virtualTour listener below

  if (!sceneConfig) return;

  // Audio Control
  if (btnAudio) {
    if (sceneConfig.audio) {
      btnAudio.style.display = 'flex'; // Show if audio exists
      if (audioEl) audioEl.src = sceneConfig.audio;
    } else {
      btnAudio.style.display = 'none'; // Hide if no audio
    }
  }

  // Video Control
  if (btnVideo) {
    if (sceneConfig.video) {
        btnVideo.style.display = 'flex';
    } else {
        btnVideo.style.display = 'none';
    }
  }

  // Gallery Control
  if (btnGallery) {
      if (sceneConfig.gallery && sceneConfig.gallery.length > 0) {
          btnGallery.style.display = 'flex';
      } else {
          btnGallery.style.display = 'none';
      }
  }
};

virtualTour.addEventListener('node-changed', (e: any) => {
  // Close info panel if open
  if (infoPanel) {
    infoPanel.classList.add('hidden');
  }
  
  // Update controls for the new node
  updateSceneControls(e.node.id);
});

// Event Listeners for Controls

// Audio Toggle
if (btnAudio && audioEl) {
    btnAudio.addEventListener('click', () => {
        if (isAudioPlaying) {
            audioEl.pause();
            btnAudio.classList.remove('active');
            isAudioPlaying = false;
        } else {
            audioEl.play().catch(e => console.error("Audio play error", e));
            btnAudio.classList.add('active');
            isAudioPlaying = true;
        }
    });
}

// Video Open
if (btnVideo && videoModal && videoEl) {
    btnVideo.addEventListener('click', () => {
        const sceneConfig = currentSceneConfigs.find(s => s.id === virtualTour.getCurrentNode()?.id);
        if (sceneConfig && sceneConfig.video) {
            videoEl.src = sceneConfig.video;
            videoModal.classList.remove('hidden');
            videoEl.play().catch(e => console.error("Video play error", e));
        }
    });
}

// Video Close (Button or Overlay click)
const closeVideo = () => {
    if (videoModal && videoEl) {
        videoModal.classList.add('hidden');
        videoEl.pause();
        videoEl.currentTime = 0;
    }
};

if (videoClose) {
    videoClose.addEventListener('click', closeVideo);
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideo();
        }
    });
}

// Gallery Toggle
if (btnGallery && galleryContainer) {
    btnGallery.addEventListener('click', () => {
        const isHidden = galleryContainer.classList.contains('hidden');
        if (isHidden) {
            // Render photos
            const sceneConfig = currentSceneConfigs.find(s => s.id === virtualTour.getCurrentNode()?.id);
            if (sceneConfig && sceneConfig.gallery) {
                galleryContainer.innerHTML = sceneConfig.gallery.map(url => `
                    <div class="gallery-item">
                        <img src="${url}" alt="Gallery Image" loading="lazy" />
                    </div>
                `).join('');
                
                // Set item count class for CSS sizing
                galleryContainer.className = `gallery-container items-${Math.min(sceneConfig.gallery.length, 3)}`;
                
                galleryContainer.classList.remove('hidden');
            }
        } else {
            galleryContainer.classList.add('hidden');
        }
    });
}

// Development helper: log click coordinates for easy config editing
viewer.addEventListener('click', (e: any) => {
  const position = e.data.rightclick ? null : e.data;
  if (position && position.yaw !== undefined && position.pitch !== undefined) {
    console.log(`📍 Click position: { yaw: ${position.yaw.toFixed(4)}, pitch: ${position.pitch.toFixed(4)} }`);
    console.log(`🎯 Default view config: defaultYaw: '${position.yaw.toFixed(4)}rad', defaultPitch: '${position.pitch.toFixed(4)}rad'`);
  }
});

// Location Navigation Controls
const locationNav = document.getElementById('location-nav');

let currentLocationId = locationGroups.length > 0 ? locationGroups[0].id : ''; // Default to first location

// Render the navigation (flat list of all locations)
const renderLocationNav = () => {
  if (!locationNav) return;
  
  // Clear existing content
  locationNav.innerHTML = '';

  // Create Header for Mobile
  const navHeader = document.createElement('div');
  navHeader.className = 'nav-header';
  
  const currentText = document.createElement('span');
  currentText.className = 'current-text';
  currentText.textContent = 'Выберите локацию'; // Placeholder
  
  const chevron = document.createElement('div');
  chevron.className = 'chevron-icon';
  chevron.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  
  navHeader.appendChild(currentText);
  navHeader.appendChild(chevron);
  
  // Create List Container
  const navList = document.createElement('div');
  navList.className = 'nav-list';
  
  locationGroups.forEach(group => {
    const btn = document.createElement('button');
    btn.className = `location-btn ${group.id === currentLocationId ? 'active' : ''}`;
    btn.textContent = group.name;
    
    btn.addEventListener('click', () => {
      selectLocation(group.id);
    });
    
    navList.appendChild(btn);
  });

  locationNav.appendChild(navHeader);
  locationNav.appendChild(navList);

  // Toggle Dropdown logic
  navHeader.addEventListener('click', () => {
      locationNav.classList.toggle('expanded');
  });
};

// Select a location
const selectLocation = (locationId: string) => {
  const locationGroup = locationGroups.find(group => group.id === locationId);
  
  if (locationGroup) {
    currentLocationId = locationId;
    
    // Update Header Text
    const currentText = locationNav?.querySelector('.current-text');
    if (currentText) {
        currentText.textContent = locationGroup.name;
    }

    // Collapse dropdown on mobile
    locationNav?.classList.remove('expanded');

    // Update active class on buttons
    const buttons = locationNav?.querySelectorAll('.location-btn');
    buttons?.forEach(btn => {
        if (btn.textContent === locationGroup.name) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Determine which scenes to load
    let scenesToLoad: SceneConfig[] = [];
    let startNodeId: string | undefined;

    if (locationGroup.variants && locationGroup.variants.length > 0) {
      // If variants exist, load the default variant's scenes
      const defaultVariantId = locationGroup.defaultVariantId || locationGroup.variants[0].id;
      const variant = locationGroup.variants.find(v => v.id === defaultVariantId) || locationGroup.variants[0];
      scenesToLoad = variant.scenes;
    } else if (locationGroup.scenes) {
      // Fallback to direct scenes
      scenesToLoad = locationGroup.scenes;
    }

    if (scenesToLoad.length > 0) {
      startNodeId = scenesToLoad[0].id;
      currentSceneConfigs = scenesToLoad;
      window.__currentSceneConfigs = currentSceneConfigs;
      
      // Load the new scenes
      virtualTour.setNodes(
        scenesToLoad.map(scene => ({
          id: scene.id,
          panorama: scene.panorama,
          name: scene.name,
          links: scene.links,
          markers: scene.markers.map(marker => {
            if (marker.data && marker.data.type === 'info') {
              return {
                ...marker,
                html: `
                  <div class="info-marker">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                `,
                size: { width: 50, height: 50 },
                anchor: 'center center',
              };
            }
            return marker;
          }),
        })),
        startNodeId
      );
    }
    
    // Re-render is not needed if we just update classes, but we are updating content above 
    // manually instead of calling renderLocationNav() completely to accept animation state if we wanted.
    // However, existing code re-rendered. Let's stick to the manual update above for smoother UX 
    // or just call render to be safe but that kills the dropdown state.
    // I already updated active classes manually above.
  }
};

// Initialize navigation
renderLocationNav();

// Load initial location
const initialLocation = locationGroups.find(g => g.id === currentLocationId);
if (initialLocation) {
  // Trigger initial load logic via selectLocation to ensure consistency
  selectLocation(initialLocation.id);
}
