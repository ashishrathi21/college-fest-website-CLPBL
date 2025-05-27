// Market Research Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initMarketTrendsChart();
    initDemographicsChart();
    initCompetitorChart();

    // Set up event listeners
    setupTimeFilterEvents();
    setupNavEvents();
    setupSearchFunctionality();
});

// Time filter functionality
function setupTimeFilterEvents() {
    const timeButtons = document.querySelectorAll('.time-btn');
    
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            timeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update charts based on selected time period
            const timePeriod = this.getAttribute('data-time');
            updateChartsForTimePeriod(timePeriod);
        });
    });
}

// Navigation functionality
function setupNavEvents() {
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

// Search functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

function performSearch(query) {
    if (query.trim() !== '') {
        console.log('Searching for:', query);
        // Implement actual search functionality here
        
        // Example: Show alert for demo purposes
        alert(`Searching for: ${query}`);
    }
}

// Update all charts based on time period
function updateChartsForTimePeriod(timePeriod) {
    console.log('Updating charts for time period:', timePeriod);
    
    // Get data for the selected time period
    const marketTrendsData = getMarketTrendsData(timePeriod);
    const demographicsData = getDemographicsData(timePeriod);
    const competitorData = getCompetitorData(timePeriod);
    
    // Update each chart
    updateMarketTrendsChart(marketTrendsData);
    updateDemographicsChart(demographicsData);
    updateCompetitorChart(competitorData);
    
    // Update metrics
    updateMetricsForTimePeriod(timePeriod);
}

// Market Trends Chart
function initMarketTrendsChart() {
    const ctx = document.getElementById('marketTrendsChart').getContext('2d');
    
    // Sample data for market trends
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Market Share (%)',
                data: [18.2, 19.6, 20.8, 22.1, 23.0, 23.5],
                borderColor: '#4a6cf7',
                backgroundColor: 'rgba(74, 108, 247, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Industry Growth (%)',
                data: [5.2, 5.8, 6.4, 7.0, 7.6, 8.2],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40, 167, 69, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    // Chart configuration
    window.marketTrendsChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateMarketTrendsChart(data) {
    if (window.marketTrendsChart && data) {
        window.marketTrendsChart.data.labels = data.labels;
        window.marketTrendsChart.data.datasets[0].data = data.marketShare;
        window.marketTrendsChart.data.datasets[1].data = data.industryGrowth;
        window.marketTrendsChart.update();
    }
}

// Demographics Chart
function initDemographicsChart() {
    const ctx = document.getElementById('demographicsChart').getContext('2d');
    
    // Sample data for demographics
    const data = {
        labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
        datasets: [{
            data: [15, 30, 25, 18, 12],
            backgroundColor: [
                'rgba(74, 108, 247, 0.8)',
                'rgba(40, 167, 69, 0.8)', 
                'rgba(252, 196, 25, 0.8)',
                'rgba(220, 53, 69, 0.8)',
                'rgba(108, 117, 125, 0.8)'
            ],
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    };
    
    // Chart configuration
    window.demographicsChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

function updateDemographicsChart(data) {
    if (window.demographicsChart && data) {
        window.demographicsChart.data.labels = data.labels;
        window.demographicsChart.data.datasets[0].data = data.values;
        window.demographicsChart.update();
    }
}

// Competitor Chart
function initCompetitorChart() {
    const ctx = document.getElementById('competitorChart').getContext('2d');
    
    // Sample data for competitor analysis
    const data = {
        labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
        datasets: [{
            label: 'Market Share (%)',
            data: [23.5, 19.2, 16.8, 14.3, 26.2],
            backgroundColor: [
                'rgba(74, 108, 247, 0.8)',
                'rgba(40, 167, 69, 0.8)',
                'rgba(252, 196, 25, 0.8)',
                'rgba(220, 53, 69, 0.8)',
                'rgba(108, 117, 125, 0.8)'
            ],
            borderWidth: 0
        }]
    };
    
    // Chart configuration
    window.competitorChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateCompetitorChart(data) {
    if (window.competitorChart && data) {
        window.competitorChart.data.labels = data.labels;
        window.competitorChart.data.datasets[0].data = data.values;
        window.competitorChart.update();
    }
}

// Update metrics
function updateMetricsForTimePeriod(timePeriod) {
    // Get metric data for selected time period
    const metricData = getMetricData(timePeriod);
    
    // Update market share metric
    document.querySelector('.metric-card:nth-child(1) .metric-value').textContent = metricData.marketShare + '%';
    updateMetricChange('.metric-card:nth-child(1) .metric-change', metricData.marketShareChange);
    
    // Update customer satisfaction metric
    document.querySelector('.metric-card:nth-child(2) .metric-value').textContent = metricData.customerSatisfaction + '/5';
    updateMetricChange('.metric-card:nth-child(2) .metric-change', metricData.customerSatisfactionChange);
    
    // Update growth rate metric
    document.querySelector('.metric-card:nth-child(3) .metric-value').textContent = metricData.growthRate + '%';
    updateMetricChange('.metric-card:nth-child(3) .metric-change', metricData.growthRateChange);
    
    // Update ROI metric
    document.querySelector('.metric-card:nth-child(4) .metric-value').textContent = metricData.roi + '%';
    updateMetricChange('.metric-card:nth-child(4) .metric-change', metricData.roiChange);
}

function updateMetricChange(selector, change) {
    const element = document.querySelector(selector);
    
    // Update text
    element.textContent = (change >= 0 ? '+' : '') + change + (selector.includes('nth-child(2)') ? '' : '%');
    
    // Update class
    if (change >= 0) {
        element.classList.remove('negative');
        element.classList.add('positive');
    } else {
        element.classList.remove('positive');
        element.classList.add('negative');
    }
}

// Sample data for different time periods
function getMarketTrendsData(timePeriod) {
    const data = {
        week: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            marketShare: [22.8, 23.0, 23.1, 23.3, 23.4, 23.5, 23.5],
            industryGrowth: [7.8, 7.9, 8.0, 8.0, 8.1, 8.2, 8.2]
        },
        month: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            marketShare: [22.0, 22.5, 23.0, 23.5],
            industryGrowth: [7.5, 7.7, 8.0, 8.2]
        },
        quarter: {
            labels: ['Jan', 'Feb', 'Mar'],
            marketShare: [21.2, 22.3, 23.5],
            industryGrowth: [7.0, 7.6, 8.2]
        },
        year: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            marketShare: [19.5, 21.0, 22.5, 23.5],
            industryGrowth: [6.0, 6.8, 7.5, 8.2]
        }
    };
    
    return data[timePeriod];
}

function getDemographicsData(timePeriod) {
    const data = {
        week: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [15, 30, 25, 18, 12]
        },
        month: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [16, 29, 24, 19, 12]
        },
        quarter: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [17, 28, 25, 18, 12]
        },
        year: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
            values: [18, 27, 24, 19, 12]
        }
    };
    
    return data[timePeriod];
}

