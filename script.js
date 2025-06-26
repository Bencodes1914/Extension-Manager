// Theme switching functionality
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        // Get stored theme or default to dark
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.setupFilterButtons();
    }

    setupEventListeners() {
        const themeBtn = document.querySelector('.theme-btn');
        const filterButtons = document.querySelectorAll('.toggle-btn');
        const removeButtons = document.querySelectorAll('.remove-btn');
        const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');

        // Theme toggle
        themeBtn.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Filter functionality
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterExtensions(filter);
                this.updateActiveFilter(btn);
            });
        });

        // Remove extension functionality
        removeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removeExtension(e.target.closest('.extension-card'));
            });
        });

        // Toggle switch functionality
        toggleSwitches.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.toggleExtension(e.target.closest('.extension-card'), e.target.checked);
            });
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        const body = document.body;
        const themeIcon = document.querySelector('.theme-icon img');
        
        if (theme === 'light') {
            body.classList.add('light-mode');
            themeIcon.src = './Images/icon-moon.svg'; // Switch to moon icon for light mode
        } else {
            body.classList.remove('light-mode');
            themeIcon.src = './Images/icon-sun.svg'; // Switch to sun icon for dark mode
        }
    }

    setupFilterButtons() {
        // Set initial active state
        const allBtn = document.querySelector('.toggle-btn[data-filter="all"]');
        allBtn.classList.add('active');
    }

    filterExtensions(filter) {
        const extensions = document.querySelectorAll('.extension-card');
        
        extensions.forEach(extension => {
            const status = extension.dataset.status;
            
            if (filter === 'all' || status === filter) {
                extension.classList.remove('hidden');
                extension.classList.add('fade-in');
            } else {
                extension.classList.add('hidden');
                extension.classList.remove('fade-in');
            }
        });
    }

    updateActiveFilter(activeBtn) {
        const filterButtons = document.querySelectorAll('.toggle-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    removeExtension(extensionCard) {
        if (confirm('Are you sure you want to remove this extension?')) {
            extensionCard.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                extensionCard.remove();
            }, 300);
        }
    }

    toggleExtension(extensionCard, isActive) {
        if (isActive) {
            extensionCard.dataset.status = 'active';
        } else {
            extensionCard.dataset.status = 'inactive';
        }
        
        // Update the current filter view
        const activeFilter = document.querySelector('.toggle-btn.active').dataset.filter;
        if (activeFilter !== 'all') {
            this.filterExtensions(activeFilter);
        }
    }
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(style);

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});