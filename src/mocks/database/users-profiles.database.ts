import type { UserProfile } from '@/features/profile/types'

export const usersProfilesDatabase: UserProfile[] = [
    {
        id: 1,
        avatar: 'https://i.pravatar.cc/150?img=1',
        name: 'Neil Sims',
        role: 'Front End Developer',
        country: 'United States',
        contact: {
            email: 'neil.sims1@example.com',
            address:
                '1458 Market Street, San Francisco, CA 94103, United States',
            phone: '+12024560101',
        },
        about: 'Experienced Front End Developer with more than 8 years of experience building scalable web applications using React, TypeScript and modern frontend tooling. Passionate about creating intuitive user experiences, improving performance and collaborating with cross-functional teams to deliver high-quality products.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'javascript', label: 'JavaScript' },
            { id: 'sass', label: 'Sass' },
            { id: 'vite', label: 'Vite' },
            { id: 'redux', label: 'Redux Toolkit' },
        ],
        summary: {
            products: {
                count: 138,
                variation: 14,
            },
            users: {
                count: 42,
                variation: 7,
            },
            profile: {
                role: 'Senior Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T15:30:00.000Z',
                memberSince: '2021-03-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Admin Dashboard',
                createdAt: '2026-07-19T18:15:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Analytics Widget',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-updated',
                target: 'Sarah Johnson',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'product-image-uploaded',
                target: 'Customer Portal',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Admin Panel',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
                name: 'Developer Laptop',
                category: 'Electronics',
                price: 2499,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc',
                name: '4K Monitor',
                category: 'Electronics',
                price: 799,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae',
                name: 'Mechanical Keyboard',
                category: 'Accessories',
                price: 149,
                stockQuantity: 5,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2022 - Present',
                title: 'Senior Front End Developer',
                organization: 'TechCorp',
                description:
                    'Leading development of enterprise web applications using React, TypeScript and modern frontend architecture.',
            },
            {
                id: 2,
                period: '2019 - 2022',
                title: 'Front End Developer',
                organization: 'Digital Labs',
                description:
                    'Developed responsive applications and collaborated with backend teams to deliver customer-facing platforms.',
            },
            {
                id: 3,
                period: '2016 - 2019',
                title: 'UI Developer',
                organization: 'Creative Web',
                description:
                    'Implemented design systems and responsive interfaces using JavaScript and SCSS.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2013 - 2015',
                title: 'Master of Software Engineering',
                organization: 'University of California',
                description:
                    'Focused on web architecture, software design patterns and distributed systems.',
            },
            {
                id: 2,
                period: '2009 - 2013',
                title: 'Bachelor of Computer Science',
                organization: 'San Francisco State University',
                description:
                    'Studied programming, algorithms, databases and software engineering.',
            },
        ],
    },
    {
        id: 2,
        avatar: 'https://i.pravatar.cc/150?img=2',
        name: 'Roberta Casas',
        role: 'Designer',
        country: 'Spain',
        contact: {
            email: 'roberta.casas2@example.com',
            address: '22 Avenida Diagonal, Barcelona 08019, Spain',
            phone: '+34600110102',
        },
        about: 'Creative Designer with extensive experience creating digital products, branding systems and user-centered interfaces. Passionate about transforming business requirements into engaging visual experiences while maintaining usability and accessibility standards.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'photoshop', label: 'Photoshop' },
            { id: 'illustrator', label: 'Illustrator' },
            { id: 'design-system', label: 'Design Systems' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'branding', label: 'Branding' },
        ],
        summary: {
            products: {
                count: 96,
                variation: 8,
            },
            users: {
                count: 27,
                variation: 4,
            },
            profile: {
                role: 'Lead Designer',
                status: 'active',
                lastLogin: '2026-07-19T17:45:00.000Z',
                memberSince: '2022-09-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Design System Kit',
                createdAt: '2026-07-19T18:10:00.000Z',
            },
            {
                id: 2,
                type: 'product-image-uploaded',
                target: 'Mobile App Mockups',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Miguel Santos',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Designer Profile',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Design Dashboard',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Design System Template',
                category: 'Design Assets',
                price: 89,
                stockQuantity: 20,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'UI Component Pack',
                category: 'Design Assets',
                price: 59,
                stockQuantity: 15,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Brand Guidelines Kit',
                category: 'Branding',
                price: 120,
                stockQuantity: 6,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Lead Designer',
                organization: 'Designify',
                description:
                    'Managing design systems, product branding and UX initiatives across multiple digital products.',
            },
            {
                id: 2,
                period: '2018 - 2021',
                title: 'UI Designer',
                organization: 'Creative Studio',
                description:
                    'Created web and mobile interfaces, interactive prototypes and design documentation.',
            },
            {
                id: 3,
                period: '2015 - 2018',
                title: 'Graphic Designer',
                organization: 'Visual Arts Agency',
                description:
                    'Produced marketing assets, brand identities and print materials.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2013 - 2015',
                title: 'Master of Visual Communication',
                organization: 'University of Barcelona',
                description:
                    'Specialized in digital design, branding and user experience.',
            },
            {
                id: 2,
                period: '2009 - 2013',
                title: 'Bachelor of Graphic Design',
                organization: 'Barcelona School of Arts',
                description:
                    'Focused on visual design, typography and creative communication.',
            },
        ],
    },
    {
        id: 3,
        avatar: 'https://i.pravatar.cc/150?img=3',
        name: 'Michael Gough',
        role: 'React Developer',
        country: 'United Kingdom',
        contact: {
            email: 'michael.gough3@example.com',
            address: '18 King Street, Manchester M2 6AG, United Kingdom',
            phone: '+447700900103',
        },
        about: 'React Developer with strong experience building scalable single-page applications and enterprise dashboards. Skilled in modern frontend technologies, performance optimization and reusable component architectures. Passionate about delivering maintainable solutions and exceptional user experiences.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nextjs', label: 'Next.js' },
            { id: 'redux-toolkit', label: 'Redux Toolkit' },
            { id: 'react-query', label: 'React Query' },
            { id: 'jest', label: 'Jest' },
        ],
        summary: {
            products: {
                count: 118,
                variation: 11,
            },
            users: {
                count: 34,
                variation: 6,
            },
            profile: {
                role: 'Senior React Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:05:00.000Z',
                memberSince: '2022-05-14T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Analytics Dashboard',
                createdAt: '2026-07-19T18:20:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'React Component Library',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Emma Thompson',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'product-image-uploaded',
                target: 'Admin Portal',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'WebWorks Platform',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'React UI Kit',
                category: 'Software',
                price: 149,
                stockQuantity: 16,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Developer Toolkit',
                category: 'Software',
                price: 299,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
                name: 'Dashboard Template',
                category: 'Templates',
                price: 89,
                stockQuantity: 22,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior React Developer',
                organization: 'WebWorks',
                description:
                    'Leading frontend initiatives, developing scalable React applications and mentoring junior developers.',
            },
            {
                id: 2,
                period: '2018 - 2021',
                title: 'Frontend Developer',
                organization: 'Digital Systems UK',
                description:
                    'Built responsive interfaces and reusable UI components using React and TypeScript.',
            },
            {
                id: 3,
                period: '2015 - 2018',
                title: 'Web Developer',
                organization: 'Creative Media',
                description:
                    'Developed customer-facing websites and improved application performance.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Software Development',
                organization: 'University of Manchester',
                description:
                    'Focused on software architecture, web engineering and modern application development.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'University of Liverpool',
                description:
                    'Studied algorithms, programming languages and database systems.',
            },
        ],
    },
    {
        id: 4,
        avatar: 'https://i.pravatar.cc/150?img=4',
        name: 'Jese Leos',
        role: 'Marketing',
        country: 'Mexico',
        contact: {
            email: 'jese.leos4@example.com',
            address: '245 Avenida Reforma, Mexico City 06600, Mexico',
            phone: '+525512345678',
        },
        about: 'Results-driven marketing professional with extensive experience in digital campaigns, customer acquisition and brand strategy. Skilled at analyzing market trends, improving conversion rates and creating impactful campaigns that drive measurable business growth.',
        skills: [
            { id: 'seo', label: 'SEO' },
            { id: 'google-analytics', label: 'Google Analytics' },
            { id: 'content-marketing', label: 'Content Marketing' },
            { id: 'email-marketing', label: 'Email Marketing' },
            { id: 'social-media', label: 'Social Media' },
            { id: 'campaign-management', label: 'Campaign Management' },
        ],
        summary: {
            products: {
                count: 82,
                variation: 5,
            },
            users: {
                count: 61,
                variation: 12,
            },
            profile: {
                role: 'Marketing Manager',
                status: 'inactive',
                lastLogin: '2026-07-18T18:30:00.000Z',
                memberSince: '2021-01-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'user-created',
                target: 'Marketing Intern',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Summer Campaign',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-updated',
                target: 'Carlos Mendoza',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Marketing Account',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Marketing Analytics Suite',
                category: 'Software',
                price: 399,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'SEO Optimization Package',
                category: 'Services',
                price: 249,
                stockQuantity: 7,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Campaign Dashboard',
                category: 'Software',
                price: 199,
                stockQuantity: 14,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Marketing Manager',
                organization: 'MarketPro',
                description:
                    'Leading multi-channel marketing strategies and customer acquisition campaigns.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Digital Marketing Specialist',
                organization: 'Growth Agency',
                description:
                    'Managed paid advertising campaigns, SEO initiatives and content strategies.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Marketing Coordinator',
                organization: 'Creative Brands',
                description:
                    'Supported campaign execution and performance analysis for national brands.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Marketing',
                organization: 'National Autonomous University of Mexico',
                description:
                    'Specialized in digital marketing, branding and consumer behavior.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'University of Guadalajara',
                description:
                    'Focused on business management, marketing and strategic planning.',
            },
        ],
    },
    {
        id: 5,
        avatar: 'https://i.pravatar.cc/150?img=5',
        name: 'Bonnie Green',
        role: 'Front End Developer',
        country: 'Canada',
        contact: {
            email: 'bonnie.green5@example.com',
            address: '88 King Street West, Toronto, ON M5H 1A1, Canada',
            phone: '+14165550105',
        },
        about: 'Front End Developer focused on creating fast, accessible and user-friendly web applications. Experienced in React, TypeScript and modern frontend ecosystems with a strong emphasis on code quality, responsive design and performance optimization.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'sass', label: 'Sass' },
            { id: 'vite', label: 'Vite' },
            { id: 'storybook', label: 'Storybook' },
            { id: 'accessibility', label: 'Accessibility' },
        ],
        summary: {
            products: {
                count: 105,
                variation: 9,
            },
            users: {
                count: 29,
                variation: 4,
            },
            profile: {
                role: 'Frontend Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T13:30:00.000Z',
                memberSince: '2022-08-17T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Customer Portal',
                createdAt: '2026-07-19T17:50:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'UI Component Library',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Daniel Moore',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'TechCorp Dashboard',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8',
                name: 'MacBook Air',
                category: 'Electronics',
                price: 1599,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc',
                name: 'UltraWide Monitor',
                category: 'Electronics',
                price: 699,
                stockQuantity: 5,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
                name: 'Wireless Keyboard',
                category: 'Accessories',
                price: 129,
                stockQuantity: 12,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2022 - Present',
                title: 'Front End Developer',
                organization: 'TechCorp',
                description:
                    'Building modern web applications and maintaining scalable frontend architectures.',
            },
            {
                id: 2,
                period: '2018 - 2022',
                title: 'UI Engineer',
                organization: 'Maple Digital',
                description:
                    'Developed responsive interfaces and collaborated with design teams to improve UX.',
            },
            {
                id: 3,
                period: '2015 - 2018',
                title: 'Junior Frontend Developer',
                organization: 'Northern Tech',
                description:
                    'Contributed to web projects using JavaScript, HTML and CSS.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Information Technology',
                organization: 'University of Toronto',
                description:
                    'Focused on software engineering, web systems and cloud computing.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'York University',
                description:
                    'Studied software development, databases and system design.',
            },
        ],
    },
    {
        id: 6,
        avatar: 'https://i.pravatar.cc/150?img=6',
        name: 'Thomas Lean',
        role: 'Front End Developer',
        country: 'Australia',
        contact: {
            email: 'thomas.lean6@example.com',
            address: '125 George Street, Sydney NSW 2000, Australia',
            phone: '+61412345106',
        },
        about: 'Front End Developer with extensive experience building high-performance web applications and enterprise dashboards. Passionate about clean architecture, scalable component systems and creating exceptional user experiences through modern frontend technologies.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'sass', label: 'Sass' },
            { id: 'vite', label: 'Vite' },
            { id: 'storybook', label: 'Storybook' },
            { id: 'react-hook-form', label: 'React Hook Form' },
        ],
        summary: {
            products: {
                count: 143,
                variation: 17,
            },
            users: {
                count: 46,
                variation: 8,
            },
            profile: {
                role: 'Senior Frontend Engineer',
                status: 'active',
                lastLogin: '2026-07-19T18:18:00.000Z',
                memberSince: '2021-02-21T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Admin Dashboard',
                createdAt: '2026-07-19T18:25:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Analytics Module',
                createdAt: '2026-07-19T17:50:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Jessica Brown',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Account',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'TechCorp Portal',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8',
                name: 'MacBook Pro M4',
                category: 'Electronics',
                price: 3299,
                stockQuantity: 7,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc',
                name: 'Studio Display',
                category: 'Electronics',
                price: 1599,
                stockQuantity: 4,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a',
                name: 'MX Mechanical Keyboard',
                category: 'Accessories',
                price: 179,
                stockQuantity: 11,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Frontend Engineer',
                organization: 'TechCorp',
                description:
                    'Leading frontend architecture decisions and developing enterprise-grade React applications.',
            },
            {
                id: 2,
                period: '2018 - 2021',
                title: 'Front End Developer',
                organization: 'Sydney Digital',
                description:
                    'Developed scalable web platforms and collaborated closely with product and design teams.',
            },
            {
                id: 3,
                period: '2015 - 2018',
                title: 'UI Developer',
                organization: 'Creative Software',
                description:
                    'Implemented responsive interfaces and reusable component libraries.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Information Technology',
                organization: 'University of Sydney',
                description:
                    'Focused on software engineering, web technologies and cloud systems.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'University of Technology Sydney',
                description:
                    'Studied software development, algorithms and system architecture.',
            },
        ],
    },
    {
        id: 7,
        avatar: 'https://i.pravatar.cc/150?img=7',
        name: 'Helene Engels',
        role: 'Laravel Developer',
        country: 'Germany',
        contact: {
            email: 'helene.engels7@example.com',
            address: '41 Friedrichstraße, Berlin 10117, Germany',
            phone: '+4915123456107',
        },
        about: 'Laravel Developer specialized in building robust backend systems, REST APIs and scalable web platforms. Experienced with modern PHP development practices, database optimization and cloud-based deployments for enterprise applications.',
        skills: [
            { id: 'laravel', label: 'Laravel' },
            { id: 'php', label: 'PHP' },
            { id: 'mysql', label: 'MySQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'redis', label: 'Redis' },
            { id: 'aws', label: 'AWS' },
        ],
        summary: {
            products: {
                count: 91,
                variation: 6,
            },
            users: {
                count: 24,
                variation: 3,
            },
            profile: {
                role: 'Senior Backend Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T10:30:00.000Z',
                memberSince: '2021-11-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Customer API',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Inventory Service',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-updated',
                target: 'Max Müller',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Developer Account',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Platform',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Hosting Package',
                category: 'Infrastructure',
                price: 499,
                stockQuantity: 13,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'API Management Suite',
                category: 'Software',
                price: 349,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Database Toolkit',
                category: 'Software',
                price: 189,
                stockQuantity: 17,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Laravel Developer',
                organization: 'DevSolutions',
                description:
                    'Designing backend architectures, APIs and scalable services for enterprise applications.',
            },
            {
                id: 2,
                period: '2017 - 2020',
                title: 'Backend Developer',
                organization: 'Berlin Tech Labs',
                description:
                    'Developed Laravel applications and optimized database performance for high-traffic systems.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'PHP Developer',
                organization: 'Web Systems GmbH',
                description:
                    'Built custom web solutions and integrated third-party services for clients.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Computer Engineering',
                organization: 'Technical University of Berlin',
                description:
                    'Specialized in distributed systems, backend development and software architecture.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'Humboldt University of Berlin',
                description:
                    'Focused on programming, databases and software engineering.',
            },
        ],
    },
    {
        id: 8,
        avatar: 'https://i.pravatar.cc/150?img=8',
        name: 'Lana Byrd',
        role: 'UI/UX Engineer',
        country: 'France',
        contact: {
            email: 'lana.byrd8@example.com',
            address: '56 Avenue des Champs-Élysées, Paris 75008, France',
            phone: '+33612345108',
        },
        about: 'UI/UX Engineer dedicated to creating intuitive digital experiences through user-centered design principles. Combines design thinking with technical expertise to build interfaces that are visually appealing, accessible and highly usable.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'adobe-xd', label: 'Adobe XD' },
            { id: 'user-research', label: 'User Research' },
            { id: 'wireframing', label: 'Wireframing' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'design-systems', label: 'Design Systems' },
        ],
        summary: {
            products: {
                count: 112,
                variation: 13,
            },
            users: {
                count: 31,
                variation: 5,
            },
            profile: {
                role: 'Senior UI/UX Engineer',
                status: 'active',
                lastLogin: '2026-07-19T18:12:00.000Z',
                memberSince: '2022-07-05T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Mobile Design System',
                createdAt: '2026-07-19T18:05:00.000Z',
            },
            {
                id: 2,
                type: 'product-image-uploaded',
                target: 'E-Commerce Prototype',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marie Laurent',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Designer Profile',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Mobile UI Kit',
                category: 'Design Assets',
                price: 79,
                stockQuantity: 21,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Design System Library',
                category: 'Design Assets',
                price: 129,
                stockQuantity: 12,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'UX Research Bundle',
                category: 'Resources',
                price: 99,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior UI/UX Engineer',
                organization: 'Designify',
                description:
                    'Leading user experience initiatives and creating scalable design systems for digital products.',
            },
            {
                id: 2,
                period: '2018 - 2021',
                title: 'UX Designer',
                organization: 'Creative Paris',
                description:
                    'Conducted user research, prototyping and usability testing for web and mobile applications.',
            },
            {
                id: 3,
                period: '2015 - 2018',
                title: 'UI Designer',
                organization: 'Studio Digital',
                description:
                    'Designed responsive interfaces and collaborated with development teams to deliver polished experiences.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Interaction Design',
                organization: 'Sorbonne University',
                description:
                    'Focused on user experience, interface design and human-computer interaction.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Digital Design',
                organization: 'University of Paris',
                description:
                    'Studied visual communication, design principles and interactive media.',
            },
        ],
    },
    {
        id: 9,
        avatar: 'https://i.pravatar.cc/150?img=9',
        name: 'Leslie Livingston',
        role: 'Web Designer',
        country: 'Italy',
        contact: {
            email: 'leslie.livingston9@example.com',
            address: '28 Via Roma, Milan 20121, Italy',
            phone: '+393123456109',
        },
        about: 'Creative Web Designer with extensive experience crafting visually engaging and user-friendly digital experiences. Specialized in responsive web design, design systems and modern UI patterns that combine aesthetics with usability and accessibility.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'html', label: 'HTML5' },
            { id: 'css', label: 'CSS3' },
            { id: 'responsive-design', label: 'Responsive Design' },
            { id: 'adobe-photoshop', label: 'Adobe Photoshop' },
            { id: 'wireframing', label: 'Wireframing' },
        ],
        summary: {
            products: {
                count: 87,
                variation: 7,
            },
            users: {
                count: 22,
                variation: 3,
            },
            profile: {
                role: 'Senior Web Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T12:30:00.000Z',
                memberSince: '2021-10-11T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Landing Page Collection',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-image-uploaded',
                target: 'Travel Website Mockup',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marco Rossi',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Design Portfolio',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Website UI Kit',
                category: 'Design Assets',
                price: 89,
                stockQuantity: 16,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Landing Page Bundle',
                category: 'Templates',
                price: 59,
                stockQuantity: 24,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Creative Design Pack',
                category: 'Resources',
                price: 119,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Web Designer',
                organization: 'Designify',
                description:
                    'Creating modern web experiences, design systems and responsive interfaces for international clients.',
            },
            {
                id: 2,
                period: '2017 - 2020',
                title: 'Web Designer',
                organization: 'Creative Studio Milano',
                description:
                    'Designed websites, digital campaigns and user interfaces for startups and enterprise businesses.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Junior Designer',
                organization: 'Visual Agency',
                description:
                    'Supported branding projects and website design initiatives across multiple industries.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Design',
                organization: 'Politecnico di Milano',
                description:
                    'Specialized in interaction design, digital communication and web experiences.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Visual Arts',
                organization: 'University of Milan',
                description:
                    'Studied visual communication, design principles and multimedia design.',
            },
        ],
    },
    {
        id: 10,
        avatar: 'https://i.pravatar.cc/150?img=10',
        name: 'Karen Nelson',
        role: 'Designer',
        country: 'Netherlands',
        contact: {
            email: 'karen.nelson10@example.com',
            address: '91 Herengracht, Amsterdam 1015, Netherlands',
            phone: '+31612345110',
        },
        about: 'Designer passionate about creating meaningful visual experiences through branding, digital products and user-centered design. Skilled in balancing creativity and business objectives to deliver solutions that engage users and strengthen brand identity.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'illustrator', label: 'Illustrator' },
            { id: 'photoshop', label: 'Photoshop' },
            { id: 'branding', label: 'Branding' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'prototyping', label: 'Prototyping' },
        ],
        summary: {
            products: {
                count: 103,
                variation: 12,
            },
            users: {
                count: 35,
                variation: 6,
            },
            profile: {
                role: 'Lead Designer',
                status: 'active',
                lastLogin: '2026-07-19T18:16:00.000Z',
                memberSince: '2022-04-19T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Brand Identity System',
                createdAt: '2026-07-19T18:05:00.000Z',
            },
            {
                id: 2,
                type: 'product-image-uploaded',
                target: 'Mobile Design Library',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Emma van Dijk',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Design Account',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Creative Workspace',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Brand Kit Pro',
                category: 'Design Assets',
                price: 149,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'UI Pattern Library',
                category: 'Resources',
                price: 99,
                stockQuantity: 18,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Creative Template Pack',
                category: 'Templates',
                price: 69,
                stockQuantity: 27,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Lead Designer',
                organization: 'Designify',
                description:
                    'Leading branding initiatives, product design systems and visual identity projects.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Senior Designer',
                organization: 'Amsterdam Creative',
                description:
                    'Worked on digital products, visual systems and customer experience improvements.',
            },
            {
                id: 3,
                period: '2013 - 2017',
                title: 'Graphic Designer',
                organization: 'Orange Studio',
                description:
                    'Created marketing materials, branding assets and digital campaigns.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Design',
                organization: 'University of Amsterdam',
                description:
                    'Focused on visual communication, branding and interactive design.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Arts and Design',
                organization: 'Amsterdam University of Applied Sciences',
                description:
                    'Studied graphic design, typography and digital media.',
            },
        ],
    },
    {
        id: 11,
        avatar: 'https://i.pravatar.cc/150?img=11',
        name: 'Robert Brown',
        role: 'SEO Specialist',
        country: 'United States',
        contact: {
            email: 'robert.brown11@example.com',
            address: '310 Madison Avenue, New York, NY 10017, United States',
            phone: '+12024560111',
        },
        about: 'SEO Specialist with proven experience increasing organic traffic, improving search rankings and building data-driven digital marketing strategies. Strong background in technical SEO, content optimization and search performance analysis.',
        skills: [
            { id: 'seo', label: 'SEO' },
            { id: 'google-analytics', label: 'Google Analytics' },
            { id: 'google-search-console', label: 'Google Search Console' },
            { id: 'keyword-research', label: 'Keyword Research' },
            { id: 'technical-seo', label: 'Technical SEO' },
            { id: 'content-strategy', label: 'Content Strategy' },
        ],
        summary: {
            products: {
                count: 76,
                variation: 8,
            },
            users: {
                count: 58,
                variation: 10,
            },
            profile: {
                role: 'Senior SEO Specialist',
                status: 'inactive',
                lastLogin: '2026-07-19T09:30:00.000Z',
                memberSince: '2021-01-27T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'SEO Audit Platform',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'user-created',
                target: 'Olivia Carter',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-updated',
                target: 'Marketing Team',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'SEO Account',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'SEO Analytics Suite',
                category: 'Marketing Tools',
                price: 299,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Keyword Research Toolkit',
                category: 'Marketing Tools',
                price: 149,
                stockQuantity: 21,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Content Optimization Package',
                category: 'Services',
                price: 199,
                stockQuantity: 8,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior SEO Specialist',
                organization: 'MarketPro',
                description:
                    'Managing SEO strategies, technical audits and organic growth initiatives for enterprise clients.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'SEO Analyst',
                organization: 'Growth Marketing Agency',
                description:
                    'Performed keyword research, technical SEO audits and search performance reporting.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Digital Marketing Coordinator',
                organization: 'Media Growth Solutions',
                description:
                    'Supported content marketing, search optimization and campaign analytics.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Marketing',
                organization: 'New York University',
                description:
                    'Specialized in digital strategy, search marketing and analytics.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Boston University',
                description:
                    'Focused on marketing, management and business analytics.',
            },
        ],
    },
    {
        id: 12,
        avatar: 'https://i.pravatar.cc/150?img=12',
        name: 'Joseph McFall',
        role: 'Developer',
        country: 'Ireland',
        contact: {
            email: 'joseph.mcfall12@example.com',
            address: '78 O’Connell Street, Dublin D01 F5P2, Ireland',
            phone: '+353831234112',
        },
        about: 'Software Developer with experience building scalable web applications and backend services. Passionate about clean code, modern development practices and creating reliable software solutions that help businesses grow and improve operational efficiency.',
        skills: [
            { id: 'javascript', label: 'JavaScript' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'express', label: 'Express' },
            { id: 'mongodb', label: 'MongoDB' },
            { id: 'git', label: 'Git' },
        ],
        summary: {
            products: {
                count: 98,
                variation: 10,
            },
            users: {
                count: 29,
                variation: 4,
            },
            profile: {
                role: 'Senior Software Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:08:00.000Z',
                memberSince: '2022-06-15T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Management API',
                createdAt: '2026-07-19T18:15:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Billing Service',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Patrick Doyle',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Developer Account',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Portal',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'API Gateway Service',
                category: 'Software',
                price: 349,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Developer Toolkit',
                category: 'Software',
                price: 179,
                stockQuantity: 18,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Monitoring Dashboard',
                category: 'Software',
                price: 259,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Software Developer',
                organization: 'DevSolutions',
                description:
                    'Building enterprise-grade applications, APIs and scalable backend services for international clients.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Full Stack Developer',
                organization: 'Irish Digital Labs',
                description:
                    'Developed modern web applications using JavaScript, Node.js and cloud technologies.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Junior Developer',
                organization: 'CodeWorks Ireland',
                description:
                    'Contributed to web development projects and software maintenance initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Trinity College Dublin',
                description:
                    'Focused on software architecture, distributed systems and modern development methodologies.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University College Dublin',
                description:
                    'Studied programming, databases, networking and software development.',
            },
        ],
    },
    {
        id: 13,
        avatar: 'https://i.pravatar.cc/150?img=13',
        name: 'Amanda Silva',
        role: 'Back End Developer',
        country: 'Brazil',
        contact: {
            email: 'amanda.silva13@example.com',
            address: 'Av. Paulista, 1578, São Paulo, SP 01310-200, Brazil',
            phone: '+5511982340113',
        },
        about: 'Back End Developer specialized in designing scalable APIs, microservices and cloud-native applications. Experienced with database modeling, performance optimization and building secure systems that support high-traffic platforms.',
        skills: [
            { id: 'java', label: 'Java' },
            { id: 'spring-boot', label: 'Spring Boot' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'rabbitmq', label: 'RabbitMQ' },
        ],
        summary: {
            products: {
                count: 114,
                variation: 14,
            },
            users: {
                count: 41,
                variation: 6,
            },
            profile: {
                role: 'Senior Backend Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T11:30:00.000Z',
                memberSince: '2021-03-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Payment Processing Service',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Authentication API',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-updated',
                target: 'Development Team',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Backend Environment',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Microservices Platform',
                category: 'Software',
                price: 499,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Authentication Suite',
                category: 'Software',
                price: 299,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Database Manager',
                category: 'Software',
                price: 189,
                stockQuantity: 21,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Backend Developer',
                organization: 'DevSolutions',
                description:
                    'Leading backend architecture initiatives, API development and cloud infrastructure integration.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Backend Developer',
                organization: 'Tech Brasil',
                description:
                    'Developed scalable APIs, database solutions and distributed systems for enterprise clients.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Developer',
                organization: 'Code Factory',
                description:
                    'Worked on web applications, integrations and backend service development.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Computer Engineering',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on distributed systems, software architecture and cloud computing.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'Universidade Estadual de Campinas',
                description:
                    'Studied software engineering, databases, networking and algorithms.',
            },
        ],
    },
    {
        id: 14,
        avatar: 'https://i.pravatar.cc/150?img=14',
        name: 'Lucas Martins',
        role: 'DevOps Engineer',
        country: 'Brazil',
        contact: {
            email: 'lucas.martins14@example.com',
            address: 'Rua Oscar Freire, 875, São Paulo, SP 01426-001, Brazil',
            phone: '+5511982340114',
        },
        about: 'DevOps Engineer focused on cloud infrastructure, automation and continuous delivery pipelines. Experienced in building highly available environments, improving deployment processes and optimizing operational efficiency across development teams.',
        skills: [
            { id: 'aws', label: 'AWS' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'docker', label: 'Docker' },
            { id: 'github-actions', label: 'GitHub Actions' },
            { id: 'prometheus', label: 'Prometheus' },
        ],
        summary: {
            products: {
                count: 132,
                variation: 18,
            },
            users: {
                count: 37,
                variation: 5,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'active',
                lastLogin: '2026-07-19T18:22:00.000Z',
                memberSince: '2022-09-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'CI/CD Pipeline',
                createdAt: '2026-07-19T18:20:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Infrastructure Automation',
                createdAt: '2026-07-19T17:45:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Cloud Operations Team',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'CloudOps Account',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'CloudOps Platform',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Infrastructure Suite',
                category: 'Infrastructure',
                price: 799,
                stockQuantity: 6,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Monitoring Platform',
                category: 'Infrastructure',
                price: 399,
                stockQuantity: 15,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Automation Toolkit',
                category: 'DevOps',
                price: 249,
                stockQuantity: 19,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud infrastructure, deployment automation and observability solutions.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Infrastructure Engineer',
                organization: 'Cloud Brasil',
                description:
                    'Implemented scalable cloud environments and CI/CD pipelines for enterprise systems.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Systems Administrator',
                organization: 'Tech Network',
                description:
                    'Maintained servers, network infrastructure and deployment environments.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Systems',
                organization: 'Universidade de São Paulo',
                description:
                    'Specialized in cloud computing, distributed systems and IT infrastructure.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Engineering',
                organization: 'Universidade Federal de São Carlos',
                description:
                    'Studied software engineering, operating systems and computer networks.',
            },
        ],
    },
    {
        id: 15,
        avatar: 'https://i.pravatar.cc/150?img=15',
        name: 'Sophia Turner',
        role: 'Product Manager',
        country: 'United Kingdom',
        contact: {
            email: 'sophia.turner15@example.com',
            address: '125 Oxford Street, London W1D 2HX, United Kingdom',
            phone: '+447700900115',
        },
        about: 'Product Manager with extensive experience leading cross-functional teams and delivering successful digital products. Skilled in product strategy, roadmap planning, stakeholder management and translating business requirements into scalable solutions that create value for customers.',
        skills: [
            { id: 'product-management', label: 'Product Management' },
            { id: 'roadmap-planning', label: 'Roadmap Planning' },
            { id: 'agile', label: 'Agile' },
            { id: 'scrum', label: 'Scrum' },
            { id: 'user-research', label: 'User Research' },
            { id: 'product-analytics', label: 'Product Analytics' },
        ],
        summary: {
            products: {
                count: 127,
                variation: 15,
            },
            users: {
                count: 52,
                variation: 7,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T13:30:00.000Z',
                memberSince: '2021-01-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Insights Platform',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Product Roadmap Q4',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Oliver Bennett',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Management Account',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Product Analytics Suite',
                category: 'Business',
                price: 499,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Customer Research Toolkit',
                category: 'Business',
                price: 249,
                stockQuantity: 15,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Roadmap Planner',
                category: 'Productivity',
                price: 149,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, roadmap execution and collaboration between engineering and design teams.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Product Owner',
                organization: 'Digital Products UK',
                description:
                    'Managed product backlogs, feature prioritization and delivery of customer-facing platforms.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Business Analyst',
                organization: 'Innovation Labs',
                description:
                    'Gathered requirements and helped define product vision and business objectives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Business Innovation',
                organization: 'University of Manchester',
                description:
                    'Focused on product development, business strategy and innovation management.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'University of Leeds',
                description:
                    'Studied management, marketing and organizational strategy.',
            },
        ],
    },
    {
        id: 16,
        avatar: 'https://i.pravatar.cc/150?img=16',
        name: 'John Carter',
        role: 'Full Stack Developer',
        country: 'Canada',
        contact: {
            email: 'john.carter16@example.com',
            address: '220 King Street West, Toronto, ON M5V 3M2, Canada',
            phone: '+14165550116',
        },
        about: 'Full Stack Developer with strong expertise in frontend and backend technologies. Experienced in building scalable applications, REST APIs and modern user interfaces while maintaining clean architecture and high code quality standards.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'nestjs', label: 'NestJS' },
        ],
        summary: {
            products: {
                count: 138,
                variation: 19,
            },
            users: {
                count: 43,
                variation: 6,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:19:00.000Z',
                memberSince: '2022-08-09T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Inventory Management System',
                createdAt: '2026-07-19T18:15:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Customer Portal',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Sophia Mitchell',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Dashboard',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Enterprise Dashboard',
                category: 'Software',
                price: 399,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'API Management Platform',
                category: 'Software',
                price: 329,
                stockQuantity: 11,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Developer Suite',
                category: 'Software',
                price: 219,
                stockQuantity: 20,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Developing end-to-end applications, APIs and cloud-based systems for enterprise customers.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Software Engineer',
                organization: 'Maple Tech',
                description:
                    'Built scalable web applications and collaborated across frontend and backend teams.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Web Developer',
                organization: 'Toronto Digital',
                description:
                    'Worked on responsive websites, backend integrations and application maintenance.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'University of Toronto',
                description:
                    'Specialized in software architecture, distributed systems and application development.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'York University',
                description:
                    'Focused on programming, algorithms and database systems.',
            },
        ],
    },
    {
        id: 17,
        avatar: 'https://i.pravatar.cc/150?img=17',
        name: 'Emma Watson',
        role: 'Designer',
        country: 'United Kingdom',
        contact: {
            email: 'emma.watson17@example.com',
            address: '84 Regent Street, London SW1Y 4PE, United Kingdom',
            phone: '+447700900117',
        },
        about: 'Creative Designer with a passion for building memorable visual experiences across digital platforms. Experienced in branding, interface design and design systems, with a strong focus on aesthetics, usability and consistency.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'branding', label: 'Branding' },
            { id: 'illustrator', label: 'Illustrator' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'creative-direction', label: 'Creative Direction' },
        ],
        summary: {
            products: {
                count: 94,
                variation: 9,
            },
            users: {
                count: 28,
                variation: 4,
            },
            profile: {
                role: 'Senior Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T10:30:00.000Z',
                memberSince: '2021-05-03T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Brand Identity Kit',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-image-uploaded',
                target: 'Mobile App Concept',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Charlotte Green',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Design Portfolio',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Studio',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Creative UI Kit',
                category: 'Design Assets',
                price: 89,
                stockQuantity: 22,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Branding Template Pack',
                category: 'Templates',
                price: 69,
                stockQuantity: 17,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Design Resource Bundle',
                category: 'Resources',
                price: 119,
                stockQuantity: 12,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading visual design initiatives, branding projects and digital product experiences.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI Designer',
                organization: 'Creative London',
                description:
                    'Designed user interfaces and marketing assets for startups and enterprise clients.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Studio Vision',
                description:
                    'Created branding materials, visual identities and digital campaigns.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Visual Communication',
                organization: 'University of the Arts London',
                description:
                    'Focused on digital design, branding and visual storytelling.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Graphic Design',
                organization: 'Kingston University',
                description:
                    'Studied visual communication, typography and interactive media.',
            },
        ],
    },
    {
        id: 18,
        avatar: 'https://i.pravatar.cc/150?img=18',
        name: 'Liam Johnson',
        role: 'Back End Developer',
        country: 'United States',
        contact: {
            email: 'liam.johnson18@example.com',
            address:
                '455 Market Street, San Francisco, CA 94105, United States',
            phone: '+12024560118',
        },
        about: 'Backend Developer focused on designing scalable APIs, distributed systems and cloud-native applications. Experienced in database optimization, system architecture and building secure services that support high-volume enterprise platforms.',
        skills: [
            { id: 'nodejs', label: 'Node.js' },
            { id: 'nestjs', label: 'NestJS' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'redis', label: 'Redis' },
            { id: 'microservices', label: 'Microservices' },
            { id: 'aws', label: 'AWS' },
        ],
        summary: {
            products: {
                count: 121,
                variation: 16,
            },
            users: {
                count: 39,
                variation: 5,
            },
            profile: {
                role: 'Senior Backend Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:12:00.000Z',
                memberSince: '2022-02-14T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Order Processing API',
                createdAt: '2026-07-19T18:05:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Authentication Service',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Sophia Reed',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Backend Environment',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Portal',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'API Management Suite',
                category: 'Software',
                price: 349,
                stockQuantity: 13,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Service Gateway',
                category: 'Infrastructure',
                price: 429,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Database Toolkit',
                category: 'Software',
                price: 199,
                stockQuantity: 22,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Backend Developer',
                organization: 'DevSolutions',
                description:
                    'Building high-performance backend services, APIs and distributed architectures for enterprise applications.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Software Engineer',
                organization: 'Pacific Tech',
                description:
                    'Developed backend platforms, data pipelines and cloud-native applications.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Junior Backend Developer',
                organization: 'CodeSphere',
                description:
                    'Maintained APIs, databases and internal business systems.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Computer Engineering',
                organization: 'University of California',
                description:
                    'Focused on distributed systems, databases and software architecture.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'San Diego State University',
                description:
                    'Studied software engineering, algorithms and computer systems.',
            },
        ],
    },
    {
        id: 19,
        avatar: 'https://i.pravatar.cc/150?img=19',
        name: 'Olivia Brown',
        role: 'QA Engineer',
        country: 'Australia',
        contact: {
            email: 'olivia.brown19@example.com',
            address: '88 George Street, Sydney NSW 2000, Australia',
            phone: '+61412345119',
        },
        about: 'QA Engineer passionate about ensuring software quality through automated and manual testing strategies. Experienced in test planning, quality assurance processes and building reliable test automation frameworks for modern applications.',
        skills: [
            { id: 'cypress', label: 'Cypress' },
            { id: 'playwright', label: 'Playwright' },
            { id: 'selenium', label: 'Selenium' },
            { id: 'test-automation', label: 'Test Automation' },
            { id: 'api-testing', label: 'API Testing' },
            { id: 'jira', label: 'Jira' },
        ],
        summary: {
            products: {
                count: 83,
                variation: 11,
            },
            users: {
                count: 31,
                variation: 4,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'active',
                lastLogin: '2026-07-19T17:55:00.000Z',
                memberSince: '2021-11-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Automation Test Suite',
                createdAt: '2026-07-19T17:50:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Regression Framework',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Team Member',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Testing Workspace',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'QualityLabs Dashboard',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'QA Automation Suite',
                category: 'Testing',
                price: 279,
                stockQuantity: 15,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'API Testing Toolkit',
                category: 'Testing',
                price: 189,
                stockQuantity: 18,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Performance Testing Platform',
                category: 'Testing',
                price: 359,
                stockQuantity: 10,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading quality assurance initiatives, test automation projects and release validation processes.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'QA Analyst',
                organization: 'Sydney Software Group',
                description:
                    'Executed test plans, automated regression testing and ensured product quality standards.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Tester',
                organization: 'Digital Quality AU',
                description:
                    'Performed manual testing and collaborated with development teams to resolve defects.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Technology',
                organization: 'University of Sydney',
                description:
                    'Specialized in software quality assurance and information systems.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of New South Wales',
                description:
                    'Studied software engineering, testing methodologies and system design.',
            },
        ],
    },
    {
        id: 20,
        avatar: 'https://i.pravatar.cc/150?img=20',
        name: 'Noah Wilson',
        role: 'DevOps Engineer',
        country: 'Germany',
        contact: {
            email: 'noah.wilson20@example.com',
            address: '45 Friedrichstraße, Berlin 10117, Germany',
            phone: '+4915123456120',
        },
        about: 'DevOps Engineer with expertise in cloud infrastructure, infrastructure as code and CI/CD automation. Passionate about improving reliability, scalability and deployment efficiency while supporting high-availability production environments.',
        skills: [
            { id: 'terraform', label: 'Terraform' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'docker', label: 'Docker' },
            { id: 'azure', label: 'Azure' },
            { id: 'grafana', label: 'Grafana' },
            { id: 'ansible', label: 'Ansible' },
        ],
        summary: {
            products: {
                count: 145,
                variation: 20,
            },
            users: {
                count: 46,
                variation: 7,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T09:30:00.000Z',
                memberSince: '2020-07-21T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Infrastructure Automation Platform',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'CI/CD Pipeline',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Cloud Engineering Team',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Production Environment',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'CloudOps Platform',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Operations Suite',
                category: 'Infrastructure',
                price: 699,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Deployment Automation Kit',
                category: 'DevOps',
                price: 299,
                stockQuantity: 17,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Monitoring Stack',
                category: 'Infrastructure',
                price: 249,
                stockQuantity: 21,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud platforms, deployment automation and observability solutions across multiple environments.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Cloud Engineer',
                organization: 'Berlin Cloud Systems',
                description:
                    'Implemented cloud-native infrastructure and automated deployment workflows.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Systems Administrator',
                organization: 'TechNet Germany',
                description:
                    'Maintained infrastructure, servers and enterprise IT environments.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Systems',
                organization: 'Technical University of Berlin',
                description:
                    'Focused on cloud computing, distributed systems and IT operations.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Engineering',
                organization: 'University of Hamburg',
                description:
                    'Studied software systems, networking and infrastructure management.',
            },
        ],
    },
    {
        id: 21,
        avatar: 'https://i.pravatar.cc/150?img=21',
        name: 'Ava Martinez',
        role: 'Product Manager',
        country: 'Spain',
        contact: {
            email: 'ava.martinez21@example.com',
            address: '148 Gran Vía, Madrid 28013, Spain',
            phone: '+34600110121',
        },
        about: 'Product Manager with a strong background in digital product strategy, customer research and agile delivery. Experienced in leading multidisciplinary teams, defining product vision and delivering innovative solutions that align business objectives with user needs.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'agile-management', label: 'Agile Management' },
            { id: 'roadmapping', label: 'Roadmapping' },
            { id: 'stakeholder-management', label: 'Stakeholder Management' },
            { id: 'product-discovery', label: 'Product Discovery' },
            { id: 'analytics', label: 'Analytics' },
        ],
        summary: {
            products: {
                count: 118,
                variation: 13,
            },
            users: {
                count: 47,
                variation: 6,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T11:30:00.000Z',
                memberSince: '2021-03-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Feedback Portal',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Product Roadmap 2026',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Carlos Moreno',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Management Workspace',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Platform',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Product Intelligence Suite',
                category: 'Business',
                price: 449,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Roadmap Planner Pro',
                category: 'Productivity',
                price: 179,
                stockQuantity: 19,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Customer Insights Hub',
                category: 'Analytics',
                price: 299,
                stockQuantity: 8,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product vision, roadmap execution and cross-functional collaboration across multiple product lines.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Product Owner',
                organization: 'Madrid Digital Group',
                description:
                    'Managed product backlogs, prioritized features and improved product delivery processes.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Business Analyst',
                organization: 'Innovation Spain',
                description:
                    'Gathered requirements and translated business goals into actionable product initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Business Innovation',
                organization: 'Universidad Complutense de Madrid',
                description:
                    'Focused on innovation management, digital transformation and product development.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Universidad Autónoma de Madrid',
                description:
                    'Studied management, marketing and strategic planning.',
            },
        ],
    },
    {
        id: 22,
        avatar: 'https://i.pravatar.cc/150?img=22',
        name: 'James Anderson',
        role: 'Full Stack Developer',
        country: 'Ireland',
        contact: {
            email: 'james.anderson22@example.com',
            address: '52 St Stephen’s Green, Dublin D02, Ireland',
            phone: '+353831234122',
        },
        about: 'Full Stack Developer passionate about building robust web applications and scalable backend systems. Experienced in modern frontend frameworks, cloud technologies and software architecture, delivering complete solutions from concept to production.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nestjs', label: 'NestJS' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'aws-lambda', label: 'AWS Lambda' },
        ],
        summary: {
            products: {
                count: 142,
                variation: 18,
            },
            users: {
                count: 38,
                variation: 5,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:18:00.000Z',
                memberSince: '2022-09-05T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Client Management Dashboard',
                createdAt: '2026-07-19T18:10:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Analytics Platform',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Grace Murphy',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Business Dashboard',
                category: 'Software',
                price: 399,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'API Gateway Platform',
                category: 'Software',
                price: 349,
                stockQuantity: 11,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Developer Workspace',
                category: 'Software',
                price: 229,
                stockQuantity: 23,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Developing enterprise applications, cloud services and scalable user-facing platforms.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Software Engineer',
                organization: 'Emerald Tech',
                description:
                    'Worked across frontend and backend systems, improving scalability and user experience.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Web Developer',
                organization: 'Code Ireland',
                description:
                    'Built web applications and supported product development initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Trinity College Dublin',
                description:
                    'Specialized in software architecture, cloud computing and distributed systems.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University College Dublin',
                description:
                    'Focused on software engineering, databases and computer systems.',
            },
        ],
    },
    {
        id: 23,
        avatar: 'https://i.pravatar.cc/150?img=23',
        name: 'Isabella Thomas',
        role: 'Designer',
        country: 'France',
        contact: {
            email: 'isabella.thomas23@example.com',
            address: '27 Avenue des Champs-Élysées, Paris 75008, France',
            phone: '+33612345123',
        },
        about: 'Designer with expertise in digital experiences, branding and user interface design. Passionate about transforming ideas into visually compelling products that balance aesthetics, usability and business goals.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'branding', label: 'Branding' },
            { id: 'adobe-xd', label: 'Adobe XD' },
            { id: 'illustration', label: 'Illustration' },
            { id: 'design-thinking', label: 'Design Thinking' },
        ],
        summary: {
            products: {
                count: 96,
                variation: 10,
            },
            users: {
                count: 33,
                variation: 4,
            },
            profile: {
                role: 'Senior Designer',
                status: 'active',
                lastLogin: '2026-07-19T18:02:00.000Z',
                memberSince: '2022-05-24T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Luxury Brand Kit',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-image-uploaded',
                target: 'Mobile Banking Concept',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Sophie Laurent',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Creative Portfolio',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Studio',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Premium UI Kit',
                category: 'Design Assets',
                price: 99,
                stockQuantity: 20,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Creative Template Collection',
                category: 'Templates',
                price: 79,
                stockQuantity: 16,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Brand Identity Package',
                category: 'Resources',
                price: 129,
                stockQuantity: 10,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading visual design projects, branding initiatives and digital product experiences.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI Designer',
                organization: 'Paris Creative Studio',
                description:
                    'Created interfaces, design systems and visual assets for startups and global brands.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Studio Lumière',
                description:
                    'Developed branding materials and marketing campaigns across multiple industries.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Visual Design',
                organization: 'Sorbonne University',
                description:
                    'Focused on digital design, branding and visual communication.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Graphic Arts',
                organization: 'Université Paris Cité',
                description:
                    'Studied graphic design, typography and multimedia communication.',
            },
        ],
    },
    {
        id: 24,
        avatar: 'https://i.pravatar.cc/150?img=24',
        name: 'Benjamin Taylor',
        role: 'SEO Specialist',
        country: 'Netherlands',
        contact: {
            email: 'benjamin.taylor24@example.com',
            address: '128 Damrak Street, Amsterdam 1012 LP, Netherlands',
            phone: '+31612345124',
        },
        about: 'SEO Specialist with extensive experience in organic growth strategies, technical SEO audits and content optimization. Passionate about improving search visibility, analyzing performance metrics and driving sustainable traffic growth for digital businesses.',
        skills: [
            { id: 'seo', label: 'SEO' },
            { id: 'technical-seo', label: 'Technical SEO' },
            { id: 'google-analytics', label: 'Google Analytics' },
            { id: 'google-search-console', label: 'Google Search Console' },
            { id: 'keyword-research', label: 'Keyword Research' },
            { id: 'content-marketing', label: 'Content Marketing' },
        ],
        summary: {
            products: {
                count: 74,
                variation: 8,
            },
            users: {
                count: 26,
                variation: 3,
            },
            profile: {
                role: 'Senior SEO Specialist',
                status: 'inactive',
                lastLogin: '2026-07-19T10:30:00.000Z',
                memberSince: '2021-06-14T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'SEO Audit Report',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'user-created',
                target: 'Marketing Intern',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'product-created',
                target: 'Keyword Strategy Plan',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Marketing Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'SEO Analytics Toolkit',
                category: 'Marketing',
                price: 149,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'Keyword Research Suite',
                category: 'Marketing',
                price: 199,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
                name: 'Traffic Insights Platform',
                category: 'Analytics',
                price: 259,
                stockQuantity: 5,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior SEO Specialist',
                organization: 'MarketPro',
                description:
                    'Leading SEO initiatives, technical audits and content optimization strategies for international clients.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Digital Marketing Specialist',
                organization: 'Growth Media',
                description:
                    'Managed SEO campaigns, performance analysis and search engine visibility improvements.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Marketing Analyst',
                organization: 'Netherlands Digital',
                description:
                    'Focused on web analytics, content strategy and marketing reporting.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Marketing',
                organization: 'University of Amsterdam',
                description:
                    'Specialized in digital strategy, search marketing and data analytics.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Erasmus University Rotterdam',
                description:
                    'Studied marketing, management and business intelligence.',
            },
        ],
    },
    {
        id: 25,
        avatar: 'https://i.pravatar.cc/150?img=25',
        name: 'Mia Moore',
        role: 'Front End Developer',
        country: 'Italy',
        contact: {
            email: 'mia.moore25@example.com',
            address: '95 Via Roma, Milan 20121, Italy',
            phone: '+393123456125',
        },
        about: 'Front End Developer focused on creating accessible, responsive and high-performance web applications. Experienced with modern JavaScript ecosystems, component-driven architectures and design systems that deliver exceptional user experiences.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nextjs', label: 'Next.js' },
            { id: 'sass', label: 'Sass' },
            { id: 'storybook', label: 'Storybook' },
            { id: 'figma-collaboration', label: 'Figma Collaboration' },
        ],
        summary: {
            products: {
                count: 132,
                variation: 15,
            },
            users: {
                count: 42,
                variation: 6,
            },
            profile: {
                role: 'Senior Front End Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:08:00.000Z',
                memberSince: '2022-01-11T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Component Library',
                createdAt: '2026-07-19T18:00:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Admin Dashboard',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Marco Rossi',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'TechCorp Platform',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Design System Kit',
                category: 'Frontend',
                price: 179,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'React Component Suite',
                category: 'Software',
                price: 249,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Frontend Dashboard Template',
                category: 'Templates',
                price: 129,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Front End Developer',
                organization: 'TechCorp',
                description:
                    'Building scalable frontend platforms, design systems and enterprise-grade user interfaces.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Frontend Developer',
                organization: 'Milan Digital Studio',
                description:
                    'Developed modern web applications using React, TypeScript and component-based architectures.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'UI Developer',
                organization: 'Creative Labs Italy',
                description:
                    'Created responsive interfaces and collaborated closely with designers and product teams.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Software Engineering',
                organization: 'Politecnico di Milano',
                description:
                    'Focused on web technologies, software architecture and user-centered design.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'University of Milan',
                description:
                    'Studied programming, software development and human-computer interaction.',
            },
        ],
    },
    {
        id: 26,
        avatar: 'https://i.pravatar.cc/150?img=26',
        name: 'Lucas Pereira',
        role: 'Back End Developer',
        country: 'Brazil',
        contact: {
            email: 'lucas.pereira26@example.com',
            address: '145 Avenida Paulista, São Paulo, SP 01310-100, Brazil',
            phone: '+5511982340126',
        },
        about: 'Backend Developer specialized in scalable APIs, cloud infrastructure and database architecture. Experienced in designing resilient systems, improving application performance and supporting high-traffic business platforms.',
        skills: [
            { id: 'java', label: 'Java' },
            { id: 'spring-boot', label: 'Spring Boot' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'rabbitmq', label: 'RabbitMQ' },
            { id: 'docker', label: 'Docker' },
            { id: 'aws', label: 'AWS' },
        ],
        summary: {
            products: {
                count: 117,
                variation: 14,
            },
            users: {
                count: 35,
                variation: 4,
            },
            profile: {
                role: 'Senior Backend Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:15:00.000Z',
                memberSince: '2022-08-03T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Payment Processing API',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Customer Service Backend',
                createdAt: '2026-07-19T13:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Ana Costa',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Production Environment',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'API Gateway Service',
                category: 'Backend',
                price: 349,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Database Management Suite',
                category: 'Software',
                price: 279,
                stockQuantity: 16,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Cloud Integration Platform',
                category: 'Infrastructure',
                price: 459,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Backend Developer',
                organization: 'DevSolutions',
                description:
                    'Designing APIs, distributed systems and cloud-native applications for enterprise customers.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'Tech Brasil',
                description:
                    'Developed backend services, integrations and high-performance business systems.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Junior Backend Developer',
                organization: 'Code Factory',
                description:
                    'Worked on APIs, relational databases and internal software solutions.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Computer Science',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on software architecture, distributed systems and database technologies.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Information Systems',
                organization: 'Universidade Estadual Paulista',
                description:
                    'Studied software engineering, algorithms and enterprise systems.',
            },
        ],
    },
    {
        id: 27,
        avatar: 'https://i.pravatar.cc/150?img=27',
        name: 'Mariana Costa',
        role: 'Designer',
        country: 'Brazil',
        contact: {
            email: 'mariana.costa27@example.com',
            address: '245 Avenida Faria Lima, São Paulo, SP 04538-133, Brazil',
            phone: '+5511982340127',
        },
        about: 'Creative Designer with experience in branding, user interfaces and digital product design. Passionate about creating engaging visual experiences that combine aesthetics, usability and business objectives. Skilled in collaborative design processes and modern design systems.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'branding', label: 'Branding' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'adobe-illustrator', label: 'Adobe Illustrator' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'creative-direction', label: 'Creative Direction' },
        ],
        summary: {
            products: {
                count: 88,
                variation: 9,
            },
            users: {
                count: 29,
                variation: 4,
            },
            profile: {
                role: 'Senior Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T09:30:00.000Z',
                memberSince: '2021-04-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-image-uploaded',
                target: 'Brand Identity Collection',
                createdAt: '2026-07-19T14:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Mobile App UI Kit',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Design Portfolio',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Pedro Almeida',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Studio',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Creative Design Kit',
                category: 'Design Assets',
                price: 119,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Brand Identity Package',
                category: 'Branding',
                price: 149,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'UI Components Bundle',
                category: 'Templates',
                price: 89,
                stockQuantity: 21,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading branding projects, UI initiatives and visual design strategies for digital products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI Designer',
                organization: 'Creative Studio Brasil',
                description:
                    'Designed web and mobile interfaces while contributing to design systems and product experiences.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Visual Lab',
                description:
                    'Created marketing materials, visual identities and creative campaigns.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Design',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on digital design, branding and visual communication.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Graphic Design',
                organization: 'Universidade Presbiteriana Mackenzie',
                description:
                    'Studied typography, visual identity and digital media design.',
            },
        ],
    },
    {
        id: 28,
        avatar: 'https://i.pravatar.cc/150?img=28',
        name: 'Daniel Schmidt',
        role: 'DevOps Engineer',
        country: 'Germany',
        contact: {
            email: 'daniel.schmidt28@example.com',
            address: '82 Unter den Linden, Berlin 10117, Germany',
            phone: '+4915123456128',
        },
        about: 'DevOps Engineer specialized in cloud infrastructure, CI/CD automation and platform reliability. Experienced in building scalable deployment pipelines, monitoring solutions and infrastructure-as-code practices that improve operational efficiency and system resilience.',
        skills: [
            { id: 'terraform', label: 'Terraform' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'docker', label: 'Docker' },
            { id: 'jenkins', label: 'Jenkins' },
            { id: 'prometheus', label: 'Prometheus' },
            { id: 'linux-administration', label: 'Linux Administration' },
        ],
        summary: {
            products: {
                count: 154,
                variation: 19,
            },
            users: {
                count: 48,
                variation: 7,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'active',
                lastLogin: '2026-07-19T18:19:00.000Z',
                memberSince: '2020-09-27T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Deployment Automation Framework',
                createdAt: '2026-07-19T17:55:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Cloud Infrastructure Stack',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'password-changed',
                target: 'Production Environment',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'CloudOps Team Member',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'CloudOps Console',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Infrastructure Management Suite',
                category: 'Cloud',
                price: 549,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'CI/CD Automation Toolkit',
                category: 'DevOps',
                price: 299,
                stockQuantity: 15,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Monitoring Platform',
                category: 'Infrastructure',
                price: 249,
                stockQuantity: 17,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2019 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud infrastructure, deployment automation and platform observability across enterprise environments.',
            },
            {
                id: 2,
                period: '2015 - 2019',
                title: 'Cloud Engineer',
                organization: 'Berlin Systems',
                description:
                    'Implemented infrastructure automation and containerized application platforms.',
            },
            {
                id: 3,
                period: '2012 - 2015',
                title: 'Systems Administrator',
                organization: 'German Tech Services',
                description:
                    'Maintained enterprise infrastructure and supported IT operations.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2010 - 2012',
                title: 'Master of Information Technology',
                organization: 'Technical University of Munich',
                description:
                    'Focused on cloud computing, distributed systems and enterprise infrastructure.',
            },
            {
                id: 2,
                period: '2006 - 2010',
                title: 'Bachelor of Computer Engineering',
                organization: 'University of Stuttgart',
                description:
                    'Studied networking, software engineering and systems architecture.',
            },
        ],
    },
    {
        id: 29,
        avatar: 'https://i.pravatar.cc/150?img=29',
        name: 'Sophie Dubois',
        role: 'Product Manager',
        country: 'France',
        contact: {
            email: 'sophie.dubois29@example.com',
            address: '64 Boulevard Haussmann, Paris 75009, France',
            phone: '+33612345129',
        },
        about: 'Product Manager with expertise in product strategy, stakeholder alignment and customer-centered innovation. Passionate about transforming business opportunities into successful digital products through research, planning and agile execution.',
        skills: [
            { id: 'product-management', label: 'Product Management' },
            { id: 'roadmap-planning', label: 'Roadmap Planning' },
            { id: 'agile', label: 'Agile' },
            { id: 'market-research', label: 'Market Research' },
            { id: 'business-analysis', label: 'Business Analysis' },
            { id: 'leadership', label: 'Leadership' },
        ],
        summary: {
            products: {
                count: 124,
                variation: 14,
            },
            users: {
                count: 41,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T07:30:00.000Z',
                memberSince: '2021-01-20T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Engagement Platform',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Product Roadmap Q4',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Coordinator',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Management Dashboard',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Product Strategy Suite',
                category: 'Business',
                price: 399,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Roadmap Planner',
                category: 'Productivity',
                price: 189,
                stockQuantity: 16,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Customer Research Hub',
                category: 'Analytics',
                price: 279,
                stockQuantity: 10,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, roadmap execution and stakeholder collaboration for multiple digital products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Product Owner',
                organization: 'Paris Digital Group',
                description:
                    'Managed product backlogs, feature prioritization and agile delivery processes.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Business Analyst',
                organization: 'Innovation France',
                description:
                    'Translated business requirements into product initiatives and measurable outcomes.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Business Innovation',
                organization: 'HEC Paris',
                description:
                    'Focused on product innovation, digital transformation and strategic management.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Université Paris Dauphine',
                description:
                    'Studied business strategy, marketing and organizational management.',
            },
        ],
    },
    {
        id: 30,
        avatar: 'https://i.pravatar.cc/150?img=30',
        name: 'Carlos Ruiz',
        role: 'Marketing',
        country: 'Mexico',
        contact: {
            email: 'carlos.ruiz30@example.com',
            address: '415 Paseo de la Reforma, Ciudad de México 06500, Mexico',
            phone: '+525512345630',
        },
        about: 'Marketing professional with extensive experience in digital campaigns, customer acquisition and brand growth strategies. Passionate about data-driven marketing, audience engagement and delivering measurable business results through innovative campaigns.',
        skills: [
            { id: 'digital-marketing', label: 'Digital Marketing' },
            { id: 'campaign-management', label: 'Campaign Management' },
            { id: 'social-media', label: 'Social Media Strategy' },
            { id: 'google-ads', label: 'Google Ads' },
            { id: 'marketing-analytics', label: 'Marketing Analytics' },
            { id: 'brand-strategy', label: 'Brand Strategy' },
        ],
        summary: {
            products: {
                count: 102,
                variation: 11,
            },
            users: {
                count: 33,
                variation: 4,
            },
            profile: {
                role: 'Marketing Manager',
                status: 'active',
                lastLogin: '2026-07-19T18:12:00.000Z',
                memberSince: '2022-02-15T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Summer Marketing Campaign',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Lead Generation Strategy',
                createdAt: '2026-07-19T14:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Assistant',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Marketing Workspace',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Campaign Analytics Suite',
                category: 'Marketing',
                price: 189,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'Lead Generation Toolkit',
                category: 'Business',
                price: 149,
                stockQuantity: 11,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
                name: 'Audience Insights Platform',
                category: 'Analytics',
                price: 229,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Marketing Manager',
                organization: 'MarketPro',
                description:
                    'Leading multi-channel campaigns, brand positioning and customer acquisition initiatives.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Digital Marketing Specialist',
                organization: 'Mexico Growth Agency',
                description:
                    'Managed online campaigns, SEO initiatives and marketing performance analysis.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Marketing Coordinator',
                organization: 'Creative Media MX',
                description:
                    'Supported campaign planning and customer engagement strategies.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Marketing Management',
                organization: 'Tecnológico de Monterrey',
                description:
                    'Focused on digital marketing, consumer behavior and strategic branding.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Universidad Nacional Autónoma de México',
                description:
                    'Studied business management, marketing and organizational strategy.',
            },
        ],
    },
    {
        id: 31,
        avatar: 'https://i.pravatar.cc/150?img=31',
        name: 'Ethan Clark',
        role: 'QA Engineer',
        country: 'United States',
        contact: {
            email: 'ethan.clark31@example.com',
            address: '210 Liberty Avenue, Austin, TX 78701, United States',
            phone: '+12024560131',
        },
        about: 'QA Engineer specialized in automated testing, software quality assurance and continuous testing processes. Dedicated to ensuring product reliability, improving testing coverage and delivering exceptional user experiences through rigorous quality standards.',
        skills: [
            { id: 'automated-testing', label: 'Automated Testing' },
            { id: 'cypress', label: 'Cypress' },
            { id: 'playwright', label: 'Playwright' },
            { id: 'test-planning', label: 'Test Planning' },
            { id: 'api-testing', label: 'API Testing' },
            { id: 'quality-assurance', label: 'Quality Assurance' },
        ],
        summary: {
            products: {
                count: 81,
                variation: 7,
            },
            users: {
                count: 24,
                variation: 3,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T04:30:00.000Z',
                memberSince: '2021-11-09T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Regression Test Suite',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Automation Framework',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Intern',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Testing Environment',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'QualityLabs Portal',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Automated Testing Suite',
                category: 'QA',
                price: 199,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'API Validation Toolkit',
                category: 'Software',
                price: 159,
                stockQuantity: 15,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
                name: 'Quality Metrics Dashboard',
                category: 'Analytics',
                price: 249,
                stockQuantity: 6,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading automation initiatives, quality processes and testing strategies across multiple products.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'QA Analyst',
                organization: 'Tech Assurance Inc.',
                description:
                    'Developed automated test suites and improved software quality standards.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Software Tester',
                organization: 'US Testing Solutions',
                description:
                    'Performed manual and automated testing for enterprise applications.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Software Quality',
                organization: 'University of Texas',
                description:
                    'Focused on software testing methodologies and quality management.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'Texas State University',
                description:
                    'Studied software engineering, testing principles and systems development.',
            },
        ],
    },
    {
        id: 32,
        avatar: 'https://i.pravatar.cc/150?img=32',
        name: 'Chloe Martin',
        role: 'Designer',
        country: 'France',
        contact: {
            email: 'chloe.martin32@example.com',
            address: '118 Rue de Rivoli, Paris 75001, France',
            phone: '+33612345132',
        },
        about: 'Designer passionate about creating elegant user experiences and visually compelling digital products. Experienced in user-centered design, interface prototyping and collaborative workflows that bridge business goals and user needs.',
        skills: [
            { id: 'ux-design', label: 'UX Design' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'figma', label: 'Figma' },
            { id: 'wireframing', label: 'Wireframing' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'user-research', label: 'User Research' },
        ],
        summary: {
            products: {
                count: 97,
                variation: 12,
            },
            users: {
                count: 30,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Designer',
                status: 'active',
                lastLogin: '2026-07-19T17:48:00.000Z',
                memberSince: '2022-05-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-image-uploaded',
                target: 'Mobile Design System',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'E-commerce UI Kit',
                createdAt: '2026-07-19T12:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Personal Portfolio',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Junior Designer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Mobile UI Kit',
                category: 'Design',
                price: 129,
                stockQuantity: 18,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Design System Library',
                category: 'Templates',
                price: 169,
                stockQuantity: 10,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Prototype Collection',
                category: 'UX',
                price: 99,
                stockQuantity: 24,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Designer',
                organization: 'Designify',
                description:
                    'Leading UX initiatives, design systems and user experience improvements for digital products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI/UX Designer',
                organization: 'Paris Creative Studio',
                description:
                    'Designed web and mobile experiences for startups and enterprise clients.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Creative France',
                description:
                    'Created visual identities, digital campaigns and interactive experiences.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Design',
                organization: 'Université Paris-Saclay',
                description:
                    'Focused on interaction design, visual communication and user experience.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Graphic Design',
                organization: 'Université de Paris',
                description:
                    'Studied visual arts, branding and digital product design.',
            },
        ],
    },
    {
        id: 33,
        avatar: 'https://i.pravatar.cc/150?img=33',
        name: 'Henry Walker',
        role: 'Full Stack Developer',
        country: 'United Kingdom',
        contact: {
            email: 'henry.walker33@example.com',
            address: '74 Oxford Street, London W1D 1BS, United Kingdom',
            phone: '+447700900133',
        },
        about: 'Full Stack Developer with strong expertise in modern web applications, scalable backend services and cloud-native solutions. Passionate about building end-to-end products, improving system performance and delivering exceptional user experiences through clean and maintainable code.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'graphql', label: 'GraphQL' },
        ],
        summary: {
            products: {
                count: 141,
                variation: 16,
            },
            users: {
                count: 44,
                variation: 6,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T05:30:00.000Z',
                memberSince: '2021-03-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Portal',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Inventory API',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Junior Developer',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Development Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Enterprise Dashboard',
                category: 'Software',
                price: 399,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'API Management Suite',
                category: 'Backend',
                price: 289,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Developer Toolkit',
                category: 'Development',
                price: 179,
                stockQuantity: 15,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Building scalable web applications, APIs and cloud-based services for enterprise customers.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'London Tech Labs',
                description:
                    'Developed full stack applications using modern JavaScript frameworks and backend technologies.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Web Developer',
                organization: 'Digital UK',
                description:
                    'Created responsive websites and custom business applications.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Imperial College London',
                description:
                    'Focused on distributed systems, cloud computing and software architecture.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of Manchester',
                description:
                    'Studied programming, databases and software development methodologies.',
            },
        ],
    },
    {
        id: 34,
        avatar: 'https://i.pravatar.cc/150?img=34',
        name: 'Amelia Scott',
        role: 'Product Manager',
        country: 'Canada',
        contact: {
            email: 'amelia.scott34@example.com',
            address: '188 King Street West, Toronto, ON M5H 1A1, Canada',
            phone: '+14165550134',
        },
        about: 'Product Manager experienced in leading cross-functional teams, defining product vision and delivering customer-focused digital solutions. Skilled in roadmap planning, stakeholder communication and transforming market insights into successful product strategies.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'roadmapping', label: 'Roadmapping' },
            { id: 'agile-methodologies', label: 'Agile Methodologies' },
            { id: 'stakeholder-management', label: 'Stakeholder Management' },
            { id: 'user-research', label: 'User Research' },
            { id: 'business-strategy', label: 'Business Strategy' },
        ],
        summary: {
            products: {
                count: 126,
                variation: 15,
            },
            users: {
                count: 39,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'active',
                lastLogin: '2026-07-19T18:02:00.000Z',
                memberSince: '2022-07-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Experience Platform',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Q3 Product Roadmap',
                createdAt: '2026-07-19T13:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Business Analyst',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Manager Profile',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Portal',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Product Planning Suite',
                category: 'Business',
                price: 349,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Customer Insights Hub',
                category: 'Analytics',
                price: 279,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Roadmap Manager',
                category: 'Productivity',
                price: 189,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, customer discovery and roadmap execution for SaaS products.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Product Owner',
                organization: 'Toronto Digital Group',
                description:
                    'Managed agile product development and stakeholder collaboration.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Business Analyst',
                organization: 'Innovate Canada',
                description:
                    'Gathered requirements and supported product planning initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Business Innovation',
                organization: 'University of Toronto',
                description:
                    'Focused on product development, leadership and digital transformation.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Commerce',
                organization: 'York University',
                description:
                    'Studied business management, marketing and strategic planning.',
            },
        ],
    },
    {
        id: 35,
        avatar: 'https://i.pravatar.cc/150?img=35',
        name: 'Jack Hall',
        role: 'Back End Developer',
        country: 'Australia',
        contact: {
            email: 'jack.hall35@example.com',
            address: '92 George Street, Sydney, NSW 2000, Australia',
            phone: '+61412345135',
        },
        about: 'Backend Developer specializing in APIs, microservices and cloud infrastructure. Experienced in designing reliable backend systems, optimizing database performance and building scalable solutions that support high-volume applications.',
        skills: [
            { id: 'java', label: 'Java' },
            { id: 'spring-boot', label: 'Spring Boot' },
            { id: 'mysql', label: 'MySQL' },
            { id: 'aws', label: 'AWS' },
            { id: 'microservices', label: 'Microservices' },
            { id: 'redis', label: 'Redis' },
        ],
        summary: {
            products: {
                count: 118,
                variation: 10,
            },
            users: {
                count: 31,
                variation: 4,
            },
            profile: {
                role: 'Senior Backend Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T08:30:00.000Z',
                memberSince: '2020-10-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Payment Gateway Service',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Notification API',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Backend Engineer',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Cloud Environment',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Platform',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Microservice Platform',
                category: 'Backend',
                price: 429,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Database Optimization Suite',
                category: 'Infrastructure',
                price: 259,
                stockQuantity: 13,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'API Security Toolkit',
                category: 'Security',
                price: 219,
                stockQuantity: 10,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Backend Developer',
                organization: 'DevSolutions',
                description:
                    'Designing distributed systems, APIs and cloud-native backend solutions.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'Sydney Technology Group',
                description:
                    'Built enterprise backend systems and optimized application performance.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Junior Backend Developer',
                organization: 'CodeWorks Australia',
                description:
                    'Developed REST APIs and maintained business-critical applications.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Technology',
                organization: 'University of Sydney',
                description:
                    'Focused on software engineering, cloud computing and distributed systems.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of New South Wales',
                description:
                    'Studied programming, databases and systems architecture.',
            },
        ],
    },
    {
        id: 36,
        avatar: 'https://i.pravatar.cc/150?img=36',
        name: 'Sofia Rossi',
        role: 'Designer',
        country: 'Italy',
        contact: {
            email: 'sofia.rossi36@example.com',
            address: '145 Via Torino, Milan 20123, Italy',
            phone: '+393123456136',
        },
        about: 'Creative Designer specialized in digital experiences, visual identity and product design. Passionate about transforming ideas into intuitive interfaces and memorable brand experiences through a combination of research, creativity and user-centered design principles.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'visual-design', label: 'Visual Design' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'branding', label: 'Branding' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'user-experience', label: 'User Experience' },
        ],
        summary: {
            products: {
                count: 109,
                variation: 13,
            },
            users: {
                count: 34,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Designer',
                status: 'active',
                lastLogin: '2026-07-19T17:53:00.000Z',
                memberSince: '2022-04-06T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-image-uploaded',
                target: 'Mobile Banking UI',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Design System Library',
                createdAt: '2026-07-19T12:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Portfolio Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Junior Designer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Mobile UI Collection',
                category: 'Design',
                price: 139,
                stockQuantity: 15,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Design System Toolkit',
                category: 'Templates',
                price: 189,
                stockQuantity: 11,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Creative Assets Bundle',
                category: 'Resources',
                price: 99,
                stockQuantity: 22,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Designer',
                organization: 'Designify',
                description:
                    'Leading UX initiatives, design systems and visual experiences for international products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI/UX Designer',
                organization: 'Milano Creative Studio',
                description:
                    'Designed digital products and collaborated closely with product and engineering teams.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Visual Arts Italy',
                description:
                    'Created branding materials and digital campaigns for diverse clients.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Interaction Design',
                organization: 'Politecnico di Milano',
                description:
                    'Focused on digital experiences, user-centered design and product innovation.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Design',
                organization: 'University of Milan',
                description:
                    'Studied visual communication, branding and digital design.',
            },
        ],
    },
    {
        id: 37,
        avatar: 'https://i.pravatar.cc/150?img=37',
        name: 'Mateo Garcia',
        role: 'Marketing',
        country: 'Spain',
        contact: {
            email: 'mateo.garcia37@example.com',
            address: '88 Gran Via, Madrid 28013, Spain',
            phone: '+34600110137',
        },
        about: 'Marketing specialist with experience in campaign management, brand positioning and customer engagement strategies. Focused on combining creativity with analytics to build impactful marketing initiatives that generate measurable growth and long-term customer value.',
        skills: [
            { id: 'content-strategy', label: 'Content Strategy' },
            { id: 'google-ads', label: 'Google Ads' },
            { id: 'social-marketing', label: 'Social Marketing' },
            { id: 'email-campaigns', label: 'Email Campaigns' },
            { id: 'marketing-automation', label: 'Marketing Automation' },
            { id: 'performance-analysis', label: 'Performance Analysis' },
        ],
        summary: {
            products: {
                count: 94,
                variation: 8,
            },
            users: {
                count: 28,
                variation: 3,
            },
            profile: {
                role: 'Marketing Specialist',
                status: 'inactive',
                lastLogin: '2026-07-19T06:30:00.000Z',
                memberSince: '2021-01-17T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Retention Campaign',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Marketing Performance Dashboard',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Coordinator',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Campaign Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Marketing Insights Suite',
                category: 'Marketing',
                price: 179,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'Audience Growth Toolkit',
                category: 'Business',
                price: 159,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
                name: 'Campaign Analytics Hub',
                category: 'Analytics',
                price: 229,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2019 - Present',
                title: 'Marketing Specialist',
                organization: 'MarketPro',
                description:
                    'Managing digital campaigns, audience engagement and performance optimization initiatives.',
            },
            {
                id: 2,
                period: '2015 - 2019',
                title: 'Digital Marketing Coordinator',
                organization: 'Madrid Growth Agency',
                description:
                    'Executed marketing campaigns and analyzed customer acquisition strategies.',
            },
            {
                id: 3,
                period: '2012 - 2015',
                title: 'Marketing Assistant',
                organization: 'Creative Spain',
                description:
                    'Supported branding projects and campaign execution across multiple channels.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2010 - 2012',
                title: 'Master of Marketing and Communication',
                organization: 'Universidad Complutense de Madrid',
                description:
                    'Focused on digital marketing, branding and consumer behavior.',
            },
            {
                id: 2,
                period: '2006 - 2010',
                title: 'Bachelor of Business Administration',
                organization: 'Universidad Autónoma de Madrid',
                description:
                    'Studied marketing, management and strategic communication.',
            },
        ],
    },
    {
        id: 38,
        avatar: 'https://i.pravatar.cc/150?img=38',
        name: 'Luca Bianchi',
        role: 'Front End Developer',
        country: 'Italy',
        contact: {
            email: 'luca.bianchi38@example.com',
            address: '204 Corso Buenos Aires, Milan 20124, Italy',
            phone: '+393123456138',
        },
        about: 'Front End Developer passionate about building performant and user-friendly web applications. Experienced in modern frontend ecosystems, component-based architectures and responsive design, with a strong focus on usability, maintainability and clean code practices.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'vite', label: 'Vite' },
            { id: 'sass', label: 'Sass' },
            { id: 'storybook', label: 'Storybook' },
            { id: 'frontend-architecture', label: 'Frontend Architecture' },
        ],
        summary: {
            products: {
                count: 137,
                variation: 17,
            },
            users: {
                count: 42,
                variation: 6,
            },
            profile: {
                role: 'Senior Front End Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:11:00.000Z',
                memberSince: '2022-08-24T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Admin Dashboard UI',
                createdAt: '2026-07-19T17:42:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'React Component Library',
                createdAt: '2026-07-19T14:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Frontend Developer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'TechCorp Dashboard',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'React UI Framework',
                category: 'Frontend',
                price: 249,
                stockQuantity: 13,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Component Library Pro',
                category: 'Development',
                price: 189,
                stockQuantity: 18,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Frontend Starter Kit',
                category: 'Templates',
                price: 129,
                stockQuantity: 24,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Front End Developer',
                organization: 'TechCorp',
                description:
                    'Developing scalable frontend applications and maintaining enterprise design systems.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Frontend Developer',
                organization: 'Milan Software House',
                description:
                    'Built responsive web applications using modern JavaScript frameworks.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'UI Developer',
                organization: 'Digital Italy',
                description:
                    'Implemented user interfaces and collaborated with designers to improve user experiences.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Software Engineering',
                organization: 'Politecnico di Milano',
                description:
                    'Focused on web development, software architecture and modern frontend technologies.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'University of Milan',
                description:
                    'Studied software engineering, algorithms and human-computer interaction.',
            },
        ],
    },
    {
        id: 39,
        avatar: 'https://i.pravatar.cc/150?img=39',
        name: 'Hannah White',
        role: 'QA Engineer',
        country: 'United States',
        contact: {
            email: 'hannah.white39@example.com',
            address:
                '128 Market Street, San Francisco, CA 94105, United States',
            phone: '+12024560139',
        },
        about: 'Detail-oriented QA Engineer with extensive experience in software testing, quality assurance processes and test automation. Passionate about delivering reliable products through comprehensive testing strategies, defect prevention and continuous quality improvements.',
        skills: [
            { id: 'test-automation', label: 'Test Automation' },
            { id: 'cypress', label: 'Cypress' },
            { id: 'playwright', label: 'Playwright' },
            { id: 'manual-testing', label: 'Manual Testing' },
            { id: 'api-testing', label: 'API Testing' },
            { id: 'quality-assurance', label: 'Quality Assurance' },
        ],
        summary: {
            products: {
                count: 92,
                variation: 7,
            },
            users: {
                count: 29,
                variation: 4,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T04:30:00.000Z',
                memberSince: '2021-02-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Automated Testing Suite',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Regression Test Plan',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Analyst',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Testing Environment',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'QualityLabs Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'QA Automation Suite',
                category: 'Testing',
                price: 249,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Test Management Platform',
                category: 'Quality',
                price: 189,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Bug Tracking Toolkit',
                category: 'Development',
                price: 129,
                stockQuantity: 16,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading testing initiatives, automation strategies and quality assurance processes across multiple software products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'QA Analyst',
                organization: 'TechQuality Inc.',
                description:
                    'Executed functional, integration and performance testing for enterprise applications.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Tester',
                organization: 'Digital Assurance Group',
                description:
                    'Performed manual testing and collaborated closely with development teams.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Systems',
                organization: 'University of California',
                description:
                    'Focused on software quality, systems engineering and technology management.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'San Francisco State University',
                description:
                    'Studied software engineering, testing methodologies and computer systems.',
            },
        ],
    },
    {
        id: 40,
        avatar: 'https://i.pravatar.cc/150?img=40',
        name: 'Leo Müller',
        role: 'DevOps Engineer',
        country: 'Germany',
        contact: {
            email: 'leo.muller40@example.com',
            address: '82 Friedrichstraße, Berlin 10117, Germany',
            phone: '+4915123456140',
        },
        about: 'DevOps Engineer specialized in cloud infrastructure, CI/CD pipelines and platform reliability. Experienced in automating deployments, improving system observability and building scalable infrastructure that enables fast and secure software delivery.',
        skills: [
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'aws', label: 'AWS' },
            { id: 'docker', label: 'Docker' },
            { id: 'ci-cd', label: 'CI/CD' },
            { id: 'observability', label: 'Observability' },
        ],
        summary: {
            products: {
                count: 132,
                variation: 18,
            },
            users: {
                count: 41,
                variation: 6,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'active',
                lastLogin: '2026-07-19T18:19:00.000Z',
                memberSince: '2022-06-14T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Infrastructure Automation Platform',
                createdAt: '2026-07-19T18:05:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Kubernetes Cluster',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Engineering Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Cloud Engineer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'CloudOps Platform',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Infrastructure Suite',
                category: 'Cloud',
                price: 429,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Deployment Automation Toolkit',
                category: 'DevOps',
                price: 279,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Monitoring Platform',
                category: 'Infrastructure',
                price: 319,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud infrastructure, platform reliability and deployment automation.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Cloud Engineer',
                organization: 'Berlin Cloud Solutions',
                description:
                    'Built scalable cloud environments and optimized infrastructure costs.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Systems Administrator',
                organization: 'TechSystems Germany',
                description:
                    'Maintained enterprise infrastructure and supported critical production systems.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Computer Engineering',
                organization: 'Technical University of Berlin',
                description:
                    'Focused on cloud computing, distributed systems and infrastructure automation.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Information Technology',
                organization: 'University of Hamburg',
                description:
                    'Studied networking, operating systems and software engineering.',
            },
        ],
    },
    {
        id: 41,
        avatar: 'https://i.pravatar.cc/150?img=41',
        name: 'Pedro Alves',
        role: 'Back End Developer',
        country: 'Brazil',
        contact: {
            email: 'pedro.alves41@example.com',
            address: '315 Avenida Paulista, São Paulo, SP 01310-100, Brazil',
            phone: '+5511982340141',
        },
        about: 'Back End Developer focused on building secure, scalable and high-performance systems. Experienced with APIs, databases and distributed architectures, always seeking efficient solutions that support business growth and long-term maintainability.',
        skills: [
            { id: 'nodejs', label: 'Node.js' },
            { id: 'nestjs', label: 'NestJS' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'redis', label: 'Redis' },
            { id: 'microservices', label: 'Microservices' },
            { id: 'system-design', label: 'System Design' },
        ],
        summary: {
            products: {
                count: 121,
                variation: 11,
            },
            users: {
                count: 35,
                variation: 5,
            },
            profile: {
                role: 'Senior Back End Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T09:30:00.000Z',
                memberSince: '2021-09-22T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Authentication Service',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Order Processing API',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Backend Engineer',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Development Environment',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'API Gateway Platform',
                category: 'Backend',
                price: 299,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Microservices Framework',
                category: 'Infrastructure',
                price: 349,
                stockQuantity: 7,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Database Performance Suite',
                category: 'Data',
                price: 219,
                stockQuantity: 15,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Back End Developer',
                organization: 'DevSolutions',
                description:
                    'Designing APIs, backend services and distributed systems for enterprise applications.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'Tech Brasil',
                description:
                    'Developed backend platforms and optimized database-intensive applications.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Junior Developer',
                organization: 'Digital Systems BR',
                description:
                    'Worked on web services, integrations and software maintenance projects.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on distributed systems, software architecture and database technologies.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'Universidade Estadual de Campinas',
                description:
                    'Studied algorithms, software development and information systems.',
            },
        ],
    },
    {
        id: 42,
        avatar: 'https://i.pravatar.cc/150?img=42',
        name: 'Laura Sánchez',
        role: 'Designer',
        country: 'Spain',
        contact: {
            email: 'laura.sanchez42@example.com',
            address: '127 Calle de Alcalá, Madrid 28009, Spain',
            phone: '+34600110142',
        },
        about: 'Creative Designer with a passion for crafting intuitive digital experiences and visually compelling interfaces. Experienced in user-centered design, branding and design systems, helping teams transform ideas into elegant and functional products.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'ux-research', label: 'UX Research' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'wireframing', label: 'Wireframing' },
            { id: 'adobe-xd', label: 'Adobe XD' },
        ],
        summary: {
            products: {
                count: 116,
                variation: 14,
            },
            users: {
                count: 37,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Designer',
                status: 'active',
                lastLogin: '2026-07-19T18:08:00.000Z',
                memberSince: '2022-05-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-image-uploaded',
                target: 'Travel Booking App',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Design System Kit',
                createdAt: '2026-07-19T13:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Portfolio Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Junior UI Designer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'UI Design Library',
                category: 'Design',
                price: 149,
                stockQuantity: 17,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Wireframe Collection',
                category: 'Templates',
                price: 89,
                stockQuantity: 25,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Brand Identity Pack',
                category: 'Branding',
                price: 199,
                stockQuantity: 8,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Designer',
                organization: 'Designify',
                description:
                    'Leading UX initiatives, design systems and visual design strategies for digital products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI/UX Designer',
                organization: 'Madrid Creative Studio',
                description:
                    'Designed user interfaces and collaborated with development teams on product experiences.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Visual España',
                description:
                    'Created branding materials and digital assets for national and international clients.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Design',
                organization: 'Universidad Complutense de Madrid',
                description:
                    'Focused on interaction design, usability and visual communication.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Design',
                organization: 'Universidad de Barcelona',
                description:
                    'Studied graphic design, branding and digital media.',
            },
        ],
    },
    {
        id: 43,
        avatar: 'https://i.pravatar.cc/150?img=43',
        name: 'Tom Baker',
        role: 'Full Stack Developer',
        country: 'United Kingdom',
        contact: {
            email: 'tom.baker43@example.com',
            address: '56 Baker Street, London NW1 6XE, United Kingdom',
            phone: '+447700900143',
        },
        about: 'Full Stack Developer experienced in building scalable web applications, APIs and cloud-native systems. Passionate about modern technologies, software architecture and delivering reliable products with exceptional user experiences.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'graphql', label: 'GraphQL' },
        ],
        summary: {
            products: {
                count: 148,
                variation: 19,
            },
            users: {
                count: 46,
                variation: 7,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:22:00.000Z',
                memberSince: '2022-01-09T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Portal',
                createdAt: '2026-07-19T17:55:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Analytics API',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Software Engineer',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Dashboard',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Enterprise Dashboard',
                category: 'Software',
                price: 399,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Developer Toolkit',
                category: 'Development',
                price: 249,
                stockQuantity: 15,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'API Management Platform',
                category: 'Backend',
                price: 299,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Building enterprise-grade web applications, APIs and cloud-based services.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'London Digital Labs',
                description:
                    'Developed scalable software solutions using modern JavaScript technologies.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Web Developer',
                organization: 'UK Tech Studio',
                description:
                    'Created responsive web applications and backend integrations.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Imperial College London',
                description:
                    'Focused on distributed systems, cloud computing and software architecture.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of Manchester',
                description:
                    'Studied software development, databases and systems engineering.',
            },
        ],
    },
    {
        id: 44,
        avatar: 'https://i.pravatar.cc/150?img=44',
        name: 'Nina Fischer',
        role: 'Product Manager',
        country: 'Germany',
        contact: {
            email: 'nina.fischer44@example.com',
            address: '94 Unter den Linden, Berlin 10117, Germany',
            phone: '+4915123456144',
        },
        about: 'Product Manager with a strong background in product strategy, stakeholder alignment and agile delivery. Experienced in transforming customer needs into successful products while balancing business goals, technical feasibility and user experience.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'roadmapping', label: 'Roadmapping' },
            { id: 'agile-leadership', label: 'Agile Leadership' },
            { id: 'market-analysis', label: 'Market Analysis' },
            { id: 'stakeholder-management', label: 'Stakeholder Management' },
            { id: 'product-discovery', label: 'Product Discovery' },
        ],
        summary: {
            products: {
                count: 122,
                variation: 11,
            },
            users: {
                count: 33,
                variation: 4,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T07:30:00.000Z',
                memberSince: '2020-09-28T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Customer Insights Platform',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Product Roadmap 2027',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Business Analyst',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Management Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Portal',
                createdAt: '2026-07-10T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Roadmap Planning Suite',
                category: 'Business',
                price: 329,
                stockQuantity: 13,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Customer Insights Hub',
                category: 'Analytics',
                price: 279,
                stockQuantity: 10,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Product Discovery Toolkit',
                category: 'Management',
                price: 219,
                stockQuantity: 16,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2019 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, roadmap planning and cross-functional collaboration.',
            },
            {
                id: 2,
                period: '2015 - 2019',
                title: 'Product Owner',
                organization: 'Berlin Innovation Labs',
                description:
                    'Managed agile product teams and delivered customer-focused solutions.',
            },
            {
                id: 3,
                period: '2012 - 2015',
                title: 'Business Analyst',
                organization: 'TechVision Germany',
                description:
                    'Gathered requirements and supported product planning initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2010 - 2012',
                title: 'Master of Business Innovation',
                organization: 'Technical University of Munich',
                description:
                    'Focused on product management, innovation and digital transformation.',
            },
            {
                id: 2,
                period: '2006 - 2010',
                title: 'Bachelor of Business Administration',
                organization: 'University of Cologne',
                description:
                    'Studied management, marketing and strategic planning.',
            },
        ],
    },
    {
        id: 45,
        avatar: 'https://i.pravatar.cc/150?img=45',
        name: 'Victor Hugo',
        role: 'Marketing',
        country: 'France',
        contact: {
            email: 'victor.hugo45@example.com',
            address: '78 Boulevard Saint-Germain, Paris 75006, France',
            phone: '+33612345145',
        },
        about: 'Marketing specialist focused on digital growth, brand positioning and customer acquisition strategies. Experienced in campaign management, performance marketing and market analysis, helping companies expand their reach and improve customer engagement.',
        skills: [
            { id: 'digital-marketing', label: 'Digital Marketing' },
            { id: 'seo', label: 'SEO' },
            { id: 'content-strategy', label: 'Content Strategy' },
            { id: 'google-ads', label: 'Google Ads' },
            { id: 'social-media', label: 'Social Media Marketing' },
            { id: 'analytics', label: 'Marketing Analytics' },
        ],
        summary: {
            products: {
                count: 118,
                variation: 13,
            },
            users: {
                count: 34,
                variation: 5,
            },
            profile: {
                role: 'Senior Marketing Specialist',
                status: 'active',
                lastLogin: '2026-07-19T18:12:00.000Z',
                memberSince: '2022-04-21T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Summer Campaign Strategy',
                createdAt: '2026-07-19T17:45:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'SEO Optimization Project',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Assistant',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Professional Profile',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Marketing Analytics Suite',
                category: 'Marketing',
                price: 249,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Campaign Management Toolkit',
                category: 'Business',
                price: 189,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'SEO Performance Platform',
                category: 'Analytics',
                price: 299,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Marketing Specialist',
                organization: 'MarketPro',
                description:
                    'Managing digital campaigns, brand awareness initiatives and performance marketing strategies.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Marketing Coordinator',
                organization: 'Paris Growth Agency',
                description:
                    'Developed marketing campaigns and analyzed customer acquisition metrics.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Marketing Associate',
                organization: 'Creative Media France',
                description:
                    'Supported content creation and digital advertising projects.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Marketing',
                organization: 'Sorbonne University',
                description:
                    'Focused on digital marketing, consumer behavior and brand management.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'University of Paris',
                description:
                    'Studied marketing, communication and business strategy.',
            },
        ],
    },
    {
        id: 46,
        avatar: 'https://i.pravatar.cc/150?img=46',
        name: 'Diego Torres',
        role: 'DevOps Engineer',
        country: 'Mexico',
        contact: {
            email: 'diego.torres46@example.com',
            address: '221 Avenida Reforma, Mexico City 06600, Mexico',
            phone: '+525512345646',
        },
        about: 'DevOps Engineer passionate about cloud infrastructure, automation and system reliability. Experienced in building scalable environments, streamlining deployment pipelines and ensuring operational excellence through modern DevOps practices.',
        skills: [
            { id: 'aws', label: 'AWS' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'docker', label: 'Docker' },
            { id: 'jenkins', label: 'Jenkins' },
            { id: 'linux-administration', label: 'Linux Administration' },
        ],
        summary: {
            products: {
                count: 129,
                variation: 15,
            },
            users: {
                count: 38,
                variation: 4,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T06:30:00.000Z',
                memberSince: '2021-11-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Cloud Infrastructure Stack',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'CI/CD Automation Pipeline',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'password-changed',
                target: 'Infrastructure Account',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Platform Engineer',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'CloudOps Console',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Infrastructure Automation Suite',
                category: 'Cloud',
                price: 399,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Container Management Platform',
                category: 'DevOps',
                price: 349,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Observability Toolkit',
                category: 'Infrastructure',
                price: 279,
                stockQuantity: 13,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2019 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud environments, automation pipelines and production reliability initiatives.',
            },
            {
                id: 2,
                period: '2015 - 2019',
                title: 'Cloud Engineer',
                organization: 'Mexico Tech Services',
                description:
                    'Designed and maintained cloud-native architectures and deployment workflows.',
            },
            {
                id: 3,
                period: '2012 - 2015',
                title: 'Systems Administrator',
                organization: 'Infra Solutions MX',
                description:
                    'Maintained enterprise systems, servers and network infrastructure.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2010 - 2012',
                title: 'Master of Information Technology',
                organization: 'Tecnológico de Monterrey',
                description:
                    'Focused on cloud computing, distributed systems and infrastructure management.',
            },
            {
                id: 2,
                period: '2006 - 2010',
                title: 'Bachelor of Computer Engineering',
                organization: 'Universidad Nacional Autónoma de México',
                description:
                    'Studied software engineering, networking and systems administration.',
            },
        ],
    },
    {
        id: 47,
        avatar: 'https://i.pravatar.cc/150?img=47',
        name: 'Clara Moreau',
        role: 'Designer',
        country: 'France',
        contact: {
            email: 'clara.moreau47@example.com',
            address: '145 Rue de Rivoli, Paris 75001, France',
            phone: '+33612345147',
        },
        about: 'Creative Designer specializing in digital experiences, interface design and visual storytelling. Passionate about creating products that combine aesthetics, usability and accessibility to deliver exceptional user experiences.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'visual-design', label: 'Visual Design' },
            { id: 'ux-design', label: 'UX Design' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'accessibility', label: 'Accessibility' },
        ],
        summary: {
            products: {
                count: 111,
                variation: 12,
            },
            users: {
                count: 32,
                variation: 4,
            },
            profile: {
                role: 'Senior Designer',
                status: 'active',
                lastLogin: '2026-07-19T17:59:00.000Z',
                memberSince: '2022-07-16T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-image-uploaded',
                target: 'Mobile Design System',
                createdAt: '2026-07-19T17:40:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'UX Research Report',
                createdAt: '2026-07-19T14:30:00.000Z',
            },
            {
                id: 3,
                type: 'profile-avatar-updated',
                target: 'Creative Portfolio',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'UI Designer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Studio',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Modern Design System',
                category: 'Design',
                price: 179,
                stockQuantity: 15,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Interactive Prototype Kit',
                category: 'UX',
                price: 119,
                stockQuantity: 20,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Creative Branding Package',
                category: 'Branding',
                price: 229,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading design initiatives, user research and design system development.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'UI/UX Designer',
                organization: 'Paris Creative Lab',
                description:
                    'Designed intuitive digital experiences and collaborated with product teams.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Graphic Designer',
                organization: 'Studio Lumière',
                description:
                    'Created visual identities, marketing assets and digital experiences.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Digital Arts',
                organization: 'Université Paris-Saclay',
                description:
                    'Focused on user experience, interaction design and digital communication.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Design',
                organization: 'École de Design Nantes Atlantique',
                description:
                    'Studied visual communication, branding and interface design.',
            },
        ],
    },
    {
        id: 48,
        avatar: 'https://i.pravatar.cc/150?img=48',
        name: 'Oscar Nielsen',
        role: 'QA Engineer',
        country: 'Netherlands',
        contact: {
            email: 'oscar.nielsen48@example.com',
            address: '118 Herengracht, Amsterdam 1015 BS, Netherlands',
            phone: '+31612345148',
        },
        about: 'Quality Assurance Engineer with strong expertise in manual and automated testing, quality processes and software validation. Passionate about ensuring product reliability through comprehensive test strategies, continuous improvement and collaboration with cross-functional teams.',
        skills: [
            { id: 'playwright', label: 'Playwright' },
            { id: 'cypress', label: 'Cypress' },
            { id: 'test-planning', label: 'Test Planning' },
            { id: 'api-testing', label: 'API Testing' },
            { id: 'bug-tracking', label: 'Bug Tracking' },
            { id: 'quality-metrics', label: 'Quality Metrics' },
        ],
        summary: {
            products: {
                count: 95,
                variation: 8,
            },
            users: {
                count: 27,
                variation: 3,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T03:30:00.000Z',
                memberSince: '2021-03-10T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Regression Testing Suite',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Automation Framework',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Analyst',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Testing Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'QualityLabs Portal',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Quality Assurance Platform',
                category: 'Testing',
                price: 229,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Automation Toolkit',
                category: 'QA',
                price: 179,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Bug Tracking Suite',
                category: 'Development',
                price: 139,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading software quality initiatives, automation efforts and testing processes.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'QA Specialist',
                organization: 'Amsterdam Digital Group',
                description:
                    'Implemented testing strategies and automated quality assurance workflows.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Tester',
                organization: 'Tech Quality NL',
                description:
                    'Performed functional testing and collaborated with development teams.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Quality',
                organization: 'University of Amsterdam',
                description:
                    'Focused on software testing, quality engineering and systems reliability.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Information Technology',
                organization: 'Eindhoven University of Technology',
                description:
                    'Studied software engineering, databases and information systems.',
            },
        ],
    },
    {
        id: 49,
        avatar: 'https://i.pravatar.cc/150?img=49',
        name: 'Bruno Souza',
        role: 'Back End Developer',
        country: 'Brazil',
        contact: {
            email: 'bruno.souza49@example.com',
            address:
                '842 Avenida Brigadeiro Faria Lima, São Paulo, SP 04538-132, Brazil',
            phone: '+5511982340149',
        },
        about: 'Back End Developer specialized in scalable APIs, cloud services and distributed systems. Experienced in designing robust architectures, optimizing database performance and building secure solutions that support high-growth applications.',
        skills: [
            { id: 'nestjs', label: 'NestJS' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'redis', label: 'Redis' },
            { id: 'microservices', label: 'Microservices' },
            { id: 'rabbitmq', label: 'RabbitMQ' },
        ],
        summary: {
            products: {
                count: 138,
                variation: 16,
            },
            users: {
                count: 42,
                variation: 6,
            },
            profile: {
                role: 'Senior Back End Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:03:00.000Z',
                memberSince: '2022-08-04T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Payments API',
                createdAt: '2026-07-19T17:50:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Authentication Service',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Backend Engineer',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Dashboard',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Payments Processing API',
                category: 'Backend',
                price: 349,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Integration Platform',
                category: 'Infrastructure',
                price: 419,
                stockQuantity: 7,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Data Processing Engine',
                category: 'Software',
                price: 289,
                stockQuantity: 15,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Back End Developer',
                organization: 'DevSolutions',
                description:
                    'Building high-performance backend systems, APIs and cloud-native services.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Software Engineer',
                organization: 'Tech Brasil Solutions',
                description:
                    'Developed enterprise backend platforms and optimized database architectures.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Junior Developer',
                organization: 'Digital Systems BR',
                description:
                    'Worked on backend services, integrations and software maintenance.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Software Engineering',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on distributed systems, APIs and software architecture.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'Universidade Federal de Minas Gerais',
                description:
                    'Studied software development, databases and computer systems.',
            },
        ],
    },
    {
        id: 50,
        avatar: 'https://i.pravatar.cc/150?img=50',
        name: 'Alice Dupont',
        role: 'Product Manager',
        country: 'France',
        contact: {
            email: 'alice.dupont50@example.com',
            address: '64 Avenue des Champs-Élysées, Paris 75008, France',
            phone: '+33612345150',
        },
        about: 'Product Manager with extensive experience in product strategy, customer discovery and roadmap execution. Skilled at aligning business goals with user needs, coordinating cross-functional teams and driving successful product launches.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'roadmap-planning', label: 'Roadmap Planning' },
            { id: 'stakeholder-alignment', label: 'Stakeholder Alignment' },
            { id: 'market-research', label: 'Market Research' },
            { id: 'agile-product', label: 'Agile Product Management' },
            { id: 'customer-discovery', label: 'Customer Discovery' },
        ],
        summary: {
            products: {
                count: 124,
                variation: 10,
            },
            users: {
                count: 35,
                variation: 4,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T08:30:00.000Z',
                memberSince: '2021-01-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Product Roadmap 2027',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Customer Research Initiative',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Product Analyst',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Management Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Platform',
                createdAt: '2026-07-10T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Strategic Planning Suite',
                category: 'Business',
                price: 329,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Customer Insights Platform',
                category: 'Analytics',
                price: 279,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Product Discovery Toolkit',
                category: 'Management',
                price: 239,
                stockQuantity: 14,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2019 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, roadmap execution and stakeholder collaboration.',
            },
            {
                id: 2,
                period: '2015 - 2019',
                title: 'Product Owner',
                organization: 'Paris Innovation Group',
                description:
                    'Managed agile teams and delivered customer-centric digital products.',
            },
            {
                id: 3,
                period: '2012 - 2015',
                title: 'Business Analyst',
                organization: 'Digital Consulting France',
                description:
                    'Analyzed business requirements and supported strategic product initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2010 - 2012',
                title: 'Master of Business Innovation',
                organization: 'HEC Paris',
                description:
                    'Focused on product management, innovation and business strategy.',
            },
            {
                id: 2,
                period: '2006 - 2010',
                title: 'Bachelor of Business Administration',
                organization: 'Université Paris Dauphine',
                description:
                    'Studied management, marketing and organizational strategy.',
            },
        ],
    },
    {
        id: 51,
        avatar: 'https://i.pravatar.cc/150?img=51',
        name: 'George King',
        role: 'SEO Specialist',
        country: 'United Kingdom',
        contact: {
            email: 'george.king51@example.com',
            address: '88 Baker Street, London NW1 6XE, United Kingdom',
            phone: '+447700900151',
        },
        about: 'SEO Specialist with extensive experience in search engine optimization, content strategy and digital marketing. Passionate about improving organic visibility, analyzing search trends and driving sustainable growth through data-driven optimization strategies.',
        skills: [
            { id: 'seo', label: 'SEO' },
            { id: 'technical-seo', label: 'Technical SEO' },
            { id: 'google-analytics', label: 'Google Analytics' },
            { id: 'keyword-research', label: 'Keyword Research' },
            { id: 'content-strategy', label: 'Content Strategy' },
            { id: 'search-console', label: 'Google Search Console' },
        ],
        summary: {
            products: {
                count: 116,
                variation: 14,
            },
            users: {
                count: 31,
                variation: 5,
            },
            profile: {
                role: 'Senior SEO Specialist',
                status: 'active',
                lastLogin: '2026-07-19T17:30:00.000Z',
                memberSince: '2021-05-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'SEO Audit Dashboard',
                createdAt: '2026-07-19T18:00:00.000Z',
            },
            {
                id: 2,
                type: 'user-created',
                target: 'Content Strategist',
                createdAt: '2026-07-19T14:30:00.000Z',
            },
            {
                id: 3,
                type: 'product-created',
                target: 'Keyword Tracking Report',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Marketing Workspace',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Dashboard',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'SEO Analytics Suite',
                category: 'Marketing',
                price: 249,
                stockQuantity: 15,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Keyword Intelligence Tool',
                category: 'Analytics',
                price: 189,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
                name: 'Content Optimization Platform',
                category: 'SEO',
                price: 299,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior SEO Specialist',
                organization: 'MarketPro',
                description:
                    'Leading SEO strategies, technical audits and organic growth initiatives.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'SEO Analyst',
                organization: 'Digital Growth UK',
                description:
                    'Managed search optimization campaigns and performance reporting.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Digital Marketing Executive',
                organization: 'Search Partners',
                description:
                    'Supported online marketing strategies and content optimization.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Marketing',
                organization: 'University of Manchester',
                description:
                    'Focused on digital strategy, analytics and online marketing.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Management',
                organization: 'University of Leeds',
                description:
                    'Studied marketing, business operations and strategic planning.',
            },
        ],
    },
    {
        id: 52,
        avatar: 'https://i.pravatar.cc/150?img=52',
        name: 'Ella Wright',
        role: 'Designer',
        country: 'Australia',
        contact: {
            email: 'ella.wright52@example.com',
            address: '245 George Street, Sydney NSW 2000, Australia',
            phone: '+61412345152',
        },
        about: 'Creative Designer specialized in branding, digital experiences and user-centered visual design. Experienced in creating modern interfaces, design systems and impactful visual identities for web and mobile products.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'branding', label: 'Branding' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'illustration', label: 'Illustration' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'creative-direction', label: 'Creative Direction' },
        ],
        summary: {
            products: {
                count: 89,
                variation: 7,
            },
            users: {
                count: 24,
                variation: 2,
            },
            profile: {
                role: 'Senior Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T07:30:00.000Z',
                memberSince: '2022-02-28T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Brand Identity Kit',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'profile-avatar-updated',
                target: 'Design Portfolio',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'product-created',
                target: 'UI Component Library',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Creative Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Design System Kit',
                category: 'Design',
                price: 179,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Branding Toolkit',
                category: 'Creative',
                price: 229,
                stockQuantity: 6,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
                name: 'Illustration Pack',
                category: 'Graphics',
                price: 119,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Creating visual systems, branding assets and modern digital experiences.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'UI Designer',
                organization: 'Creative Studio AU',
                description:
                    'Designed interfaces and collaborated on product design initiatives.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Graphic Designer',
                organization: 'Visual Works',
                description:
                    'Produced marketing materials and visual identity projects.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Design',
                organization: 'University of Sydney',
                description:
                    'Focused on digital experiences, visual communication and branding.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Graphic Design',
                organization: 'University of Technology Sydney',
                description:
                    'Studied visual design, typography and creative problem solving.',
            },
        ],
    },
    {
        id: 53,
        avatar: 'https://i.pravatar.cc/150?img=53',
        name: 'Samuel Lee',
        role: 'Full Stack Developer',
        country: 'United States',
        contact: {
            email: 'samuel.lee53@example.com',
            address:
                '415 Mission Street, San Francisco, CA 94105, United States',
            phone: '+12024560153',
        },
        about: 'Full Stack Developer with strong expertise in frontend and backend technologies. Experienced in building scalable web applications, cloud integrations and modern user experiences while maintaining clean architecture and high development standards.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'nextjs', label: 'Next.js' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'graphql', label: 'GraphQL' },
            { id: 'aws', label: 'AWS' },
        ],
        summary: {
            products: {
                count: 154,
                variation: 19,
            },
            users: {
                count: 48,
                variation: 8,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:12:00.000Z',
                memberSince: '2021-09-06T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Portal',
                createdAt: '2026-07-19T18:10:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'GraphQL Gateway',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Software Engineer',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Platform',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Enterprise Web Platform',
                category: 'Software',
                price: 499,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'API Management Suite',
                category: 'Backend',
                price: 379,
                stockQuantity: 11,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Developer Productivity Toolkit',
                category: 'Development',
                price: 259,
                stockQuantity: 14,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Building scalable applications using modern frontend and backend technologies.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'Bay Area Technologies',
                description:
                    'Developed enterprise web applications and cloud-native solutions.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Web Developer',
                organization: 'Digital Labs',
                description:
                    'Worked on full stack solutions and customer-facing applications.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Computer Science',
                organization: 'Stanford University',
                description:
                    'Focused on software architecture, distributed systems and cloud computing.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of California',
                description:
                    'Studied software engineering, databases and web technologies.',
            },
        ],
    },
    {
        id: 54,
        avatar: 'https://i.pravatar.cc/150?img=54',
        name: 'Grace Hill',
        role: 'QA Engineer',
        country: 'Canada',
        contact: {
            email: 'grace.hill54@example.com',
            address: '512 King Street West, Toronto, ON M5V 1L7, Canada',
            phone: '+14165550154',
        },
        about: 'QA Engineer with strong experience in software testing, automation frameworks and quality assurance processes. Passionate about delivering reliable products through robust testing strategies, continuous integration practices and close collaboration with development teams.',
        skills: [
            { id: 'playwright', label: 'Playwright' },
            { id: 'cypress', label: 'Cypress' },
            { id: 'automation-testing', label: 'Automation Testing' },
            { id: 'manual-testing', label: 'Manual Testing' },
            { id: 'jira', label: 'Jira' },
            { id: 'quality-assurance', label: 'Quality Assurance' },
        ],
        summary: {
            products: {
                count: 102,
                variation: 9,
            },
            users: {
                count: 29,
                variation: 4,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T05:30:00.000Z',
                memberSince: '2021-04-21T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Regression Testing Suite',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'QA Automation Pipeline',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Analyst',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'QualityLabs Workspace',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'QualityLabs Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Testing Automation Platform',
                category: 'QA',
                price: 249,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Bug Tracking System',
                category: 'Testing',
                price: 179,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Quality Metrics Dashboard',
                category: 'Analytics',
                price: 219,
                stockQuantity: 6,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading testing initiatives, automation frameworks and quality assurance processes.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'QA Specialist',
                organization: 'Toronto Software Group',
                description:
                    'Implemented testing strategies and maintained software quality standards.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Tester',
                organization: 'Digital Solutions Canada',
                description:
                    'Performed functional and regression testing for enterprise applications.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Quality',
                organization: 'University of Toronto',
                description:
                    'Focused on software testing methodologies and quality engineering.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'York University',
                description:
                    'Studied software development, systems analysis and quality practices.',
            },
        ],
    },
    {
        id: 55,
        avatar: 'https://i.pravatar.cc/150?img=55',
        name: 'Arthur Petit',
        role: 'Marketing',
        country: 'France',
        contact: {
            email: 'arthur.petit55@example.com',
            address: '148 Boulevard Haussmann, Paris 75008, France',
            phone: '+33612345155',
        },
        about: 'Marketing professional focused on brand growth, digital campaigns and customer engagement strategies. Experienced in market analysis, campaign optimization and building impactful marketing initiatives that drive measurable business results.',
        skills: [
            { id: 'digital-marketing', label: 'Digital Marketing' },
            { id: 'campaign-management', label: 'Campaign Management' },
            { id: 'google-ads', label: 'Google Ads' },
            { id: 'content-marketing', label: 'Content Marketing' },
            { id: 'market-analysis', label: 'Market Analysis' },
            { id: 'social-media-strategy', label: 'Social Media Strategy' },
        ],
        summary: {
            products: {
                count: 121,
                variation: 15,
            },
            users: {
                count: 34,
                variation: 6,
            },
            profile: {
                role: 'Marketing Manager',
                status: 'active',
                lastLogin: '2026-07-19T17:48:00.000Z',
                memberSince: '2022-07-11T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Summer Campaign 2026',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Customer Acquisition Strategy',
                createdAt: '2026-07-19T13:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Analyst',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Marketing Profile',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'MarketPro Platform',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Marketing Analytics Suite',
                category: 'Marketing',
                price: 289,
                stockQuantity: 13,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'Campaign Management Tool',
                category: 'Business',
                price: 239,
                stockQuantity: 10,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
                name: 'SEO Growth Platform',
                category: 'Analytics',
                price: 199,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Marketing Manager',
                organization: 'MarketPro',
                description:
                    'Leading digital campaigns, customer acquisition strategies and brand growth initiatives.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Digital Marketing Specialist',
                organization: 'Paris Media Group',
                description:
                    'Managed online campaigns and optimized marketing performance metrics.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Marketing Coordinator',
                organization: 'Creative Growth Agency',
                description:
                    'Supported marketing projects and content distribution strategies.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Marketing Management',
                organization: 'HEC Paris',
                description:
                    'Focused on brand strategy, marketing analytics and consumer behavior.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Business Administration',
                organization: 'Université Paris Dauphine',
                description:
                    'Studied management, marketing and strategic planning.',
            },
        ],
    },
    {
        id: 56,
        avatar: 'https://i.pravatar.cc/150?img=56',
        name: 'Felipe Rocha',
        role: 'Back End Developer',
        country: 'Brazil',
        contact: {
            email: 'felipe.rocha56@example.com',
            address: '1650 Avenida Paulista, São Paulo, SP 01310-200, Brazil',
            phone: '+5511982340156',
        },
        about: 'Back End Developer specialized in scalable APIs, cloud-native architectures and database optimization. Experienced in building secure and high-performance systems that support modern web applications and enterprise platforms.',
        skills: [
            { id: 'nestjs', label: 'NestJS' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
            { id: 'aws', label: 'AWS' },
            { id: 'microservices', label: 'Microservices' },
        ],
        summary: {
            products: {
                count: 143,
                variation: 18,
            },
            users: {
                count: 39,
                variation: 7,
            },
            profile: {
                role: 'Senior Back End Developer',
                status: 'inactive',
                lastLogin: '2026-07-19T09:30:00.000Z',
                memberSince: '2021-11-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Payments Service API',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Customer Management Service',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Backend Engineer',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Development Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Microservices Platform',
                category: 'Backend',
                price: 429,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Infrastructure Suite',
                category: 'Infrastructure',
                price: 519,
                stockQuantity: 5,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'API Gateway Manager',
                category: 'Software',
                price: 299,
                stockQuantity: 12,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Back End Developer',
                organization: 'DevSolutions',
                description:
                    'Developing scalable backend services, APIs and cloud-based architectures.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'Tech Brasil Solutions',
                description:
                    'Built enterprise systems and optimized backend performance.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Junior Developer',
                organization: 'Digital Systems BR',
                description:
                    'Worked on APIs, integrations and database-driven applications.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on software architecture, distributed systems and cloud computing.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'Universidade Estadual de Campinas',
                description:
                    'Studied software development, databases and systems engineering.',
            },
        ],
    },
    {
        id: 57,
        avatar: 'https://i.pravatar.cc/150?img=57',
        name: 'Eva Novak',
        role: 'Designer',
        country: 'Germany',
        contact: {
            email: 'eva.novak57@example.com',
            address: '221 Friedrichstraße, Berlin 10117, Germany',
            phone: '+4915123456157',
        },
        about: 'Creative Designer with a strong passion for crafting intuitive user experiences and visually compelling digital products. Experienced in branding, interface design, design systems and collaborating with cross-functional teams to deliver user-centered solutions.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'ux-research', label: 'UX Research' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'adobe-xd', label: 'Adobe XD' },
        ],
        summary: {
            products: {
                count: 117,
                variation: 13,
            },
            users: {
                count: 31,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Designer',
                status: 'active',
                lastLogin: '2026-07-19T17:42:00.000Z',
                memberSince: '2022-05-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Design System Library',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'profile-avatar-updated',
                target: 'Designer Profile',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'product-created',
                target: 'Mobile App Prototype',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'UI Designer',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Design System Kit',
                category: 'Design',
                price: 189,
                stockQuantity: 15,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
                name: 'UX Research Toolkit',
                category: 'Research',
                price: 149,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Wireframe Collection',
                category: 'UI/UX',
                price: 99,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Product Designer',
                organization: 'Designify',
                description:
                    'Leading design initiatives, creating scalable design systems and improving user experiences.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'UI/UX Designer',
                organization: 'Creative Berlin Studio',
                description:
                    'Designed responsive interfaces and conducted user research for digital products.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Graphic Designer',
                organization: 'Visual Arts Agency',
                description:
                    'Developed branding materials and visual assets for international clients.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Digital Design',
                organization: 'Technical University of Berlin',
                description:
                    'Focused on user experience, visual communication and interaction design.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Design',
                organization: 'Berlin University of the Arts',
                description:
                    'Studied graphic design, branding and digital media production.',
            },
        ],
    },
    {
        id: 58,
        avatar: 'https://i.pravatar.cc/150?img=58',
        name: 'Martin Keller',
        role: 'DevOps Engineer',
        country: 'Germany',
        contact: {
            email: 'martin.keller58@example.com',
            address: '89 Königsallee, Düsseldorf 40212, Germany',
            phone: '+4915123456158',
        },
        about: 'DevOps Engineer specialized in cloud infrastructure, CI/CD automation and platform reliability. Passionate about building scalable systems, improving deployment workflows and ensuring operational excellence through automation and monitoring.',
        skills: [
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'aws', label: 'AWS' },
            { id: 'docker', label: 'Docker' },
            { id: 'github-actions', label: 'GitHub Actions' },
            { id: 'monitoring', label: 'Infrastructure Monitoring' },
        ],
        summary: {
            products: {
                count: 148,
                variation: 17,
            },
            users: {
                count: 42,
                variation: 8,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T08:30:00.000Z',
                memberSince: '2021-09-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Cloud Infrastructure Platform',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Kubernetes Cluster',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'password-changed',
                target: 'CloudOps Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'user-created',
                target: 'Platform Engineer',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Infrastructure Dashboard',
                createdAt: '2026-07-11T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Operations Suite',
                category: 'Infrastructure',
                price: 549,
                stockQuantity: 6,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Container Management Platform',
                category: 'DevOps',
                price: 449,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'CI/CD Automation Toolkit',
                category: 'Automation',
                price: 329,
                stockQuantity: 10,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud infrastructure, automation pipelines and platform reliability initiatives.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Infrastructure Engineer',
                organization: 'German Cloud Systems',
                description:
                    'Designed scalable infrastructure and deployment automation solutions.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Systems Administrator',
                organization: 'IT Services Group',
                description:
                    'Maintained enterprise systems and supported infrastructure operations.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Systems',
                organization: 'RWTH Aachen University',
                description:
                    'Focused on cloud computing, distributed systems and infrastructure engineering.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of Cologne',
                description:
                    'Studied software engineering, networking and systems administration.',
            },
        ],
    },
    {
        id: 59,
        avatar: 'https://i.pravatar.cc/150?img=59',
        name: 'Julia Weber',
        role: 'Product Manager',
        country: 'Netherlands',
        contact: {
            email: 'julia.weber59@example.com',
            address: '340 Herengracht, Amsterdam 1016 CG, Netherlands',
            phone: '+31612345159',
        },
        about: 'Product Manager with experience leading cross-functional teams, defining product strategy and delivering customer-focused solutions. Skilled at balancing business objectives, technical requirements and user needs to create impactful digital products.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'roadmapping', label: 'Roadmapping' },
            { id: 'stakeholder-management', label: 'Stakeholder Management' },
            { id: 'agile', label: 'Agile' },
            { id: 'scrum', label: 'Scrum' },
            { id: 'product-analytics', label: 'Product Analytics' },
        ],
        summary: {
            products: {
                count: 133,
                variation: 16,
            },
            users: {
                count: 37,
                variation: 6,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'active',
                lastLogin: '2026-07-19T16:30:00.000Z',
                memberSince: '2022-01-20T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Insights Platform',
                createdAt: '2026-07-19T15:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Product Roadmap 2026',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Associate Product Manager',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Product Leadership Profile',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Product Planning Suite',
                category: 'Management',
                price: 399,
                stockQuantity: 9,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Analytics Dashboard',
                category: 'Business',
                price: 299,
                stockQuantity: 12,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Team Collaboration Platform',
                category: 'Productivity',
                price: 249,
                stockQuantity: 14,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, roadmap planning and cross-functional execution.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Product Owner',
                organization: 'Amsterdam Digital Group',
                description:
                    'Managed product backlogs and coordinated product delivery across teams.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Business Analyst',
                organization: 'Innovation Labs',
                description:
                    'Gathered requirements and translated business goals into product initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Business Innovation',
                organization: 'University of Amsterdam',
                description:
                    'Focused on product innovation, leadership and business strategy.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Erasmus University Rotterdam',
                description:
                    'Studied management, economics and organizational development.',
            },
        ],
    },
    {
        id: 60,
        avatar: 'https://i.pravatar.cc/150?img=60',
        name: 'Andrés Cruz',
        role: 'Marketing',
        country: 'Mexico',
        contact: {
            email: 'andres.cruz60@example.com',
            address: '742 Paseo de la Reforma, Ciudad de México 06500, Mexico',
            phone: '+525512345660',
        },
        about: 'Marketing specialist with extensive experience in brand positioning, customer acquisition and digital growth strategies. Skilled in campaign optimization, performance analysis and creating marketing initiatives that drive measurable business results.',
        skills: [
            { id: 'digital-marketing', label: 'Digital Marketing' },
            { id: 'google-ads', label: 'Google Ads' },
            { id: 'seo', label: 'SEO' },
            { id: 'content-strategy', label: 'Content Strategy' },
            { id: 'marketing-analytics', label: 'Marketing Analytics' },
            { id: 'social-media-marketing', label: 'Social Media Marketing' },
        ],
        summary: {
            products: {
                count: 126,
                variation: 14,
            },
            users: {
                count: 33,
                variation: 5,
            },
            profile: {
                role: 'Marketing Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T07:30:00.000Z',
                memberSince: '2021-08-17T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Customer Growth Campaign',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Summer Marketing Strategy',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Coordinator',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'MarketPro Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Marketing Dashboard',
                createdAt: '2026-07-10T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Marketing Insights Platform',
                category: 'Marketing',
                price: 279,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
                name: 'Lead Generation Toolkit',
                category: 'Business',
                price: 199,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'SEO Performance Suite',
                category: 'Analytics',
                price: 249,
                stockQuantity: 6,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Marketing Manager',
                organization: 'MarketPro',
                description:
                    'Leading marketing campaigns, customer acquisition initiatives and growth strategies.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Digital Marketing Specialist',
                organization: 'Mexico Growth Agency',
                description:
                    'Managed performance marketing campaigns and brand development projects.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Marketing Analyst',
                organization: 'Creative Media MX',
                description:
                    'Analyzed campaign performance and optimized marketing channels.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Marketing',
                organization: 'Universidad Nacional Autónoma de México',
                description:
                    'Focused on consumer behavior, branding and digital marketing.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'Instituto Tecnológico Autónomo de México',
                description:
                    'Studied management, economics and strategic marketing.',
            },
        ],
    },
    {
        id: 61,
        avatar: 'https://i.pravatar.cc/150?img=61',
        name: 'Victor Silva',
        role: 'Full Stack Developer',
        country: 'Brazil',
        contact: {
            email: 'victor.silva61@example.com',
            address: '1840 Avenida Faria Lima, São Paulo, SP 04538-132, Brazil',
            phone: '+5511982340161',
        },
        about: 'Full Stack Developer passionate about building scalable web applications from frontend interfaces to backend services. Experienced with modern JavaScript ecosystems, cloud infrastructure and software architecture best practices.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'nestjs', label: 'NestJS' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
        ],
        summary: {
            products: {
                count: 154,
                variation: 19,
            },
            users: {
                count: 44,
                variation: 8,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'active',
                lastLogin: '2026-07-19T17:53:00.000Z',
                memberSince: '2022-02-09T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Portal',
                createdAt: '2026-07-19T16:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'API Gateway Service',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Software Engineer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Platform',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Enterprise Web Platform',
                category: 'Software',
                price: 499,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Backend Services Suite',
                category: 'Backend',
                price: 359,
                stockQuantity: 12,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Developer Productivity Toolkit',
                category: 'Development',
                price: 229,
                stockQuantity: 15,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Building end-to-end applications, APIs and cloud-native solutions.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Software Engineer',
                organization: 'Tech Brasil',
                description:
                    'Developed scalable web applications and backend services.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Frontend Developer',
                organization: 'Digital Innovation Lab',
                description:
                    'Created responsive interfaces and interactive user experiences.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Software Engineering',
                organization: 'Universidade de São Paulo',
                description:
                    'Focused on software architecture and distributed systems.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'Universidade Federal de Minas Gerais',
                description:
                    'Studied programming, databases and software engineering principles.',
            },
        ],
    },
    {
        id: 62,
        avatar: 'https://i.pravatar.cc/150?img=62',
        name: 'Isabel Costa',
        role: 'Designer',
        country: 'Portugal',
        contact: {
            email: 'isabel.costa62@example.com',
            address: '112 Avenida da Liberdade, Lisboa 1250-096, Portugal',
            phone: '+351912345162',
        },
        about: 'Designer focused on creating elegant digital experiences through thoughtful user-centered design. Experienced in interface design, prototyping, branding and collaborating with multidisciplinary teams to deliver impactful products.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'ux-design', label: 'UX Design' },
            { id: 'branding', label: 'Branding' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'visual-design', label: 'Visual Design' },
        ],
        summary: {
            products: {
                count: 108,
                variation: 11,
            },
            users: {
                count: 28,
                variation: 4,
            },
            profile: {
                role: 'Senior Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T04:30:00.000Z',
                memberSince: '2021-06-03T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Design Component Library',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Mobile Banking Prototype',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Junior Designer',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Designify Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Design Dashboard',
                createdAt: '2026-07-09T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'UI Design Kit',
                category: 'Design',
                price: 149,
                stockQuantity: 13,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
                name: 'User Research Toolkit',
                category: 'Research',
                price: 119,
                stockQuantity: 9,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Creative Assets Bundle',
                category: 'Design',
                price: 99,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading visual design projects and creating scalable design systems.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'UI/UX Designer',
                organization: 'Lisbon Creative Studio',
                description:
                    'Designed digital products and conducted user research initiatives.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Graphic Designer',
                organization: 'Creative Portugal',
                description:
                    'Developed branding projects and visual communication assets.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Digital Design',
                organization: 'Universidade de Lisboa',
                description:
                    'Focused on interaction design, usability and digital experiences.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Design',
                organization: 'Universidade do Porto',
                description:
                    'Studied visual communication, branding and multimedia design.',
            },
        ],
    },
    {
        id: 63,
        avatar: 'https://i.pravatar.cc/150?img=63',
        name: 'Daniel Young',
        role: 'QA Engineer',
        country: 'United States',
        contact: {
            email: 'daniel.young63@example.com',
            address: '875 Madison Avenue, New York, NY 10021, United States',
            phone: '+12024560163',
        },
        about: 'QA Engineer focused on delivering reliable software through comprehensive testing strategies, automation frameworks and quality assurance best practices. Experienced in validating complex systems and improving development workflows.',
        skills: [
            { id: 'test-automation', label: 'Test Automation' },
            { id: 'cypress', label: 'Cypress' },
            { id: 'playwright', label: 'Playwright' },
            { id: 'api-testing', label: 'API Testing' },
            { id: 'quality-assurance', label: 'Quality Assurance' },
            { id: 'bug-tracking', label: 'Bug Tracking' },
        ],
        summary: {
            products: {
                count: 132,
                variation: 15,
            },
            users: {
                count: 36,
                variation: 6,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'active',
                lastLogin: '2026-07-19T17:42:00.000Z',
                memberSince: '2022-01-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Automation Test Suite',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Regression Testing Plan',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Analyst',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'QualityLabs Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Testing Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'QA Automation Platform',
                category: 'Testing',
                price: 249,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Bug Tracking Suite',
                category: 'Software',
                price: 179,
                stockQuantity: 7,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Performance Testing Kit',
                category: 'QA Tools',
                price: 219,
                stockQuantity: 9,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading quality assurance initiatives, automation testing and release validation.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'QA Analyst',
                organization: 'Tech Quality Inc.',
                description:
                    'Executed manual and automated testing across enterprise applications.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Tester',
                organization: 'Digital Testing Group',
                description:
                    'Performed functional, integration and performance testing activities.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Systems',
                organization: 'Columbia University',
                description:
                    'Focused on software quality, testing methodologies and systems engineering.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of Maryland',
                description:
                    'Studied software development, databases and software testing principles.',
            },
        ],
    },
    {
        id: 64,
        avatar: 'https://i.pravatar.cc/150?img=64',
        name: 'Emily Green',
        role: 'Product Manager',
        country: 'Canada',
        contact: {
            email: 'emily.green64@example.com',
            address: '215 King Street West, Toronto, ON M5V 1J5, Canada',
            phone: '+14165550164',
        },
        about: 'Product Manager with experience driving product strategy, roadmap planning and cross-functional collaboration. Passionate about building customer-centric solutions that align business goals with user needs.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'roadmap-planning', label: 'Roadmap Planning' },
            { id: 'stakeholder-management', label: 'Stakeholder Management' },
            {
                id: 'agile-product-management',
                label: 'Agile Product Management',
            },
            { id: 'market-research', label: 'Market Research' },
            { id: 'data-driven-decisions', label: 'Data-Driven Decisions' },
        ],
        summary: {
            products: {
                count: 141,
                variation: 17,
            },
            users: {
                count: 41,
                variation: 5,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T03:30:00.000Z',
                memberSince: '2021-04-28T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Success Portal',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Product Roadmap Q3',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Associate Product Manager',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Productify Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Product Dashboard',
                createdAt: '2026-07-09T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Customer Experience Platform',
                category: 'Product',
                price: 349,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
                name: 'Product Analytics Suite',
                category: 'Analytics',
                price: 279,
                stockQuantity: 6,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Roadmap Management Tool',
                category: 'Management',
                price: 229,
                stockQuantity: 11,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product vision, strategy and roadmap execution across multiple teams.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Product Manager',
                organization: 'Growth Products Inc.',
                description:
                    'Managed product lifecycle and coordinated cross-functional teams.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Business Analyst',
                organization: 'Innovation Partners',
                description:
                    'Gathered requirements and supported product planning initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Business Administration',
                organization: 'University of Toronto',
                description:
                    'Focused on product innovation, leadership and strategic management.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Commerce',
                organization: 'York University',
                description:
                    'Studied business management, marketing and organizational strategy.',
            },
        ],
    },
    {
        id: 65,
        avatar: 'https://i.pravatar.cc/150?img=65',
        name: 'Hugo Fernandes',
        role: 'Back End Developer',
        country: 'Brazil',
        contact: {
            email: 'hugo.fernandes65@example.com',
            address: '990 Avenida Paulista, São Paulo, SP 01310-100, Brazil',
            phone: '+5511982340165',
        },
        about: 'Back End Developer specialized in designing scalable APIs, database architectures and distributed systems. Experienced in building secure, high-performance backend solutions that support modern web applications.',
        skills: [
            { id: 'nodejs', label: 'Node.js' },
            { id: 'nestjs', label: 'NestJS' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'redis', label: 'Redis' },
            { id: 'microservices', label: 'Microservices' },
            { id: 'docker', label: 'Docker' },
        ],
        summary: {
            products: {
                count: 167,
                variation: 22,
            },
            users: {
                count: 49,
                variation: 9,
            },
            profile: {
                role: 'Senior Back End Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:08:00.000Z',
                memberSince: '2022-09-05T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Authentication Service',
                createdAt: '2026-07-19T17:55:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Payment API',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Backend Engineer',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Platform',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'API Gateway',
                category: 'Backend',
                price: 399,
                stockQuantity: 8,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Authentication Platform',
                category: 'Security',
                price: 299,
                stockQuantity: 12,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Microservices Toolkit',
                category: 'Infrastructure',
                price: 259,
                stockQuantity: 15,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Back End Developer',
                organization: 'DevSolutions',
                description:
                    'Building scalable backend architectures, APIs and cloud-native services.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Software Engineer',
                organization: 'Tech Brasil',
                description:
                    'Developed distributed systems and high-performance backend applications.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Junior Back End Developer',
                organization: 'Digital Systems',
                description:
                    'Implemented APIs, database integrations and internal services.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Computer Science',
                organization: 'Universidade Estadual de Campinas',
                description:
                    'Focused on distributed computing and software engineering.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'Universidade Federal de São Carlos',
                description:
                    'Studied algorithms, databases and software architecture.',
            },
        ],
    },
    {
        id: 66,
        avatar: 'https://i.pravatar.cc/150?img=66',
        name: 'Anna Schmidt',
        role: 'Designer',
        country: 'Germany',
        contact: {
            email: 'anna.schmidt66@example.com',
            address: '248 Friedrichstraße, Berlin 10117, Germany',
            phone: '+4915123456166',
        },
        about: 'Creative Designer with a strong background in user interface design, visual identity systems and digital experiences. Passionate about crafting intuitive and visually appealing products that balance aesthetics and usability.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'ui-design', label: 'UI Design' },
            { id: 'ux-research', label: 'UX Research' },
            { id: 'adobe-xd', label: 'Adobe XD' },
            { id: 'visual-branding', label: 'Visual Branding' },
        ],
        summary: {
            products: {
                count: 118,
                variation: 10,
            },
            users: {
                count: 31,
                variation: 4,
            },
            profile: {
                role: 'Senior Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T00:30:00.000Z',
                memberSince: '2021-05-12T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Design System Library',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Mobile App Prototype',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Junior UI Designer',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'Designify Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Creative Dashboard',
                createdAt: '2026-07-10T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
                name: 'Design Components Kit',
                category: 'Design',
                price: 149,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d',
                name: 'UX Research Toolkit',
                category: 'Research',
                price: 109,
                stockQuantity: 7,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Brand Identity Pack',
                category: 'Branding',
                price: 189,
                stockQuantity: 5,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading design initiatives and maintaining scalable design systems for digital products.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'UI/UX Designer',
                organization: 'Berlin Creative Studio',
                description:
                    'Designed user-centered interfaces and collaborated with development teams.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Graphic Designer',
                organization: 'Creative Works Germany',
                description:
                    'Created branding assets and visual communication materials.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Digital Media Design',
                organization: 'Technical University of Berlin',
                description:
                    'Focused on interaction design, usability and visual communication.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Design',
                organization: 'University of Applied Sciences Berlin',
                description:
                    'Studied graphic design, branding and digital media production.',
            },
        ],
    },
    {
        id: 67,
        avatar: 'https://i.pravatar.cc/150?img=67',
        name: 'Marco Conti',
        role: 'Front End Developer',
        country: 'Italy',
        contact: {
            email: 'marco.conti67@example.com',
            address: '95 Via Torino, Milan 20123, Italy',
            phone: '+393123456167',
        },
        about: 'Front End Developer specialized in creating responsive and accessible web applications using modern JavaScript frameworks. Passionate about performance optimization, user experience and maintainable code architecture.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nextjs', label: 'Next.js' },
            { id: 'sass', label: 'Sass' },
            { id: 'vite', label: 'Vite' },
            { id: 'storybook', label: 'Storybook' },
        ],
        summary: {
            products: {
                count: 163,
                variation: 21,
            },
            users: {
                count: 46,
                variation: 8,
            },
            profile: {
                role: 'Senior Front End Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:05:00.000Z',
                memberSince: '2022-10-07T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Admin Dashboard UI',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Component Library',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'product-image-uploaded',
                target: 'Design Assets',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'TechCorp Platform',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Frontend Component Library',
                category: 'Development',
                price: 299,
                stockQuantity: 14,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
                name: 'React Dashboard Template',
                category: 'Software',
                price: 249,
                stockQuantity: 10,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'UI Development Toolkit',
                category: 'Frontend',
                price: 189,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Front End Developer',
                organization: 'TechCorp',
                description:
                    'Building modern web applications and leading frontend architecture decisions.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Frontend Developer',
                organization: 'Web Italia',
                description:
                    'Developed responsive interfaces using React and TypeScript.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'UI Developer',
                organization: 'Digital Milan Studio',
                description:
                    'Implemented interactive user interfaces and design systems.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Computer Engineering',
                organization: 'Politecnico di Milano',
                description:
                    'Focused on software engineering and web technologies.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'University of Bologna',
                description:
                    'Studied software development, algorithms and information systems.',
            },
        ],
    },
    {
        id: 68,
        avatar: 'https://i.pravatar.cc/150?img=68',
        name: 'Santiago Lopez',
        role: 'Marketing',
        country: 'Spain',
        contact: {
            email: 'santiago.lopez68@example.com',
            address: '402 Gran Via, Madrid 28013, Spain',
            phone: '+34600110168',
        },
        about: 'Marketing professional with expertise in digital campaigns, content strategy and performance analytics. Experienced in driving brand awareness, customer engagement and business growth through data-driven marketing initiatives.',
        skills: [
            { id: 'seo', label: 'SEO' },
            { id: 'google-analytics', label: 'Google Analytics' },
            { id: 'content-marketing', label: 'Content Marketing' },
            { id: 'email-marketing', label: 'Email Marketing' },
            { id: 'social-media', label: 'Social Media' },
            { id: 'campaign-management', label: 'Campaign Management' },
        ],
        summary: {
            products: {
                count: 121,
                variation: 13,
            },
            users: {
                count: 29,
                variation: 5,
            },
            profile: {
                role: 'Marketing Specialist',
                status: 'inactive',
                lastLogin: '2026-07-18T18:30:00.000Z',
                memberSince: '2021-03-18T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Customer Acquisition Campaign',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'Digital Marketing Strategy',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Marketing Assistant',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'MarketPro Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Marketing Dashboard',
                createdAt: '2026-07-07T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
                name: 'Marketing Analytics Suite',
                category: 'Analytics',
                price: 259,
                stockQuantity: 9,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
                name: 'Lead Generation Platform',
                category: 'Marketing',
                price: 219,
                stockQuantity: 6,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07',
                name: 'SEO Optimization Toolkit',
                category: 'SEO',
                price: 179,
                stockQuantity: 11,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Marketing Specialist',
                organization: 'MarketPro',
                description:
                    'Managing digital campaigns, performance analytics and customer engagement strategies.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Digital Marketing Coordinator',
                organization: 'Madrid Growth Agency',
                description:
                    'Executed multi-channel campaigns and optimized marketing performance.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Marketing Analyst',
                organization: 'Creative Media Spain',
                description:
                    'Analyzed campaign metrics and supported strategic marketing initiatives.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Marketing and Communication',
                organization: 'Complutense University of Madrid',
                description:
                    'Focused on branding, consumer behavior and digital marketing.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Administration',
                organization: 'University of Barcelona',
                description:
                    'Studied management, marketing and business strategy.',
            },
        ],
    },
    {
        id: 69,
        avatar: 'https://i.pravatar.cc/150?img=69',
        name: 'Laura Becker',
        role: 'QA Engineer',
        country: 'Germany',
        contact: {
            email: 'laura.becker69@example.com',
            address: '315 Alexanderplatz, Berlin 10178, Germany',
            phone: '+4915123456169',
        },
        about: 'QA Engineer dedicated to delivering reliable software through automated testing, quality assurance processes and continuous improvement practices. Experienced in identifying issues early and ensuring stable releases across complex applications.',
        skills: [
            { id: 'playwright', label: 'Playwright' },
            { id: 'cypress', label: 'Cypress' },
            { id: 'automation-testing', label: 'Automation Testing' },
            { id: 'api-testing', label: 'API Testing' },
            { id: 'quality-assurance', label: 'Quality Assurance' },
            { id: 'test-strategy', label: 'Test Strategy' },
        ],
        summary: {
            products: {
                count: 136,
                variation: 16,
            },
            users: {
                count: 38,
                variation: 6,
            },
            profile: {
                role: 'Senior QA Engineer',
                status: 'active',
                lastLogin: '2026-07-19T17:48:00.000Z',
                memberSince: '2022-02-08T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Regression Test Suite',
                createdAt: '2026-07-19T17:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'QA Automation Framework',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'QA Specialist',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Quality Profile',
                createdAt: '2026-07-13T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'QualityLabs Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'QA Automation Platform',
                category: 'Testing',
                price: 249,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Test Management Suite',
                category: 'QA Tools',
                price: 189,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Performance Testing Kit',
                category: 'Software',
                price: 229,
                stockQuantity: 6,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior QA Engineer',
                organization: 'QualityLabs',
                description:
                    'Leading quality assurance initiatives and implementing automated testing strategies.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'QA Analyst',
                organization: 'Berlin Testing Group',
                description:
                    'Executed functional, integration and automation testing projects.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Software Tester',
                organization: 'Digital Quality Solutions',
                description:
                    'Validated software quality and collaborated with engineering teams.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Information Systems',
                organization: 'Technical University of Munich',
                description:
                    'Focused on software quality, testing methodologies and systems engineering.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of Hamburg',
                description:
                    'Studied software development, databases and quality assurance principles.',
            },
        ],
    },
    {
        id: 70,
        avatar: 'https://i.pravatar.cc/150?img=70',
        name: 'Peter Evans',
        role: 'DevOps Engineer',
        country: 'United Kingdom',
        contact: {
            email: 'peter.evans70@example.com',
            address: '180 Canary Wharf, London E14 5AB, United Kingdom',
            phone: '+447700900170',
        },
        about: 'DevOps Engineer experienced in cloud infrastructure, CI/CD pipelines and platform reliability. Passionate about automation, observability and building scalable systems that empower development teams.',
        skills: [
            { id: 'aws', label: 'AWS' },
            { id: 'docker', label: 'Docker' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'github-actions', label: 'GitHub Actions' },
            { id: 'monitoring', label: 'Monitoring & Observability' },
        ],
        summary: {
            products: {
                count: 148,
                variation: 18,
            },
            users: {
                count: 42,
                variation: 7,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'inactive',
                lastLogin: '2026-07-19T05:30:00.000Z',
                memberSince: '2021-07-21T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Cloud Infrastructure',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'CI/CD Pipeline',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Platform Engineer',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'CloudOps Workspace',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Infrastructure Dashboard',
                createdAt: '2026-07-09T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Deployment Platform',
                category: 'Infrastructure',
                price: 449,
                stockQuantity: 9,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Kubernetes Toolkit',
                category: 'DevOps',
                price: 299,
                stockQuantity: 12,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Monitoring Suite',
                category: 'Cloud',
                price: 259,
                stockQuantity: 7,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Managing cloud infrastructure, automation and platform reliability initiatives.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Cloud Engineer',
                organization: 'London Infrastructure Group',
                description:
                    'Implemented cloud-native architectures and CI/CD workflows.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Systems Administrator',
                organization: 'Enterprise Hosting UK',
                description:
                    'Maintained server infrastructure and deployment environments.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Computer Systems Engineering',
                organization: 'University of Manchester',
                description:
                    'Focused on distributed systems, networking and cloud computing.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University of Birmingham',
                description:
                    'Studied software engineering, operating systems and infrastructure management.',
            },
        ],
    },
    {
        id: 71,
        avatar: 'https://i.pravatar.cc/150?img=12',
        name: 'John Miller',
        role: 'Full Stack Developer',
        country: 'United States',
        contact: {
            email: 'john.miller71@example.com',
            address:
                '920 Market Street, San Francisco, CA 94103, United States',
            phone: '+12024560171',
        },
        about: 'Full Stack Developer passionate about creating scalable web applications and modern digital experiences. Experienced across frontend and backend technologies, with a strong focus on performance, maintainability and software architecture.',
        skills: [
            { id: 'react', label: 'React' },
            { id: 'typescript', label: 'TypeScript' },
            { id: 'nodejs', label: 'Node.js' },
            { id: 'nestjs', label: 'NestJS' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'docker', label: 'Docker' },
        ],
        summary: {
            products: {
                count: 172,
                variation: 24,
            },
            users: {
                count: 51,
                variation: 10,
            },
            profile: {
                role: 'Senior Full Stack Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:13:00.000Z',
                memberSince: '2022-11-14T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Management Platform',
                createdAt: '2026-07-19T18:05:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'GraphQL API Service',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Software Engineer',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Developer Profile',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'DevSolutions Platform',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Enterprise Web Platform',
                category: 'Software',
                price: 499,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Backend Services Suite',
                category: 'Backend',
                price: 359,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Developer Toolkit',
                category: 'Development',
                price: 239,
                stockQuantity: 16,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2021 - Present',
                title: 'Senior Full Stack Developer',
                organization: 'DevSolutions',
                description:
                    'Designing and developing scalable full stack applications and cloud services.',
            },
            {
                id: 2,
                period: '2017 - 2021',
                title: 'Software Engineer',
                organization: 'West Coast Technologies',
                description:
                    'Built modern web platforms and backend APIs for enterprise clients.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Frontend Developer',
                organization: 'Digital Product Studio',
                description:
                    'Developed responsive interfaces and reusable component libraries.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Software Engineering',
                organization: 'Stanford University',
                description:
                    'Focused on software architecture, cloud computing and distributed systems.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Computer Science',
                organization: 'University of California',
                description:
                    'Studied algorithms, databases and software development methodologies.',
            },
        ],
    },
    {
        id: 72,
        avatar: 'https://i.pravatar.cc/150?img=34',
        name: 'Sophie Mendes',
        role: 'Designer',
        country: 'France',
        contact: {
            email: 'sophie.mendes72@example.com',
            address: '88 Avenue des Champs-Élysées, Paris 75008, France',
            phone: '+33612345172',
        },
        about: 'Creative Designer with extensive experience designing digital products, brand systems and user-centered interfaces. Passionate about transforming ideas into elegant visual experiences that balance aesthetics and usability.',
        skills: [
            { id: 'figma', label: 'Figma' },
            { id: 'adobe-xd', label: 'Adobe XD' },
            { id: 'design-systems', label: 'Design Systems' },
            { id: 'prototyping', label: 'Prototyping' },
            { id: 'branding', label: 'Branding' },
            { id: 'visual-design', label: 'Visual Design' },
        ],
        summary: {
            products: {
                count: 119,
                variation: 14,
            },
            users: {
                count: 31,
                variation: 5,
            },
            profile: {
                role: 'Senior Designer',
                status: 'inactive',
                lastLogin: '2026-07-19T09:30:00.000Z',
                memberSince: '2022-05-17T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-updated',
                target: 'Mobile Design System',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-created',
                target: 'E-Commerce UI Kit',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Junior Designer',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Design Portfolio',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Designify Workspace',
                createdAt: '2026-07-05T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Modern UI Kit',
                category: 'Design',
                price: 149,
                stockQuantity: 12,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Brand Identity Package',
                category: 'Branding',
                price: 299,
                stockQuantity: 5,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
                name: 'Design Templates Collection',
                category: 'Templates',
                price: 89,
                stockQuantity: 18,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Designer',
                organization: 'Designify',
                description:
                    'Leading product design initiatives, creating scalable design systems and mentoring designers.',
            },
            {
                id: 2,
                period: '2017 - 2020',
                title: 'UI/UX Designer',
                organization: 'Creative Studio Paris',
                description:
                    'Designed digital experiences and collaborated with product teams on user-centered solutions.',
            },
            {
                id: 3,
                period: '2014 - 2017',
                title: 'Graphic Designer',
                organization: 'Visual Arts Agency',
                description:
                    'Produced branding materials and digital marketing assets for international clients.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2012 - 2014',
                title: 'Master of Digital Design',
                organization: 'Sorbonne University',
                description:
                    'Focused on digital media, interaction design and visual communication.',
            },
            {
                id: 2,
                period: '2008 - 2012',
                title: 'Bachelor of Graphic Design',
                organization: 'Paris College of Art',
                description:
                    'Studied branding, typography and visual design principles.',
            },
        ],
    },
    {
        id: 73,
        avatar: 'https://i.pravatar.cc/150?img=56',
        name: 'Hiroshi Tanaka',
        role: 'Back End Developer',
        country: 'Japan',
        contact: {
            email: 'hiroshi.tanaka73@example.com',
            address: '4-2-8 Shibuya, Tokyo 150-0002, Japan',
            phone: '+819012345173',
        },
        about: 'Back End Developer specialized in scalable APIs, distributed systems and cloud-native architectures. Passionate about performance optimization, security and building reliable backend services for high-traffic applications.',
        skills: [
            { id: 'java', label: 'Java' },
            { id: 'spring-boot', label: 'Spring Boot' },
            { id: 'postgresql', label: 'PostgreSQL' },
            { id: 'redis', label: 'Redis' },
            { id: 'microservices', label: 'Microservices' },
            { id: 'aws', label: 'AWS' },
        ],
        summary: {
            products: {
                count: 186,
                variation: 23,
            },
            users: {
                count: 58,
                variation: 11,
            },
            profile: {
                role: 'Senior Back End Developer',
                status: 'active',
                lastLogin: '2026-07-19T18:09:00.000Z',
                memberSince: '2021-01-09T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Payment Processing API',
                createdAt: '2026-07-19T17:45:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Authentication Service',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Backend Engineer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'DevSolutions Account',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Engineering Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud API Gateway',
                category: 'Backend',
                price: 399,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Microservice Platform',
                category: 'Software',
                price: 529,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Database Monitoring Suite',
                category: 'Infrastructure',
                price: 279,
                stockQuantity: 15,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2019 - Present',
                title: 'Senior Back End Developer',
                organization: 'DevSolutions',
                description:
                    'Developing high-performance backend systems and cloud-based architectures.',
            },
            {
                id: 2,
                period: '2015 - 2019',
                title: 'Software Engineer',
                organization: 'Tokyo Tech Systems',
                description:
                    'Built enterprise APIs and optimized database performance for large-scale platforms.',
            },
            {
                id: 3,
                period: '2012 - 2015',
                title: 'Junior Developer',
                organization: 'Nippon Digital',
                description:
                    'Worked on backend services and system integrations across multiple projects.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2010 - 2012',
                title: 'Master of Computer Engineering',
                organization: 'University of Tokyo',
                description:
                    'Focused on distributed computing, software architecture and systems design.',
            },
            {
                id: 2,
                period: '2006 - 2010',
                title: 'Bachelor of Computer Science',
                organization: 'Tokyo Institute of Technology',
                description:
                    'Studied algorithms, databases and software engineering fundamentals.',
            },
        ],
    },
    {
        id: 74,
        avatar: 'https://i.pravatar.cc/150?img=8',
        name: 'Giulia Rossi',
        role: 'Product Manager',
        country: 'Italy',
        contact: {
            email: 'giulia.rossi74@example.com',
            address: '24 Via Monte Napoleone, Milan 20121, Italy',
            phone: '+393123456174',
        },
        about: 'Product Manager focused on strategy, user experience and business growth. Experienced in leading cross-functional teams, defining product roadmaps and delivering digital solutions aligned with customer and company goals.',
        skills: [
            { id: 'product-strategy', label: 'Product Strategy' },
            { id: 'roadmapping', label: 'Roadmapping' },
            { id: 'agile', label: 'Agile' },
            { id: 'scrum', label: 'Scrum' },
            { id: 'user-research', label: 'User Research' },
            { id: 'analytics', label: 'Product Analytics' },
        ],
        summary: {
            products: {
                count: 163,
                variation: 19,
            },
            users: {
                count: 44,
                variation: 8,
            },
            profile: {
                role: 'Senior Product Manager',
                status: 'inactive',
                lastLogin: '2026-07-19T02:30:00.000Z',
                memberSince: '2021-09-03T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Customer Insights Platform',
                createdAt: '2026-07-17T18:30:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Product Roadmap 2026',
                createdAt: '2026-07-15T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Associate Product Manager',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'profile-avatar-updated',
                target: 'Leadership Profile',
                createdAt: '2026-07-05T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Productify Dashboard',
                createdAt: '2026-06-28T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
                name: 'Product Analytics Suite',
                category: 'Analytics',
                price: 349,
                stockQuantity: 9,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
                name: 'Roadmap Planning Tool',
                category: 'Management',
                price: 229,
                stockQuantity: 14,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Customer Feedback Hub',
                category: 'Product',
                price: 189,
                stockQuantity: 11,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior Product Manager',
                organization: 'Productify',
                description:
                    'Leading product strategy, roadmap planning and cross-functional execution.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Product Owner',
                organization: 'Milan Digital Ventures',
                description:
                    'Managed agile teams and delivered customer-focused digital products.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Business Analyst',
                organization: 'Innovation Partners',
                description:
                    'Gathered requirements, analyzed market opportunities and supported product launches.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Business Administration',
                organization: 'Bocconi University',
                description:
                    'Focused on product strategy, innovation and organizational leadership.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Business Management',
                organization: 'University of Milan',
                description:
                    'Studied management, economics and product development fundamentals.',
            },
        ],
    },
    {
        id: 75,
        avatar: 'https://i.pravatar.cc/150?img=63',
        name: "Liam O'Connor",
        role: 'DevOps Engineer',
        country: 'Ireland',
        contact: {
            email: 'liam.oconnor75@example.com',
            address: '42 Grand Canal Dock, Dublin D02, Ireland',
            phone: '+353831234175',
        },
        about: 'Experienced DevOps Engineer with a strong background in cloud infrastructure, automation and platform reliability. Passionate about building scalable deployment pipelines, improving system observability and enabling development teams to deliver software efficiently and securely.',
        skills: [
            { id: 'aws', label: 'AWS' },
            { id: 'docker', label: 'Docker' },
            { id: 'kubernetes', label: 'Kubernetes' },
            { id: 'terraform', label: 'Terraform' },
            { id: 'github-actions', label: 'GitHub Actions' },
            { id: 'observability', label: 'Observability' },
        ],
        summary: {
            products: {
                count: 178,
                variation: 22,
            },
            users: {
                count: 49,
                variation: 9,
            },
            profile: {
                role: 'Senior DevOps Engineer',
                status: 'active',
                lastLogin: '2026-07-19T18:18:00.000Z',
                memberSince: '2021-03-11T00:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'product-created',
                target: 'Cloud Infrastructure Platform',
                createdAt: '2026-07-19T17:55:00.000Z',
            },
            {
                id: 2,
                type: 'product-updated',
                target: 'Kubernetes Cluster',
                createdAt: '2026-07-18T18:30:00.000Z',
            },
            {
                id: 3,
                type: 'user-created',
                target: 'Platform Engineer',
                createdAt: '2026-07-16T18:30:00.000Z',
            },
            {
                id: 4,
                type: 'password-changed',
                target: 'CloudOps Workspace',
                createdAt: '2026-07-14T18:30:00.000Z',
            },
            {
                id: 5,
                type: 'admin-login',
                target: 'Infrastructure Dashboard',
                createdAt: '2026-07-12T18:30:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
                name: 'Cloud Deployment Suite',
                category: 'Infrastructure',
                price: 459,
                stockQuantity: 11,
            },
            {
                id: 2,
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                name: 'Container Management Platform',
                category: 'DevOps',
                price: 319,
                stockQuantity: 8,
            },
            {
                id: 3,
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
                name: 'Monitoring & Alerting Suite',
                category: 'Cloud',
                price: 279,
                stockQuantity: 14,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - Present',
                title: 'Senior DevOps Engineer',
                organization: 'CloudOps',
                description:
                    'Leading cloud modernization projects, infrastructure automation and reliability engineering initiatives.',
            },
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Cloud Engineer',
                organization: 'Dublin Tech Solutions',
                description:
                    'Designed and managed scalable cloud environments, CI/CD pipelines and monitoring platforms.',
            },
            {
                id: 3,
                period: '2013 - 2016',
                title: 'Systems Administrator',
                organization: 'Irish Digital Services',
                description:
                    'Maintained enterprise infrastructure, automated operational tasks and supported production systems.',
            },
        ],
        education: [
            {
                id: 1,
                period: '2011 - 2013',
                title: 'Master of Computer Systems Engineering',
                organization: 'Trinity College Dublin',
                description:
                    'Focused on distributed systems, cloud computing and infrastructure architecture.',
            },
            {
                id: 2,
                period: '2007 - 2011',
                title: 'Bachelor of Computer Science',
                organization: 'University College Dublin',
                description:
                    'Studied software engineering, networking, operating systems and database management.',
            },
        ],
    },
]
