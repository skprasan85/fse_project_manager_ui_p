
export interface IProject {
    projectId: number;
    project: string;
    projectStartDate: Date;
    projectEndDate: Date;
    projectPriority: number;
    numberOfTasks: number;
    completedTasks: number;
    userId: number;
    firstName: string;
    lastName: string;
    employeeId: number;
}