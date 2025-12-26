import { describe, it, expect } from 'vitest';
import { calculateDogRED } from '@/lib/calc/dog';
import { DOG_FACTORS } from '@/lib/calc/dog';

describe('calculateDogRED', () => {
  it('debe calcular RED correctamente para perro inactivo sin ajuste', () => {
    const result = calculateDogRED({
      pvKg: 10,
      activityLevel: 'inactive',
      adjustmentMode: 'none',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(10, 0.75);
    const expectedRED = DOG_FACTORS.inactive * expectedPM;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.k).toBe(99);
    expect(result.redMaintenance).toBeCloseTo(expectedRED, 2);
    expect(result.redFinal).toBeCloseTo(expectedRED, 2);
    expect(result.adjustmentLabel).toBe('sin ajuste');
  });

  it('debe calcular RED correctamente para perro activo con ajuste positivo', () => {
    const result = calculateDogRED({
      pvKg: 20,
      activityLevel: 'active',
      adjustmentMode: 'increase',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(20, 0.75);
    const expectedREDMaintenance = DOG_FACTORS.active * expectedPM;
    const expectedREDFinal = expectedREDMaintenance * 1.1;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.k).toBe(132);
    expect(result.redMaintenance).toBeCloseTo(expectedREDMaintenance, 2);
    expect(result.redFinal).toBeCloseTo(expectedREDFinal, 2);
    expect(result.adjustmentLabel).toBe('+10%');
  });

  it('debe calcular RED correctamente para perro muy activo con ajuste negativo', () => {
    const result = calculateDogRED({
      pvKg: 15,
      activityLevel: 'veryActive',
      adjustmentMode: 'decrease',
      adjustmentPct: 5,
    });

    const expectedPM = Math.pow(15, 0.75);
    const expectedREDMaintenance = DOG_FACTORS.veryActive * expectedPM;
    const expectedREDFinal = expectedREDMaintenance * 0.95;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.k).toBe(160);
    expect(result.redMaintenance).toBeCloseTo(expectedREDMaintenance, 2);
    expect(result.redFinal).toBeCloseTo(expectedREDFinal, 2);
    expect(result.adjustmentLabel).toBe('-5%');
  });

  it('debe manejar peso muy bajo', () => {
    const result = calculateDogRED({
      pvKg: 1,
      activityLevel: 'active',
      adjustmentMode: 'none',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(1, 0.75); // 1
    const expectedRED = DOG_FACTORS.active * expectedPM;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.redFinal).toBeCloseTo(expectedRED, 2);
  });

  it('debe manejar peso alto', () => {
    const result = calculateDogRED({
      pvKg: 50,
      activityLevel: 'veryActive',
      adjustmentMode: 'none',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(50, 0.75);
    const expectedRED = DOG_FACTORS.veryActive * expectedPM;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.redFinal).toBeCloseTo(expectedRED, 2);
  });

  it('debe lanzar error para peso inválido (0)', () => {
    expect(() => {
      calculateDogRED({
        pvKg: 0,
        activityLevel: 'active',
        adjustmentMode: 'none',
        adjustmentPct: 10,
      });
    }).toThrow('El peso debe ser un número mayor a 0');
  });

  it('debe lanzar error para peso inválido (negativo)', () => {
    expect(() => {
      calculateDogRED({
        pvKg: -5,
        activityLevel: 'active',
        adjustmentMode: 'none',
        adjustmentPct: 10,
      });
    }).toThrow('El peso debe ser un número mayor a 0');
  });

  it('debe manejar diferentes porcentajes de ajuste', () => {
    const result5 = calculateDogRED({
      pvKg: 10,
      activityLevel: 'active',
      adjustmentMode: 'increase',
      adjustmentPct: 5,
    });

    const result15 = calculateDogRED({
      pvKg: 10,
      activityLevel: 'active',
      adjustmentMode: 'increase',
      adjustmentPct: 15,
    });

    expect(result5.adjustmentLabel).toBe('+5%');
    expect(result15.adjustmentLabel).toBe('+15%');
    expect(result15.redFinal).toBeGreaterThan(result5.redFinal);
  });
});

