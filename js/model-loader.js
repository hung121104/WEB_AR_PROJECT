const getBasePath = () => {
    const repo = location.pathname.split('/')[1];
    return location.hostname === 'localhost' ? '' : `/${repo}`;
};
//
const models = {
    'fish': {
        model: `${getBasePath()}/models3D/earth_globe_hologram_2mb_looping_animation/scene.gltf`,
        pattern: `${getBasePath()}/pattern/pattern-fishQR.patt`,
        scale: '0.5 0.5 0.5',
        rotation: '0 0 0',
        position: '0 0 0',
        sound: '#fish-sound',
        animation: {
            clipName: '*', // Play all animations
            loop: true,
            timeScale: 1
        }
    },
    'robot': {
        model: `${getBasePath()}/models3D/robot.glb`,
        pattern: `${getBasePath()}/pattern/pattern-robotQR.patt`,
        scale: '0.2 0.2 0.2',
        rotation: '-90 0 0',
        position: '0 0 0',
        sound: '#robot-sound',
        animation: {
            clipName: '*',
            loop: true,
            timeScale: 1
        }
    }
};

function loadModels() {
    const existingMarkers = document.querySelectorAll('a-marker');
    existingMarkers.forEach(marker => marker.remove());

    Object.entries(models).forEach(([name, config]) => {
        const marker = document.createElement('a-marker');
        marker.setAttribute('type', 'pattern');
        marker.setAttribute('url', config.pattern);
        marker.id = `marker-${name}`;

        const entity = document.createElement('a-entity');
        entity.setAttribute('gltf-model', config.model);
        entity.setAttribute('scale', config.scale);
        entity.setAttribute('rotation', config.rotation);
        entity.setAttribute('position', config.position);
        
        // Add material override for better texture loading
        entity.setAttribute('material', {
            shader: 'standard',
            metalness: 0.5,
            roughness: 0.5
        });
        
        // Add animation-mixer component
        entity.setAttribute('animation-mixer', {
            clip: config.animation.clipName,
            loop: config.animation.loop,
            timeScale: config.animation.timeScale
        });

        // Add sound component with proper configuration
        entity.setAttribute('sound', {
            src: config.sound,
            autoplay: false,
            loop: false,
            volume: 1,
            positional: false  // Make sound non-positional
        });

        // Add better lighting for materials
        const ambientLight = document.createElement('a-entity');
        ambientLight.setAttribute('light', {
            type: 'ambient',
            intensity: 0.5
        });
        marker.appendChild(ambientLight);

        const directionalLight = document.createElement('a-entity');
        directionalLight.setAttribute('light', {
            type: 'directional',
            intensity: 0.8,
            castShadow: true
        });
        directionalLight.setAttribute('position', '1 1 1');
        marker.appendChild(directionalLight);

        // Update marker event listeners
        marker.addEventListener('markerFound', () => {
            console.log(`Marker ${name} found, attempting to play sound`);
            const soundComponent = entity.components.sound;
            if (soundComponent) {
                try {
                    soundComponent.playSound();
                    console.log(`Playing sound for ${name}`);
                } catch (error) {
                    console.error(`Error playing sound for ${name}:`, error);
                }
            } else {
                console.warn(`No sound component found for ${name}`);
            }
        });

        marker.addEventListener('markerLost', () => {
            const soundComponent = entity.components.sound;
            if (soundComponent && soundComponent.isPlaying) {
                soundComponent.stopSound();
            }
        });

        // Add event listeners
        entity.addEventListener('model-loaded', () => {
            console.log(`Model ${name} loaded successfully`);
        });

        entity.addEventListener('model-error', (error) => {
            console.error(`Error loading model ${name}:`, error);
        });

        marker.appendChild(entity);
        document.querySelector('a-scene').appendChild(marker);
    });
}

window.addEventListener('load', loadModels);