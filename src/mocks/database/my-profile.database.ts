import type { UserProfile } from '@/features/profile/types'

export const myProfileDatabase: UserProfile = {
    id: 1,
    avatar: 'https://i.pravatar.cc/150?img=3',
    name: 'Thomas Lean',
    role: 'Front End Developer',
    country: 'United States of America',
    contact: {
        email: 'yourname@example.com',
        address:
            '92 Miles Drive, Newark, NJ 07103, California, United States of America',
        phone: '+00 123 456 789 / +12 345 678',
    },
    about: 'Dedicated, passionate, and accomplished Full Stack Developer with 9+ years of progressive experience working as an independent Contractor for google and developing and growing my educational social network that helps another learn programming, web design, game development, networking.',
    skills: [
        {
            id: 'react',
            label: 'React',
        },
        {
            id: 'typescript',
            label: 'TypeScript',
        },
        {
            id: 'sass',
            label: 'Sass',
        },
        {
            id: 'vite',
            label: 'Vite',
        },
        {
            id: 'git',
            label: 'Git',
        },
    ],
    summary: {
        products: {
            count: 124,
            variation: 12,
        },
        users: {
            count: 38,
            variation: 5,
        },
        profile: {
            role: 'Super Admin',
            status: 'active',
            lastLogin: '2 hours ago',
            memberSince: 'Jan 15, 2022',
        },
    },
    activities: [
        {
            id: 1,
            type: 'product-updated',
            target: 'Macbook Pro M3',
            createdAt: '2 minutes ago',
        },
        {
            id: 2,
            type: 'user-created',
            target: 'John Doe',
            createdAt: '1 hour ago',
        },
        {
            id: 3,
            type: 'product-deleted',
            target: 'Gaming Mouse',
            createdAt: 'Yesterday',
        },
        {
            id: 4,
            type: 'product-image-uploaded',
            target: 'Airpods Max',
            createdAt: '2 days ago',
        },
        {
            id: 5,
            type: 'password-changed',
            target: 'Admin account',
            createdAt: '3 days ago',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
            name: 'Macbook Pro M3',
            category: 'Electronics',
            price: 2999.0,
            stockQuantity: 10,
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
            name: 'Airpods Max',
            category: 'Electronics',
            price: 549.0,
            stockQuantity: 0,
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
            name: 'Mechanical Keyboard',
            category: 'Accessories',
            price: 129.0,
            stockQuantity: 4,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2021 - Present',
            title: 'Senior Frontend Developer',
            organization: 'TechCorp Inc.',
            description:
                'Leading the frontend development of enterprise application using React, Typescript and GraphQL. Mentoring junior developers and improving performance and scalabiity.',
        },
        {
            id: 2,
            period: '2018 - 2021',
            title: 'Frontend Developer',
            organization: 'WebSolutions',
            description:
                'Developed and maintained multiple client projects with React, Redux and Node.js. Collaborated closely with designers and backend developers.',
        },
        {
            id: 3,
            period: '2016 - 2018',
            title: 'UI Developer',
            organization: 'DesignHub',
            description:
                'Implemented responsive UI/UX designs and interactive web interfaces using JavaScript and SCSS.',
        },
        {
            id: 4,
            period: '2014 - 2016',
            title: 'Junior Developer',
            organization: 'CodeLab',
            description:
                'Worked on frontend development tasks and gained experience in modern JavaScript frameworks.',
        },
    ],
    education: [
        {
            id: 1,
            period: '2012 - 2014',
            title: 'Master of Computer Science',
            organization: 'New York University',
            description:
                'Focused on software engineering, distributed systems and web technologies.',
        },
        {
            id: 2,
            period: '2008 - 2012',
            title: 'Bachelor of Science in Computer Science',
            organization: 'Rutgers University',
            description:
                'Studied algorithms, data structures, databases and software development.',
        },
        {
            id: 3,
            period: '2006 - 2008',
            title: 'High School Diploma',
            organization: 'Newark High School',
            description: 'Graduated with honors.',
        },
    ],
}
