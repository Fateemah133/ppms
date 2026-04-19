const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () =>{
    container.classList.add("active");
});
loginBtn.addEventListener("click", () =>{
    container.classList.remove("active");
});
registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.add("active");
});

loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    container.classList.remove("active");
});










const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');

const themeToggler = document.querySelector('.theme-toggler');

menuBtn.addEventListener('click', () =>{
    sideMenu.style.display ="block"
})
closeBtn.addEventListener('click', () =>
{
    sideMenu.style.display ="none"
})

themeToggler.addEventListener('click', () =>{

    document.body.classList.toggle('dark-theme-variables')

    // document.body.classList.toggle('dark-theme-variables')

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
})



// new one entirely


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


    // bar chart
var barChartOptions = {
          series: [
          {
            name: 'Actual',
            data: [
              {
                x: 'Lagos',
                y: High,
                goals: [
                  {
                    name: 'Expected',
                    value: 14,
                    strokeWidth: 2,
                    strokeDashArray: 2,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Ibadan',
                y: Low,
                goals: [
                  {
                    name: 'Expected',
                    value: 54,
                    strokeWidth: 5,
                    strokeHeight: 10,
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Osun',
                y: 54,
                goals: [
                  {
                    name: 'Expected',
                    value: 52,
                    strokeWidth: 10,
                    strokeHeight: 0,
                    strokeLineCap: 'round',
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Kano',
                y: 66,
                goals: [
                  {
                    name: 'Expected',
                    value: 61,
                    strokeWidth: 10,
                    strokeHeight: 0,
                    strokeLineCap: 'round',
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Jos',
                y: 81,
                goals: [
                  {
                    name: 'Expected',
                    value: 66,
                    strokeWidth: 10,
                    strokeHeight: 0,
                    strokeLineCap: 'round',
                    strokeColor: '#775DD0'
                  }
                ]
              },
              {
                x: 'Abeokuta',
                y: 67,
                goals: [
                  {
                    name: 'Expected',
                    value: 70,
                    strokeWidth: 5,
                    strokeHeight: 10,
                    strokeColor: '#775DD0'
                  }
                ]
              }
            ]
          }
        ],
          chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          formatter: function(val, opt) {
            const goals =
              opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals
        
            if (goals && goals.length) {
              return `${val} / ${goals[0].value}`
            }
            return val
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        }
        };

        var barchart = new ApexCharts(document.querySelector("#bar-chart"), options);
        chart.render();
