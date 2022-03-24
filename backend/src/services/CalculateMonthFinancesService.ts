import { Between } from 'typeorm';

import { employeeRepository, projectRepository } from '../db/repositories';

import { getTimestampOfFirstDayOfCurrentMonth } from '../utils/getTimestampOfFirstDayOfCurrentMonth';
import { getTimestampOfLastDayOfCurrentMonth } from '../utils/getTimestampOfLastDayOfCurrentMonth';

export class CalculateMonthFinancesService {
  async execute() {
    const firstDateOfCurrentMonth = getTimestampOfFirstDayOfCurrentMonth();
    const lastDateOfCurrentMonth = getTimestampOfLastDayOfCurrentMonth();

    const projectsOfThisMonth = await projectRepository.find({
      where: {
        deadline: Between(
          new Date(firstDateOfCurrentMonth).toISOString(),
          new Date(lastDateOfCurrentMonth).toISOString()
        ),
      },
    });

    const sumOfProjectsValues = projectsOfThisMonth.reduce((sum, project) => {
      const technicalHours = project.technicalSeconds / (60 * 60);
      const projectValue = project.paymentPerHour * technicalHours;

      return sum + projectValue;
    }, 0);

    const employees = await employeeRepository.find();

    const sumOfEmployeesPayments = employees.reduce((sum, employee) => {
      console.log(employee.salary, typeof employee.salary);
      return sum + Number(employee.salary);
    }, 0);

    return {
      monthPayment: sumOfProjectsValues,
      monthConsts: sumOfEmployeesPayments,
      profit: sumOfProjectsValues - sumOfEmployeesPayments,
    };
  }
}
