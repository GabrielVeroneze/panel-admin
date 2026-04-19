import { delay, http, HttpResponse } from 'msw'
import type { MockUser } from '../types'
import type {
    CreateUserPayload,
    PaginatedUsers,
    UpdateUserPayload,
    User,
} from '@/features/users/types'

type UpdateUserParams = {
    id: string
}

type DeleteUserParams = {
    id: string
}

type DeleteUsersPayload = {
    ids: number[]
}

const allUsers: MockUser[] = [
    {
        id: 1,
        name: 'Neil Sims',
        email: 'neil.sims1@example.com',
        phone: '+12024560101',
        image: 'https://i.pravatar.cc/150?img=1',
        department: 'Front End Developer',
        company: 'TechCorp',
        country: 'United States',
        status: 'offline',
        password: 'Password@2026',
    },
    {
        id: 2,
        name: 'Roberta Casas',
        email: 'roberta.casas2@example.com',
        phone: '+34600110102',
        image: 'https://i.pravatar.cc/150?img=2',
        department: 'Designer',
        company: 'Designify',
        country: 'Spain',
        status: 'active',
        password: 'Design#Safe78',
    },
    {
        id: 3,
        name: 'Michael Gough',
        email: 'michael.gough3@example.com',
        phone: '+447700900103',
        image: 'https://i.pravatar.cc/150?img=3',
        department: 'React Developer',
        company: 'WebWorks',
        country: 'United Kingdom',
        status: 'active',
        password: 'React*Dev!99',
    },
    {
        id: 4,
        name: 'Jese Leos',
        email: 'jese.leos4@example.com',
        phone: '+525512345678',
        image: 'https://i.pravatar.cc/150?img=4',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'Mexico',
        status: 'offline',
        password: 'Market$Pro2024',
    },
    {
        id: 5,
        name: 'Bonnie Green',
        email: 'bonnie.green5@example.com',
        phone: '+14165550105',
        image: 'https://i.pravatar.cc/150?img=5',
        department: 'Front End Developer',
        company: 'TechCorp',
        country: 'Canada',
        status: 'offline',
        password: 'Canada&Tech!25',
    },
    {
        id: 6,
        name: 'Thomas Lean',
        email: 'thomas.lean6@example.com',
        phone: '+61412345106',
        image: 'https://i.pravatar.cc/150?img=6',
        department: 'Front End Developer',
        company: 'TechCorp',
        country: 'Australia',
        status: 'active',
        password: 'Thomas@Aussie#1',
    },
    {
        id: 7,
        name: 'Helene Engels',
        email: 'helene.engels7@example.com',
        phone: '+4915123456107',
        image: 'https://i.pravatar.cc/150?img=7',
        department: 'Laravel Developer',
        company: 'DevSolutions',
        country: 'Germany',
        status: 'offline',
        password: 'Laravel_Dev_77!',
    },
    {
        id: 8,
        name: 'Lana Byrd',
        email: 'lana.byrd8@example.com',
        phone: '+33612345108',
        image: 'https://i.pravatar.cc/150?img=8',
        department: 'UI/UX Engineer',
        company: 'Designify',
        country: 'France',
        status: 'active',
        password: 'Lana%Byrd*2026',
    },
    {
        id: 9,
        name: 'Leslie Livingston',
        email: 'leslie.livingston9@example.com',
        phone: '+393123456109',
        image: 'https://i.pravatar.cc/150?img=9',
        department: 'Web Designer',
        company: 'Designify',
        country: 'Italy',
        status: 'offline',
        password: 'Leslie_Italy!123',
    },
    {
        id: 10,
        name: 'Karen Nelson',
        email: 'karen.nelson10@example.com',
        phone: '+31612345110',
        image: 'https://i.pravatar.cc/150?img=10',
        department: 'Designer',
        company: 'Designify',
        country: 'Netherlands',
        status: 'active',
        password: 'Nelson#NL_Pass!',
    },
    {
        id: 11,
        name: 'Robert Brown',
        email: 'robert.brown11@example.com',
        phone: '+12024560111',
        image: 'https://i.pravatar.cc/150?img=11',
        department: 'SEO Specialist',
        company: 'MarketPro',
        country: 'United States',
        status: 'offline',
        password: 'Robert_SEO@11',
    },
    {
        id: 12,
        name: 'Joseph McFall',
        email: 'joseph.mcfall12@example.com',
        phone: '+353831234112',
        image: 'https://i.pravatar.cc/150?img=12',
        department: 'Developer',
        company: 'DevSolutions',
        country: 'Ireland',
        status: 'active',
        password: 'Joseph#Dev_IE12',
    },
    {
        id: 13,
        name: 'Amanda Silva',
        email: 'amanda.silva13@example.com',
        phone: '+5511982340113',
        image: 'https://i.pravatar.cc/150?img=13',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'offline',
        password: 'Amanda!BR_2026',
    },
    {
        id: 14,
        name: 'Lucas Martins',
        email: 'lucas.martins14@example.com',
        phone: '+5511982340114',
        image: 'https://i.pravatar.cc/150?img=14',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Brazil',
        status: 'active',
        password: 'Lucas#Cloud_14',
    },
    {
        id: 15,
        name: 'Sophia Turner',
        email: 'sophia.turner15@example.com',
        phone: '+447700900115',
        image: 'https://i.pravatar.cc/150?img=15',
        department: 'Product Manager',
        company: 'Productify',
        country: 'United Kingdom',
        status: 'offline',
        password: 'Sophia_PM*UK15',
    },
    {
        id: 16,
        name: 'John Carter',
        email: 'john.carter16@example.com',
        phone: '+14165550116',
        image: 'https://i.pravatar.cc/150?img=16',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'Canada',
        status: 'active',
        password: 'John_FullStack!16',
    },
    {
        id: 17,
        name: 'Emma Watson',
        email: 'emma.watson17@example.com',
        phone: '+447700900117',
        image: 'https://i.pravatar.cc/150?img=17',
        department: 'Designer',
        company: 'Designify',
        country: 'United Kingdom',
        status: 'offline',
        password: 'Emma_Design_17#',
    },
    {
        id: 18,
        name: 'Liam Johnson',
        email: 'liam.johnson18@example.com',
        phone: '+12024560118',
        image: 'https://i.pravatar.cc/150?img=18',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'United States',
        status: 'active',
        password: 'Liam_BE_US@18',
    },
    {
        id: 19,
        name: 'Olivia Brown',
        email: 'olivia.brown19@example.com',
        phone: '+61412345119',
        image: 'https://i.pravatar.cc/150?img=19',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'Australia',
        status: 'active',
        password: 'Olivia_QA_AU19!',
    },
    {
        id: 20,
        name: 'Noah Wilson',
        email: 'noah.wilson20@example.com',
        phone: '+4915123456120',
        image: 'https://i.pravatar.cc/150?img=20',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Germany',
        status: 'offline',
        password: 'Noah_DE_20#Pass',
    },
    {
        id: 21,
        name: 'Ava Martinez',
        email: 'ava.martinez21@example.com',
        phone: '+34600110121',
        image: 'https://i.pravatar.cc/150?img=21',
        department: 'Product Manager',
        company: 'Productify',
        country: 'Spain',
        status: 'offline',
        password: 'Ava_Spain_PM21!',
    },
    {
        id: 22,
        name: 'James Anderson',
        email: 'james.anderson22@example.com',
        phone: '+353831234122',
        image: 'https://i.pravatar.cc/150?img=22',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'Ireland',
        status: 'active',
        password: 'James_IE_Dev22!',
    },
    {
        id: 23,
        name: 'Isabella Thomas',
        email: 'isabella.thomas23@example.com',
        phone: '+33612345123',
        image: 'https://i.pravatar.cc/150?img=23',
        department: 'Designer',
        company: 'Designify',
        country: 'France',
        status: 'active',
        password: 'Isabella_FR#23',
    },
    {
        id: 24,
        name: 'Benjamin Taylor',
        email: 'benjamin.taylor24@example.com',
        phone: '+31612345124',
        image: 'https://i.pravatar.cc/150?img=24',
        department: 'SEO Specialist',
        company: 'MarketPro',
        country: 'Netherlands',
        status: 'offline',
        password: 'Ben_SEO_NL24!',
    },
    {
        id: 25,
        name: 'Mia Moore',
        email: 'mia.moore25@example.com',
        phone: '+393123456125',
        image: 'https://i.pravatar.cc/150?img=25',
        department: 'Front End Developer',
        company: 'TechCorp',
        country: 'Italy',
        status: 'active',
        password: 'Mia_Italy_FE25!',
    },
    {
        id: 26,
        name: 'Lucas Pereira',
        email: 'lucas.pereira26@example.com',
        phone: '+5511982340126',
        image: 'https://i.pravatar.cc/150?img=26',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'active',
        password: 'Lucas_BR_BE26#',
    },
    {
        id: 27,
        name: 'Mariana Costa',
        email: 'mariana.costa27@example.com',
        phone: '+5511982340127',
        image: 'https://i.pravatar.cc/150?img=27',
        department: 'Designer',
        company: 'Designify',
        country: 'Brazil',
        status: 'offline',
        password: 'Mariana_Design27!',
    },
    {
        id: 28,
        name: 'Daniel Schmidt',
        email: 'daniel.schmidt28@example.com',
        phone: '+4915123456128',
        image: 'https://i.pravatar.cc/150?img=28',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Germany',
        status: 'active',
        password: 'Daniel_DE_DO28#',
    },
    {
        id: 29,
        name: 'Sophie Dubois',
        email: 'sophie.dubois29@example.com',
        phone: '+33612345129',
        image: 'https://i.pravatar.cc/150?img=29',
        department: 'Product Manager',
        company: 'Productify',
        country: 'France',
        status: 'offline',
        password: 'Sophie_PM_FR29!',
    },
    {
        id: 30,
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz30@example.com',
        phone: '+525512345630',
        image: 'https://i.pravatar.cc/150?img=30',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'Mexico',
        status: 'active',
        password: 'Carlos_MX_MKT30!',
    },
    {
        id: 31,
        name: 'Ethan Clark',
        email: 'ethan.clark31@example.com',
        phone: '+12024560131',
        image: 'https://i.pravatar.cc/150?img=31',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'United States',
        status: 'offline',
        password: 'Ethan_QA_US31!',
    },
    {
        id: 32,
        name: 'Chloe Martin',
        email: 'chloe.martin32@example.com',
        phone: '+33612345132',
        image: 'https://i.pravatar.cc/150?img=32',
        department: 'Designer',
        company: 'Designify',
        country: 'France',
        status: 'active',
        password: 'Chloe_FR_DS32#',
    },
    {
        id: 33,
        name: 'Henry Walker',
        email: 'henry.walker33@example.com',
        phone: '+447700900133',
        image: 'https://i.pravatar.cc/150?img=33',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'United Kingdom',
        status: 'offline',
        password: 'Henry_UK_FS33!',
    },
    {
        id: 34,
        name: 'Amelia Scott',
        email: 'amelia.scott34@example.com',
        phone: '+14165550134',
        image: 'https://i.pravatar.cc/150?img=34',
        department: 'Product Manager',
        company: 'Productify',
        country: 'Canada',
        status: 'active',
        password: 'Amelia_CA_PM34#',
    },
    {
        id: 35,
        name: 'Jack Hall',
        email: 'jack.hall35@example.com',
        phone: '+61412345135',
        image: 'https://i.pravatar.cc/150?img=35',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Australia',
        status: 'offline',
        password: 'Jack_AU_BE35!',
    },
    {
        id: 36,
        name: 'Sofia Rossi',
        email: 'sofia.rossi36@example.com',
        phone: '+393123456136',
        image: 'https://i.pravatar.cc/150?img=36',
        department: 'Designer',
        company: 'Designify',
        country: 'Italy',
        status: 'active',
        password: 'Sofia_IT_DS36#',
    },
    {
        id: 37,
        name: 'Mateo Garcia',
        email: 'mateo.garcia37@example.com',
        phone: '+34600110137',
        image: 'https://i.pravatar.cc/150?img=37',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'Spain',
        status: 'offline',
        password: 'Mateo_ES_MKT37!',
    },
    {
        id: 38,
        name: 'Luca Bianchi',
        email: 'luca.bianchi38@example.com',
        phone: '+393123456138',
        image: 'https://i.pravatar.cc/150?img=38',
        department: 'Front End Developer',
        company: 'TechCorp',
        country: 'Italy',
        status: 'active',
        password: 'Luca_IT_FE38#',
    },
    {
        id: 39,
        name: 'Hannah White',
        email: 'hannah.white39@example.com',
        phone: '+12024560139',
        image: 'https://i.pravatar.cc/150?img=39',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'United States',
        status: 'offline',
        password: 'Hannah_QA_US39!',
    },
    {
        id: 40,
        name: 'Leo Müller',
        email: 'leo.muller40@example.com',
        phone: '+4915123456140',
        image: 'https://i.pravatar.cc/150?img=40',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Germany',
        status: 'active',
        password: 'Leo_DE_DO40#',
    },
    {
        id: 41,
        name: 'Pedro Alves',
        email: 'pedro.alves41@example.com',
        phone: '+5511982340141',
        image: 'https://i.pravatar.cc/150?img=41',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'offline',
        password: 'Pedro_BR_BE41!',
    },
    {
        id: 42,
        name: 'Laura Sánchez',
        email: 'laura.sanchez42@example.com',
        phone: '+34600110142',
        image: 'https://i.pravatar.cc/150?img=42',
        department: 'Designer',
        company: 'Designify',
        country: 'Spain',
        status: 'active',
        password: 'Laura_ES_DS42#',
    },
    {
        id: 43,
        name: 'Tom Baker',
        email: 'tom.baker43@example.com',
        phone: '+447700900143',
        image: 'https://i.pravatar.cc/150?img=43',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'United Kingdom',
        status: 'active',
        password: 'Tom_UK_FS43!',
    },
    {
        id: 44,
        name: 'Nina Fischer',
        email: 'nina.fischer44@example.com',
        phone: '+4915123456144',
        image: 'https://i.pravatar.cc/150?img=44',
        department: 'Product Manager',
        company: 'Productify',
        country: 'Germany',
        status: 'offline',
        password: 'Nina_DE_PM44#',
    },
    {
        id: 45,
        name: 'Victor Hugo',
        email: 'victor.hugo45@example.com',
        phone: '+33612345145',
        image: 'https://i.pravatar.cc/150?img=45',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'France',
        status: 'active',
        password: 'Victor_FR_MKT45!',
    },
    {
        id: 46,
        name: 'Diego Torres',
        email: 'diego.torres46@example.com',
        phone: '+525512345646',
        image: 'https://i.pravatar.cc/150?img=46',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Mexico',
        status: 'offline',
        password: 'Diego_MX_DO46#',
    },
    {
        id: 47,
        name: 'Clara Moreau',
        email: 'clara.moreau47@example.com',
        phone: '+33612345147',
        image: 'https://i.pravatar.cc/150?img=47',
        department: 'Designer',
        company: 'Designify',
        country: 'France',
        status: 'active',
        password: 'Clara_FR_DS47!',
    },
    {
        id: 48,
        name: 'Oscar Nielsen',
        email: 'oscar.nielsen48@example.com',
        phone: '+31612345148',
        image: 'https://i.pravatar.cc/150?img=48',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'Netherlands',
        status: 'offline',
        password: 'Oscar_NL_QA48#',
    },
    {
        id: 49,
        name: 'Bruno Souza',
        email: 'bruno.souza49@example.com',
        phone: '+5511982340149',
        image: 'https://i.pravatar.cc/150?img=49',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'active',
        password: 'Bruno_BR_BE49!',
    },
    {
        id: 50,
        name: 'Alice Dupont',
        email: 'alice.dupont50@example.com',
        phone: '+33612345150',
        image: 'https://i.pravatar.cc/150?img=50',
        department: 'Product Manager',
        company: 'Productify',
        country: 'France',
        status: 'offline',
        password: 'Alice_FR_PM50#',
    },
    {
        id: 51,
        name: 'George King',
        email: 'george.king51@example.com',
        phone: '+447700900151',
        image: 'https://i.pravatar.cc/150?img=51',
        department: 'SEO Specialist',
        company: 'MarketPro',
        country: 'United Kingdom',
        status: 'active',
        password: 'George_UK_SEO51!',
    },
    {
        id: 52,
        name: 'Ella Wright',
        email: 'ella.wright52@example.com',
        phone: '+61412345152',
        image: 'https://i.pravatar.cc/150?img=52',
        department: 'Designer',
        company: 'Designify',
        country: 'Australia',
        status: 'offline',
        password: 'Ella_AU_DS52#',
    },
    {
        id: 53,
        name: 'Samuel Lee',
        email: 'samuel.lee53@example.com',
        phone: '+12024560153',
        image: 'https://i.pravatar.cc/150?img=53',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'United States',
        status: 'active',
        password: 'Samuel_US_FS53!',
    },
    {
        id: 54,
        name: 'Grace Hill',
        email: 'grace.hill54@example.com',
        phone: '+14165550154',
        image: 'https://i.pravatar.cc/150?img=54',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'Canada',
        status: 'offline',
        password: 'Grace_CA_QA54#',
    },
    {
        id: 55,
        name: 'Arthur Petit',
        email: 'arthur.petit55@example.com',
        phone: '+33612345155',
        image: 'https://i.pravatar.cc/150?img=55',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'France',
        status: 'active',
        password: 'Arthur_FR_MKT55!',
    },
    {
        id: 56,
        name: 'Felipe Rocha',
        email: 'felipe.rocha56@example.com',
        phone: '+5511982340156',
        image: 'https://i.pravatar.cc/150?img=56',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'offline',
        password: 'Felipe_BR_BE56#',
    },
    {
        id: 57,
        name: 'Eva Novak',
        email: 'eva.novak57@example.com',
        phone: '+4915123456157',
        image: 'https://i.pravatar.cc/150?img=57',
        department: 'Designer',
        company: 'Designify',
        country: 'Germany',
        status: 'active',
        password: 'Eva_DE_DS57!',
    },
    {
        id: 58,
        name: 'Martin Keller',
        email: 'martin.keller58@example.com',
        phone: '+4915123456158',
        image: 'https://i.pravatar.cc/150?img=58',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Germany',
        status: 'offline',
        password: 'Martin_DE_DO58#',
    },
    {
        id: 59,
        name: 'Julia Weber',
        email: 'julia.weber59@example.com',
        phone: '+31612345159',
        image: 'https://i.pravatar.cc/150?img=59',
        department: 'Product Manager',
        company: 'Productify',
        country: 'Netherlands',
        status: 'active',
        password: 'Julia_NL_PM59!',
    },
    {
        id: 60,
        name: 'Andrés Cruz',
        email: 'andres.cruz60@example.com',
        phone: '+525512345660',
        image: 'https://i.pravatar.cc/150?img=60',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'Mexico',
        status: 'offline',
        password: 'Andres_MX_MKT60#',
    },
    {
        id: 61,
        name: 'Victor Silva',
        email: 'victor.silva61@example.com',
        phone: '+5511982340161',
        image: 'https://i.pravatar.cc/150?img=61',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'active',
        password: 'Victor_BR_FS61!',
    },
    {
        id: 62,
        name: 'Isabel Costa',
        email: 'isabel.costa62@example.com',
        phone: '+351912345162',
        image: 'https://i.pravatar.cc/150?img=62',
        department: 'Designer',
        company: 'Designify',
        country: 'Portugal',
        status: 'offline',
        password: 'Isabel_PT_DS62#',
    },
    {
        id: 63,
        name: 'Daniel Young',
        email: 'daniel.young63@example.com',
        phone: '+12024560163',
        image: 'https://i.pravatar.cc/150?img=63',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'United States',
        status: 'active',
        password: 'Daniel_US_QA63!',
    },
    {
        id: 64,
        name: 'Emily Green',
        email: 'emily.green64@example.com',
        phone: '+14165550164',
        image: 'https://i.pravatar.cc/150?img=64',
        department: 'Product Manager',
        company: 'Productify',
        country: 'Canada',
        status: 'offline',
        password: 'Emily_CA_PM64#',
    },
    {
        id: 65,
        name: 'Hugo Fernandes',
        email: 'hugo.fernandes65@example.com',
        phone: '+5511982340165',
        image: 'https://i.pravatar.cc/150?img=65',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Brazil',
        status: 'active',
        password: 'Hugo_BR_BE65!',
    },
    {
        id: 66,
        name: 'Anna Schmidt',
        email: 'anna.schmidt66@example.com',
        phone: '+4915123456166',
        image: 'https://i.pravatar.cc/150?img=66',
        department: 'Designer',
        company: 'Designify',
        country: 'Germany',
        status: 'offline',
        password: 'Anna_DE_DS66#',
    },
    {
        id: 67,
        name: 'Marco Conti',
        email: 'marco.conti67@example.com',
        phone: '+393123456167',
        image: 'https://i.pravatar.cc/150?img=67',
        department: 'Front End Developer',
        company: 'TechCorp',
        country: 'Italy',
        status: 'active',
        password: 'Marco_IT_FE67!',
    },
    {
        id: 68,
        name: 'Santiago Lopez',
        email: 'santiago.lopez68@example.com',
        phone: '+34600110168',
        image: 'https://i.pravatar.cc/150?img=68',
        department: 'Marketing',
        company: 'MarketPro',
        country: 'Spain',
        status: 'offline',
        password: 'Santiago_ES_MKT68#',
    },
    {
        id: 69,
        name: 'Laura Becker',
        email: 'laura.becker69@example.com',
        phone: '+4915123456169',
        image: 'https://i.pravatar.cc/150?img=69',
        department: 'QA Engineer',
        company: 'QualityLabs',
        country: 'Germany',
        status: 'active',
        password: 'Laura_DE_QA69!',
    },
    {
        id: 70,
        name: 'Peter Evans',
        email: 'peter.evans70@example.com',
        phone: '+447700900170',
        image: 'https://i.pravatar.cc/150?img=70',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'United Kingdom',
        status: 'offline',
        password: 'Peter_UK_DO70#',
    },
    {
        id: 71,
        name: 'John Miller',
        email: 'john.miller71@example.com',
        phone: '+12024560171',
        image: 'https://i.pravatar.cc/150?img=12',
        department: 'Full Stack Developer',
        company: 'DevSolutions',
        country: 'United States',
        status: 'active',
        password: 'John_US_FS71!',
    },
    {
        id: 72,
        name: 'Sophie Mendes',
        email: 'sophie.mendes72@example.com',
        phone: '+33612345172',
        image: 'https://i.pravatar.cc/150?img=34',
        department: 'Designer',
        company: 'Designify',
        country: 'France',
        status: 'offline',
        password: 'Sophie_FR_DS72#',
    },
    {
        id: 73,
        name: 'Hiroshi Tanaka',
        email: 'hiroshi.tanaka73@example.com',
        phone: '+819012345173',
        image: 'https://i.pravatar.cc/150?img=56',
        department: 'Back End Developer',
        company: 'DevSolutions',
        country: 'Japan',
        status: 'active',
        password: 'Hiroshi_JP_BE73!',
    },
    {
        id: 74,
        name: 'Giulia Rossi',
        email: 'giulia.rossi74@example.com',
        phone: '+393123456174',
        image: 'https://i.pravatar.cc/150?img=8',
        department: 'Product Manager',
        company: 'Productify',
        country: 'Italy',
        status: 'offline',
        password: 'Giulia_IT_PM74#',
    },
    {
        id: 75,
        name: "Liam O'Connor",
        email: 'liam.oconnor75@example.com',
        phone: '+353831234175',
        image: 'https://i.pravatar.cc/150?img=63',
        department: 'DevOps Engineer',
        company: 'CloudOps',
        country: 'Ireland',
        status: 'active',
        password: 'Liam_IE_DO75!',
    },
]

