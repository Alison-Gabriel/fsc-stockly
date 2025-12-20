import { Prisma } from "@/app/_generated/prisma/client";
import { db } from "@/app/_lib/prisma";
import "server-only";
import { TotalRevenueDTO } from "./get-total-revenue";
import { dateFormatter } from "@/app/_helpers/date-formatter";

export interface DayTotalRevenueDTO {
  day: string;
  totalRevenue: number;
}

export const getLast14DaysTotalRevenue = async (): Promise<
  DayTotalRevenueDTO[]
> => {
  const today = new Date(new Date().setHours(0, 0, 0, 0)).getDate();
  const arraySortedFrom13ToZero = [
    13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
  ];

  const last14Days = arraySortedFrom13ToZero.map((day) => {
    return new Date(new Date().setDate(today - day));
  });

  const last14DaysTotalRevenue: DayTotalRevenueDTO[] = [];

  for (const day of last14Days) {
    const startOfCurrentDay = new Date(day.setHours(0, 0, 0, 0));
    const endOfCurrentDay = new Date(day.setHours(23, 59, 59, 999));

    const currentDayTotalRevenueQuery = Prisma.sql`
        SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") AS "totalRevenue" 
        FROM "SaleProduct"
        JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
        WHERE "Sale"."date" >= ${startOfCurrentDay} AND "Sale"."date" <= ${endOfCurrentDay}
      `;

    const [currentDayTotalRevenue] = await db.$queryRaw<TotalRevenueDTO[]>(
      currentDayTotalRevenueQuery,
    );

    last14DaysTotalRevenue.push({
      day: dateFormatter(day),
      totalRevenue: Number(currentDayTotalRevenue.totalRevenue),
    });
  }

  return last14DaysTotalRevenue;
};