function getCompetitorData(timePeriod) {
    const data = {
        week: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [23.5, 19.2, 16.8, 14.3, 26.2]
        },
        month: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [23.0, 19.5, 17.0, 14.5, 26.0]
        },
        quarter: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [22.0, 20.0, 17.5, 15.0, 25.5]
        },
        year: {
            labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
            values: [21.0, 20.5, 18.0, 15.5, 25.0]
        }
    };
    
    return data[timePeriod];
}

function getMetricData(timePeriod) {
    const data = {
        week: {
            marketShare: 23.5,
            marketShareChange: 0.3,
            customerSatisfaction: 4.7,
            customerSatisfactionChange: 0.1,
            growthRate: 8.2,
            growthRateChange: -0.1,
            roi: 142,
            roiChange: 5
        },
        month: {
            marketShare: 23.0,
            marketShareChange: 1.5,
            customerSatisfaction: 4.6,
            customerSatisfactionChange: 0.2,
            growthRate: 8.0,
            growthRateChange: -0.3,
            roi: 138,
            roiChange: 8
        },
        quarter: {
            marketShare: 21.5,
            marketShareChange: 2.0,
            customerSatisfaction: 4.5,
            customerSatisfactionChange: 0.3,
            growthRate: 7.8,
            growthRateChange: -0.4,
            roi: 130,
            roiChange: 10
        },
        year: {
            marketShare: 19.5,
            marketShareChange: 4.0,
            customerSatisfaction: 4.4,
            customerSatisfactionChange: 0.3,
            growthRate: 7.5,
            growthRateChange: -0.5,
            roi: 120,
            roiChange: 22
        }
    };
    
    return data[timePeriod];
}

// Add animation effects
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        }, 100);
    });
    
    // Add hover effects to chart cards
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'rgba(149, 157, 165, 0.2) 0px 12px 24px';
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'box-shadow 0.3s ease, transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'rgba(149, 157, 165, 0.1) 0px 8px 24px';
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
});

// Note: This JavaScript assumes the inclusion of Chart.js library in the project
// Add this line to your HTML before closing body tag:
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


 if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeToggle").firstElementChild;

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
}

window.onload = function () {
  const body = document.body;
  const icon = document.getElementById("themeToggle").firstElementChild;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    body.classList.remove("dark-mode");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }

  const currentPage = window.location.pathname.split("/").pop();

    // Set active class
    if (currentPage === "index.html" || currentPage === "") {
      document.getElementById("nav-home").classList.add("active");
    } else if (currentPage === "about.html") {
      document.getElementById("nav-about").classList.add("active");
    }
}


function goToLogin() {
      window.location.href = "../login.html"; // replace with your page
    }