export const usersHandlers = [
    http.get<never, never, PaginatedUsers>(
        '/api/users',
        async ({ request }) => {
            await delay(1000)

            const url = new URL(request.url)

            const page = Number(url.searchParams.get('page') ?? 1)
            const pageSize = Number(url.searchParams.get('pageSize') ?? 15)
            const search = url.searchParams.get('search')?.toLowerCase() ?? ''

            const filteredUsers = search
                ? allUsers.filter(
                      (user) =>
                          user.name.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search) ||
                          user.company.toLowerCase().includes(search),
                  )
                : allUsers

            const start = (page - 1) * pageSize
            const end = start + pageSize

            const paginatedUsers = filteredUsers.slice(start, end)

            const usersResponse = paginatedUsers.map(
                ({ password: _password, ...userWithoutPassword }) => {
                    return userWithoutPassword
                },
            )

            return HttpResponse.json({
                list: usersResponse,
                total: filteredUsers.length,
                page,
                pageSize,
            })
        },
    ),

    http.post<never, CreateUserPayload, User>(
        '/api/users',
        async ({ request }) => {
            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null
            const name = formData.get('name') as string
            const email = formData.get('email') as string
            const phone = formData.get('phone') as string
            const company = formData.get('company') as string
            const department = formData.get('department') as string
            const password = formData.get('password') as string

            const nextId =
                allUsers.length > 0
                    ? Math.max(...allUsers.map((u) => u.id)) + 1
                    : 1

            const newUser: User = {
                id: nextId,
                name: name,
                email: email,
                phone: phone,
                company: company,
                department: department,
                image: avatar
                    ? URL.createObjectURL(avatar)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=150`,
                country: 'United States',
                status: 'active',
            }

            allUsers.push({ ...newUser, password: password })

            return HttpResponse.json(newUser)
        },
    ),

    http.put<UpdateUserParams, UpdateUserPayload, User>(
        '/api/users/:id',
        async ({ params, request }) => {
            const id = Number(params.id)
            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null
            const name = formData.get('name') as string | null
            const email = formData.get('email') as string | null
            const phone = formData.get('phone') as string | null
            const company = formData.get('company') as string | null
            const department = formData.get('department') as string | null
            const password = formData.get('password') as string | null

            const userIndex = allUsers.findIndex((user) => user.id === id)

            if (userIndex === -1) {
                return HttpResponse.json(null, { status: 404 })
            }

            const existingUser = allUsers[userIndex]

            const updatedUser: MockUser = {
                ...existingUser,
                name: name ?? existingUser.name,
                email: email ?? existingUser.email,
                phone: phone ?? existingUser.phone,
                company: company ?? existingUser.company,
                department: department ?? existingUser.department,
                image: avatar
                    ? URL.createObjectURL(avatar)
                    : existingUser.image,
                password: password ?? existingUser.password,
            }

            allUsers[userIndex] = updatedUser

            const { password: _password, ...responseUser } = updatedUser

            return HttpResponse.json(responseUser)
        },
    ),

    http.delete<DeleteUserParams, never, null>(
        '/api/users/:id',
        async ({ params }) => {
            const id = Number(params.id)

            const userIndex = allUsers.findIndex((user) => user.id === id)

            if (userIndex === -1) {
                return HttpResponse.json(null, { status: 404 })
            }

            allUsers.splice(userIndex, 1)

            return HttpResponse.json(null, { status: 204 })
        },
    ),

    http.delete<never, DeleteUsersPayload, null>(
        '/api/users',
        async ({ request }) => {
            const { ids } = await request.json()

            if (!ids || ids.length === 0) {
                return HttpResponse.json(null, { status: 400 })
            }

            for (const id of ids) {
                const index = allUsers.findIndex((user) => user.id === id)

                if (index !== -1) {
                    allUsers.splice(index, 1)
                }
            }

            return HttpResponse.json(null, { status: 204 })
        },
    ),
]
