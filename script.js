// BURN THAT HARDWARE - Application Logic
// MONO Design System Implementation

class ComponentSelector {
    constructor() {
        this.selectedComponents = [];
        this.filteredComponents = [...COMPONENTS_DATA];
        this.showSelectedOnly = false;
        
        this.initializeElements();
        this.bindEvents();
        this.renderComponents();
        this.updateUI();
    }

    initializeElements() {
        // DOM Elements
        this.elements = {
            budgetRemaining: document.getElementById('budget-remaining'),
            budgetPercentage: document.getElementById('budget-percentage'),
            budgetBar: document.getElementById('budget-bar'),
            bonusDisplay: document.getElementById('bonus-display'),
            
            searchInput: document.getElementById('search-input'),
            categoryFilter: document.getElementById('category-filter'),
            toggleSelected: document.getElementById('toggle-selected'),
            clearAll: document.getElementById('clear-all'),
            
            selectedCart: document.getElementById('selected-cart'),
            selectedCount: document.getElementById('selected-count'),
            selectedList: document.getElementById('selected-list'),
            
            componentsGrid: document.getElementById('components-grid'),
            
            footerComponents: document.getElementById('footer-components'),
            footerCost: document.getElementById('footer-cost'),
            footerBonus: document.getElementById('footer-bonus')
        };
    }

    bindEvents() {
        // Search functionality
        this.elements.searchInput.addEventListener('input', (e) => {
            this.applyFilters();
        });

        // Category filter
        this.elements.categoryFilter.addEventListener('change', (e) => {
            this.applyFilters();
        });

        // Toggle selected view
        this.elements.toggleSelected.addEventListener('click', (e) => {
            this.showSelectedOnly = !this.showSelectedOnly;
            this.elements.toggleSelected.textContent = this.showSelectedOnly ? 'Show All' : 'Show Selected';
            this.applyFilters();
        });

        // Clear all selections
        this.elements.clearAll.addEventListener('click', (e) => {
            this.selectedComponents = [];
            this.updateUI();
            this.renderComponents();
        });
    }

    applyFilters() {
        const searchTerm = this.elements.searchInput.value.toLowerCase();
        const categoryFilter = this.elements.categoryFilter.value;

        let filtered = [...COMPONENTS_DATA];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(component => 
                component.name.toLowerCase().includes(searchTerm) ||
                component.description.toLowerCase().includes(searchTerm)
            );
        }

        // Apply category filter
        if (categoryFilter) {
            filtered = filtered.filter(component => component.category === categoryFilter);
        }

        // Apply selected-only filter
        if (this.showSelectedOnly) {
            filtered = this.selectedComponents;
        }

        this.filteredComponents = filtered;
        this.renderComponents();
    }

    toggleComponent(componentId) {
        const component = COMPONENTS_DATA.find(c => c.id === componentId);
        if (!component) return;

        const isSelected = this.isComponentSelected(componentId);
        
        if (isSelected) {
            // Remove from selection
            this.selectedComponents = this.selectedComponents.filter(c => c.id !== componentId);
        } else {
            // Check budget constraint
            const newTotal = this.getTotalCost() + component.price;
            if (newTotal <= BUDGET_CONFIG.total) {
                this.selectedComponents.push(component);
            }
        }

        this.updateUI();
        this.renderComponents();
    }

    removeComponent(componentId) {
        this.selectedComponents = this.selectedComponents.filter(c => c.id !== componentId);
        this.updateUI();
        this.renderComponents();
    }

    isComponentSelected(componentId) {
        return this.selectedComponents.some(c => c.id === componentId);
    }

    getTotalCost() {
        return this.selectedComponents.reduce((sum, component) => sum + component.price, 0);
    }

    getBonusPoints() {
        const totalSpent = this.getTotalCost();
        const saved = BUDGET_CONFIG.total - totalSpent;
        
        for (const tier of BUDGET_CONFIG.bonusPointsScale) {
            if (saved >= tier.saved) {
                return tier.points;
            }
        }
        return 0;
    }

    updateUI() {
        const totalCost = this.getTotalCost();
        const remaining = BUDGET_CONFIG.total - totalCost;
        const percentage = Math.round((totalCost / BUDGET_CONFIG.total) * 100);
        const bonusPoints = this.getBonusPoints();

        // Update budget display
        this.elements.budgetRemaining.textContent = `₹${remaining}`;
        this.elements.budgetPercentage.textContent = `${percentage}%`;
        this.elements.budgetBar.style.width = `${Math.min(percentage, 100)}%`;
        this.elements.bonusDisplay.textContent = `Bonus: ${bonusPoints} pts`;

        // Update selected cart
        if (this.selectedComponents.length > 0) {
            this.elements.selectedCart.classList.remove('hidden');
            this.elements.selectedCount.textContent = this.selectedComponents.length;
            this.renderSelectedList();
        } else {
            this.elements.selectedCart.classList.add('hidden');
        }

        // Update footer stats
        this.elements.footerComponents.textContent = this.selectedComponents.length;
        this.elements.footerCost.textContent = `₹${totalCost}`;
        this.elements.footerBonus.textContent = bonusPoints;
    }

    renderSelectedList() {
        this.elements.selectedList.innerHTML = this.selectedComponents.map(component => `
            <div class="selected-item">
                <span class="text-white text-sm font-medium">${component.name}</span>
                <button 
                    onclick="app.removeComponent(${component.id})" 
                    class="btn-danger">
                    ×
                </button>
            </div>
        `).join('');
    }

    renderComponents() {
        this.elements.componentsGrid.innerHTML = this.filteredComponents.map(component => {
            const isSelected = this.isComponentSelected(component.id);
            const totalCost = this.getTotalCost();
            const wouldExceedBudget = !isSelected && (totalCost + component.price > BUDGET_CONFIG.total);
            
            const cardClasses = [
                'component-card',
                isSelected ? 'selected' : '',
                wouldExceedBudget ? 'disabled' : ''
            ].filter(Boolean).join(' ');

            const buttonText = isSelected ? '✓ SELECTED' : 
                             wouldExceedBudget ? 'OVER BUDGET' : 'ADD TO CART';
            
            const buttonClasses = isSelected ? 'btn-primary' : 
                                 wouldExceedBudget ? 'btn-secondary opacity-50 cursor-not-allowed' : 'btn-secondary';

            return `
                <div class="${cardClasses}">
                    <div class="component-image">
                        <img src="${component.image}" 
                             alt="${component.name}"
                             onerror="this.parentElement.innerHTML='<div class=\\'text-black text-sm font-medium\\'>COMPONENT</div>'"
                             loading="lazy">
                    </div>
                    
                    <div class="space-y-3">
                        <h3 class="font-bold text-lg leading-tight">${component.name}</h3>
                        <p class="text-sm leading-relaxed">${component.description}</p>
                        
                        <div class="flex justify-between items-center">
                            <span class="price-display">₹${component.price}</span>
                            <span class="category-badge">${component.category.toUpperCase()}</span>
                        </div>

                        <button 
                            onclick="app.toggleComponent(${component.id})"
                            ${wouldExceedBudget ? 'disabled' : ''}
                            class="${buttonClasses} w-full">
                            ${buttonText}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ComponentSelector();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        app.elements.searchInput.focus();
    }
    
    // Escape to clear search
    if (e.key === 'Escape') {
        app.elements.searchInput.value = '';
        app.elements.searchInput.blur();
        app.applyFilters();
    }
});

// Export for debugging
window.app = app;