import { LocationGroup, VariantConfig, SceneConfig } from '../data/tour-config';

export interface VariantSelectorOptions {
  container: HTMLElement;
  onSceneSelect: (scene: SceneConfig, allScenes: SceneConfig[]) => void;
}

export class VariantSelector {
  private container: HTMLElement;
  private onSceneSelect: (scene: SceneConfig, allScenes: SceneConfig[]) => void;
  private currentGroup: LocationGroup | null = null;
  private currentVariant: VariantConfig | null = null;
  private variantButton: HTMLElement | null = null;
  private modalOverlay: HTMLElement | null = null;

  constructor(options: VariantSelectorOptions) {
    this.container = options.container;
    this.onSceneSelect = options.onSceneSelect;
    this.init();
  }

  private init() {
    // Create button (initially hidden)
    this.variantButton = document.createElement('button');
    this.variantButton.className = 'variant-button hidden';
    this.variantButton.innerHTML = `
      <span class="variant-name"></span>
      <span class="variant-icon">
        <img src="/assets/icons/dots-menu.svg" alt="Variant Icon" />
      </span>
    `;
    this.variantButton.addEventListener('click', () => this.openVariantModal());
    this.container.appendChild(this.variantButton);

    // Create modal overlay
    this.modalOverlay = document.createElement('div');
    this.modalOverlay.className = 'variant-modal hidden';
    this.modalOverlay.innerHTML = `
      <div class="variant-modal-content">
        <button class="variant-modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="variant-modal-header">
          <button class="variant-back-btn hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 class="variant-modal-title"></h2>
        </div>
        <div class="variant-grid"></div>
      </div>
    `;
    
    this.modalOverlay.querySelector('.variant-modal-close')?.addEventListener('click', () => this.closeModal());
    this.modalOverlay.querySelector('.variant-back-btn')?.addEventListener('click', () => this.openVariantModal());
    
    document.body.appendChild(this.modalOverlay);
  }

  public setLocationGroup(group: LocationGroup) {
    this.currentGroup = group;
    
    if (group.variants && group.variants.length > 0) {
      // Set default variant if not set
      const defaultVariantId = group.defaultVariantId || group.variants[0].id;
      const variant = group.variants.find(v => v.id === defaultVariantId) || group.variants[0];
      this.setVariant(variant);
      // Button is permanently hidden - do not show it
    } else {
      this.currentVariant = null;
    }
  }

  private setVariant(variant: VariantConfig) {
    this.currentVariant = variant;
    if (this.variantButton) {
      const nameSpan = this.variantButton.querySelector('.variant-name');
      if (nameSpan) nameSpan.textContent = variant.name;
    }
  }

  private openVariantModal() {
    if (!this.currentGroup || !this.currentGroup.variants || !this.modalOverlay) return;

    const title = this.modalOverlay.querySelector('.variant-modal-title');
    const backBtn = this.modalOverlay.querySelector('.variant-back-btn');
    const grid = this.modalOverlay.querySelector('.variant-grid');
    
    if (title) title.textContent = 'ВИДЫ НОМЕРОВ'; // Or generic title
    if (backBtn) backBtn.classList.add('hidden');
    if (grid) {
      grid.innerHTML = '';
      grid.className = 'variant-grid variants-mode'; // Add class for styling
      
      this.currentGroup.variants.forEach(variant => {
        const card = document.createElement('div');
        card.className = `variant-card ${this.currentVariant?.id === variant.id ? 'selected' : ''}`;
        card.innerHTML = `
          <div class="variant-card-image">
            <img src="${variant.thumbnail}" alt="${variant.name}" loading="lazy" decoding="async" />
          </div>
          <div class="variant-card-title">${variant.name}</div>
        `;
        card.addEventListener('click', () => this.openSceneModal(variant));
        grid.appendChild(card);
      });
    }

    this.modalOverlay.classList.remove('hidden');
  }

  private openSceneModal(variant: VariantConfig) {
    if (!this.modalOverlay) return;

    const title = this.modalOverlay.querySelector('.variant-modal-title');
    const backBtn = this.modalOverlay.querySelector('.variant-back-btn');
    const grid = this.modalOverlay.querySelector('.variant-grid');

    if (title) title.textContent = variant.name;
    if (backBtn) backBtn.classList.remove('hidden');
    
    if (grid) {
      grid.innerHTML = '';
      grid.className = 'variant-grid scenes-mode'; // Add class for styling
      
      variant.scenes.forEach(scene => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.innerHTML = `
          <div class="scene-card-image">
            <img src="${scene.thumbnail || scene.panorama}" alt="${scene.name}" loading="lazy" decoding="async" />
          </div>
          <div class="scene-card-title">${scene.name}</div>
        `;
        card.addEventListener('click', () => {
          this.setVariant(variant);
          this.onSceneSelect(scene, variant.scenes);
          this.closeModal();
        });
        grid.appendChild(card);
      });
    }
  }

  private closeModal() {
    this.modalOverlay?.classList.add('hidden');
  }
}
