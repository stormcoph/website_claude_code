document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.header');
    const backToTop = document.querySelector('.back-to-top');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.mod-card');
    const modal = document.getElementById('project-details-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalContent = document.getElementById('modal-content-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.querySelector('.contact-form');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    // Back to top button functionality
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project filtering tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            // Filter project cards
            projectCards.forEach(card => {
                if (category === 'all') {
                    card.style.display = 'flex';
                } else if (card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal functionality
    window.showProjectDetails = function(projectId) {
        // Get project details based on projectId
        const projectDetails = getProjectDetails(projectId);
        
        // Populate modal content
        modalContent.innerHTML = `
            <h2>${projectDetails.title}</h2>
            <div class="project-details">
                <div class="project-info">
                    <p>${projectDetails.description}</p>
                    <div class="project-meta">
                        <div class="meta-item">
                            <span class="meta-label">Category:</span>
                            <span class="meta-value">${projectDetails.category}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-label">Technologies:</span>
                            <span class="meta-value">${projectDetails.technologies.join(', ')}</span>
                        </div>
                        ${projectDetails.status ? `
                        <div class="meta-item">
                            <span class="meta-label">Status:</span>
                            <span class="meta-value">${projectDetails.status}</span>
                        </div>
                        ` : ''}
                    </div>
                    ${projectDetails.features ? `
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            ${projectDetails.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                </div>
            </div>
            <div class="modal-actions">
                ${projectDetails.github ? `
                <a href="${projectDetails.github}" target="_blank" class="btn btn-github">
                    <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub" class="github-icon">
                    View on GitHub
                </a>
                ` : ''}
                ${projectDetails.demo ? `
                <a href="${projectDetails.demo}" target="_blank" class="btn btn-primary">
                    <span class="material-symbols-outlined">visibility</span>
                    View Demo
                </a>
                ` : ''}
            </div>
        `;
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    // Close modal when clicking on close button
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside the modal
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (in real implementation, this would send the form data)
            const formFields = this.querySelectorAll('input, textarea');
            let allValid = true;
            
            formFields.forEach(field => {
                if (!field.validity.valid) {
                    allValid = false;
                }
            });
            
            if (allValid) {
                // Create success message element
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Message sent successfully! I will get back to you soon.';
                
                // Replace form with success message
                this.innerHTML = '';
                this.appendChild(successMessage);
            }
        });
    }

    // Interactive gradient effect
    const interactive = document.querySelector('.interactive');
    if (interactive) {
        document.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            interactive.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
        });
    }

    // Project details data (would ideally come from a database or API)
    function getProjectDetails(projectId) {
        const projectsData = {
            'lumina': {
                title: 'Lumina Client',
                description: 'Lumina is an open-source Minecraft ghost client / hacked client designed to boost your gameplay experience. It provides various features to enhance your gameplay without being detected by anti-cheat systems.',
                category: 'Game Mod',
                technologies: ['Java', 'Minecraft Forge', 'Gradle'],
                status: 'Active Development',
                features: [
                    'Highly customizable user interface',
                    'Performance optimizations',
                    'PvP enhancements',
                    'Visual improvements',
                    'Bypass for popular anti-cheat systems'
                ],
                github: 'https://github.com/stormcoph/LuminaClient'
            },
            'skytils': {
                title: 'Illegal Skytils',
                description: 'Modified Skytils version that lets users see all Skytils visuals through walls, giving them an unfair advantage in Hypixel Skyblock gameplay.',
                category: 'Game Mod',
                technologies: ['Java', 'Minecraft Forge'],
                features: [
                    'See Skytils visuals through walls',
                    'Enhanced dungeon features',
                    'Improved boss fight indicators',
                    'Custom settings for all features'
                ],
                github: 'https://github.com/stormcoph/Illegal-Skytils'
            },
            'luminapaid': {
                title: 'Lumina Paid',
                description: 'A premium version of the Lumina client with enhanced features, improved GUI, and additional modules not available in the free version.',
                category: 'Game Mod',
                technologies: ['Java', 'Minecraft Forge', 'Gradle'],
                status: 'Private',
                features: [
                    'Advanced combat modules',
                    'Premium visuals and ESP features', 
                    'Custom animation system',
                    'Enhanced anti-detection measures',
                    'Priority support and updates'
                ]
            },
            'backrooms': {
                title: 'Backrooms Hack',
                description: 'A C# project that modifies memory addresses in the popular "Escape The Backrooms Game" to provide various advantages while playing.',
                category: 'Game Hack',
                technologies: ['C#', 'Memory Manipulation'],
                status: 'Private',
                features: [
                    'Infinite health and stamina',
                    'No monster detection',
                    'Speed boost options',
                    'Item spawning capabilities',
                    'Teleportation between areas'
                ]
            },
            'emat': {
                title: 'Emat Hacks',
                description: 'A hack for a local school math program designed to automatically solve math problems to earn leaderboard points. Note: This resulted in a ban from the program.',
                category: 'Educational Tool',
                technologies: ['Python', 'Web Automation'],
                status: 'Completed',
                features: [
                    'Automatic problem detection',
                    'Quick solution calculation',
                    'Answer submission automation',
                    'Score tracking and analytics'
                ]
            },
            'mm': {
                title: 'Murder Mystery Hack',
                description: 'A Minecraft mod for the Hypixel Murder Mystery gamemode that detects and displays the roles of players, giving the user an unfair advantage.',
                category: 'Game Mod',
                technologies: ['Java', 'Minecraft Forge'],
                features: [
                    'Automatic murderer and detective detection',
                    'ESP visuals for all players',
                    'Tracers to important players',
                    'Alert systems for nearby threats',
                    'Item and weapon tracking'
                ],
                github: 'https://github.com/stormcoph/mmDetector'
            },
            'copenheimer': {
                title: 'Copenheimer Copy',
                description: 'A Python recreation of the infamous Copenheimer bot. Inspired by FitMC\'s video on the original bot and its impact.',
                category: 'Tool',
                technologies: ['Python', 'Discord API', 'Automation'],
                features: [
                    'Server scanning capabilities',
                    'Automated message handling',
                    'Data collection and analysis',
                    'Customizable behavior patterns'
                ],
                github: 'https://github.com/stormcoph/stormcph-copenheimer'
            },
            'enderchest': {
                title: 'Disable Enderchest',
                description: 'A serverside Minecraft mod that prevents players from opening enderchests. Created for an SMP server to prevent players from hiding valuable items like the dragon egg.',
                category: 'Server Plugin',
                technologies: ['Java', 'Spigot API'],
                features: [
                    'Complete enderchest blocking',
                    'Customizable player messages',
                    'Permission-based access control',
                    'Admin override capabilities'
                ],
                github: 'https://github.com/stormcoph/Disable-Enderchest'
            },
            'reposcraper': {
                title: 'Repo Scraper',
                description: 'A tool that scrapes entire GitHub repositories into a single file, making it easier to use the code for training language models or other data analysis purposes.',
                category: 'Development Tool',
                technologies: ['Python', 'GitHub API'],
                features: [
                    'Complete repository download',
                    'Customizable file filters',
                    'Structured output formats',
                    'Authentication for private repos',
                    'Rate limit handling'
                ],
                github: 'https://github.com/stormcoph/RepoScraper'
            },
            'luminawebsite': {
                title: 'Lumina Website',
                description: 'The official website for the Lumina Client. A simple but functional website to showcase the features and provide download links for the client.',
                category: 'Web Development',
                technologies: ['HTML', 'CSS', 'JavaScript'],
                status: 'Needs Improvement',
                features: [
                    'Download links for the client',
                    'Feature showcase',
                    'Installation instructions',
                    'Basic documentation'
                ],
                github: 'https://github.com/stormcoph/LuminaWebsite'
            },
            'huggingface': {
                title: 'Huggingface AI Models',
                description: 'A collection of AI models published on Huggingface, primarily for use with the AI aimbot project. Includes models trained for various games like Valorant, Arsenal, Aimlabs, and Xdefiant.',
                category: 'AI Development',
                technologies: ['Python', 'PyTorch', 'Computer Vision'],
                features: [
                    'Game-specific object detection models',
                    'High accuracy player detection',
                    'Optimized for real-time performance',
                    'Various target classification models'
                ],
                demo: 'https://huggingface.co/stormcph'
            }
        };

        return projectsData[projectId] || {
            title: 'Project Details',
            description: 'Detailed information about this project is not available yet.',
            category: 'Unknown',
            technologies: ['Not specified']
        };
    }
});
