const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding database...');

    // Seed Users
    await prisma.user.createMany({
        data: [
            {
                email: 'user1seed@example.com',
                password: 'password1', 
                username: 'user1 seeder',
                role: 'frontend',
            },
            {
                email: 'user2seed@example.com',
                password: 'password2',
                username: 'user2 seeder',
                role: 'backend',
            },
            {
                email: 'user3seed@example.com',
                password: 'password3',
                username: 'user3 seeder',
                role: 'designer',
            },
        ],
    });

    // Seed Projects
    await prisma.project.createMany({
        data: [
            {
                name: 'Project Alpha',
                description: 'Description for Project Alpha',
            },
            {
                name: 'Project Beta',
                description: 'Description for Project Beta',
            },
            {
                name: 'Project Gamma',
                description: 'Description for Project Gamma',
            },
        ],
    });

    // Seed Tasks
    await prisma.task.createMany({
        data: [
            {
                title: 'Task 1 for Project Alpha',
                description: 'Description for Task 1',
                status: 'pending',
                deadline: new Date('2024-08-31'),
                userId: 1, 
                projectId: 1,
            },
            {
                title: 'Task 2 for Project Beta',
                description: 'Description for Task 2',
                status: 'diproses',
                deadline: new Date('2024-09-15'),
                userId: 2,
                projectId: 2,
            },
            {
                title: 'Task 3 for Project Gamma',
                description: 'Description for Task 3',
                status: 'selesai',
                deadline: new Date('2024-10-01'),
                userId: 3,
                projectId: 3,
            },
        ],
    });

    console.log('Seeding completed.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
