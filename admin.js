document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.querySelector('.theme-toggle-btn');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('ppms-admin-theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('ppms-admin-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 2. ApexCharts: Interventions Impact
    const options = {
        series: [{
            name: 'Spray Programs',
            type: 'column',
            data: [200, 350, 450, 450, 500, 580]
        }, {
            name: 'Mosquito Nets',
            type: 'column',
            data: [300, 400, 480, 550, 650, 720]
        }, {
            name: 'Overall Trend',
            type: 'line',
            data: [250, 380, 450, 520, 600, 750]
        }],
        chart: {
            height: 300,
            type: 'line',
            toolbar: { show: false },
            fontFamily: 'Inter, sans-serif'
        },
        stroke: {
            width: [0, 0, 4],
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                columnWidth: '50%',
                borderRadius: 4
            }
        },
        colors: ['#40916c', '#10b981', '#f24c4c'],
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
        legend: {
            position: 'bottom',
            offsetY: 10
        },
        grid: {
            borderColor: body.getAttribute('data-theme') === 'dark' ? '#333' : '#f1f1f1'
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false }
        }
    };

    const chart = new ApexCharts(document.querySelector("#interventions-chart"), options);
    chart.render();

    // 3. Map Marker Tooltip Interaction
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', () => {
            // Force other tooltips to hide (though currently only one has it)
            markers.forEach(m => {
                const tt = m.querySelector('.marker-tooltip');
                if (tt) tt.style.display = 'none';
            });
            const tooltip = marker.querySelector('.marker-tooltip');
            if (tooltip) tooltip.style.display = 'block';
        });

        // Hide when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!marker.contains(e.target)) {
                const tooltip = marker.querySelector('.marker-tooltip');
                if (tooltip) tooltip.style.display = 'none';
            }
        });
    });

    // 4. Sidebar Toggle for Mobile
    const menuToggle = document.querySelector('.menu-toggle-btn');
    const sidebarClose = document.querySelector('.sidebar-close-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('open');
        });
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // 5. Admin SPA Router
    const navItems = document.querySelectorAll('.nav-item');
    const adminScreens = document.querySelectorAll('.admin-screen');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = item.getAttribute('data-screen');
            if (screenId) {
                switchAdminScreen(screenId, item);
            }
        });
    });

    function switchAdminScreen(screenId, navItem) {
        // Update Nav UI
        navItems.forEach(nav => {
            const link = nav.querySelector('.nav-link');
            if (link) link.classList.remove('active');
        });
        navItem.querySelector('.nav-link').classList.add('active');

        // Update Screen Visibility
        adminScreens.forEach(screen => {
            screen.classList.remove('active');
            if (screen.id === `${screenId}-screen`) {
                screen.classList.add('active');
            }
        });

        // Update Title
        if (pageTitle) {
            const screenName = screenId.charAt(0).toUpperCase() + screenId.slice(1);
            pageTitle.textContent = `Health Authority / ${screenName}`;
        }

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
            closeSidebar();
        }

        // Initialize specific charts if needed
        if (screenId === 'interventions' && !document.querySelector('#intervention-progress-chart .apexcharts-canvas')) {
            initInterventionCharts();
        }
    }

    function initInterventionCharts() {
        const options = {
            series: [75],
            chart: {
                height: 250,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: { size: '70%'},
                    dataLabels: {
                        name: { show: false },
                        value: {
                            fontSize: '22px',
                            show: true,
                            formatter: function (val) { return val + '%' }
                        }
                    }
                }
            },
            labels: ['Progress'],
            colors: ['#40916c']
        };
        const intChart = new ApexCharts(document.querySelector("#intervention-progress-chart"), options);
        intChart.render();
    }

    // Close sidebar when clicking outside on mobile (fallback)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            e.target !== overlay) {
            closeSidebar();
        }
    });
});
