import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BudgetService {
  
  // Crear presupuesto
  async createBudget(data: {
    userId: string;
    startDate: Date;
    endDate: Date;
    currency: string;
  }) {
    return await prisma.budget.create({
      data: {
        userId: data.userId,
        startDate: data.startDate,
        endDate: data.endDate,
        currency: data.currency,
        totalIncomes: 0,
        totalExpenses: 0,
        availableMoney: 0
      }
    });
  }
  
  // Listar presupuestos de un usuario
  async getBudgetsByUser(userId: string) {
    return await prisma.budget.findMany({
      where: { userId },
      include: {
        incomes: true,
        expenses: {
          include: { category: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
  
  // Obtener un presupuesto específico
  async getBudgetById(id: string, userId: string) {
    return await prisma.budget.findFirst({
      where: { 
        id,
        userId // Asegurar que pertenece al usuario
      },
      include: {
        incomes: true,
        expenses: {
          include: { category: true }
        }
      }
    });
  }
  
  // Actualizar presupuesto
  async updateBudget(id: string, userId: string, data: {
    startDate?: Date;
    endDate?: Date;
    currency?: string;
  }) {
    return await prisma.budget.update({
      where: { 
        id,
        userId // Asegurar que pertenece al usuario
      },
      data
    });
  }
  
  // Eliminar presupuesto
  async deleteBudget(id: string, userId: string) {
    return await prisma.budget.delete({
      where: {
        id,
        userId
      }
    });
  }
  
  // Recalcular totales del presupuesto
  async recalculateBudget(budgetId: string) {
    // Obtener todos los ingresos
    const incomes = await prisma.income.findMany({
      where: { budgetId }
    });
    
    // Obtener todos los gastos
    const expenses = await prisma.expense.findMany({
      where: { budgetId }
    });
    
    // Calcular totales
    const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const availableMoney = totalIncomes - totalExpenses;
    
    // Actualizar presupuesto
    return await prisma.budget.update({
      where: { id: budgetId },
      data: {
        totalIncomes,
        totalExpenses,
        availableMoney
      }
    });
  }
}