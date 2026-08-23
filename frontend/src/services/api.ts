import axios from "axios";

type loginData = {
    email: string;
    password: string;
}
type loginResponse = {
    token: string;

}

export type User = {
    id: number;
    name: string;
    email: string;
}

export type Patient = {
    id: number;
    name: string;
    email: string;
    phone: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
};

export type AppointmentStatus = "SCHEDULED" | "COMPLETED" | "CANCELED";

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
}

export type ScheduleAvailability = {
    id: number;
    startDate: string;
    endDate: string;
    isAvailable: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}


const login = async(data: loginData):Promise<loginResponse> => {
    const response = await axios.post<loginResponse>(`http://localhost:3000/api/login`, data);
    return response.data;
}
const getUser = async(id: number): Promise<User | null> => {
    const response = await axios.get<User>(`http://localhost:3000/api/User/${id}`);
    return response.data
}
const getPatients = async (userId: number): Promise<Patient[]> => {
    const response = await axios.get<Patient[]>(
        `http://localhost:3000/api/patient?userId=`, {
            params: {
                userId
            }
        }
    );

    return response.data;
};
const createPatient = async (name: string, email: string, phone: string, userId: number): Promise<Patient> => {
    const response = await axios.post<Patient>(
        `http://localhost:3000/api/patient`, {
            name,
            email,
            phone,
            userId
        }
    );

    return response.data;
};

const updatePatient = async (id: number, data: { name?: string, email?: string, phone?: string }): Promise<Patient> => {
    const response = await axios.put<Patient>(
        `http://localhost:3000/api/patient/${id}`,
        data
    );

    return response.data;
};

const deletePatient = async (id: number): Promise<void> => {
  await axios.delete(`http://localhost:3000/api/patient/${id}`);
};

const getAppointments = async (userId: number, startDate: Date, endDate: Date, status?: AppointmentStatus): Promise<Appointment[]> => {
    const response = await axios.get<Appointment[]>(
        `http://localhost:3000/api/appointment`,{
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                userId,
                status
            },
        }
    );

    return response.data;
}

const getAppointment = async (id: number): Promise<Appointment> => {
    const response = await axios.get<Appointment>(
        `http://localhost:3000/api/appointment/${id}`
    );

    return response.data;
};

const createAppointment = async (data: {
    userId: number;
    patientId: number;
    date: string;
    description?: string;
}): Promise<Appointment> => {
    const response = await axios.post<Appointment>(
        "http://localhost:3000/api/appointment",
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
    const response = await axios.put<Appointment>(
        `http://localhost:3000/api/appointment/${id}`,
        data
    );

    return response.data;
};

const deleteAppointment = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:3000/api/appointment/${id}`);
};

const getUpcomingAppointments = async (userId: number, startDate: Date, endDate: Date) => {
    const response = await axios.get<Appointment[]>(
        `http://localhost:3000/api/appointment`,{
            params: {
                userId,
                    startDate,
                    endDate,
                    isAvailable: true
                }
            }
    )
    return response.data;
}
const getScheduleAvailability = async (
  userId: number,
  startDate: Date,
  endDate: Date
): Promise<ScheduleAvailability[]> => {
  const response = await axios.get<ScheduleAvailability[]>(
    "http://localhost:3000/api/scheduleavailability",
    {
      params: {
        userId,
        startDate,
        endDate,
        isAvailable: true
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
  const response = await axios.post<ScheduleAvailability>(
    "http://localhost:3000/api/scheduleavailability",
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
  const response = await axios.put<ScheduleAvailability>(
    `http://localhost:3000/api/scheduleavailability/${id}`,
    data
  );

  return response.data;
};

const deleteScheduleAvailability = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:3000/api/scheduleavailability/${id}`);
};


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
    deleteScheduleAvailability

};
