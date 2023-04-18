export interface State {
    estado: string,
    sigla: string
};

export interface Institution {
    estado: State,
    universidade_id: string,
    universidade: string,
}

export interface Course {
    curso: string,
    estados: State[],
    universidades: {
        universidade_id: string,
        universidade: string,
        estado: State
    }[]
}

export interface CourseSearch {
    campus: string,
    curso: string,
    estado: State,
    grau: string,
    id: string,
    sigla: string,
    turno: string,
    universidade: string
}