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
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
});
