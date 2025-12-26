import { describe, it, expect } from 'vitest';
import { calculateCatRED } from '@/lib/calc/cat';
import { CAT_FACTORS } from '@/lib/calc/cat';

describe('calculateCatRED', () => {
  it('debe calcular RED correctamente para gato inactivo sin ajuste', () => {
    const result = calculateCatRED({
      pvKg: 4,
      activityLevel: 'inactive',
      adjustmentMode: 'none',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(4, 0.75);
    const expectedRED = CAT_FACTORS.inactive * expectedPM;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.k).toBe(99);
    expect(result.redMaintenance).toBeCloseTo(expectedRED, 2);
    expect(result.redFinal).toBeCloseTo(expectedRED, 2);
    expect(result.adjustmentLabel).toBe('sin ajuste');
  });

  it('debe calcular RED correctamente para gato activo con ajuste positivo', () => {
    const result = calculateCatRED({
      pvKg: 5,
      activityLevel: 'active',
      adjustmentMode: 'increase',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(5, 0.75);
    const expectedREDMaintenance = CAT_FACTORS.active * expectedPM;
    const expectedREDFinal = expectedREDMaintenance * 1.1;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.k).toBe(132);
    expect(result.redMaintenance).toBeCloseTo(expectedREDMaintenance, 2);
    expect(result.redFinal).toBeCloseTo(expectedREDFinal, 2);
    expect(result.adjustmentLabel).toBe('+10%');
  });

  it('debe calcular RED correctamente para gato muy activo con ajuste negativo', () => {
    const result = calculateCatRED({
      pvKg: 6,
      activityLevel: 'veryActive',
      adjustmentMode: 'decrease',
      adjustmentPct: 5,
    });

    const expectedPM = Math.pow(6, 0.75);
    const expectedREDMaintenance = CAT_FACTORS.veryActive * expectedPM;
    const expectedREDFinal = expectedREDMaintenance * 0.95;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.k).toBe(160);
    expect(result.redMaintenance).toBeCloseTo(expectedREDMaintenance, 2);
    expect(result.redFinal).toBeCloseTo(expectedREDFinal, 2);
    expect(result.adjustmentLabel).toBe('-5%');
  });

  it('debe manejar peso muy bajo', () => {
    const result = calculateCatRED({
      pvKg: 2,
      activityLevel: 'active',
      adjustmentMode: 'none',
      adjustmentPct: 10,
    });

    const expectedPM = Math.pow(2, 0.75);
    const expectedRED = CAT_FACTORS.active * expectedPM;

    expect(result.pm).toBeCloseTo(expectedPM, 2);
    expect(result.redFinal).toBeCloseTo(expectedRED, 2);
  });

  it('debe lanzar error para peso inválido (0)', () => {
    expect(() => {
      calculateCatRED({
        pvKg: 0,
        activityLevel: 'active',
        adjustmentMode: 'none',
        adjustmentPct: 10,
      });
    }).toThrow('El peso debe ser un número mayor a 0');
  });

  it('debe lanzar error para peso inválido (negativo)', () => {
    expect(() => {
      calculateCatRED({
        pvKg: -1,
        activityLevel: 'active',
        adjustmentMode: 'none',
        adjustmentPct: 10,
      });
    }).toThrow('El peso debe ser un número mayor a 0');
  });
});

