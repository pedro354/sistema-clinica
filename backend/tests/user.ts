import { prisma } from "../prisma/lib/prisma";



async function main(){
    const user = await prisma.user.upsert({
        where: {
            email: "emilysparks@gmail.com"
        },
        update: {
            scheduleAvailabilities: {
                create: [{
                    startDate: new Date("2024-07-01T09:00:00Z"),
                    endDate: new Date("2024-07-01T17:00:00Z"),
                    isAvailable: true
                }]
            }
},
        create: {
            name: "Emily Sparks",
            email: "emilysparks@gmail.com",
            password: "password123",
            },
        include: {
            patients: true,
            scheduleAvailabilities: true
        }
    })
    console.log("Created user:", user);
    
    const patient = await prisma.patient.upsert({
        where: {
            id: 1,
            name: "Pedro"
        },
        update: {},
        create: {
            name: "Pedro",
            phone: "123456789",
            userId: user.id,
            appointments: {
                create: {
                    date: new Date("2024-07-01T10:00:00Z"),
                    description: "General check-up",
                    status: "SCHEDULED"
                }
            }
        }
    });
    console.error("Created patient:", patient);
}
    
main().then(() => {
    console.log("User created successfully");
}).catch((error) => {
    console.error("Error creating user:", error);
}).finally(async () => {
    await prisma.$disconnect();
});