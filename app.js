document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');
    const markReadLink = document.querySelector('.mark-read');
    const alertDot = document.querySelector('.alert-dot');

    // Tab Switching Logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetScreen = item.getAttribute('data-screen');
            
            // Update Navigation UI
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Switch Screens with Animation
            switchScreen(targetScreen);
        });
    });

    function switchScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            if (screen.id === `${screenId}-screen`) {
                // Small timeout to allow CSS animation to trigger properly
                setTimeout(() => {
                    screen.classList.add('active');
                }, 10);
            }
        });
    }

    // Mark All as Read Logic
    if (markReadLink) {
        markReadLink.addEventListener('click', (e) => {
            e.preventDefault();
            const alerts = document.querySelectorAll('.alert-item');
            alerts.forEach(alert => {
                alert.style.opacity = '0.7';
                alert.style.backgroundColor = '#f8f9fa';
                alert.style.border = 'none';
            });
            
            // Remove alert dot from nav
            if (alertDot) {
                alertDot.style.display = 'none';
            }
            
            markReadLink.textContent = 'All Read';
            markReadLink.style.pointerEvents = 'none';
            markReadLink.style.color = '#adb5bd';
        });
    }

    // Header Profile Click to Profile Screen
    const profileThumbNav = document.getElementById('profile-thumb-nav');
    if (profileThumbNav) {
        profileThumbNav.addEventListener('click', () => {
            const profileNavItem = document.querySelector('.nav-item[data-screen="profile"]');
            profileNavItem.click();
        });
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.logout-btn, .action-card, .menu-item');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
