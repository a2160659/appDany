import { describe, it, expect } from 'vitest';
import { calculateManualDose } from '@/lib/calc/manualDose';

describe('calculateManualDose', () => {
  it('debe calcular dosis correctamente con valores típicos', () => {
    const result = calculateManualDose({
      redKcalPerDay: 1000,
      kcalPerKg: 3600,
      mealsPerDay: 2,
    });

    // kcal/g = 3600 / 1000 = 3.6
    expect(result.kcalPerGram).toBe(3.6);
    
    // g/día = 1000 / 3.6 = 277.78
    expect(result.gramsPerDay).toBeCloseTo(277.78, 2);
    
    // g/toma = 277.78 / 2 = 138.89
    expect(result.gramsPerMeal).toBeCloseTo(138.89, 2);
  });

  it('debe calcular correctamente con 1 comida al día', () => {
    const result = calculateManualDose({
      redKcalPerDay: 500,
      kcalPerKg: 4000,
      mealsPerDay: 1,
    });

    // kcal/g = 4000 / 1000 = 4
    expect(result.kcalPerGram).toBe(4);
    
    // g/día = 500 / 4 = 125
    expect(result.gramsPerDay).toBe(125);
    
    // g/toma = 125 / 1 = 125
    expect(result.gramsPerMeal).toBe(125);
  });

  it('debe calcular correctamente con 3 comidas al día', () => {
    const result = calculateManualDose({
      redKcalPerDay: 900,
      kcalPerKg: 3000,
      mealsPerDay: 3,
    });

    // kcal/g = 3000 / 1000 = 3
    expect(result.kcalPerGram).toBe(3);
    
    // g/día = 900 / 3 = 300
    expect(result.gramsPerDay).toBe(300);
    
    // g/toma = 300 / 3 = 100
    expect(result.gramsPerMeal).toBe(100);
  });

  it('debe calcular correctamente con 4 comidas al día', () => {
    const result = calculateManualDose({
      redKcalPerDay: 800,
      kcalPerKg: 3200,
      mealsPerDay: 4,
    });

    // kcal/g = 3200 / 1000 = 3.2
    expect(result.kcalPerGram).toBe(3.2);
    
    // g/día = 800 / 3.2 = 250
    expect(result.gramsPerDay).toBe(250);
    
    // g/toma = 250 / 4 = 62.5
    expect(result.gramsPerMeal).toBe(62.5);
  });

  it('debe manejar valores decimales en kcal/kg', () => {
    const result = calculateManualDose({
      redKcalPerDay: 1000,
      kcalPerKg: 3750.5,
      mealsPerDay: 2,
    });

    // kcal/g = 3750.5 / 1000 = 3.7505
    expect(result.kcalPerGram).toBe(3.7505);
    
    // g/día = 1000 / 3.7505 = 266.63
    expect(result.gramsPerDay).toBeCloseTo(266.63, 2);
    
    // g/toma = 266.63 / 2 = 133.32
    expect(result.gramsPerMeal).toBeCloseTo(133.32, 2);
  });

  it('debe lanzar error para RED inválido (0)', () => {
    expect(() => {
      calculateManualDose({
        redKcalPerDay: 0,
        kcalPerKg: 3600,
        mealsPerDay: 2,
      });
    }).toThrow('El RED debe ser un número mayor a 0');
  });

  it('debe lanzar error para RED inválido (negativo)', () => {
    expect(() => {
      calculateManualDose({
        redKcalPerDay: -100,
        kcalPerKg: 3600,
        mealsPerDay: 2,
      });
    }).toThrow('El RED debe ser un número mayor a 0');
  });

  it('debe lanzar error para kcal/kg inválido (0)', () => {
    expect(() => {
      calculateManualDose({
        redKcalPerDay: 1000,
        kcalPerKg: 0,
        mealsPerDay: 2,
      });
    }).toThrow('La energía del alimento debe ser mayor a 0');
  });

  it('debe lanzar error para kcal/kg inválido (negativo)', () => {
    expect(() => {
      calculateManualDose({
        redKcalPerDay: 1000,
        kcalPerKg: -500,
        mealsPerDay: 2,
      });
    }).toThrow('La energía del alimento debe ser mayor a 0');
  });

  it('debe lanzar error para comidas inválido (0)', () => {
    expect(() => {
      calculateManualDose({
        redKcalPerDay: 1000,
        kcalPerKg: 3600,
        mealsPerDay: 0,
      });
    }).toThrow('El número de comidas debe ser un entero mayor a 0');
  });

  it('debe lanzar error para comidas inválido (negativo)', () => {
    expect(() => {
      calculateManualDose({
        redKcalPerDay: 1000,
        kcalPerKg: 3600,
        mealsPerDay: -1,
      });
    }).toThrow('El número de comidas debe ser un entero mayor a 0');
  });
});

