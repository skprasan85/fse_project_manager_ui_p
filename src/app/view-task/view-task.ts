export interface IViewTask{
    id: number;
    task: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    parentId: number;
    parentTask: string;
    projectId: number;
    project: string;
    projectStartDate: Date;
    projectEndDate: Date;
    projectPriority: number;
    userId: number;
    firstName: string;
    lastName: string;
    employeeId: number;
}