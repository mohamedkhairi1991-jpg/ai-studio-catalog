import { describe, expect, it } from 'vitest';
import {
  buildDiscoveryPrompt,
  discoveryNotes,
  normalizeCompanies,
  normalizeProducts,
  validateDiscoveryRequest,
} from './discovery.ts';

describe('validateDiscoveryRequest', () => {
  it('accepts the companies mode with optional focus and exclude list', () => {
    expect(validateDiscoveryRequest({ mode: 'companies', focus: ' Iraqi manufacturers ', exclude: ['Pfizer', 3, ' '] })).toEqual({
      ok: true,
      value: { mode: 'companies', focus: 'Iraqi manufacturers', exclude: ['Pfizer'] },
    });
  });

  it('requires a company name for company_products', () => {
    expect(validateDiscoveryRequest({ mode: 'company_products' }).ok).toBe(false);
    expect(validateDiscoveryRequest({ mode: 'company_products', companyName: 'AstraZeneca' })).toEqual({
      ok: true,
      value: { mode: 'company_products', companyName: 'AstraZeneca', exclude: [] },
    });
  });

  it('rejects unknown modes and bad exclude lists', () => {
    expect(validateDiscoveryRequest({ mode: 'prices' }).ok).toBe(false);
    expect(validateDiscoveryRequest({ mode: 'companies', exclude: 'Pfizer' }).ok).toBe(false);
    expect(validateDiscoveryRequest({ mode: 'companies', exclude: new Array(301).fill('x') }).ok).toBe(false);
  });
});

describe('buildDiscoveryPrompt', () => {
  it('passes company, area and exclusions to the model', () => {
    const p = buildDiscoveryPrompt({
      mode: 'company_products',
      companyName: 'Hikma',
      therapeuticArea: 'Cardiology',
      exclude: ['Amlodipine Hikma 5 mg'],
    });
    expect(p.system).toContain('ONE company');
    expect(p.user).toContain('Company: Hikma');
    expect(p.user).toContain('Cardiology');
    expect(p.user).toContain('Amlodipine Hikma 5 mg');
  });

  it('forbids prices and local agents in the company prompt', () => {
    const p = buildDiscoveryPrompt({ mode: 'companies', exclude: [] });
    expect(p.system).toContain('No prices');
    expect(p.system).toContain('scientific bureaus');
  });
});

describe('normalizeCompanies', () => {
  it('cleans entries, drops duplicates, excluded names and bad URLs', () => {
    const list = normalizeCompanies(
      {
        items: [
          { name: 'Samarra Drug Industries', type: 'iraqi_manufacturer', iraqEvidence: 'confirmed', website: 'https://sdi.example', source: { title: 'MOH', url: 'https://moh.example/x' } },
          { name: 'samarra drug industries' },
          { name: 'Pfizer', type: 'multinational' },
          { name: 'Odd Co', type: 'pharmacy', iraqEvidence: 'certain', website: 'ftp://x', source: { url: 'nope' } },
          'garbage',
        ],
      },
      ['pfizer'],
    );
    expect(list.map((c) => c.name)).toEqual(['Samarra Drug Industries', 'Odd Co']);
    expect(list[0]).toMatchObject({ legalName: 'Samarra Drug Industries', type: 'iraqi_manufacturer', iraqEvidence: 'confirmed', website: 'https://sdi.example' });
    expect(list[1]).toMatchObject({ type: null, iraqEvidence: 'unknown', website: null, source: null });
  });

  it('returns nothing for garbage and caps the list', () => {
    expect(normalizeCompanies('x')).toEqual([]);
    const many = { items: Array.from({ length: 60 }, (_, i) => ({ name: `Co ${i}` })) };
    expect(normalizeCompanies(many)).toHaveLength(40);
  });
});

describe('normalizeProducts', () => {
  it('keeps one item per brand and strength and validates categories', () => {
    const list = normalizeProducts(
      {
        items: [
          { brandName: 'Forxiga 10 mg', genericName: 'Dapagliflozin', strength: '10 mg', dosageForm: 'Tablet', category: 'prescription_drug', iraqEvidence: 'likely' },
          { brandName: 'FORXIGA 10 MG' },
          { brandName: 'Forxiga 5 mg', category: 'medical_device' },
          { brandName: 'Crestor 20 mg' },
        ],
        notes: '  Iraq lists not public. ',
      },
      ['Crestor 20 mg'],
    );
    expect(list.map((p) => p.brandName)).toEqual(['Forxiga 10 mg', 'Forxiga 5 mg']);
    expect(list[0]).toMatchObject({ genericName: 'Dapagliflozin', category: 'prescription_drug', iraqEvidence: 'likely' });
    expect(list[1].category).toBeNull();
  });

  it('reads notes', () => {
    expect(discoveryNotes({ notes: '  Iraq lists are not public. ' })).toBe('Iraq lists are not public.');
    expect(discoveryNotes(null)).toBeNull();
  });
});
