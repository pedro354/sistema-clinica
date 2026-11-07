import axios from "axios";

// ==============================
// API CONFIGURATION
// ==============================

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// ==============================
// TYPES
// ==============================

type loginData = {
    email: string;
    password: string;
};

type loginResponse = {
    token: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
};

export type Patient = {
    id: number;
    name: string;
    email: string;
    phone: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type AppointmentStatus =
    | "SCHEDULED"
    | "COMPLETED"
    | "CANCELED";

export type Appointment = {
    id: number;
    date: Date;
    status: AppointmentStatus;
    description?: string;
    patientId: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    patient?: Patient;
};

export type ScheduleAvailability = {
    id: number;
    startDate: string;
    endDate: string;
    isAvailable: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

// ==============================
// AUTHENTICATION
// ==============================

const login = async (
    data: loginData
): Promise<loginResponse> => {
    const response = await api.post<loginResponse>("/login", data);
    return response.data;
};

// ==============================
// USERS
// ==============================

const getUser = async (id: number): Promise<User | null> => {
    const response = await api.get<User>(`/User/${id}`);
    return response.data;
};

// ==============================
// PATIENTS
// ==============================

const getPatients = async (userId: number): Promise<Patient[]> => {
    const response = await api.get<Patient[]>("/patient", {
        params: {
            userId,
        },
    });

    return response.data;
};

const createPatient = async (
    name: string,
    email: string,
    phone: string,
    userId: number
): Promise<Patient> => {
    const response = await api.post<Patient>("/patient", {
        name,
        email,
        phone,
        userId,
    });

    return response.data;
};

const updatePatient = async (
    id: number,
    data: {
        name?: string;
        email?: string;
        phone?: string;
    }
): Promise<Patient> => {
    const response = await api.put<Patient>(
        `/patient/${id}`,
        data
    );

    return response.data;
};

const deletePatient = async (id: number): Promise<void> => {
    await api.delete(`/patient/${id}`);
};

// ==============================
// APPOINTMENTS
// ==============================

const getAppointments = async (
    userId: number,
    startDate: Date,
    endDate: Date,
    status?: AppointmentStatus
): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>("/appointment", {
        params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            userId,
            status,
        },
    });

    return response.data;
};

const getAppointment = async (id: number): Promise<Appointment> => {
    const response = await api.get<Appointment>(
        `/appointment/${id}`
    );

    return response.data;
};

const createAppointment = async (data: {
    userId: number;
    patientId: number;
    date: string;
    description?: string;
}): Promise<Appointment> => {
    const response = await api.post<Appointment>(
        "/appointment",
        data
    );

    return response.data;
};

const updateAppointment = async (
    id: number,
    data: {
        patientId?: number;
        date?: string;
        description?: string;
        status?: AppointmentStatus;
    }
): Promise<Appointment> => {
    const response = await api.put<Appointment>(
        `/appointment/${id}`,
        data
    );

    return response.data;
};

const deleteAppointment = async (id: number): Promise<void> => {
    await api.delete(`/appointment/${id}`);
};

// ==============================
// UPCOMING APPOINTMENTS
// ==============================

const getUpcomingAppointments = async (
    userId: number,
    startDate: Date,
    endDate: Date
): Promise<Appointment[]> => {
    const response = await api.get<Appointment[]>("/appointment", {
        params: {
            userId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            isAvailable: true,
        },
    });

    return response.data;
};

// ==============================
// SCHEDULE AVAILABILITY
// ==============================

const getScheduleAvailability = async (
    userId: number,
    startDate: Date,
    endDate: Date
): Promise<ScheduleAvailability[]> => {
    const response = await api.get<ScheduleAvailability[]>(
        "/scheduleavailability",
        {
            params: {
                userId,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                isAvailable: true,
            },
        }
    );

    return response.data;
};

const createScheduleAvailability = async (data: {
    userId: number;
    startDate: string;
    endDate: string;
    isAvailable: boolean;
}): Promise<ScheduleAvailability> => {
    const response = await api.post<ScheduleAvailability>(
        "/scheduleavailability",
        data
    );

    return response.data;
};

const updateScheduleAvailability = async (
    id: number,
    data: {
        startDate?: string;
        endDate?: string;
        isAvailable?: boolean;
    }
): Promise<ScheduleAvailability> => {
    const response = await api.put<ScheduleAvailability>(
        `/scheduleavailability/${id}`,
        data
    );

    return response.data;
};

const deleteScheduleAvailability = async (
    id: number
): Promise<void> => {
    await api.delete(`/scheduleavailability/${id}`);
};

// ==============================
// PLANNER
// ==============================

const getPlanner = async (): Promise<void> => {
    await api.get("/planner");
};

// ==============================
// EXPORT
// ==============================

export default {
    login,
    getUser,
    getPatients,
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    getUpcomingAppointments,
    getScheduleAvailability,
    createPatient,
    updatePatient,
    deletePatient,
    createScheduleAvailability,
    updateScheduleAvailability,
    deleteScheduleAvailability,
    getPlanner,
};
