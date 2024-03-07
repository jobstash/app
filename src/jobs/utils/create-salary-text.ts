import { formatNumber } from '~/shared/utils/format-number';

interface SalaryInfo {
  salary: number | null;
  minimumSalary: number | null;
  maximumSalary: number | null;
  salaryCurrency: string | null;
}

export const createSalaryText = ({
  salary,
  minimumSalary,
  maximumSalary,
}: SalaryInfo) => {
  if (minimumSalary && maximumSalary) {
    return `${formatNumber(minimumSalary)} - ${formatNumber(maximumSalary)}`;
  }

  const isNotRange = [minimumSalary, maximumSalary].includes(null);
  if (salary && isNotRange) return `${formatNumber(salary)}`;

  return null;
};
